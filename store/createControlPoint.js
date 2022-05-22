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

		alert: {show: false, message: "", status: 0}
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

setAllItemCodes(state, itemCodes) {
    state.allItemCodes = itemCodes
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
    state.optionValues[obj.index].value = obj.value
},
addOptionValue(state) {
    state.optionValues.push({value: null})
},
removeOptionValue(state, index) {
    state.optionValues.splice(index, 1)
},

setAttributeId(state, obj) {
    state.attributes[obj.index].id = obj.id
},
setAttributeMinValue(state, obj) {
    state.attributes[obj.index].minValue = obj.minVal
},
setAttributeMaxValue(state, obj) {
    state.attributes[obj.index].maxValue = obj.maxVal
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
	setFetchedImage(state, obj) {
		state.imagePreview = `http://localhost:3000/api/controlPoints/picture/${obj.username}/${obj.image}`
		state.image = obj.image
	},

	setAlert(state, alert) {
		state.alert = alert
	}
}

export const actions = {
    loadItemCategoryCodes({commit, rootState}) {
		const user = rootState.login.user;
		if (user) {
			fetch(`http://localhost:3000/api/itemCategory/getCodesMax/${user.username}/All`).then(res => res.json()).then(result => {
				commit('setAllItemCodes', result)
			})
		}
	},
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
				.then(res => {
					if (res.status >= 200 && res.status < 400) {
						commit("setAlert", {show: false, message: "", status: ""})
					} else if(res.status== 404) {
						commit("setAlert", {show: true, message: "control point not found", status: "danger"})
					}else {
						commit("setAlert", {show: true, message: "Oops something went wrong", status: "danger"})
					}
					return res
				})
				.then(res => res.json())
				.then(res => {
					commit('setAllDescriptions', res.descriptions)

					// main info
					let mainInfo = res.mainInformation
					commit('setMeasurementType', mainInfo.measurementtype)
					if (mainInfo.image != null) {
						commit('setFetchedImage', {image: mainInfo.image, username: user.username})
					}

					//type and values based on options
					commit('setType', mainInfo.inputtype)
					if (mainInfo.inputtype === "options") {
						commit('removeOptionValue', 0)
						commit('removeOptionValue', 0)
						for (let i = 0; i < res.optionValues.length; i++) {

							commit('addOptionValue')
							commit('setOptionValues', {index: i, value: res.optionValues[i].value})
						}
					} else if (mainInfo.inputtype === "number") {

                    commit('setUpperTolerance', mainInfo.uppertolerance)
                    commit('setLowerTolerance', mainInfo.lowertolerance)
                }

					//attributes
					let att = res.attributes
					if (att.length > 0) {
						for (let i = 0; i < att.length; i++) {
							commit('addAttribute')
							commit('setAttributeId', {index: i, id: att[i].attributeId})
							commit('setAttributeMinValue', {index: i, minVal: att[i].minValue})
							commit('setAttributeMaxValue', {index: i, maxVal: att[i].maxValue})
						}
					}

					//codes
					commit('removeCode', 0)
					res.categoryCodes.forEach(o => commit("addCodeSpecific", o.itemCategoryCode))

				})
		}
	},
	async submitControlPoint({commit, rootState}, cp) {
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
						} else {
							resolve(false)
						}
					}
				)
			})
		}
		if (user) {
			return new Promise(async (resolve, reject) => {
				if (cp.image == null) {
					resolve(await request(commit, cp))
				} else {
					let reader = new FileReader()
					reader.onload = async function (e) {
						cp.image = e.target.result
						resolve(await request(commit, cp))
					}
					reader.readAsDataURL(cp.image)
				}
			})
		}
	},
	async submitEditControlPoint({commit, rootState}, cp) {
		const user = rootState.login.user;
		const request = (commit, cp) => {
			return new Promise((resolve, reject) => {
				fetch(`http://localhost:3000/api/controlPoints/submitEditControlPoint/${user.username}`, {
					method: 'PUT',
					body: JSON.stringify(cp),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(response => {
						if (response.ok) {
							resolve(true)
						} else {
							resolve(false)
						}
					}
				)
			})
		}
		if (user) {
			return new Promise(async (resolve, reject) => {
				if (cp.image == null || typeof cp.image === 'string') {
					resolve(await request(commit, cp))
				} else {
					let reader = new FileReader()
					reader.onload = async function (e) {
						cp.image = e.target.result
						resolve(await request(commit, cp))
					}
					reader.readAsDataURL(cp.image)
				}
			})
		}
	},
}
