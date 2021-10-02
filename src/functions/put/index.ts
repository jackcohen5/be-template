import { FunctionHandler, Role1View } from 'functions/BaseView'
import { BaseItem, put as PutItem } from 'services/DynamoDB'

interface PutPayload {
    item: BaseItem
}

const PutView: FunctionHandler<PutPayload> = async ({
    auth: { userId },
    body,
    pathParameters,
}) => {
    const pk = `USER#${userId}`
    const sk = `ORDER#${pathParameters.TEMPLATE_NAME_SK}`
    const item = await PutItem({ pk, sk, data: body })
    return { data: { item } }
}

export default Role1View(PutView)
