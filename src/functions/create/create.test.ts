import { role1AuthenticatedEvent, role2AuthenticatedEvent } from 'mocks'

import CreateAPIView from '.'

describe('create', () => {
    it('returns 403 for invalid role', async () => {
        const response = await CreateAPIView(role2AuthenticatedEvent)
        expect(response.statusCode).toBe(403)
    })

    it('executes as expected', async () => {
        const response = await CreateAPIView(role1AuthenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
