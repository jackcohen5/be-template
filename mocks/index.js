import { Roles } from 'functions/BaseView'

// COMMON
export const mockUserId1 = 'user_id_1'

// LAMBDA
export const makeEvent = ({
    authorizer = {},
    body = {},
    pathParameters = {},
} = {}) => ({
    requestContext: { authorizer },
    body: JSON.stringify(body),
    pathParameters,
})

export const makeAuthenticatedEvent = ({
    body,
    pathParameters,
    roles = [Roles.TEMPLATE_NAME_ROLE1],
} = {}) =>
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
