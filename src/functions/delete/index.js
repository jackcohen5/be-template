import BaseView from 'functions/BaseView'
import { deleteItem as DeleteItem } from 'services/DynamoDB'

const DeleteView = async ({ TEMPLATE_NAME_SK, userId }) => {
    const pk = `USER#${userId}`
    const sk = `ORDER#${TEMPLATE_NAME_SK}`
    const item = await DeleteItem({ pk, sk })
    return { data: item }
}

export default BaseView(DeleteView)
