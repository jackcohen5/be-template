import { role1AuthenticatedEvent, role2AuthenticatedEvent } from 'mocks'

import DeleteAPIView from '.'

describe('delete', () => {
    it('returns 403 for invalid role', async () => {
        const response = await DeleteAPIView(role2AuthenticatedEvent)
        expect(response.statusCode).toBe(403)
    })

    it('executes as expected', async () => {
        const response = await DeleteAPIView(role1AuthenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
