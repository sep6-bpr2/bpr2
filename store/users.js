export const state = () => ({
	tableHeaders: [{ name: "Username", id: 0 }, { name: "Role", id: 1 }],
	allowedHeaders: ["username", "role"],
	roles:["qa employee","admin"],
	userList: [],
})

export const mutations = {
	setUsers(state, userList) {
		state.userList = userList
	},
	setNewUser(state, userList) {
		state.userList.push(...userList)
	}
}

export const actions = {
	loadUsers({ commit, rootState }) {
		const user = rootState.login.user;
		if (user) {
			const language = rootState.login.chosenLanguage.name;
			fetch(`api/users/getAllUsers`).then(res => res.json()).then(result => {
				commit('setUsers', result)
			})
		}
	},
	deleteUser({commit, rootState }, deletingUser) {
		const user = rootState.login.user;
		return new Promise( (resolve, reject) => {
			if (user) {
				if(user) {
					let fetchData = {
						method: 'DELETE',
						body: JSON.stringify(deletingUser),
						headers: {
							'Content-Type': 'application/json'
						},
					}
					if (user) {
						fetch(`api/users/deleteUser/${user.username}`, fetchData).then(res=> res.json()).then(result => {
							if(result){
								commit('setUsers', result)
								resolve(true)
							}
							else resolve(false)
						})
					}
				}
			}
		})
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
		return new Promise( (resolve, reject) => {
			if (user) {
				 fetch(`api/users/addUser/${user.username}`, fetchData).then(res => res.json()).then(result => {
					 if(result){
						 commit('setNewUser', result)
						 resolve(true)
					 }
					 else{
						resolve(false)
					 }
				})
			}
		})
	},
}
