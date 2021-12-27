import { v4 as uuid } from 'uuid'

import { FunctionHandler, Role1View } from 'functions/BaseView'
import { generateUploadUrl } from 'services/S3'

interface UploadPayload {
    url: string
}

const UploadView: FunctionHandler<UploadPayload> = async ({
    auth: { userId },
}) => {
    const fileId = uuid()
    const key = `${userId}/${fileId}`
    const url = await generateUploadUrl(key)
    return { data: { url, fileId } }
}

export default Role1View(UploadView)
