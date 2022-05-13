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
    loadCompletedOrderFull({ rootState }, itemId) {
        const user = rootState.login.user
        if (user && user.role == "admin") {
            const language = rootState.login.chosenLanguage.flag
            return new Promise((resolve, reject) => {
                fetch(`/api/orders/completed/full/${user.username}/${itemId}/${language}`).then(res => res.json()).then(result => {
                    if (result) {
                        resolve(result)
                    } else {
                        resolve(null)
                    }
                })
            })
        }
    }
}