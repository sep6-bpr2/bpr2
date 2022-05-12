const getDefaultState = () => ({
		allTypes: [],
		attributesNames: [],
		allMeasurementTypes: [{name: "one time", value: 1}, {name: "multiple times", value: 0}],
		frequencies: [{name: "to25", value: 2}, {name: "to50", value: 3}, {name: "to100", value: 4}, {
			name: "to200",
			value: 7
		}, {name: "to300", value: 10}, {name: "to500", value: 16}, {name: "to700", value: 22}, {
			name: "to1000",
			value: 30
		}, {name: "to1500", value: 40}, {name: "to2000", value: 50}, {name: "to3000", value: 60}, {
			name: "to4000",
			value: 65
		}, {name: "to5000", value: 70}],
		descriptions: [{lang: "English", value: ""}, {lang: "Danish", value: ""}, {lang: "Lithuanian", value: ""}],
		measurementType: null,
		type: null,
		upperTolerance: null,
		lowerTolerance: null,
		optionValues: [{value: null}, {value: null}],// {value: '',}
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

	setMeasurementType(state, measurementType) {
		state.measurementType = measurementType
	},


	setAllDescriptions(state, obj) {
		console.log("Hello")
		// obj.forEach(desc => {
		// 	let specDesc = state.descriptions.find(o => o.lang.toLowerCase() === desc.language)
		// 	console.log(specDesc)
		// 	specDesc = desc.description
		// })
		let eng = obj.find(o => o.language.toLowerCase() === "english")
		state.descriptions[0].value = eng.description
		let dk = obj.find(o => o.language.toLowerCase() === "danish")
		state.descriptions[1].value = dk.description
		let lt = obj.find(o => o.language.toLowerCase() === "lithuanian")
		state.descriptions[2].value = lt.description
	},

	setType(state, type) {
		state.type = type
	},
	setUpperTolerance(state, value) {
		state.upperTolerance = value
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
	addAttributeSpecific(state, id, minValue, maxValue) {
		state.attributes.push({id: id, minValue: minValue, maxValue: maxValue})
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
	addCodeSpecific(state, code) {
		state.codes.push({value: code})
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
	async getAllTypes({commit, rootState}) {
		const user = rootState.login.user;
		if (user) {
			await fetch(`http://localhost:3000/api/controlPoints/allTypes/${user.username}`)
				.then(res => res.json())
				.then(res => {
					commit('setAllTypes', res)
				})
		}
	},

	async getFrequencies({commit, rootState}, cpId) {
		const user = rootState.login.user;
		if (user) {
			await fetch(`http://localhost:3000/api/controlPoints/getFrequenciesOfControlPoint/${cpId.controlPointId}/${user.username}`)
				.then(res => res.json())
				.then(res => {
					commit('setFrequencies', res)
				})
		}
	},
	async getAllAttributesNames({commit, rootState}) {
		const user = rootState.login.user;
		if (user) {
			await fetch(`http://localhost:3000/api/controlPoints/allAttributesNames/${user.username}`)
				.then(res => res.json())
				.then(res => {
					commit('setAllAttributesNames', res)
				})
		}
	},
	async getControlPointData({commit, rootState}, cpId) {
		const user = rootState.login.user;
		if (user) {
			await fetch(`http://localhost:3000/api/controlPoints/controlPointData/${user.username}/${cpId}`)
				.then(res => res.json())
				.then(res => {
					console.log(res)
					commit('setAllDescriptions', res.descriptions)

					let mainInfo = res.mainInformation

					commit('setMeasurementType', mainInfo.measurementtype)
					commit('setType', mainInfo.inputtype)
					if (mainInfo.inputtype === "options") {
						// do options stuff
					} else if (mainInfo.inputtype === "number") {
						commit('setUpperTolerance', mainInfo.uppertolerance)
						commit('setLowerTolerance', mainInfo.lowertolerance)
					}

					//attributes
					let att = res.attributes
					att.forEach(o => commit('addAttributeSpecific', att.attributeId, att.minValue, att.maxValue))


					//codes
					commit('removeCode', 0)
					res.categoryCodes.forEach(o => commit("addCodeSpecific", o.itemCategoryCode))
				})
		}
	},
	async submitControlPoint({commit, rootState}, cp) {
		console.log(cp)
		const user = rootState.login.user;
		const request = (commit, cp) => {
			return new Promise((resolve, reject) => {
				fetch(`http://localhost:3000/api/controlPoints/submitControlPoint/${user.username}`, {
					method: 'POST',
					body: JSON.stringify(cp),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(response => {
						if (response.ok) {
							resolve(true)
							commit('resetState')
						} else {
							resolve(false)
						}
					}
				)
			})
		}
		if (user) {
			if (cp.image == null) {
				return request(commit, cp)
			} else {
				let reader = new FileReader()
				reader.onload = async function (e) {
					cp.image = e.target.result
					return request(commit, cp)
				}
				reader.readAsDataURL(cp.image)
			}
		}
	},
}
