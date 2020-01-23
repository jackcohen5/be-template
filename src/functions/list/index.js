import BaseView from 'functions/BaseView'
import { list as ListItems } from 'services/DynamoDB'

const ListView = async ({ userId }) => {
    const pk = `USER#${userId}`
    const items = await ListItems(pk)
    return { data: items }
}

export default BaseView(ListView)
