import { v4 as uuid } from 'uuid'

import { UnauthenticatedView } from 'functions/BaseView'

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

const ExampleAPIView = () => ({
    data: {
        someNumber: getRandomInt(100),
        someUuid: uuid(),
    },
})

export default UnauthenticatedView(ExampleAPIView)
