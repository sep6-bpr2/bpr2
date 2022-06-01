<template>
	<div>
		<div style="margin-inline: 100pt">
			<div class="column">
				<v-card class="card1" elevation="5">
					<h3 class="cardTitle">
						<Translate :text="'Main information'" />
					</h3>
					<div
						v-for="(description, index) in this.cpData.descriptions"
					>
						<div class="innerElement row">
							{{ description.lang }}&nbsp
							<Translate :text="'Description'" />
							&nbsp:&nbsp
							<v-text-field
								style="max-width: 100%"
								:error="description.value.length > 200"
								id="description"
								:value="description.value"
								v-on:input="descriptionChange($event, index)"
							/>
						</div>
					</div>
					<div class="innerElement row">
						<Translate :text="'Control point measurement type'" />
						&nbsp:&nbsp
						<v-select
							id="measurementType"
							:items="allMeasurementTypes"
							:item-text="(item) => item.name"
							:item-value="(item) => item.value"
							v-model="cpData.measurementType"
						/>
					</div>
				</v-card>

				<v-card elevation="5">
					<h3 class="cardTitle">
						<Translate :text="'Input Type'" />
					</h3>
					<div class="innerElement row">
						<Translate :text="'Type'" />
						&nbsp:&nbsp
						<v-select
							id="type"
							:items="allTypes"
							v-model="cpData.type"
						/>
					</div>

					<div v-if="cpData.type === 'options'" id="options">
						<div v-for="(option, index) in cpData.optionValues">
							<v-card class="valueEntry" elevation="5">
								<Translate :text="'Option'" />
								&nbsp
								{{ index + 1 }}&nbsp:&nbsp
								<v-text-field
									:value="option.value"
									v-on:input="
										optionValueChange($event, index)
									"
								/>
								<v-btn
									:color="col.KonfairPrimary"
									id="deleteOption"
									v-on:click="removeOptionValue(index)"
								>
									<v-icon> mdi-delete </v-icon>
								</v-btn>
							</v-card>
						</div>
						<v-btn
							:color="col.KonfairPrimary"
							v-on:click="newValue('optionValue')"
							id="newOption"
						>
							<v-icon> mdi-pencil-plus-outline </v-icon>
							<Translate :text="'new option'" />
						</v-btn>
					</div>

					<div
						v-if="cpData.type === 'number'"
						class="innerElement row"
					>
						<Translate :text="'Lower Tolerance'" />&nbsp:&nbsp
						<v-text-field
							id="lowerTolerance"
							:error="
								cpData.lowerTolerance < 0 &&
								cpData.lowerTolerance
							"
							v-model="cpData.lowerTolerance"
							type="number"
						/>
						<Translate :text="'Upper Tolerance'" />&nbsp:&nbsp
						<v-text-field
							id="upperTolerance"
							:error="
								cpData.upperTolerance < 0 &&
								cpData.upperTolerance
							"
							v-model="cpData.upperTolerance"
							type="number"
						/>
					</div>
				</v-card>

				<v-card class="card3" elevation="5">
					<h3 class="cardTitle">
						<Translate
							:text="'Relationship with item category codes and attributes'"
						/>
					</h3>
					<div class="innerElement multiValueCard" id="attributes">
						<Translate :text="'Attributes'" />
						<div
							class="attributes"
							v-for="(attribute, index) in cpData.attributes"
							:key="idnex + attribute.showRange"
						>
							<v-card class="valueEntry" elevation="5">
								<div class="valueEntry">
									<Translate :text="'Name'" />
									&nbsp:&nbsp
									<v-autocomplete
										id="attributeName"
										:items="attributesNames"
										:item-text="(item) => item.name"
										:item-value="(item) => item.id"
										:value="attribute.id"
										v-on:input="
											attributeIdChange($event, index)
										"
										class="manualValidation"
									/>
									<div
										v-show="attribute.type == 3"
										class="valueEntry"
									>
										<Translate :text="'Min value'" />
										<v-text-field
											:error="
												attribute.minValue <= 0 &&
												attribute.minValue
											"
											:value="attribute.minValue"
											v-on:input="
												attributeMinValueChange(
													$event,
													index
												)
											"
											id="attributeMinVal"
										/>
										<p>
											<Translate :text="'Max value'" />
										</p>
										<v-text-field
											:error="
												attribute.maxValue <= 0 &&
												attribute.maxValue
											"
											:value="attribute.maxValue"
											v-on:input="
												attributeMaxValueChange(
													$event,
													index
												)
											"
											id="attributeMaxVal"
										/>
									</div>
								</div>
								<v-btn
									:color="col.KonfairPrimary"
									id="deleteAttribute"
									v-on:click="removeAttribute(index)"
								>
									<v-icon> mdi-delete </v-icon>
								</v-btn>
							</v-card>
						</div>

						<v-btn
							:color="col.KonfairPrimary"
							id="newAttribute"
							v-on:click="newValue('attribute')"
						>
							<v-icon> mdi-pencil-plus-outline </v-icon>
							<Translate :text="'new attribute'" />
						</v-btn>
					</div>

					<div class="innerElement multiValueCard" id="codes">
						<Translate :text="'Item category code'" />
						<div v-for="(code, index) in cpData.codes">
							<v-card class="valueEntry" elevation="5">
								<Translate :text="'Code'" />
								&nbsp:&nbsp
								<v-autocomplete
									:items="codesChoice"
									id="categoryItemCode"
									:item-text="(item) => item.Code"
									:item-value="(item) => item.Code"
									:value="code.value"
									v-on:input="codeChange($event, index)"
									class="manualValidation"
								/>
								<v-btn
									:color="col.KonfairPrimary"
									id="deleteItemCode"
									v-on:click="removeCodes(index)"
								>
									<v-icon> mdi-delete </v-icon>
								</v-btn>
							</v-card>
						</div>
						<v-btn
							:color="col.KonfairPrimary"
							id="newItemCode"
							v-on:click="newValue('code')"
						>
							<v-icon> mdi-pencil-plus-outline </v-icon>
							<Translate :text="'new code'" />
						</v-btn>
					</div>
				</v-card>
			</div>

			<div class="column">
				<v-card elevation="5">
					<h3>
						<Translate :text="'Image'" />
					</h3>
					<img
						v-if="cpData.imagePreview === null"
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

				<v-card
					class="card2"
					elevation="5"
					v-show="cpData.measurementType == 0"
				>
					<h3>
						<Translate :text="'Check frequency'" />
					</h3>
					<v-btn
						:color="col.KonfairPrimary"
						id="addFreq"
						v-if="!frequencies"
						v-on:click="changeShow"
					>
						<v-icon> mdi-pencil-plus-outline </v-icon>
						<Translate :text="'add frequency'" />
					</v-btn>

					<v-btn
						:color="col.KonfairPrimary"
						id="deleteFreq"
						v-if="frequencies"
						v-on:click="changeShow"
					>
						<v-icon> mdi-delete </v-icon>
						<Translate :text="'Delete Frequency'" />
					</v-btn>
					<Frequency
						v-if="frequencies"
						ref="frequencyChild"
						:frequencies="frequencies"
					/>
				</v-card>
			</div>
			<div>
				<AlertModal
					style="float: left; width: 100%; margin-bottom: 10pt"
					:id="1"
					:message="this.translateText('Are you sure?')"
					:show="showConfirmAlert && this.isEdit"
					:status="'warning'"
				/>
				<div class="bottomButtons">
					<v-btn
						:color="showConfirmAlert ? col.KonfairPrimary : col.red"
						v-if="this.isEdit"
						v-on:click="handleDelete"
					>
						<Translate :text="'Cancel'" v-if="showConfirmAlert" />
						<Translate :text="'Delete Control Point'" v-else />
					</v-btn>
					<v-btn
						id="submit"
						v-on:click="handleSubmit"
						:color="showConfirmAlert ? col.red : col.KonfairPrimary"
					>
						<Translate :text="'Confirm'" v-if="showConfirmAlert" />
						<Translate :text="'Submit'" v-else />
					</v-btn>
				</div>
			</div>
		</div>
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
import { translate } from "../mixins/translate";
import { alerts } from "../mixins/alerts";
import colors from "../styles/colors";
import {
	validateEmpty,
	validateNonNegativeAndInt,
	validatePositiveAndInt,
} from "../shared/validateInput";

export default {
	name: "ControlPoint",
	props: [
		"submit",
		"isEdit",
		"deleteCp",
		"cpData",
		"codesChoice",
		"attributesNames",
		"allTypes",
		"allMeasurementTypes",
		"alert",
	],
	components: { Translate },
	mixins: [translate, alerts],
	data: () => ({
		successAlert: { show: false, text: "" },
		warningAlert: { show: false, text: "" },
		showFreq: false,
		col: colors,
		id: 0,

		showConfirmAlert: false,
	}),
	computed: {
		frequencies: {
			get() {
				return this.cpData.frequencies;
			},
			set(freqs) {
				this.cpData.frequencies = freqs;
			},
		},
		currentImage: {
			get() {
				return this.cpData.image;
			},
			set(value) {
				this.cpData.image = value;

				this.cpData.imagePreview = value
					? URL.createObjectURL(value)
					: null;
			},
		},
	},
	methods: {
		// set computed property with v-model causes error on complex objects, see: https://vuex.vuejs.org/guide/forms.html
		descriptionChange(desc, index) {
			this.cpData.descriptions[index].value = desc;
		},
		changeShow() {
			if (this.cpData.frequencies) {
				this.frequencies = null;
			} else {
				this.$set(
					this.cpData,
					"frequencies",
					this.cpData.defaultFrequency
				);
			}
		},

		optionValueChange(option, index) {
			this.cpData.optionValues[index].value = option;
		},
		attributeIdChange(att, index) {
			console.log(att);
			let foundAttribute = null;
			for (let i = 0; i < this.attributesNames.length; i++) {
				if (att == this.attributesNames[i].id) {
					foundAttribute = this.attributesNames[i];
					break;
				}
			}

			if (foundAttribute) {
				this.cpData.attributes[index].id = foundAttribute.id;
				this.cpData.attributes[index].type = foundAttribute.type;
				this.cpData.attributes[index].minValue =
					foundAttribute.minValue;
				this.cpData.attributes[index].maxValue =
					foundAttribute.maxValue;

				if (foundAttribute.type == 3) {
					this.cpData.attributes[index].showRange = true;
				}
			}
			// let attribute = this.cpData.[index]
			// if(this.isEdit){
			//     let attribute = this.cpData.[index]
			//     this.cpData.attributes[index].id = attribute.id
			//     this.cpData.attributes[index].type = attribute.type
			//     this.cpData.attributes[index].minValue = null
			//     this.cpData.attributes[index].maxValue = null
			// }else{
			//     this.cpData.attributes[index].id = att.id
			//     this.cpData.attributes[index].type = att.type
			//     this.cpData.attributes[index].minValue = null
			//     this.cpData.attributes[index].maxValue = null
			// }

			// console.log(this.attributesNames)
			// // console.log("!!!!!!!!!!!!"+JSON.stringify(att))
			// this.cpData.attributes[index].id = attribute.id
			// this.cpData.attributes[index].type = attribute.type
			// this.cpData.attributes[index].minValue = null
			// this.cpData.attributes[index].maxValue = null
		},
		attributeMinValueChange(minVal, index) {
			this.cpData.attributes[index].minValue = minVal;
		},
		attributeMaxValueChange(maxVal, index) {
			this.cpData.attributes[index].maxValue = maxVal;
		},
		codeChange(code, index) {
			this.cpData.codes[index].value = code;
		},
		newValue(list) {
			switch (list) {
				case "optionValue":
					this.cpData.optionValues.push({ value: null });
					break;
				case "attribute":
					this.cpData.attributes.push({
						id: "",
						minValue: null,
						maxValue: null,
						type: null,
					});
					break;
				case "code":
					this.cpData.codes.push({ value: null });
					break;
			}
		},
		removeOptionValue(index) {
			if (this.cpData.optionValues.length === 2) {
				this.showAlert(
					"warning",
					this.translateText(
						"there must be at least two option for the options type"
					)
				);
			} else {
				this.cpData.optionValues.splice(index, 1);
			}
		},
		removeCodes(index) {
			if (this.cpData.codes.length === 1) {
				this.showAlert(
					"warning",
					this.translateText(
						"control point must have at least one item category code"
					)
				);
			} else {
				this.cpData.codes.splice(index, 1);
			}
		},
		removeAttribute(index) {
			this.cpData.attributes.splice(index, 1);
		},
		handleDelete() {
			this.showConfirmAlert = !this.showConfirmAlert;
		},
		handleSubmit() {
			this.showConfirmAlert
				? this.deleteCp()
				: this.submitForm(
						this.validateAll,
						this.showAlert,
						this.handleFrequencies
				  );
		},
		// rules works only with v-model. However, v-model can not be used on complex state properties
		validateAll() {
			let valid = true;
			let notEmptyDesc = 0;
			for (const des of this.cpData.descriptions) {
				if (this.validate([{ value: des.value }], "") === true)
					notEmptyDesc += 1;
				if (des.value.length > 0 && des.value.length > 200) {
					this.showAlert(
						"warning",
						this.translateText(
							"description can not exceed 200 characters"
						)
					);
					valid = false;
				}
			}
			if (notEmptyDesc === 0) {
				this.showAlert(
					"warning",
					this.translateText(
						"control point must have at least one description"
					)
				);
				valid = false;
			}
			console.log("AAAAAAAAAA");
			if (
				this.validate(
					[{ value: this.cpData.measurementType }],
					this.translateText("measurement type can not be empty")
				) === false
			)
				valid = false;

			if (
				this.validate(
					[{ value: this.cpData.type }],
					this.translateText("value type can not be empty")
				) === false
			)
				valid = false;
			if (this.cpData.type === "options") {
				if (
					this.validate(
						this.cpData.optionValues,
						this.translateText("option can not be empty")
					) === false
				)
					valid = false;
			} else if (this.cpData.type === "number") {
				if (
					this.validate(
						[{ value: this.cpData.lowerTolerance }],
						this.translateText("lower tolerance can not be empty")
					) === false
				)
					valid = false;
				if (
					this.validate(
						[{ value: this.cpData.upperTolerance }],
						this.translateText("upper tolerance can not be empty")
					) === false
				)
					valid = false;
				console.log(
					!validateNonNegativeAndInt(this.cpData.lowerTolerance)
				);
				if (!validateNonNegativeAndInt(this.cpData.lowerTolerance)) {
					this.showAlert(
						"warning",
						this.translateText(
							"lower tolerance needs to be grater or equal to 0 and smaller than 2147483647"
						)
					);
					valid = false;
				}
				if (!validateNonNegativeAndInt(this.cpData.upperTolerance)) {
					this.showAlert(
						"warning",
						this.translateText(
							"upper tolerance needs to be grater or equal to 0 and smaller than 2147483647"
						)
					);
					valid = false;
				}
			}
			if (this.cpData.attributes.length != 0) {
				this.cpData.attributes.forEach((att) => {
					if (validateEmpty(att.id)) {
						this.showAlert(
							"warning",
							this.translateText("attributes must have a name")
						);
						valid = false;
					}
					if (att.type == 3) {
						if (att.minVal != null && att.maxVal != null) {
							if (att.minValue >= att.maxValue) {
								this.showAlert(
									"warning",
									this.translateText(
										"attribute minimum value can not be greater or equal to the maximum value"
									)
								);
								valid = false;
								console.log("INVALID");
							}
							if (
								!validatePositiveAndInt(att.minValue) ||
								!validatePositiveAndInt(att.maxValue)
							) {
								this.showAlert(
									"warning",
									this.translateText(
										"attribute minimum and maximum value needs to be positive value"
									)
								);
								valid = false;
							}
							if (
								validateEmpty(att.minValue) ||
								validateEmpty(att.maxValue)
							) {
								this.showAlert(
									"warning",
									this.translateText(
										"attribute minimum and maximum value can not be empty"
									)
								);
								valid = false;
							}
						}
					}
				});
			}

			if (
				this.validate(
					this.cpData.codes,
					this.translateText("code can not be empty")
				) === false
			)
				valid = false;
			return valid;
		},
		validate(list, warningMessage) {
			for (let el of list) {
				let firstObjProp = el[Object.keys(el)[0]];
				if (
					firstObjProp === null ||
					firstObjProp === undefined ||
					firstObjProp === ""
				) {
					if (warningMessage !== "")
						this.showAlert("warning", warningMessage);
					return false;
				}
			}
			return true;
		},
		handleFrequencies() {
			if (
				typeof this.$refs.frequencyChild === "undefined" ||
				this.cpData.measurementType != 0
			) {
				this.cpData.frequencies = null;
				return true;
			}
			let localFrequencies = this.$refs.frequencyChild.localFrequencies;
			let stateFrequencies = this.frequencies;
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
				to5000: 0,
			};
			for (let x in localFrequencies) {
				if (localFrequencies[x].changed == false) {
					tempFrequencies[x] = stateFrequencies[x];
				} else {
					tempFrequencies[x] = localFrequencies[x].val;
				}
			}
			let valid = false;
			delete tempFrequencies.id;

			let failedId;
			let existsNegVal =
				Object.entries(tempFrequencies).every(isGreaterThan0);
			let existsOverInt =
				Object.entries(tempFrequencies).every(isLessThanMaxInteger);

			function isGreaterThan0(el) {
				if (el[1] >= 0) {
					return true;
				} else {
					failedId = el[0];
					return false;
				}
			}

			function isLessThanMaxInteger(el) {
				if (el[1] <= 2147483647) {
					return true;
				} else {
					failedId = el[0];
					return false;
				}
			}

			if (!existsNegVal || !existsOverInt) {
				this.showAlert(
					"warning",
					this.translateText(
						"invalid input in frequency at code: " + failedId
					)
				);
				valid = false;
			} else {
				this.cpData.frequencies = tempFrequencies;
				valid = true;
			}
			return valid;
		},
		submitForm(validateAll, showAlert, submitFrequencies) {
			this.submit(validateAll, showAlert, submitFrequencies);
		},
	},
};
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

.row {
	display: flex;
	flex-direction: row;
	align-items: baseline;
}

.cardTitle {
	margin-left: 5pt;
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
	margin-inline: 0;
	margin-top: 1pt;
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
.v-input {
	min-width: 50pt;
	max-width: 250pt;
}

.alert {
	position: fixed;
	top: 90%;
	width: 60%;
	right: 20%;
	left: 20%;
}
</style>
