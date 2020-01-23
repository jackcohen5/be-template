import { DynamoDB } from './AWS'

export const list = async pk => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: {
            ':pk': pk,
        },
    }

    const result = await DynamoDB.query(params).promise()
    return result.Items
}

export const get = async ({ pk, sk }) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            pk,
            sk,
        },
    }

    const result = await DynamoDB.get(params).promise()
    return result.Item
}

export const put = async ({ pk, sk, data }) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            pk,
            sk,
            data,
        },
    }

    await DynamoDB.put(params).promise()
    return params.Item
}

export const deleteItem = async ({ pk, sk }) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            pk,
            sk,
        },
    }

    await DynamoDB.delete(params).promise()
    return params.Item
}
