
export const state = () => ({
	tableHeaders: [{ name: "Username", id: 0 }, { name: "Role", id: 1 }],
	allowedHeaders: ["username", "role"],
	roles:["qa employee","admin"],
	userList: []
})

export const mutations = {
	setNewUser(state, userList) {
		state.userList.push(...userList)
	},
    appendUsers(state, users) {
        for (let i = 0; i < users.length; i ++){
            state.userList.push(users[i])
        }
    },
    setUsers(state, users) {
        state.userList = users
    },
}

export const actions = {
	loadUsers({ commit, rootState }, options) {
		const user = rootState.login.user;
		if (user) {
			fetch(`api/users/getAllUsers/${options.offset}/${options.limit}`).then(res => res.json()).then(result => {
                if(options.offset == 0){
                    commit('setUsers', result)
                }else{
                    commit('appendUsers', result)
                }
			})
		}
	},
	async createUser({commit, rootState}, creatingUser) {
		const user = rootState.login.user;
		let fetchData = {
			method: 'POST',
			body: JSON.stringify(creatingUser),
			headers: {
				'Content-Type': 'application/json'
			},
		}
		if (user) {
			await fetch(`api/users/addUser`, fetchData).then(res=> res.json()).then(result => {
				commit('setNewUser', result)
			})
		}
	},
}
