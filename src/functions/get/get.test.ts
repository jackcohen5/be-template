import { role1AuthenticatedEvent, role2AuthenticatedEvent } from 'mocks'

import GetAPIView from '.'

describe('get', () => {
    it('returns 403 for invalid role', async () => {
        const response = await GetAPIView(role2AuthenticatedEvent)
        expect(response.statusCode).toBe(200)
    })

    it('executes as expected', async () => {
        const response = await GetAPIView(role1AuthenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
