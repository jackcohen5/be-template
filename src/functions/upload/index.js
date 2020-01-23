import uuid from 'uuid'

import BaseView from 'functions/BaseView'
import { generateUploadUrl } from 'services/S3'

const UploadView = async ({ userId }) => {
    const itemId = uuid.v4()
    const key = `${userId}/${itemId}`
    const url = await generateUploadUrl(key)
    return { data: url }
}

export default BaseView(UploadView)
