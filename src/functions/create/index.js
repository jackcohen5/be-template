import uuid from 'uuid'

import BaseView from 'functions/BaseView'
import { put as PutItem } from 'services/DynamoDB'

const CreateView = async ({ userId, body: data }) => {
    const TEMPLATE_NAME_SK = uuid.v4()
    const pk = `USER#${userId}`
    const sk = `ORDER#${TEMPLATE_NAME_SK}`
    const item = await PutItem({ pk, sk, data })
    return { data: item, statusCode: 201 }
}

export default BaseView(CreateView)
