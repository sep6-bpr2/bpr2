export const state = () => ({
	tableHeaders: [{name: "Username", id: 0}, {name: "Role", id: 1}],
	allowedHeaders: ["username", "role"],
	roles: ["qa employee", "admin"],
	userList: [],
	QAUsers: []
})

export const mutations = {
	setNewUser(state, userList) {
		state.userList.push(...userList)
	},
	appendUsers(state, users) {
		for (let i = 0; i < users.length; i++) {
			state.userList.push(users[i])
		}
	},
	setUsers(state, users) {
		state.userList = users
	},
	setQAUsers(state, QAUserList) {
		state.QAUsers.push(...QAUserList)
	}
}

export const actions = {
	loadUsers({commit, rootState}, options) {
		const user = rootState.login.user;
		if (user) {
			fetch(`api/users/getAllUsers/${options.offset}/${options.limit}`).then(res => res.json()).then(result => {
				if (options.offset == 0) {
					commit('setUsers', result)
				} else {
					commit('appendUsers', result)
				}
			})
		}
	},
	deleteUser({commit, rootState}, deletingUser) {
		const user = rootState.login.user;
		return new Promise((resolve, reject) => {
			if (user) {
				let fetchData = {
					method: 'DELETE',
					body: JSON.stringify(deletingUser),
					headers: {
						'Content-Type': 'application/json'
					},
				}
				if (user) {
					fetch(`api/users/deleteUser/${user.username}`, fetchData).then(result => {
						if (result.status === 200) {
							commit('setUsers', result)
							resolve(true)
						} else resolve(false)
					})
				}
			}
		})
	},
	createUser({commit, rootState}, creatingUser){
		const user = rootState.login.user;
		let fetchData = {
			method: 'POST',
			body: JSON.stringify(creatingUser),
			headers: {
				'Content-Type': 'application/json'
			},
		}
		return new Promise((resolve, reject) => {
			if (user) {
				fetch(`api/users/addUser/${user.username}`, fetchData).then(res => res.json()).then(result => {
					if (result) {
						commit('setNewUser', result)
						resolve(true)
					} else {
						resolve(false)
					}
				})
			}
		})
	}
}
