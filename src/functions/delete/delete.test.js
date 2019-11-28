import { authenticatedEvent } from '../../../mocks'

import deleteItem from '.'

describe('delete', () => {
    it('executes as expected', async () => {
        const response = await deleteItem(authenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
