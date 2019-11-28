import { authenticatedEvent } from '../../../mocks'

import list from '.'

describe('list', () => {
    it('executes as expected', async () => {
        const response = await list(authenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
