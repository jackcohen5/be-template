import * as admin from 'firebase-admin'
import type { ServiceAccount } from 'firebase-admin'
import type { UserRecord } from 'firebase-admin/auth'

import { Role } from 'functions/authorizer/constants'
import { SSM } from 'services/AWS'

let FirebaseAuthInstance

const initializeFirebaseAuthIfNeeded = async () => {
    if (FirebaseAuthInstance) return FirebaseAuthInstance

    const serviceAccountKey = await SSM.getParameter({
        Name: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH,
        WithDecryption: true,
    })
        .promise()
        .then((r) => JSON.parse(r.Parameter.Value))
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
    })

    FirebaseAuthInstance = admin.auth()
    return FirebaseAuthInstance
}

export const createUser = async ({
    userId,
    email,
    password,
    firstName,
    lastName,
}: {
    userId: string
    email: string
    password: string
    firstName: string
    lastName: string
}): Promise<UserRecord> => {
    const FirebaseAuth = await initializeFirebaseAuthIfNeeded()
    return FirebaseAuth.createUser({
        uid: userId,
        email,
        password,
        emailVerified: false,
        displayName: `${firstName} ${lastName}`,
        disabled: false,
    })
}

export const createFirebaseToken = async ({
    userId,
    role,
}: {
    userId: string
    role: Role
}): Promise<string> => {
    const FirebaseAuth = await initializeFirebaseAuthIfNeeded()
    return await FirebaseAuth.setCustomUserClaims(userId, { role }).then(() =>
        FirebaseAuth.createCustomToken(userId, { role }),
    )
}
