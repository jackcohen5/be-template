import {
    APIGatewayEventRequestContext,
    APIGatewayProxyEvent,
    APIGatewayProxyEventBase,
    APIGatewayProxyEventPathParameters,
} from 'aws-lambda'

import { Roles } from 'functions/authorizer/authorizer.constants'

// COMMON
export const mockUserId1 = 'user_id_1'

// LAMBDA
const baseEvent: APIGatewayProxyEvent = {
    body: '',
    headers: undefined,
    multiValueHeaders: undefined,
    httpMethod: '',
    isBase64Encoded: false,
    path: '',
    pathParameters: undefined,
    queryStringParameters: undefined,
    multiValueQueryStringParameters: undefined,
    stageVariables: undefined,
    requestContext: undefined,
    resource: '',
}

const baseResourceContext: APIGatewayEventRequestContext = {
    accountId: '',
    apiId: '',
    authorizer: undefined,
    protocol: '',
    httpMethod: '',
    identity: undefined,
    path: '',
    stage: '',
    requestId: '',
    requestTimeEpoch: 0,
    resourceId: '',
    resourcePath: '',
}

export const makeEvent = <TAuthorizerContext>({
    authorizer,
    body = '{}',
    pathParameters = {},
}: {
    body?: string
    pathParameters?: APIGatewayProxyEventPathParameters
    authorizer?: TAuthorizerContext
} = {}): APIGatewayProxyEventBase<TAuthorizerContext> => ({
    ...baseEvent,
    requestContext: {
        ...baseResourceContext,
        authorizer,
    },
    body: JSON.stringify(body),
    pathParameters,
})

export const makeAuthenticatedEvent = ({
    body,
    pathParameters,
    roles = [Roles.TEMPLATE_NAME_ROLE1],
}: {
    body?: string
    pathParameters?: APIGatewayProxyEventPathParameters
    roles?: Roles[]
} = {}): APIGatewayProxyEvent =>
    makeEvent({
        authorizer: { userId: mockUserId1, roles },
        body,
        pathParameters,
    })

export const role1AuthenticatedEvent = makeAuthenticatedEvent()

// ITEM
export const mockItem1 = {
    itemId: 'item_id_1',
    userId: mockUserId1,
}

export const mockItem2 = {
    itemId: 'item_id_2',
    userId: 'user_id_2',
}

export const mockItems = [mockItem1, mockItem2]
