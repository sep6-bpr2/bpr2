import moment from "moment"

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
    multipleTimeControlPoints: [
        {
            letter: "A",
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
    mTableHeaders: [
        { name: "Letter", id: 0 },
        { name: "Description", id: 1 },
        { name: "Picture", id: 2 },
        { name: "Units", id: 3 },
        { name: "Tolerance", id: 4 },
    ],
    mAllowedHeaders: ["letter", "description", "image", "units", "toleranceText"],
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

                    // result.controlPoints[i].image = "http://localhost:3000/favicon.ico"
                    result.controlPoints[i].image = "https://syria.liveuamap.com/pics/2022/04/23/22430986_0.jpg"

                    // One time measurement
                    if (result.controlPoints[i].controlPointType == 1) {
                        result.oneTimeControlPoints.push(result.controlPoints[i])
                        result.multipleTimeControlPoints.push(result.controlPoints[i])
                    } else {
                        result.multipleTimeControlPoints.push(result.controlPoints[i])
                    }

                    result.controlPoints[i].toleranceText = ""
                    if (result.controlPoints[i].upperTolerance != null && result.controlPoints[i].upperTolerance == result.controlPoints[i].lowerTolerance) {
                        result.controlPoints[i].toleranceText = "+/-" + result.controlPoints[i].upperTolerance + result.controlPoints[i].units
                    } else if (result.controlPoints[i].upperTolerance != null && result.controlPoints[i].upperTolerance != result.controlPoints[i].lowerTolerance) {
                        result.controlPoints[i].toleranceText = "+" + result.controlPoints[i].upperTolerance + "/-" + result.controlPoints[i].lowerTolerance + result.controlPoints[i].units
                    }

                    if (result.controlPoints[i].type == 0) {
                        let allUnits = ""

                        for (let j = 0; j < result.controlPoints[i].options.length; j++) {
                            if (j == 0) {
                                allUnits = result.controlPoints[i].options[j].value
                            } else {
                                allUnits = allUnits + "/" + result.controlPoints[i].options[j].value
                            }
                        }

                        result.controlPoints[i].units = allUnits
                    } else if (result.controlPoints[i].type == 1) {
                        result.controlPoints[i].units = "Text"
                    }

                    result.controlPoints[i].answer = ""


                }

                result.multipleTimeControlPoints = JSON.parse(JSON.stringify(result.multipleTimeControlPoints))

                let currentChar = 'a'

                let asnwersMulti = []

                let frequencyCategoryKey = ""

                if (result.quantity <= 25) {
                    frequencyCategoryKey = "to25"
                } else if (result.quantity <= 50) {
                    frequencyCategoryKey = "to50"
                } else if (result.quantity <= 100) {
                    frequencyCategoryKey = "to100"
                } else if (result.quantity <= 200) {
                    frequencyCategoryKey = "to200"
                } else if (result.quantity <= 300) {
                    frequencyCategoryKey = "to300"
                } else if (result.quantity <= 500) {
                    frequencyCategoryKey = "to500"
                } else if (result.quantity <= 700) {
                    frequencyCategoryKey = "to700"
                } else if (result.quantity <= 1000) {
                    frequencyCategoryKey = "to1000"
                } else if (result.quantity <= 1500) {
                    frequencyCategoryKey = "to1500"
                } else if (result.quantity <= 2000) {
                    frequencyCategoryKey = "to2000"
                } else if (result.quantity <= 4000) {
                    frequencyCategoryKey = "to4000"
                } else if (result.quantity <= 5000) {
                    frequencyCategoryKey = "to5000"
                }

                for (let i = 0; i < result.multipleTimeControlPoints.length; i++) {
                    result.multipleTimeControlPoints[i].letter = currentChar.toUpperCase()


                    let arrayOfAnswers = []

                    for (let j = 0; j < result.multipleTimeControlPoints[i].frequency[0][frequencyCategoryKey]; j++) {
                        arrayOfAnswers.push(
                            {
                                id: result.multipleTimeControlPoints[i].id,
                                answer: "",
                                type: result.multipleTimeControlPoints[i].type
                            })
                    }
                    asnwersMulti.push(arrayOfAnswers)
                    currentChar = String.fromCharCode(currentChar.charCodeAt(0) + 1);
                }

                result.multipleTimeAnswers = asnwersMulti

                const date = new Date(result.deadline);
                result.deadline = moment(date).format('YYYY-MM-DD');
                // Add expected value to the control points

                // Add text for units and tolerance 

                commit('setCurrentReleased', result)
            })
        }
    }
}