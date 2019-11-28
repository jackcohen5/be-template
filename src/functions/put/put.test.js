import { authenticatedEvent } from '../../../mocks'

import put from '.'

describe('put', () => {
    it('executes as expected', async () => {
        const response = await put(authenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
