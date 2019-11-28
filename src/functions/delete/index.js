import BaseView from 'functions/BaseView'
import { deleteItem as DeleteItem } from 'services/DynamoDB'

const DeleteView = async ({ itemId, userId }) => {
    const item = await DeleteItem(userId, itemId)
    return { data: item }
}

export default BaseView(DeleteView)
