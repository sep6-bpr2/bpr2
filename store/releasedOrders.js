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
    appendReleasedOrders(state, releasedOrders) {
        for (let i = 0; i < releasedOrders.length; i ++){
            state.orders.push(releasedOrders[i])
        }
    },
    setReleasedOrders(state, releasedOrders) {
        state.orders = releasedOrders
    },
}

export const actions = {
    loadReleasedOrders({ commit, rootState }, options) {
        const user = rootState.login.user;
        const location = rootState.login.chosenLocation;
        if (user && user.role == "qa employee") {
            fetch(`api/orders/releasedList/minimal/${user.username}/${location}/${options.offset}/${options.limit}`).then(res => res.json()).then(result => {
                if(options.offset == 0){
                    commit('setReleasedOrders', result)
                }else{
                    commit('appendReleasedOrders', result)
                }
            })
        }
    },

}