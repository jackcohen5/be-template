import type {
    APIGatewayProxyEvent,
    APIGatewayProxyEventPathParameters,
    APIGatewayProxyEventQueryStringParameters,
    APIGatewayProxyResult,
} from 'aws-lambda'

import { errorResponse, successResponse } from 'services/Lambda'
import { Role } from 'functions/authorizer/constants'

const extractRoleFromEvent = (
    event: APIGatewayProxyEvent,
): Role | undefined => {
    return event.requestContext.authorizer?.jwt?.claims?.claims?.role
}

interface EnhancedEvent<RequestBody> {
    auth: Record<string, unknown>
    body: RequestBody
    pathParameters: APIGatewayProxyEventPathParameters
    queryParameters: APIGatewayProxyEventQueryStringParameters
}

interface HandlerResponse<ResponsePayload> {
    data: ResponsePayload
    statusCode?: number
}

export type FunctionHandler<
    ResponsePayload,
    RequestBody = Record<string, unknown>,
> = (
    event: EnhancedEvent<RequestBody>,
) => Promise<HandlerResponse<ResponsePayload>>

type View = (
    event: APIGatewayProxyEvent,
    authorizedRoles?: Role[],
) => Promise<APIGatewayProxyResult>

const ViewWrapper = async <RequestBody, ResponsePayload>(
    f: FunctionHandler<ResponsePayload, RequestBody>,
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {
        const enhancedEvent: EnhancedEvent<RequestBody> = {
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
    <RequestBody, ResponsePayload>(
        f: FunctionHandler<RequestBody, ResponsePayload>,
    ): View =>
    (event: APIGatewayProxyEvent) =>
        ViewWrapper(f, event)

export const AnonymousView =
    <RequestBody, ResponsePayload>(
        f: FunctionHandler<RequestBody, ResponsePayload>,
    ): View =>
    async (event: APIGatewayProxyEvent) => {
        if (extractRoleFromEvent(event)) {
            return errorResponse({ message: 'Unauthorized' }, 403)
        }

        return await ViewWrapper(f, event)
    }

const AuthenticatedView =
    <RequestBody, ResponsePayload>(
        f: FunctionHandler<RequestBody, ResponsePayload>,
        authorizedRoles: Role[] = [],
    ): View =>
    async (event: APIGatewayProxyEvent) => {
        if (authorizedRoles.includes(extractRoleFromEvent(event))) {
            return await ViewWrapper(f, event)
        } else {
            return errorResponse({ message: 'Unauthorized' }, 403)
        }
    }

export const Role1View = <RequestBody, ResponsePayload>(
    f: FunctionHandler<RequestBody, ResponsePayload>,
): View => AuthenticatedView(f, [Role.ROLE_1])

export const Role2View = <RequestBody, ResponsePayload>(
    f: FunctionHandler<RequestBody, ResponsePayload>,
): View => AuthenticatedView(f, [Role.ROLE_2])
