import { deleteMessage } from 'services/SQS'

export const handler = async event => {
    for (const r of event.Records) {
        const {
            body: message,
            messageAttributes: {
                strParam: { stringValue: strParam },
            },
            receiptHandle,
        } = r

        try {
            console.log('Processing message...', message, strParam)
            await deleteMessage({ receiptHandle })
        } catch (e) {
            console.error('Handling error...', e)
        }
    }
}
