import { role1AuthenticatedEvent, role2AuthenticatedEvent } from 'mocks'

import ListAPIView from '.'

describe('list', () => {
    it('returns 403 for invalid role', async () => {
        const response = await ListAPIView(role2AuthenticatedEvent)
        expect(response.statusCode).toBe(403)
    })

    it('executes as expected', async () => {
        const response = await ListAPIView(role1AuthenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
