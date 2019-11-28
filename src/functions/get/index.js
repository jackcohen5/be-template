import BaseView from 'functions/BaseView'
import { get as GetItem } from 'services/DynamoDB'

const GetView = async ({ itemId, userId }) => {
    const item = await GetItem(userId, itemId)
    return { data: item }
}

export default BaseView(GetView)
