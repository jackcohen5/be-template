import { authenticatedEvent } from '../../../mocks'

import upload from '.'

describe('upload', () => {
    it('executes as expected', async () => {
        const response = await upload(authenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
