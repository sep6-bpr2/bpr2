const defaultState = () => ({
		allTypes: [],
		attributesNames: [],
	}
)

export const state = defaultState()

export const mutations = {
	resetState(state){
		Object.assign(state, defaultState())
	},

	setAllTypes(state, types){
		state.allTypes = types
	},

	setAllAttributesNames(state, attributesNames){
		state.attributesNames = attributesNames
	},
}

export const actions = {
	getAllTypes({ commit}) {
			fetch(`http://localhost:3000/api/createControlPoint/allTypes`)
				.then(res => res.json())
				.then(res => {commit('setAllTypes', res)})
	},
	getAllAttributesNames({commit}){
		fetch('http://localhost:3000/api/createControlPoint/allAttributesNames')
			.then(res => res.json())
			.then(res => {commit('setAllAttributesNames', res)})
	},
	async submitControlPoint({commit}, controlPoint){
		await fetch('http://localhost:3000/api/createControlPoint/submitControlPoint',{
			method: 'POST',
			body: JSON.stringify(controlPoint),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}
}
