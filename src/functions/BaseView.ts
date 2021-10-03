import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { errorResponse, successResponse } from 'services/Lambda'
import { Roles } from 'functions/authorizer/authorizer.constants'

export interface EnhancedEvent {
    auth: { [key: string]: string }
    body: { [key: string]: string }
    pathParameters: { [key: string]: string }
    queryParameters: { [key: string]: string }
}

interface HandlerResponse<T> {
    data: T
    statusCode?: number
}

export type FunctionHandler<T> = (
    event: EnhancedEvent,
) => Promise<HandlerResponse<T>>

type View = (
    event: APIGatewayProxyEvent,
    authorizedRoles?: Roles[],
) => Promise<APIGatewayProxyResult>

const ViewWrapper = async <T>(
    f: FunctionHandler<T>,
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {
        const enhancedEvent: EnhancedEvent = {
            auth: event?.requestContext?.authorizer ?? {},
            body: JSON.parse(event?.body ?? '{}'),
            pathParameters: event?.pathParameters ?? {},
            queryParameters: event?.queryStringParameters ?? {},
        }
        const { data, statusCode = 200 } = await f(enhancedEvent)
        return successResponse(data, statusCode)
    } catch (err) {
        console.error(err)
        return errorResponse({ message: 'Unexpected error occurred.' })
    }
}

export const UnauthenticatedView =
    <T>(f: FunctionHandler<T>): View =>
    (event: APIGatewayProxyEvent) =>
        ViewWrapper(f, event)

const AuthenticatedView =
    <T>(f: FunctionHandler<T>, authorizedRoles: Roles[] = []): View =>
    async (event: APIGatewayProxyEvent) => {
        const userRoles: string[] =
            event?.requestContext?.authorizer?.roles ?? []
        if (authorizedRoles.some((r) => userRoles.includes(r))) {
            return await ViewWrapper(f, event)
        } else {
            return errorResponse({ message: 'Unauthorized' }, 403)
        }
    }

export const Role1View = <T>(f: FunctionHandler<T>): View =>
    AuthenticatedView(f, [Roles.TEMPLATE_NAME_ROLE1])

export const Role2View = <T>(f: FunctionHandler<T>): View =>
    AuthenticatedView(f, [Roles.TEMPLATE_NAME_ROLE2])
