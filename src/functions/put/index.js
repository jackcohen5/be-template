import BaseView from 'functions/BaseView'
import { put as PutItem } from 'services/DynamoDB'

const PutView = async ({ itemId, userId }) => {
    const item = await PutItem(userId, itemId)
    return { data: item }
}

export default BaseView(PutView)
