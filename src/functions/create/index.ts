import { v4 as uuidv4 } from 'uuid'

import { FunctionHandler, Role1View } from 'functions/BaseView'
import { BaseItem, put as PutItem } from 'services/DynamoDB'

interface CreatePayload {
    item: BaseItem
}
const CreateView: FunctionHandler<CreatePayload> = async ({
    auth: { userId },
    body: data,
}) => {
    const TEMPLATE_NAME_SK = uuidv4()
    const pk = `USER#${userId}`
    const sk = `ORDER#${TEMPLATE_NAME_SK}`
    const item = await PutItem({ pk, sk, data })
    return { data: { item }, statusCode: 201 }
}

export default Role1View(CreateView)
