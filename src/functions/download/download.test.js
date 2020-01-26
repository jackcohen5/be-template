import { authenticatedEvent } from '../../../mocks'

import download from '.'

describe('download', () => {
    it('executes as expected', async () => {
        const response = await download(authenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
