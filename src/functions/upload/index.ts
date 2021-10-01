import { v4 as uuidv4 } from 'uuid'

import { FunctionHandler, Role1View } from 'functions/BaseView'
import { generateUploadUrl } from 'services/S3'

interface UploadPayload {
    url: string
}

const UploadView: FunctionHandler<UploadPayload> = async ({
    auth: { userId },
}) => {
    const itemId = uuidv4()
    const key = `${userId}/${itemId}`
    const url = await generateUploadUrl(key)
    return { data: { url } }
}

export default Role1View(UploadView)
