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
        }
    },
    completeContent({ commit, rootState }, changedOrder) {
        const user = rootState.login.user;
        if (user) {
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
        }
    }
}