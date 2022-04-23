const getDefaultState = () => ({
		allTypes: [],
		attributesNames: [],

		descriptions: [{lang: "English", value: ""}, {lang: "Danish", value: ""}, {lang: "Lithuanian", value: ""}],
		type: 0,
		value: null, // number or string
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

	setAllAttributesNames(state, attributesNames) {
		state.attributesNames = attributesNames
	},

	setDescription(state, obj) {
		state.descriptions[obj.index].value = obj.desc
	},
	setType(state, type) {
		state.type = type
	},
	setValue(state, value) {
		state.value = value
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
		await fetch(`http://localhost:3000/api/createControlPoint/allTypes`)
			.then(res => res.json())
			.then(res => {
				commit('setAllTypes', res)
			})
	},
	async getAllAttributesNames({commit}) {
		await fetch('http://localhost:3000/api/createControlPoint/allAttributesNames')
			.then(res => res.json())
			.then(res => {
				commit('setAllAttributesNames', res)
			})
	},

	async uploadImage({commit}, image){
		console.log("hello there: "+ image)
		var reader = new FileReader()
		reader.onload = async function (e) {
			var myDataURL = e.target.result
			console.log(myDataURL)
			await fetch('http://localhost:3000/api/createControlPoint/uploadImage', {
				method: 'POST',
				body: JSON.stringify({url:myDataURL}),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				if (res.ok) {
					console.log('image uploaded')
				}
			})
		}
		// reader.readAsDataURL(image)
	},

	async submitControlPoint({commit}, cp) {
		await fetch('http://localhost:3000/api/createControlPoint/submitControlPoint', {
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
}
