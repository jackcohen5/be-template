import { FunctionHandler, Role1View } from 'functions/BaseView'
import { BaseItem, deleteItem as DeleteItem } from 'services/DynamoDB'

interface DeletePayload {
    item: BaseItem
}

const DeleteAPIView: FunctionHandler<DeletePayload> = async ({
    auth: { userId },
    pathParameters: { TEMPLATE_NAME_SK },
}) => {
    const pk = `USER#${userId}`
    const sk = `ORDER#${TEMPLATE_NAME_SK}`
    const item = await DeleteItem({ pk, sk })
    return { data: { item } }
}

export default Role1View(DeleteAPIView)
