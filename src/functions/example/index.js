import { v4 as uuid } from 'uuid'

import { UnauthenticatedView } from 'functions/BaseView'

import { getRandomInt } from './utils'

const ExampleAPIView = () => ({
    data: {
        someNumber: getRandomInt(100),
        someUuid: uuid(),
    },
})

export default UnauthenticatedView(ExampleAPIView)
