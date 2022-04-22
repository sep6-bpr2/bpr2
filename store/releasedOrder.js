const defaultCurrentReleased = {
    "id": "1",
    "description": "1",
    "categoryCode": "1",
    "deadline": "1",
    "location": "1",
    "status": "1",
    oneTimeControlPoints: [
        {
            id: 24,
            frequencyId: null,
            description: "This is a control point",
            image: "http://localhost:3000/favicon.ico",
            units: "mm",
            upperTolerance: 2,
            lowerTolerance: 1,
            type: 3,
            answer: "dfsdfsdf"
        }
    ],
}

export const state = () => ({
    oneTimeTableHeaders: [
        { name: "Description", id: 0 },
        { name: "Picture", id: 1 },
        { name: "Units", id: 2 },
        { name: "Tolerance", id: 3 },
        { name: "Answer", id: 4 },
    ],
    oneTimeAllowedHeaders: ["description", "image", "units", "toleranceText", "answer"],
    currentReleased: defaultCurrentReleased
})

export const mutations = {
    setCurrentReleased(state, releasedOrder) {
        state.currentReleased = releasedOrder
    },
}

export const actions = {
    loadReleasedOrderFull({ commit, rootState }, itemId) {
        const user = rootState.login.user;
        if (user) {
            const language = rootState.login.chosenLanguage.flag;

            fetch(`/api/orders/released/full/${user.username}/${itemId}/${language}`).then(res => res.json()).then(result => {



                result.oneTimeControlPoints = []
                result.multipleTimeControlPoints = []

                // I have the attributes of the qa report
                // I have the attributes of each control point
                // I loop over each control point and see if any of it's attributes matches the attributes of the qa report
                for (let i = 0; i < result.controlPoints.length; i++) {

                    if (result.controlPoints[i].attributes.length != 0) {

                        loop:
                        for (let j = 0; j < result.controlPoints[i].attributes.length; j++) {
                            for (let k = 0; k < result.attributes.length; k++) {
                                if (result.controlPoints[i].attributes[j].id == result.attributes[k].id) {
                                    result.controlPoints[i].expectedValue = result.attributes[k].value
                                    result.controlPoints[i].units = result.attributes[k].units
                                    break loop
                                }
                            }
                        }

                    }

                    result.controlPoints[i].image = "http://localhost:3000/favicon.ico"
                    // One time measurement
                    if (result.controlPoints[i].controlPointType == 1) {
                        result.oneTimeControlPoints.push(result.controlPoints[i])
                    } else {
                        result.multipleTimeControlPoints.push(result.controlPoints[i])
                    }

                    result.controlPoints[i].toleranceText = "temp"
                    if (result.controlPoints[i].upperTolerance != null && result.controlPoints[i].upperTolerance == result.controlPoints[i].lowerTolerance) {
                        result.controlPoints[i].toleranceText = "+/-" + result.controlPoints[i].upperTolerance
                    } else if (result.controlPoints[i].upperTolerance != null && result.controlPoints[i].upperTolerance != result.controlPoints[i].lowerTolerance) {
                        result.controlPoints[i].toleranceText = "+" + result.controlPoints[i].upperTolerance + "/-" + result.controlPoints[i].upperTolerance
                    }
                    result.controlPoints[i].answer = "temp"
                    result.controlPoints[i].description = "temp"

                }
                // Add expected value to the control points

                // Add text for units and tolerance 

                commit('setCurrentReleased', result)
            })
        }
    }
}