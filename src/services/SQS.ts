import type { SQS as SQSTypes } from 'aws-sdk'

import { SQS } from './AWS'

export const sendMessage = async ({
    message,
    delaySeconds,
    attributes,
}: {
    message: string
    delaySeconds?: number
    attributes?: SQSTypes.MessageBodyAttributeMap
}): Promise<SQSTypes.SendMessageResult> => {
    const { QueueUrl } = await SQS.getQueueUrl({
        QueueName: process.env.SQS_QUEUE,
    }).promise()

    const params: SQSTypes.SendMessageRequest = {
        QueueUrl,
        MessageBody: message,
    }
    if (delaySeconds) {
        params.DelaySeconds = delaySeconds
    }
    if (attributes) {
        params.MessageAttributes = attributes
    }

    return await SQS.sendMessage(params).promise()
}

export const deleteMessage = async ({
    receiptHandle,
}: {
    receiptHandle: string
}): Promise<void> => {
    const { QueueUrl } = await SQS.getQueueUrl({
        QueueName: process.env.SQS_QUEUE,
    }).promise()

    const params: SQSTypes.DeleteMessageRequest = {
        QueueUrl,
        ReceiptHandle: receiptHandle,
    }

    await SQS.deleteMessage(params).promise()
}
