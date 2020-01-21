import { promisify } from 'util'

import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

const getSigningKey = async kid => {
    const client = jwksClient({
        jwksUri: 'https://TEMPLATE_NAME_AUTH0_DOMAIN/.well-known/jwks.json',
    })
    return promisify(client.getSigningKey)(kid)
}

const generatePolicy = (principalId, effect, resource) => {
    const authResponse = {
        principalId: principalId,
        context: {
            userId: principalId,
        },
    }

    if (effect && resource) {
        authResponse.policyDocument = {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                },
            ],
        }
    }

    return authResponse
}

const Authorize = async event => {
    try {
        const splitAuthHeader = event.authorizationToken.split(' ')
        const token =
            splitAuthHeader.length > 1
                ? splitAuthHeader[1]
                : event.authorizationToken
        const decoded = jwt.decode(token, { complete: true })
        try {
            const signingKey = await getSigningKey(decoded.header.kid)
            const key = signingKey.publicKey || signingKey.rsaPublicKey
            jwt.verify(token, key, {
                algorithm: ['RS256'],
                audience: 'TEMPLATE_NAME_AUTH0_AUDIENCE',
            })
            return generatePolicy(decoded.payload.sub, 'Allow', '*')
        } catch (err) {
            console.error(err)
            return generatePolicy(decoded.payload.sub, 'Deny', event.methodArn)
        }
    } catch (err) {
        console.error(err)
        return generatePolicy('Unauthorized', 'Deny', event.methodArn)
    }
}

export default Authorize
