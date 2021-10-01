import type { APIGatewayProxyResult } from 'aws-lambda'

interface LambdaResponseArgs<T> {
    json: T
    statusCode: number
    allowCORS?: boolean
}

function lambdaResponse<T>(args: LambdaResponseArgs<T>): APIGatewayProxyResult {
    const response: APIGatewayProxyResult = {
        statusCode: args.statusCode,
        body: JSON.stringify(args.json),
    }

    if (args.allowCORS) {
        response.headers = {
            'Access-Control-Allow-Origin': '*',
        }
    }

    return response
}

export function successResponse<T>(
    data: T,
    statusCode = 200,
): APIGatewayProxyResult {
    return lambdaResponse({
        json: data,
        statusCode: statusCode,
        allowCORS: true,
    })
}

export function errorResponse<T>(
    data: T,
    statusCode = 500,
): APIGatewayProxyResult {
    return lambdaResponse({
        json: data,
        statusCode,
        allowCORS: true,
    })
}
