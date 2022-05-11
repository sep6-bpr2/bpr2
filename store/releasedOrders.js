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
    setReleasedOrders(state, releasedOrders) {
        state.orders = releasedOrders
    },
}

export const actions = {
    loadReleasedOrders({ commit, rootState }, { }) {
        const user = rootState.login.user;
        const location = rootState.login.chosenLocation;
        if (user) {
            fetch(`api/orders/releasedList/minimal/${user.username}/${location}`).then(res => res.json()).then(result => {
                for (let i = 0; i < result.length; i++) {
                    const date = new Date(result[i].deadline);
                    result[i].deadline = moment(date).format('YYYY-MM-DD');
                }

                commit('setReleasedOrders', result)
            })
        }
    },
}