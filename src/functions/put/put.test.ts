import { role1AuthenticatedEvent, role2AuthenticatedEvent } from 'mocks'

import PutAPIView from '.'

describe('put', () => {
    it('returns 403 for invalid role', async () => {
        const response = await PutAPIView(role2AuthenticatedEvent)
        expect(response.statusCode).toBe(403)
    })

    it('executes as expected', async () => {
        const response = await PutAPIView(role1AuthenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
