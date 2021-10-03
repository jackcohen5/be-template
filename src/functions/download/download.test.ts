import { role1AuthenticatedEvent, role2AuthenticatedEvent } from 'mocks'

import DownloadAPIView from '.'

describe('download', () => {
    it('returns 403 for invalid role', async () => {
        const response = await DownloadAPIView(role1AuthenticatedEvent)
        expect(response.statusCode).toBe(403)
    })

    it('executes as expected if role 2', async () => {
        const response = await DownloadAPIView(role2AuthenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
