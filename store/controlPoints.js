export const state = () => ({
    tableHeaders: [{ name: "ID", id: 0 }, { name: "Description", id: 1 }],
    allowedHeaders: ["id", "description"],
    controlPointList: []
})

export const mutations = {
    appendControlPoints(state, controlPoints) {
        for (let i = 0; i < controlPoints.length; i ++){
            state.controlPointList.push(controlPoints[i])
        }
    },
    setControlPoints(state, controlPoints) {
        state.controlPointList = controlPoints
    },
}


export const actions = {
    loadControlPoints({ commit, rootState }, options) {
        const user = rootState.login.user;
        if (user && user.role == "admin") {
            let language = rootState.login.chosenLanguage.name;
            if(language != "English" && language != "Danish" && language != "Lithuanian"){
                if(language == "Dansk"){
                    language = "Danish"
                }else if(language == "Lietuviu"){
                    language = "Lithuanian"
                }
            }
            
            fetch(`api/controlPoints/listMinimal/${user.username}/${language}/${options.offset}/${options.limit}`).then(res => res.json()).then(result => {
                if(options.offset == 0){
                    commit('setControlPoints', result)
                }else{
                    commit('appendControlPoints', result)
                }
            })
        }
    }
}