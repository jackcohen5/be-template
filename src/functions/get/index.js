import BaseView from 'functions/BaseView'
import { get as GetItem } from 'services/DynamoDB'

const GetView = async ({ TEMPLATE_NAME_SK, userId }) => {
    const pk = `USER#${userId}`
    const sk = `ORDER#${TEMPLATE_NAME_SK}`
    const item = await GetItem({ pk, sk })
    return { data: item }
}

export default BaseView(GetView)
