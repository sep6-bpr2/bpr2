import moment from "moment";

export const state = () => ({
    tableHeaders: [
        { name: "Item Number", id: 0 },
        { name: "Item Category Code", id: 1 },
        { name: "Quantity", id: 2 },
        { name: "Deadline", id: 3 },
    ],
    allowedHeaders: ["id", "categoryCode", "quantity", "deadline"],
    orders: [],
})

export const mutations = {
    setCompletedOrders(state, completedOrders) {
        state.orders = completedOrders
    },
}

export const actions = {
    loadCompletedOrders({ commit, rootState }, { }) {
        const user = rootState.login.user;
        const location = rootState.login.selectedLocation;
        if (user) {
            fetch(`api/orders/completedList/minimal/${user.username}/${location}`).then(res => res.json()).then(result => {
                for (let i = 0; i < result.length; i++) {
                    const date = new Date(result[i].deadline);
                    result[i].deadline = moment(date).format('YYYY-MM-DD');
                }

                commit('setCompletedOrders', result)
            })
        }
    },
}