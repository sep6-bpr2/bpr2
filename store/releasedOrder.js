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
    setCurrentReleased(state, releasedOrder) {
        state.currentReleased = releasedOrder
    },
    setNotification(state, notification) {
        state.notification = notification
    },
}

export const actions = {
    loadReleasedOrderFull({ rootState }, itemId) {
        const user = rootState.login.user
        if (user) {
            const language = rootState.login.chosenLanguage.flag
            return new Promise((resolve, reject) => {
                fetch(`/api/orders/released/full/${user.username}/${itemId}/${language}`).then(res => res.json()).then(result => {
                    if (result) {
                        resolve(result)
                    } else {
                        resolve(null)
                    }
                })
            })
        }
    },
    saveContent({ commit, rootState }, changedOrder) {
        const user = rootState.login.user
        if (user) {
            let badInputs = false
            console.log(JSON.stringify(changedOrder))
            for(let i = 0; i < changedOrder.oneTimeControlPoints.length; i++){
                console.log("VAlue")
                console.log(changedOrder.oneTimeControlPoints[i].validated)
                if(changedOrder.oneTimeControlPoints[i].validated != null && changedOrder.oneTimeControlPoints[i].validated == 0){
                    badInputs = true
                    console.log("THERE WAS A MISTAKE")
                    break;
                }
            }
            
            if(!badInputs){
                multipleTimeCheck:
                for(let i = 0; i < changedOrder.multipleTimeControlPoints.length; i++){
                    for(let j = 0; j < changedOrder.multipleTimeControlPoints[i].length; j++){
                        if(changedOrder.multi[i][j].validated != null && changedOrder.multipleTimeControlPoints[i][j].validated == 0){
                            badInputs = true
                            break multipleTimeCheck
                        }
                    }
                }
            }

            console.log("ERRors: " + badInputs)
            
            if(!badInputs){
                fetch(`http://localhost:3000/api/orders/save/${user.username}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(changedOrder),
                    method: 'PUT'
                }).then(res => res.json()).then(result => {
                    if (result != null) {
                        commit('setNotification', result)
                    } else {
                        commit('setNotification', { response: 0, message: "No response from server" })
                    }
                })
            }else{
                commit('setNotification', { response: 0, message: "There are errors in the input, please fix them before saving" })
            }
        }
    },
    completeContent({ commit, rootState }, changedOrder) {
        const user = rootState.login.user;
        if (user) {
            let badInputs = false
            let completed = true

            for(let i = 0; i < changedOrder.oneTimeControlPoints.length; i++){
                if(changedOrder.oneTimeControlPoints[i].validated != null && changedOrder.oneTimeControlPoints[i].validated == 0){
                    badInputs = true
                    break;
                }else if(changedOrder.oneTimeControlPoints[i].answer == ''){
                    completed = false
                    break;
                }
            }
            
            if(!badInputs && completed){
                multipleTimeCheck:
                for(let i = 0; i < changedOrder.multipleTimeControlPoints.length; i++){
                    for(let j = 0; j < changedOrder.multipleTimeControlPoints[i].length; j++){
                        if(changedOrder.multipleTimeControlPoints[i][j].validated != null && changedOrder.multipleTimeControlPoints[i][j].validated == 0 ){
                            badInputs = true
                            break multipleTimeCheck
                        }else if(changedOrder.multipleTimeControlPoints[i][j].answer == ''){
                            completed = false
                            break;
                        }
                    }
                }
            }


            console.log("ERRors: " + badInputs)
            console.log("fileld in: " + completed)

            if(!badInputs && completed){
                fetch(`http://localhost:3000/api/orders/complete/${user.username}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(changedOrder),
                    method: 'PUT',
                }).then(res => res.json()).then(result => {
                    if (result != null) {
                        commit('setNotification', result)
                    } else {
                        commit('setNotification', { response: 0, message: "No response from server" })
                    }
                })
            }else{
                if(badInputs){
                    commit('setNotification', { response: 0, message: "There are errors in the input, please fix them before completing" })
                }else if(!completed){
                    commit('setNotification', { response: 0, message: "All inputs must be completed before completing" })
                }
            }
        }
    }
}