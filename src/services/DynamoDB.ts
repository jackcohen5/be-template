import type { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client'

import { DynamoDB } from './AWS'

type BaseItem = {
    pk: string
    sk: string
    data?: { [key: string]: string }
}

export const list = async ({
    pk,
    sk,
}: BaseItem): Promise<DocumentClient.ItemList> => {
    let KeyConditionExpression = 'pk = :pk'
    const ExpressionAttributeValues = { ':pk': pk }
    if (sk) {
        KeyConditionExpression += ' and begins_with(sk, :sk)'
        ExpressionAttributeValues[':sk'] = sk
    }
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        KeyConditionExpression,
        ExpressionAttributeValues,
    }

    const result = await DynamoDB.query(params).promise()
    return result.Items
}

export const get = async ({
    pk,
    sk,
}: BaseItem): Promise<DocumentClient.AttributeMap> => {
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

export const put = async ({ pk, sk, data }: BaseItem): Promise<BaseItem> => {
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

export const deleteItem = async ({ pk, sk }: BaseItem): Promise<BaseItem> => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            pk,
            sk,
        },
    }

    await DynamoDB.delete(params).promise()
    return params.Key
}
