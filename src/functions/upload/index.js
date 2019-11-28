import uuid from 'uuid'

import BaseView from 'functions/BaseView'
import { generateUploadUrl } from 'services/S3'

const UploadView = async ({ userId }) => {
    const itemId = uuid.v4()
    const url = await generateUploadUrl(userId, itemId)
    return { data: url }
}

export default BaseView(UploadView)
