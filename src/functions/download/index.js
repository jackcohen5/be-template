import BaseView from 'functions/BaseView'
import { generateDownloadUrl } from 'services/S3'

const DownloadView = async ({ userId, pathParameters: { fileId } }) => {
    const key = `${userId}/${fileId}`
    const url = await generateDownloadUrl(key)
    return { data: url }
}

export default BaseView(DownloadView)
