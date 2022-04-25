export const state = () => ({
    tableHeaders: [
        { name: "Item Number", id: 0 },
        { name: "Item Category Code", id: 1 },
        { name: "Quantity", id: 2 },
        { name: "Deadline", id: 3 },
    ],
    allowedHeaders: ["No_", "Item Category Code", "Quantity", "Due Date"],
    orders: [],
})

export const mutations = {
    setReleasedOrders(state, releasedOrders) {
        state.orders = releasedOrders
    },
}

export const actions = {
    loadReleasedOrders({ commit, rootState }, { }) {
        const user = rootState.login.user;
        const location = rootState.login.selectedLocation;
        if (user) {
            fetch(`api/orders/releasedList/minimal/${user.username}/${location}`).then(res => res.json()).then(result => {
                commit('setReleasedOrders', result)
                console.log("Released orders")

                console.log(result)
            })
        }
    },
}