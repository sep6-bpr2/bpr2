const inputValidation = require("../shared/validateInput")

export const state = () => ({
    oneTimeTableHeaders: [
        { name: "Description", id: 0 },
        { name: "Picture", id: 1 },
        { name: "Units", id: 2 },
        { name: "Tolerance", id: 3 },
        { name: "Expected value", id: 4 },
        { name: "Answer", id: 5 },
    ],
    oneTimeAllowedHeaders: ["description", "image", "units", "toleranceText", "expectedValue", "answer"],
    mTableHeaders: [
        { name: "Letter", id: 0 },
        { name: "Description", id: 1 },
        { name: "Picture", id: 2 },
        { name: "Units", id: 3 },
        { name: "Tolerance", id: 4 },
        { name: "Expected value", id: 5 },
    ],
    mAllowedHeaders: ["letter", "description", "image", "units", "toleranceText", "expectedValue"],
    notification: null
})

export const mutations = {
    setCurrentCompleted(state, completedOrder) {
        state.currentCompleted = completedOrder
    },
    setNotification(state, notification) {
        state.notification = notification
    },
}

export const actions = {
    loadCompletedOrderFull({ rootState }, parameters) {
        const user = rootState.login.user
        if (user && user.role == "admin") {
            let language = rootState.login.chosenLanguage.name;
            if(language != "English" && language != "Danish" && language != "Lithuanian"){
                if(language == "Dansk"){
                    language = "Danish"
                }else if(language == "Lietuviu"){
                    language = "Lithuanian"
                }
            }
            
            return new Promise((resolve, reject) => {
                fetch(`/api/orders/completed/full/${user.username}/${parameters.itemId}/${parameters.productionOrder}/${language}`).then(res => res.json()).then(result => {
                    if (result && !result.message) {
                        for (let i = 0; i < result.oneTimeControlPoints.length; i++) {
                            result.oneTimeControlPoints[i].validated = inputValidation.validateInput(
                                result.oneTimeControlPoints[i].answer,
                                result.oneTimeControlPoints[i].inputType,
                                result.oneTimeControlPoints[i].options,
                                result.oneTimeControlPoints[i].lowerTolerance,
                                result.oneTimeControlPoints[i].upperTolerance,
                                result.oneTimeControlPoints[i].expectedValue,
                            )
                        }

                        for (let i = 0; i < result.multipleTimeAnswers.length; i++) {
                            for (let j = 0; j < result.multipleTimeAnswers[i].length; j++) {
                                result.multipleTimeAnswers[i][j].validated = inputValidation.validateInput(
                                    result.multipleTimeAnswers[i][j].answer,
                                    result.multipleTimeAnswers[i][j].inputType,
                                    result.multipleTimeControlPoints[i].options,
                                    result.multipleTimeAnswers[i][j].lowerTolerance,
                                    result.multipleTimeAnswers[i][j].upperTolerance,
                                    result.multipleTimeAnswers[i][j].expectedValue
                                )
                            }
                        }

                        resolve(result)
                    }  else if(result.message) {
                        resolve(result)
                    }else{

                        resolve(null)
                    }
                })
            })
        }
    }
}