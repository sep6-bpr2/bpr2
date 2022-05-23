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
						v-for="(description, index) in this.cpData.descriptions"
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
							v-model="cpData.measurementType"
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
							v-model="cpData.type"
						/>
					</div>

					<div
						v-if="cpData.type==='options'"
						id="options"
					>
						<div
							v-for="(option, index) in cpData.optionValues"
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
									:color="col.KonfairPrimary"
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
							:color="col.KonfairPrimary"
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
						v-if="cpData.type==='number'"
						class="innerElement row"
					>
						<p>
							<Translate :text="'LowerTolerance'"/>
						</p>
						<v-text-field
							v-model="cpData.lowerTolerance"
							type="number"
						/>
						<p>
							<Translate :text="'UpperTolerance'"/>
						</p>
						<v-text-field
							v-model="cpData.upperTolerance"
							type="number"
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
							 v-for="(attribute, index) in cpData.attributes"
						>
							<v-card class="valueEntry" elevation="24"
							>
								<p>
									<Translate :text="'Name'"/>
								</p>
								<v-autocomplete
									:items="attributesNames"
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
									:color="col.KonfairPrimary"
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
							:color="col.KonfairPrimary"
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
							v-for="(code, index) in cpData.codes"
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
									:value="code.value"
									v-on:input="codeChange($event, index)"
									class="manualValidation"
								/>
								<v-btn
									:color="col.KonfairPrimary"
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
							:color="col.KonfairPrimary"
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
						v-if="cpData.imagePreview===null"
						class="image innerElement"
						src="~/assets/no_image.png"
					/>
					<v-img
						v-else
						class="image innerElement"
						v-bind:src="cpData.imagePreview"
					/>
					<v-file-input
						id="file-input"
						chips
						accept="image/*"
						label="Image file"
						v-model="currentImage"
					></v-file-input>
				</v-card>

				<v-card class="card2" elevation="24" v-show="cpData.measurementType==0">
					<h3>
						<Translate :text="'Check frequency'"/>
					</h3>
					<v-btn
						:color="col.KonfairPrimary"
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
						:color="col.KonfairPrimary"
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
			<div>
				<AlertModal
					style="float: left; width: 100%"
					:id="1"
					:message="this.translateText('Are you sure?')"
					:show="showConfirmAlert && this.isEdit"
					:status="'warning'"
				/>
				<div class="bottomButtons">
					<v-btn
						:color="col.red"
						v-if="this.isEdit"
						v-on:click="handleDelete"
					>
						<Translate :text="'Cancel'" v-if="showConfirmAlert"/>
						<Translate :text="'Delete Control Point'" v-else/>
					</v-btn>
					<v-btn
						id="submit"
						v-on:click="handleSubmit"
						:color="col.KonfairPrimary"
					>
						<Translate :text="'Confirm'" v-if="showConfirmAlert"/>
						<Translate :text="'Submit'" v-else/>
					</v-btn>
				</div>
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
import colors from "../styles/colors";

export default {
	name: "ControlPoint",
	props: ["submit", "isEdit", "deleteCp","cpData","codesChoice","attributesNames","allTypes","allMeasurementTypes", "alert"],
	components: {Translate},
	mixins: [translate, alerts],
	data: () => ({
		successAlert: {show: false, text: ''},
		warningAlert: {show: false, text: ''},
		showFreq: false,
		col: colors,
		id: 0,

		showConfirmAlert: false
	}),
	computed: {
		frequencies() {
            // FIX THIS SHIT
            if(this.cpData.frequencies != null){
			    return this.cpData.frequencies[0]
            }else{
                return null
            }
		},
		currentImage: {
			get() {
				return this.cpData.image
			},
			set(value) {
				this.cpData.image = value

				this.cpData.imagePreview = value ? URL.createObjectURL(value) : null
			}
		},
	},
	methods: {
		// set computed property with v-model causes error on complex objects, see: https://vuex.vuejs.org/guide/forms.html
		descriptionChange(desc, index) {
			this.cpData.descriptions[index].value = desc
		},
		changeShow(){
			if(this.frequencies){
				this.cpData.frequencies = null
			}
			else {
				this.cpData.frequencies = this.cpData.defaultFrequency
			}
		},

		optionValueChange(option, index) {
			this.cpData.optionValues[index].value = option
		},
		attributeIdChange(id, index) {
			this.cpData.attributes[index].id = id
		},
		attributeMinValueChange(minVal, index) {
			this.cpData.attributes[index].minValue = minVal

		},
		attributeMaxValueChange(maxVal, index) {
			this.cpData.attributes[index].maxValue = maxVal
		},
		codeChange(code, index) {
			this.cpData.codes[index].value = code
		},
		newValue(list) {
			switch (list) {
				case 'optionValue':
					this.cpData.optionValues.push({value: null})
					break;
				case 'attribute':
					this.cpData.attributes.push({id: '', minValue: null, maxValue: null})
					break;
				case 'code':
					this.cpData.codes.push({value: null})
					break;
			}
		},
		removeOptionValue(index) {
			if (this.cpData.optionValues.length === 2) {
				this.showAlert('warning', this.translateText('there must be at least two option for the options type'))
			} else {
				this.cpData.optionValues.splice(index, 1)

			}
		},
		removeCodes(index) {
			if (this.cpData.codes.length === 1) {
				this.showAlert('warning', this.translateText('control point must have at least one item category code'))
			} else {
				this.cpData.codes.splice(index, 1)
			}
		},
		removeAttribute(index) {
			this.cpData.attributes.splice(index, 1)
		},
		handleDelete() {
			this.showConfirmAlert = !this.showConfirmAlert
		},
		handleSubmit(){
			this.showConfirmAlert ? this.deleteCp() : this.submitForm(this.validateAll, this.showAlert, this.handleFrequencies)
		},
		// rules works only with v-model. However, v-model can not be used on complex state properties
		validateAll() {
			let notEmptyDesc = 0
			for (const des of this.cpData.descriptions) {
				if (this.validate([{value: des.value}], '') === true) notEmptyDesc += 1
			}
			if (notEmptyDesc === 0) {
				this.showAlert('warning', this.translateText('control point must have at least one description'));
				return false
			}

			if (this.validate([{value: this.cpData.measurementType}], this.translateText('measurement type con not be empty')) === false) return false

			if (this.validate([{value: this.cpData.type}], this.translateText('value type can not be empty')) === false) return false
			if (this.cpData.type === 'options') {
				if (this.validate(this.cpData.optionValues, this.translateText('option can not be empty')) === false) return false
			} else if (this.cpData.type === 'number') {
				if (this.validate([{value: this.cpData.lowerTolerance}], this.translateText('lower tolerance can not be empty')) === false) return false
				if (this.validate([{value: this.cpData.upperTolerance}], this.translateText('upper tolerance can not be empty')) === false) return false
				if(this.cpData.lowerTolerance < 0 || this.cpData.lowerTolerance > 2147483647){
					this.showAlert('warning',this.translateText("lower tolerance needs to be grater than 0 and smaller than 2147483647"))
					return false
				}
				if(this.cpData.upperTolerance < 0 || this.cpData.upperTolerance > 2147483647){
					this.showAlert('warning',this.translateText("upper tolerance needs to be grater than 0 and smaller than 2147483647"))
					return false
				}
				if(this.cpData.lowerTolerance >= this.cpData.upperTolerance){
					this.showAlert('warning',this.translateText("lower tolerance can not be grater or equal to upper tolerance"))
					return false
				}
			}
			if (this.validate(this.cpData.codes, this.translateText('code can not be empty')) === false) return false
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
		handleFrequencies() {
			if (typeof this.$refs.frequencyChild === 'undefined') {
				return true
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
			let valid = false
			delete tempFrequencies.id;

			let existsNegVal = 	Object.entries(tempFrequencies).every(v => v[1] >= 0)
			let existsOverInt = 	Object.entries(tempFrequencies).every(v => v[1] <= 2147483647)

			if (!existsNegVal || !existsOverInt) {
				this.showAlert('warning', this.translateText("invalid input in frequency"))
				valid = false
			} else {
				this.cpData.frequencies = tempFrequencies
				valid = true
			}
			return valid
		},
		submitForm(validateAll, showAlert,submitFrequencies) {
				this.submit(validateAll, showAlert,submitFrequencies)
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
