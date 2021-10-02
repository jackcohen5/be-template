import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { FunctionHandler, Role1View } from 'functions/BaseView'
import { list as ListItems } from 'services/DynamoDB'

interface ListPayload {
    items: DocumentClient.ItemList
}

const ListView: FunctionHandler<ListPayload> = async ({ auth: { userId } }) => {
    const pk = `USER#${userId}`
    const items = await ListItems({ pk })
    return { data: { items } }
}

export default Role1View(ListView)
