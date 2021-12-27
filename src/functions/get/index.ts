import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { FunctionHandler, Role1View } from 'functions/BaseView'
import { get as GetItem } from 'services/DynamoDB'

interface GetPayload {
    item: DocumentClient.AttributeMap
}

const GetView: FunctionHandler<GetPayload> = async ({
    auth: { userId },
    pathParameters: { orderId },
}) => {
    const pk = `USER#${userId}`
    const sk = `ORDER#${orderId}`
    const item = await GetItem({ pk, sk })
    return { data: { item } }
}

export default Role1View(GetView)
