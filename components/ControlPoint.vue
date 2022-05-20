<template>
	<div
		style="margin-inline: 100pt"
	>
		<v-form
			ref="controlPointForm"
		>
			<div class="column">
				<v-card class="card1" elevation="24">
					<h3>
						<Translate :text="'Main information'"/>
					</h3>
					<div
						v-for="(description, index) in descriptions"
					>
						<div class="innerElement row">
							<p>
								{{ description.lang }}
								<Translate :text="'Description'"/>
							</p>
							<v-text-field
								id="description"
								:value="description.value"
								v-on:input="descriptionChange($event, index)"
							/>
						</div>
					</div>
					<div class="innerElement row">
						<p>
							<Translate :text="'Control point measurement type'"/>
						</p>
						<v-select
							id="measurementType"
							:items="allMeasurementTypes"
							:item-text="item=>item.name"
							:item-value="item=>item.value"
							v-model="measurementType"
						/>
					</div>
				</v-card>

				<v-card elevation="24">
					<h3>
						<Translate :text="'Value'"/>
					</h3>
					<div class="innerElement row">
						<p>
							<Translate :text="'Type'"/>
						</p>
						<v-select
							id="type"
							:items="allTypes"
							v-model="type"
						/>
					</div>

					<div
						v-if="type==='options'"
						id="options"
					>
						<div
							v-for="(option, index) in optionValues"
						>
							<v-card class="valueEntry" elevation="24"
							>
								<p>
									<Translate :text="'Option'"/>
									{{ index + 1 }}
								</p>
								<v-text-field
									:value="option.value"
									v-on:input="optionValueChange($event, index)"
								/>
								<v-btn
									id="deleteOption"
									v-on:click="removeOptionValue(index)"
								>
									<v-icon>
										mdi-delete
									</v-icon>
								</v-btn>
							</v-card>
						</div>
						<v-btn
							v-on:click="newValue('optionValue')"
							id="newOption"
						>
							<v-icon>
								mdi-pencil-plus-outline
							</v-icon>
							<Translate :text="'new option'"/>
						</v-btn>

					</div>

					<div
						v-if="type==='number'"
						class="innerElement row"
					>
						<p>
							<Translate :text="'LowerTolerance'"/>
						</p>
						<v-text-field
							v-model="lowerTolerance"
						/>
						<p>
							<Translate :text="'UpperTolerance'"/>
						</p>
						<v-text-field
							v-model="upperTolerance"
						/>
					</div>
				</v-card>

				<v-card class="card3" elevation="24">
					<h3>
						<Translate :text="'Relationship with category items and attributes'"/>
					</h3>
					<div class="innerElement multiValueCard"
						 id="attributes"
					>
						<p>
							<Translate :text="'Attributes'"/>
						</p>
						<div class="attributes"
							 v-for="(attribute, index) in attributes"
						>
							<v-card class="valueEntry" elevation="24"
							>
								<p>
									<Translate :text="'Name'"/>
								</p>
								<v-autocomplete
									:items="attributesChoice"
									:item-text="item=>item.name"
									:item-value="item=>item.id"
									:value="attribute.id"
									v-on:input="attributeIdChange($event, index)"
									class="manualValidation"
								/>
								<p>
									<Translate :text="'Min value'"/>
								</p>
								<v-text-field required
											  :value="attribute.minValue"
											  v-on:input="attributeMinValueChange($event, index,)"
								/>
								<p>
									<Translate :text="'Max value'"/>
								</p>
								<v-text-field
									class="shrink"
									:value="attribute.maxValue"
									v-on:input="attributeMaxValueChange($event, index)"
								/>
								<v-btn
									id="deleteAttribute"
									v-on:click="removeAttribute(index)"
								>
									<v-icon>
										mdi-delete
									</v-icon>
								</v-btn>
							</v-card>
						</div>

						<v-btn
							id="newAttribute"
							v-on:click="newValue('attribute')"
						>
							<v-icon>
								mdi-pencil-plus-outline
							</v-icon>
							<Translate :text="'new attribute'"/>
						</v-btn>
					</div>

					<div class="innerElement multiValueCard"
						 id="codes"
					>
						<p>
							<Translate :text="'Category Item Codes'"/>
						</p>
						<div
							v-for="(code, index) in codes"
						>
							<v-card class="valueEntry" elevation="24">
								<p>
									<Translate :text="'Code'"/>
								</p>
								<v-autocomplete
									:items="codesChoice"
									id="categoryItemCode"
									:item-text="item=>item.Code"
									:item-value="item=>item.Code"
									v-on:input="codeChange($event, index)"
									type="number"
									class="manualValidation"
								/>
								<v-btn
									id="deleteItemCode"
									v-on:click="removeCodes(index)"
								>
									<v-icon>
										mdi-delete
									</v-icon>
								</v-btn>
							</v-card>
						</div>
						<v-btn
							id="newItemCode"
							v-on:click="newValue('code')"
						>
							<v-icon>
								mdi-pencil-plus-outline
							</v-icon>
							<Translate :text="'new code'"/>
						</v-btn>
					</div>
				</v-card>
			</div>

			<div class="column">
				<v-card elevation="24">
					<h3>
						<Translate :text="'Image'"/>
					</h3>
					<img
						v-if="previewImage===null"
						class="image innerElement"
						src="~/assets/no_image.png"
					/>
					<v-img
						v-else
						class="image innerElement"
						v-bind:src="this.previewImage"
					/>
					<v-file-input
						id="file-input"
						chips
						accept="image/*"
						label="Image file"
						v-model="currentImage"
					></v-file-input>
				</v-card>

				<v-card class="card2" elevation="24">
					<h3>
						<Translate :text="'Check frequency'"/>
					</h3>
					<v-btn
						id="addFreq"
						v-if="!frequencies"
						v-on:click="changeShow"
					>
						<v-icon>
							mdi-pencil-plus-outline
						</v-icon>
						<Translate :text="'add frequency'"/>
					</v-btn>

					<v-btn
						id="deleteFreq"
						v-if="frequencies"
						v-on:click="changeShow"
					>
						<v-icon>
							mdi-delete
						</v-icon>
						<Translate :text="'Delete Frequency'"/>
					</v-btn>
					<Frequency v-if="frequencies"
							   ref="frequencyChild"
							   :frequencies="frequencies"
					/>
				</v-card>

			</div>

			<div class="bottomButtons">
				<v-btn v-if="this.isEdit"
					v-on:click="deleteControlPoint"
				>
					<Translate :text="'Delete Control Point'"/>
				</v-btn>
				<v-btn
					id="submit"
					v-on:click="submitForm"
				>
					<Translate :text="'Submit'"/>
				</v-btn>
			</div>

		</v-form>
		<div class="alert">
			<v-alert type="success" v-if="successAlert.show">
				{{ successAlert.text }}
			</v-alert>

			<v-alert type="warning" v-if="warningAlert.show">
				{{ warningAlert.text }}

			</v-alert>
		</div>
	</div>
</template>

<script>
import Translate from "./Translate";
import {translate} from "../mixins/translate";
import {alerts} from "../mixins/alerts";
export default {
	name: "ControlPoint",
	props: ["submit", "isEdit"],
	components: {Translate},
	mixins: [translate, alerts],
	data: () => ({
		successAlert: {show: false, text: ''},
		warningAlert: {show: false, text: ''},
		id: 0
	}),
	created() {
		this.$store.dispatch("createControlPoint/getAllTypes")
		this.$store.dispatch("createControlPoint/getAllAttributesNames")
		this.$store.dispatch("createControlPoint/loadItemCategoryCodes")
	},
	computed: {
		frequencies() {
			return this.$store.state.createControlPoint.frequencies
		},
		allTypes() {
			return this.$store.state.createControlPoint.allTypes
		},
		codesChoice() {
			return this.$store.state.createControlPoint.allItemCodes
		},
		attributesChoice() {
			return this.$store.state.createControlPoint.attributesNames
		},
		descriptions() {
			return this.$store.state.createControlPoint.descriptions
		},
		allMeasurementTypes() {
			return this.$store.state.createControlPoint.allMeasurementTypes
		},
		measurementType: {
			get() {
				return this.$store.state.createControlPoint.measurementType
			},
			set(value) {
				this.$store.commit('createControlPoint/setMeasurementType', value)
			}
		},
		type: {
			get() {
				return this.$store.state.createControlPoint.type
			},
			set(type) {
				this.$store.commit('createControlPoint/setType', type)
			}
		},
		lowerTolerance: {
			get() {
				return this.$store.state.createControlPoint.lowerTolerance
			},
			set(value) {
				this.$store.commit('createControlPoint/setLowerTolerance', value)
			}
		},
		upperTolerance: {
			get() {
				return this.$store.state.createControlPoint.upperTolerance
			},
			set(value) {
				this.$store.commit('createControlPoint/setUpperTolerance', value)
			}
		},
		optionValues() {
			return this.$store.state.createControlPoint.optionValues
		},
		attributes() {
			return this.$store.state.createControlPoint.attributes
		},
		codes() {
			return this.$store.state.createControlPoint.codes
		},
		currentImage: {
			get() {
				return this.$store.state.createControlPoint.image
			},
			set(value) {
				this.$store.commit('createControlPoint/setImage', value)
			}
		},
		previewImage() {
			return this.$store.state.createControlPoint.imagePreview
		}
	},
	methods: {
		// set computed property with v-model causes error on complex objects, see: https://vuex.vuejs.org/guide/forms.html
		descriptionChange(desc, index) {
			this.$store.commit('createControlPoint/setDescription', {desc: desc, index: index})
		},
		changeShow(){
			if(this.frequencies){
				this.$store.commit('createControlPoint/clearFrequency')
			}
			else {
				this.$store.commit('createControlPoint/setDefaultFrequencies')
			}
		},

		optionValueChange(option, index) {
			this.$store.commit('createControlPoint/setOptionValues', {value: option, index: index})
		},
		attributeIdChange(id, index) {
			this.$store.commit(`createControlPoint/setAttributeId`, {id: id, index: index})
		},
		attributeMinValueChange(minVal, index) {
			this.$store.commit(`createControlPoint/setAttributeMinValue`,{minVal: minVal, index: index})
		},
		attributeMaxValueChange(maxVal, index) {
			this.$store.commit(`createControlPoint/setAttributeMaxValue`, {maxVal: maxVal, index: index})
		},
		codeChange(code, index) {
			this.$store.commit('createControlPoint/setCodes', {code: code, index: index})
		},
		newValue(list) {
			switch (list) {
				case 'optionValue':
					this.$store.commit('createControlPoint/addOptionValue')
					break;
				case 'attribute':
					this.$store.commit('createControlPoint/addAttribute')
					break;
				case 'code':
					this.$store.commit('createControlPoint/addCode')
					break;
			}
		},
		removeOptionValue(index) {
			if (this.optionValues.length === 2) {
				this.showAlert('warning', this.translateText('there must be at least two option for the options type'))
			} else {
				this.$store.commit('createControlPoint/removeOptionValue', index)
			}
		},
		removeCodes(index) {
			if (this.codes.length === 1) {
				this.showAlert('warning', this.translateText('control point must have at least one item category code'))
			} else {
				this.$store.commit('createControlPoint/removeCode', index)
			}
		},
		removeAttribute(index) {
			this.$store.commit('createControlPoint/removeAttribute', index)
		},
		deleteControlPoint() {
			alert("this will work only on edit control point while reusing this component")
		},
		// rules works only with v-model. However, v-model can not be used on complex state properties
		validateAll() {
			let notEmptyDesc = 0
			for (const des of this.descriptions) {
				if (this.validate([{value: des.value}], '') === true) notEmptyDesc += 1
			}
			if (notEmptyDesc === 0) {
				this.showAlert('warning', this.translateText('control point must have at least one description'));
				return false
			}
			if(this.validate([{value: this.measurementType}], this.translateText('measurement type con not be empty')) === false) return false
			if (this.validate([{value: this.type}], this.translateText('value type can not be empty')) === false) return false
			if (this.type === 'options') {
				console.log("!!!!!!!!!!!!"+JSON.stringify(this.optionValues))
				if (this.validate(this.optionValues, this.translateText('option can not be empty')) === false) return false
			} else if (this.type === 'number') {
				if (this.validate([{value: this.lowerTolerance}], this.translateText('lower tolerance can not be empty')) === false) return false
				if (this.validate([{value: this.upperTolerance}], this.translateText('upper tolerance can not be empty')) === false) return false
			}
			if (this.validate(this.codes, this.translateText('code can not be empty')) === false) return false
			return true
		},
		validate(list, warningMessage) {
			for (let el of list) {
				let firstObjProp = el[Object.keys(el)[0]]
				if (firstObjProp === null || firstObjProp === undefined || firstObjProp === "") {
					if (warningMessage !== '') this.showAlert('warning', warningMessage)
					return false
				}
			}
			return true
		},
		submitFrequencies() {
			if (typeof this.$refs.frequencyChild === 'undefined') {
				return null
			}
			let localFrequencies = this.$refs.frequencyChild.localFrequencies
			let stateFrequencies = this.frequencies
			let tempFrequencies = {
				id: 0,
				to25: 0,
				to50: 0,
				to100: 0,
				to200: 0,
				to300: 0,
				to500: 0,
				to700: 0,
				to1000: 0,
				to1500: 0,
				to2000: 0,
				to3000: 0,
				to4000: 0,
				to5000: 0
			}
			for (let x in localFrequencies) {
				if (localFrequencies[x].changed == false) {
					tempFrequencies[x] = stateFrequencies[x]
				} else {
					tempFrequencies[x] = localFrequencies[x].val
				}
			}

			delete tempFrequencies.id;

			let messageForNotification;
			let existsNegVal
			existsNegVal = 	Object.entries(tempFrequencies).every(v => v[1] >= 0)
			existsNegVal = 	Object.entries(tempFrequencies).every(v => v[1] <= 2147483647)

			if (!existsNegVal) {
				messageForNotification = { response: 2, message: "There is an invalid input" }
			} else {
				this.$store.commit("createControlPoint/setFrequencies",tempFrequencies)
			}
			return messageForNotification
		},
		submitForm() {
			this.submitFrequencies()
			this.submit(this.validateAll, this.showAlert)

		},
	}
}
</script>

<style scoped>
.column {
	width: 50%;
	float: left;
}
.v-card {
	width: -webkit-fill-available;
	margin: 15pt;
	padding: 5pt;
	float: left;
}
p {
	margin-inline: 10pt;
}
.row {
	display: flex;
	flex-direction: row;
	align-items: baseline;
}
.innerElement {
	margin: 5pt;
}
.multiValueCard {
	display: flex;
	flex-direction: column;
}
.valueEntry {
	display: flex;
	flex-direction: row;
	align-items: baseline;
	margin: 5pt;
	justify-content: space-between;
}
.image {
	max-width: 300pt;
	max-height: 300pt;
}
.bottomButtons {
	width: 100%;
	float: left;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	margin-bottom: 10pt;
}
button {
	background-color: #555 !important;
	color: white !important;
}
v-input {
	width: inherit !important;
}
.alert {
	position: fixed;
	top: 90%;
	width: 60%;
	right: 20%;
	left: 20%;
}
</style>
