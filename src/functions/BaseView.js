import { errorResponse, successResponse } from 'services/Lambda'

const BaseView = f => async (event, ...otherParams) => {
    try {
        const enhancedEvent = {
            TEMPLATE_NAME_SK: event?.pathParameters?.TEMPLATE_NAME_SK,
            userId: event?.requestContext?.authorizer?.userId,
            body: JSON.parse(event?.body ?? '{}'),
            pathParameters: event?.pathParameters ?? {},
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
