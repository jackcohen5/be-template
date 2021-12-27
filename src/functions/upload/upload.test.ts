import { v4 as uuid } from 'uuid'

import { role1AuthenticatedEvent, role2AuthenticatedEvent } from 'mocks'

import UploadView from '.'

jest.mock('uuid')

const mockedUuid = uuid as jest.Mock

describe('upload', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })

    it('returns 403 for invalid role', async () => {
        const response = await UploadView(role2AuthenticatedEvent)
        expect(response.statusCode).toBe(403)
    })

    it('executes as expected', async () => {
        mockedUuid.mockReturnValue('e39a5aff-47a7-449b-8c81-3ddc7bb9e87e')

        const response = await UploadView(role1AuthenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
