import * as admin from 'firebase-admin'
import type { ServiceAccount, auth, firestore } from 'firebase-admin'
import type { UserRecord } from 'firebase-admin/auth'

import { Role } from 'functions/authorizer/constants'
import { SSM } from 'services/AWS'

type FirebaseSingleton = {
    Auth: auth.Auth
    Firestore: firestore.Firestore
}

let FirebaseInstance: FirebaseSingleton

const initializeFirebaseIfNeeded = async () => {
    if (FirebaseInstance) return FirebaseInstance

    const serviceAccountKey = await SSM.getParameter({
        Name: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH,
        WithDecryption: true,
    })
        .promise()
        .then((r) => JSON.parse(r.Parameter.Value))

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey as ServiceAccount),
    })

    FirebaseInstance = { Auth: admin.auth(), Firestore: admin.firestore() }

    return FirebaseInstance
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
    const { Auth, Firestore } = await initializeFirebaseIfNeeded()
    return Firestore.doc(`users/${userId}`)
        .create({
            email,
            firstName,
            lastName,
        })
        .then(() =>
            Auth.createUser({
                uid: userId,
                email,
                password,
                emailVerified: false,
                displayName: `${firstName} ${lastName}`,
                disabled: false,
            }),
        )
}

export const createFirebaseToken = async ({
    userId,
    role,
}: {
    userId: string
    role: Role
}): Promise<string> => {
    const { Auth } = await initializeFirebaseIfNeeded()
    return Auth.setCustomUserClaims(userId, { role }).then(() =>
        Auth.createCustomToken(userId, { role }),
    )
}
