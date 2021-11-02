import { v4 as uuid } from 'uuid'

import { makeEvent } from 'mocks'

import ExampleView from '.'

jest.mock('uuid')
jest.mock('./utils', () => ({
    getRandomInt: () => 11,
}))

const mockedUuid = uuid as jest.Mock

describe('Example View', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    })

    it('Returns UUID and random number as expected', async () => {
        mockedUuid.mockReturnValue('e39a5aff-47a7-449b-8c81-3ddc7bb9e87e')

        const unauthenticatedEvent = makeEvent()
        const response = await ExampleView(unauthenticatedEvent)
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual(
            JSON.stringify({
                someNumber: 11,
                someUuid: 'e39a5aff-47a7-449b-8c81-3ddc7bb9e87e',
            }),
        )
    })
})
