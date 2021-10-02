import {
    APIGatewayAuthorizerResult,
    APIGatewayTokenAuthorizerHandler,
} from 'aws-lambda'
import jwt from 'jsonwebtoken'
import * as jwksClient from 'jwks-rsa'

import {
    AUTH0_AUDIENCE,
    AUTH0_DOMAIN,
    ROLES_CLAIM_KEY,
} from './authorizer.constants'

const generatePolicy = ({
    effect,
    resource,
    roles = [],
    userId,
}): APIGatewayAuthorizerResult => {
    return {
        context: {
            userId,
            roles: JSON.stringify(roles),
        },
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
        principalId: userId,
    }
}

const getPublicKey = async (kid) => {
    const client = jwksClient({
        jwksUri: `${AUTH0_DOMAIN}.well-known/jwks.json`,
    })
    const signingKey = await client.getSigningKey(kid)
    return signingKey.getPublicKey()
}

const Authorize: APIGatewayTokenAuthorizerHandler = async (event) => {
    try {
        const splitAuthHeader = event.authorizationToken.split(' ')
        const token =
            splitAuthHeader.length > 1
                ? splitAuthHeader[1]
                : event.authorizationToken
        const decoded = jwt.decode(token, { complete: true })
        try {
            if (decoded.payload.iss !== AUTH0_DOMAIN) {
                throw new Error('Auth Error: JWT issuer does not match domain')
            }

            const key = await getPublicKey(decoded.header.kid)
            jwt.verify(token, key, {
                algorithm: ['RS256'],
                audience: AUTH0_AUDIENCE,
            })
            return generatePolicy({
                effect: 'Allow',
                resource: '*',
                roles: decoded.payload[ROLES_CLAIM_KEY],
                userId: decoded.payload.sub,
            })
        } catch (err) {
            console.error(err)
            return generatePolicy({
                effect: 'Deny',
                resource: event.methodArn,
                userId: decoded.payload.sub,
            })
        }
    } catch (err) {
        console.error(err)
        return generatePolicy({
            effect: 'Deny',
            resource: event.methodArn,
            userId: 'Unauthorized',
        })
    }
}

export default Authorize
