import { DynamoDB } from './AWS'

export const list = async userId => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId,
        },
    }

    const result = await DynamoDB.query(params).promise()
    return result.Items
}

export const get = async (userId, itemId) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            userId,
            itemId,
        },
    }

    const result = await DynamoDB.get(params).promise()
    return result.Item
}

export const put = async (userId, itemId) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            userId,
            itemId,
        },
    }

    await DynamoDB.put(params).promise()
    return params.Item
}

export const deleteItem = async (userId, itemId) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            userId,
            itemId,
        },
    }

    await DynamoDB.delete(params).promise()
    return params.Item
}
