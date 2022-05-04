const getDefaultState = () => ({
		allTypes: [],
		attributesNames: [],
		frequencies:[],
		descriptions: [{lang: "English", value: ""}, {lang: "Danish", value: ""}, {lang: "Lithuanian", value: ""}],
		type: 0,
		value: null, // number or string
		upperTolerance: null,
		lowerTolerance: null,
		optionValues: [{value: null}],// {value: '',}
		attributes: [],//{id: '', minValue: 0, maxValue: 0}
		codes: [{value: null}],
		image: null,
		imagePreview: null,
	}
)

export const state = () => getDefaultState()

export const mutations = {
	resetState(state) {
		let keep = [state.allTypes, state.attributesNames]
		Object.assign(state, getDefaultState())
		state.allTypes = keep[0]
		state.attributesNames = keep[1]
	},

	setAllTypes(state, types) {
		state.allTypes = types
	},

	setFrequencies(state, frequencies) {
		state.frequencies = frequencies
	},

	setAllAttributesNames(state, attributesNames) {
		state.attributesNames = attributesNames
	},

	setDescription(state, obj) {
		state.descriptions[obj.index].value = obj.desc
	},
	setType(state, type) {
		state.type = type
	},
	setUpperTolerance(state, value) {
		state.uppperTolerance = value
	},
	setLowerTolerance(state, value) {
		state.lowerTolerance = value
	},

	setOptionValues(state, obj) {
		state.optionValues[obj.index].value = obj.option
	},
	addOptionValue(state) {
		state.optionValues.push({value: null})
	},
	removeOptionValue(state, index) {
		state.optionValues.splice(index, 1)
	},

	setAttributeId(state, obj) {
		state.attributes[obj.index].id = obj.att
	},
	setAttributeMinValue(state, obj) {
		state.attributes[obj.index].minValue = obj.att
	},
	setAttributeMaxValue(state, obj) {
		state.attributes[obj.index].maxValue = obj.att
	},
	addAttribute(state) {
		state.attributes.push({id: '', minValue: null, maxValue: null})
	},
	removeAttribute(state, index) {
		state.attributes.splice(index, 1)
	},

	setCodes(state, obj) {
		state.codes[obj.index].value = obj.code
	},
	addCode(state) {
		state.codes.push({value: null})
	},
	removeCode(state, index) {
		state.codes.splice(index, 1)
	},

	setImage(state, image) {
		state.image = image
		state.imagePreview = image ? URL.createObjectURL(image) : null
	},
}

export const actions = {
	async getAllTypes({commit}) {
		await fetch(`http://localhost:3000/api/controlPoints/allTypes`)
			.then(res => res.json())
			.then(res => {
				commit('setAllTypes', res)
			})
	},

	async getFrequencies({commit},cpId) {
		let controlPointId = cpId.controlPointId
		console.log(controlPointId)
		await fetch(`http://localhost:3000/api/controlPoints/getFrequenciesOfControlPoint/${controlPointId}`)
			.then(res => res.json())
			.then(res => {
				commit('setFrequencies', res)
			})
	},
	async getAllAttributesNames({commit}) {
		await fetch('http://localhost:3000/api/controlPoints/allAttributesNames')
			.then(res => res.json())
			.then(res => {
				commit('setAllAttributesNames', res)
			})
	},
	async submitControlPoint({commit}, cp) {
		const request = async (commit, cp)=>{
			await fetch('http://localhost:3000/api/controlPoints/submitControlPoint', {
				method: 'POST',
				body: JSON.stringify(cp),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(response => {
					if (response.ok) {
						commit('resetState')
					}
				}
			)
		}
		if(cp.image==null){
			await request(commit, cp)
		}else {
			let reader = new FileReader()
			reader.onload = async function (e) {
				cp.image = e.target.result
				await request(commit, cp)
			}
			reader.readAsDataURL(cp.image)
		}
	},
}
