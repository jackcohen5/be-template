import { role1AuthenticatedEvent, role2AuthenticatedEvent } from 'mocks'

import UploadView from '.'

describe('upload', () => {
    it('returns 403 for invalid role', async () => {
        const response = await UploadView(role2AuthenticatedEvent)
        expect(response.statusCode).toBe(403)
    })

    it('executes as expected', async () => {
        const response = await UploadView(role1AuthenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
