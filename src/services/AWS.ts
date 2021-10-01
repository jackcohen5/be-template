import * as https from 'https'

import * as AWSBase from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const AWS = AWSXRay.captureAWS(AWSBase)
AWSXRay.captureHTTPsGlobal(https)

AWS.config.update({ region: process.env.REGION })

export const DynamoDB = new AWS.DynamoDB.DocumentClient()
export const S3 = new AWS.S3()
export const SQS = new AWS.SQS()
