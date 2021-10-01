import { S3 } from './AWS'

const generatePresignedUrl = ({
    key,
    action,
}: {
    key: string
    action: string
}): string =>
    S3.getSignedUrl(action, {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Expires: 60,
    })

export const generateDownloadUrl = (key: string): string =>
    generatePresignedUrl({ key, action: 'getObject' })

export const generateUploadUrl = (key: string): string =>
    generatePresignedUrl({ key, action: 'putObject' })

export default {
    generateDownloadUrl,
    generateUploadUrl,
}
