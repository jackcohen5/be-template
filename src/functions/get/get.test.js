import { authenticatedEvent } from '../../../mocks'

import get from '.'

describe('get', () => {
    it('executes as expected', async () => {
        const response = await get(authenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
