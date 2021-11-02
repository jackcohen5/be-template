import { v4 as uuid } from 'uuid'

import { Role } from 'functions/authorizer/constants'
import { AnonymousView, FunctionHandler } from 'functions/BaseView'
import { createFirebaseToken, createUser } from 'services/Firebase'

interface SignUpBody {
    email: string
    password: string
    role: Role
    firstName: string
    lastName: string
}

interface SignUpPayload {
    token: string
}

interface AuthErrorPayload {
    errorCode: string
}

interface SignUpErrorPayload {
    errorMessage: string
}

const SignUpView: FunctionHandler<
    SignUpPayload | SignUpErrorPayload | AuthErrorPayload,
    SignUpBody
> = async ({ body: { email, password, role, firstName, lastName } }) => {
    if (!email || !password || !role) {
        return {
            data: { errorMessage: 'Missing required field.' },
            statusCode: 400,
        }
    }

    if (!Object.values(Role).includes(role)) {
        return {
            data: { errorMessage: 'Invalid role.' },
            statusCode: 400,
        }
    }

    const userId = uuid()
    try {
        await createUser({ userId, email, password, firstName, lastName })
    } catch (e) {
        if (e.codePrefix === 'auth') {
            return {
                data: { errorCode: e.code },
                statusCode: 400,
            }
        }
        throw e
    }

    const token = await createFirebaseToken({ userId, role })
    return { data: { token } }
}

export default AnonymousView(SignUpView)
