import { v4 as uuid } from 'uuid'

import { FunctionHandler, UnauthenticatedView } from 'functions/BaseView'

import { getRandomInt } from './utils'

interface ExamplePayload {
    someNumber: number
    someUuid: uuid
}

const ExampleAPIView: FunctionHandler<ExamplePayload> = async () => ({
    data: {
        someNumber: getRandomInt(100),
        someUuid: uuid(),
    },
})

export default UnauthenticatedView(ExampleAPIView)
