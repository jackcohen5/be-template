import { FunctionHandler, Role1View } from 'functions/BaseView'
import { BaseItem, deleteItem as DeleteItem } from 'services/DynamoDB'

interface DeletePayload {
    item: BaseItem
}

const DeleteAPIView: FunctionHandler<DeletePayload> = async ({
    auth: { userId },
    pathParameters: { orderId },
}) => {
    const pk = `USER#${userId}`
    const sk = `ORDER#${orderId}`
    const item = await DeleteItem({ pk, sk })
    return { data: { item } }
}

export default Role1View(DeleteAPIView)
