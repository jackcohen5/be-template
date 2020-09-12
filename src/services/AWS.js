import AWSBase from 'aws-sdk'
import AWSXRay from 'aws-xray-sdk-core'

const AWS = AWSXRay.captureAWS(AWSBase)

AWS.config.update({ region: process.env.REGION })

export const DynamoDB = new AWS.DynamoDB.DocumentClient()
export const S3 = new AWS.S3()
export const SQS = new AWS.SQS()
