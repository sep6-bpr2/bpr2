export const state = () => ({
    tableHeaders: [
        { name: "Production order", id: 0 },
        { name: "Item Number", id: 1 },
        { name: "Item Category Code", id: 2 },
        { name: "Quantity", id: 3 },
        { name: "Deadline", id: 4 },
        { name: "Completion date", id: 5 },
    ],
    allowedHeaders: ["productionOrder", "id", "categoryCode", "quantity", "deadline", "completionDate"],
    orders: [],
})

export const mutations = {
    appendCompletedOrders(state, completedOrders) {
        for (let i = 0; i < completedOrders.length; i ++){
            state.orders.push(completedOrders[i])
        }
    },
    setCompletedOrders(state, completedOrders) {
        state.orders = completedOrders
    },
}

export const actions = {
    loadCompletedOrders({ commit, rootState },options) {
        const user = rootState.login.user;
        const location = rootState.login.chosenLocation;
        if (user && user.role == "admin") {
            fetch(`api/orders/completedList/minimal/${user.username}/${location}/${options.offset}/${options.limit}`).then(res => res.json()).then(result => {
                if(options.offset == 0){
                    commit('setCompletedOrders', result)
                }else{
                    commit('appendCompletedOrders', result)
                }
            })
        }
    },
}