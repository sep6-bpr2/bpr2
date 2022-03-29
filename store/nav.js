const links = [
    { name: "Control Points", link: "/controlPoints", roles: ["admin"] },
    { name: "Completed Orders", link: "/completedOrders", roles: ["admin"] },
    { name: "Item Categories", link: "/itemCategories", roles: ["admin"] },
    { name: "Users", link: "/users", roles: ["admin"] },
    { name: "Released Orders", link: "/releasedOrders", roles: ["qa employee"] },
]

// const userTemp = { username: "rokas", role: "admin" }

export const state = () => ({
    availableLinks: []
})


export const mutations = {
    setLinks(state, links) {
        state.availableLinks = links
    },
    resetLinks(state, links) {
        state.availableLinks = []
    }
}

export const actions = {
    loadLinks({ commit, rootState }) {
        let availableLinks = []

        let user = rootState.login.user;

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
    },
    logout({ commit }) {
        commit('login/logoutUser', null, { root: true })
        commit('resetLinks', null)
    }
}