import { role1AuthenticatedEvent } from 'mocks'

import SignUpView from '.'

describe('signUp', () => {
    it('returns 403 for authenticated user', async () => {
        const response = await SignUpView(role1AuthenticatedEvent)
        expect(response.statusCode).toBe(403)
    })
})
