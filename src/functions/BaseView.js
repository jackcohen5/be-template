import { errorResponse, successResponse } from 'services/Lambda'

const BaseView = f => async (event, ...otherParams) => {
    try {
        const enhancedEvent = {
            itemId: event.pathParameters ? event.pathParameters.itemId : null,
            userId:
                event.requestContext && event.requestContext.authorizer
                    ? event.requestContext.authorizer.userId
                    : null,
        }
        const { data, statusCode = 200 } = await f(
            enhancedEvent,
            ...otherParams,
        )
        return successResponse(
            {
                data,
            },
            statusCode,
        )
    } catch (err) {
        console.error(err)
        return errorResponse({
            message: err.message,
        })
    }
}

export default BaseView
