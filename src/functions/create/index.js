import uuid from 'uuid'

import BaseView from 'functions/BaseView'
import { put as PutItem } from 'services/DynamoDB'

const CreateView = async ({ userId }) => {
    const itemId = uuid.v4()
    const item = await PutItem(userId, itemId)
    return { data: item, statusCode: 201 }
}

export default BaseView(CreateView)
