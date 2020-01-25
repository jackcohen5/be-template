import { errorResponse, successResponse } from 'services/Lambda'

const BaseView = f => async (event, ...otherParams) => {
    try {
        const enhancedEvent = {
            TEMPLATE_NAME_SK: event.pathParameters
                ? event.pathParameters.TEMPLATE_NAME_SK
                : null,
            userId:
                event.requestContext && event.requestContext.authorizer
                    ? event.requestContext.authorizer.userId
                    : null,
            body: event.body ? JSON.parse(event.body) : {},
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
