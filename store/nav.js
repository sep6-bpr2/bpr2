const links = [
    { name: "Control Points", link: "/controlPoints", roles: ["admin"] },
    { name: "Completed Order", link: "/completedOrders", roles: ["admin"] },
]

const userTemp = { username: "rokas", role: "admin" }

export const state = () => ({
    availableLinks: []
})


export const mutations = {
    setLinks(state, links) {
        state.availableLinks = links
    }
}

export const actions = {
    loadLinks({ commit, rootState }) {
        let availableLinks = []
        let user = userTemp
        // let user = rootState.instance.session;
        if (user != null) {
            for (let i = 0; i < links.length; i++) {
                if (links[i].roles.includes(user.role)) {
                    let link = links[i]
                    link.id = i // Get key
                    availableLinks.push(links[i])
                }
            }
            commit('setLinks', availableLinks)
        }
    }
}
