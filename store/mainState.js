export const state = () => ({
    modalState: false,
    modalMessage: '',
    modalStatus: '',
    currentLink: '',
    redirectLogin: false,
})

export const mutations = {
    setModalState(state, value) {
        state.modalState = value
    },
    setModalMessage(state, value) {
        state.modalMessage = value
    },
    setModalStatus(state, value) {
        state.modalStatus = value
    },
    setRedirectLogin(state, value) {
        state.redirectLogin = value
    },
    setCurrentLink(state, value) {
        state.currentLink = value
    },
}

export const actions = {
    checkUser({ commit, rootState, state, dispatch  }) {
        if (rootState.nav && state.currentLink != '') {
            const allLinks = rootState.nav.allLinks;

            let currentLink = state.currentLink

            let user = rootState.login.user;

            if (user) {
                user = user.role;
            } else {
                user = "unauthenticated";
            }

            let userAllowed = false;
            let restrictedToRoles = [];
            for (let i = 0; i < allLinks.length; i++) {
                if (allLinks[i].link == currentLink) {
                    restrictedToRoles = allLinks[i].roles;
                    for (let j = 0; j < allLinks[i].roles.length; j++) {

                        if (user == allLinks[i].roles[j]) {


                            userAllowed = true;

                            break;
                        }
                    }
                    break;
                }
            }
            if (userAllowed) {
                commit('setModalState', false)
                commit('setModalState', false)
                commit('setModalMessage', "")
                commit('setModalStatus', "success")
                commit('setRedirectLogin', false)
                console.log("Warning should not be shown")
            } else {
                if (user == "unauthenticated") {
                    commit('setRedirectLogin', true)
                    commit('setModalState', false)
                    commit('setModalMessage', "")
                    commit('setModalStatus', "success")
                    console.log("Warning should not be shown")
                } else {
                    commit('setModalState', true)
                    commit('setModalMessage', "This page is restricted to roles: " + restrictedToRoles.join(", "))
                    commit('setModalStatus', "danger")
                    commit('setRedirectLogin', false)
                    dispatch('nav/resetLinks', {}, { root: true })
                    console.log("Warning should be shown")
                }
            }
        }
    },
    saveRoute({ commit }, currentLink) {
        commit('setCurrentLink', currentLink)
    },
    disableRedirect({ commit }) {
        commit('setRedirectLogin', false)
    },
    resetAuthorization({ commit }){
        commit('setModalState', true)
        commit('setModalMessage', "")
        commit('setModalStatus', "success")
    }
}