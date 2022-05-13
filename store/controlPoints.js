const temp = [
    {
        id: 2, description: "sasdasdas daga sdgasfg", frequency: 5, image: "fasdasffqqfasd", tolerance: "dasdas", type: "gasdas"
    },
    {
        id: 3, description: "This  is the description", frequency: 5, image: "fasdasffqqfasd", tolerance: "dasdas", type: "gasdas"
    }
]

export const state = () => ({
    tableHeaders: [{ name: "ID", id: 0 }, { name: "Description", id: 1 }],
    allowedHeaders: ["id", "description"],
    controlPointList: []
})

export const mutations = {
    setControlPoints(state, controlPoints) {
        state.controlPointList = controlPoints
    },
}


export const actions = {
    loadControlPoints({ commit, rootState }, { }) {
        const user = rootState.login.user;
        if (user && user.role == "admin") {
            const language = rootState.login.chosenLanguage.flag;
            fetch(`api/controlPoints/listMinimal/${user.username}/${language}`).then(res => res.json()).then(result => {
                commit('setControlPoints', result)
            })
        }
    }
}