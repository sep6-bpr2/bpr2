
export const state = () => ({
	tableHeaders: [{ name: "Username", id: 0 }, { name: "Role", id: 1 }],
	allowedHeaders: ["username", "role"],
	roles:["qa employee","admin"],
	userList: [],
	QAUsers: []
})

export const mutations = {
	setUsers(state, userList) {
		state.userList = userList
	},
	setNewUser(state, userList) {
		state.userList.push(...userList)
	},
	setQAUsers(state, QAUserList){
		state.QAUsers.push(...QAUserList)
	}
}

export const actions = {
	loadUsers({ commit, rootState }) {
		const user = rootState.login.user;
		if (user) {
			fetch(`api/users/getAllUsers`).then(res => res.json()).then(result => {
				commit('setUsers', result)
			})
		}
	},
	deleteUser({commit, rootState }, deletingUser) {
		const user = rootState.login.user;
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
					commit('setUsers', result)
				})
			}
		}
	},
	getAllWorkingQAUsers({commit, rootState}){
		let user = rootState.login.user;
		if(user) {
			fetch(`api/users/getQAUsers/${user.username}`).then(res=> res.json()).then(result => {
				commit('setQAUsers', result)
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
			await fetch(`api/users/addUser/${user.username}`, fetchData).then(res=> res.json()).then(result => {
				commit('setNewUser', result)
			})
		}
	},
}
