import BaseView from 'functions/BaseView'
import { put as PutItem } from 'services/DynamoDB'

const PutView = async ({ TEMPLATE_NAME_SK, userId, body: data }) => {
    const pk = `USER#${userId}`
    const sk = `ORDER#${TEMPLATE_NAME_SK}`
    const item = await PutItem({ pk, sk, data })
    return { data: item }
}

export default BaseView(PutView)
