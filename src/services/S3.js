import { S3 } from './AWS'

export const generateUploadUrl = key => {
    return S3.getSignedUrl('putObject', {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Expires: 60,
    })
}

export default {
    generateUploadUrl,
}
