import { authenticatedEvent } from '../../../mocks'

import create from '.'

describe('create', () => {
    it('executes as expected', async () => {
        const response = await create(authenticatedEvent)
        expect(response).toMatchSnapshot()
    })
})
