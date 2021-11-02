import type { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client'

import { DynamoDB } from './AWS'

export interface BasePartition {
    pk: string
    sk?: string
}

export interface BaseItem extends BasePartition {
    sk: string
    data?: Record<string, unknown>
}

export const list = async (
    partition: BasePartition,
): Promise<DocumentClient.ItemList> => {
    let KeyConditionExpression = 'pk = :pk'
    const ExpressionAttributeValues = { ':pk': partition.pk }
    if (partition.sk) {
        KeyConditionExpression += ' and begins_with(sk, :sk)'
        ExpressionAttributeValues[':sk'] = partition.sk
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
