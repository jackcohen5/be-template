import BaseView from 'functions/BaseView'
import { list as ListItems } from 'services/DynamoDB'

const ListView = async ({ userId }) => {
    const items = await ListItems(userId)
    return { data: items }
}

export default BaseView(ListView)
