<template>
	<div>
		<v-form
			ref="controlPointForm"
		>
			<div class="column">
				<v-card class="card1">
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
								:value="description.value"
								v-on:input="descriptionChange($event, index)"
							/>
						</div>
					</div>

					<div class="innerElement row">
						<p>
							<Translate :text="'Type'"/>
						</p>
						<v-select
							:items="allTypes"
							v-model="type"
							class="shrink"
							:rules="rules.input"
						/>
					</div>

					<div
						v-if="type==='options'"
					>
						<div class="innerElement row"
							 v-for="(option, index) in optionValues"
						>
							<p>
								<Translate :text="'Option'"/>
								{{ index + 1 }}
							</p>
							<v-text-field
								class="shrink"
								:rules="rules.input"
								:value="option.value"
								v-on:input="optionValueChange($event, index)"
							/>
							<v-btn
								v-on:click="removeOptionValue(index)"
							>
								<v-icon>
									mdi-delete
								</v-icon>
							</v-btn>
						</div>
						<v-btn
							v-on:click="newValue('optionValue')"
						>
							<v-icon>
								mdi-pencil-plus-outline
							</v-icon>
							<Translate :text="'new option'"/>
						</v-btn>

					</div>

					<div
						v-else
						class="innerElement row"
					>
						<p>
							<Translate :text="'Value'"/>
						</p>
						<v-text-field
							v-model="value"
							class="shrink"
							:rules="rules.input"
						/>
					</div>
				</v-card>

				<v-card class="card3">
					<h3>
						<Translate :text="'Relationship with category items and attributes'"/>
					</h3>
					<div class="innerElement multiValueCard">
						<p>
							<Translate :text="'Attributes'"/>
						</p>
						<div class="attributes"
							 v-for="(attribute, index) in attributes"
						>
							<v-card class="valueEntry"

							>
								<p>
									<Translate :text="'Name'"/>
								</p>
								<v-autocomplete
									:items="attributesChoice"
									:item-text="item=>item.name"
									:item-value="item=>item.id"
									:value="attribute.id"
									v-on:input="attributeChange($event, index, 'Id')"
									class="manualValidation"
								/>
								<p>
									<Translate :text="'Min value'"/>
								</p>
								<v-text-field
									class="shrink"
									:value="attribute.minValue"
									v-on:input="attributeChange($event, index, 'MinValue')"
								/>
								<p>
									<Translate :text="'Max value'"/>
								</p>
								<v-text-field
									class="shrink"
									:value="attribute.maxValue"
									v-on:input="attributeChange($event, index, 'MaxValue')"
								/>
								<v-btn
									v-on:click="removeAttribute(index)"
								>
									<v-icon>
										mdi-delete
									</v-icon>
								</v-btn>
							</v-card>
						</div>

						<v-btn
							v-on:click="newValue('attribute')"
						>
							<v-icon>
								mdi-pencil-plus-outline
							</v-icon>
							<p>
								<Translate :text="'new attribute'"/>
							</p>
						</v-btn>
					</div>

					<div class="innerElement multiValueCard">
						<p>
							<Translate :text="'Category Item Codes'"/>
						</p>
						<div
							v-for="(code, index) in codes"
						>
							<v-card class="valueEntry">
								<p>
									<Translate :text="'Code'"/>
								</p>
								<v-text-field
									:value="code.value"
									v-on:input="codeChange($event, index)"
									type="number"
									class="shrink manualValidation"
								/>
								<v-btn
									v-on:click="removeCodes(index)"
								>
									<v-icon>
										mdi-delete
									</v-icon>
								</v-btn>
							</v-card>
						</div>
						<v-btn
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
				<v-card>
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
					<div>{{ previewImage }}</div>
					<div>{{ currentImage }}</div>
					<div>{{}}</div>
				</v-card>

				<v-card class="card2">
					<h3>
						<Translate :text="'Check frequency'"/>
					</h3>
				</v-card>
			</div>

			<div class="buttons">
				<v-btn
					v-on:click="deleteControlPoint"
				>
					<Translate :text="'Delete Control Point'"/>
				</v-btn>
				<v-btn
					v-on:click="submit"
				>
					<Translate :text="'Submit'"/>
				</v-btn>
			</div>
		</v-form>
	</div>
</template>

<script>
import Translate from "../../../components/Translate";

export default {
	name: "index",
	components: {Translate},
	data: () => {
		return {
			currentImage: null,
			previewImage: null,
			// progress: 0,

			rules: {
				input: [val => (val || '').length > 0 || 'This field is required']
			},
		}
	},
	created() {
		this.$store.dispatch("createControlPoint/getAllTypes")
		this.$store.dispatch("createControlPoint/getAllAttributesNames")
	},
	watch: {
		currentImage(image) {
			this.uploadImage(image)
		},
	},
	computed: {
		allTypes() {
			return this.$store.state.createControlPoint.allTypes
		},
		attributesChoice() {
			return this.$store.state.createControlPoint.attributesNames
		},
		descriptions() {
			return this.$store.state.createControlPoint.descriptions
		},
		type: {
			get() {
				return this.$store.state.createControlPoint.type
			},
			set(type) {
				this.$store.commit('createControlPoint/setType', type)
			}
		},
		value: {
			get() {
				return this.$store.state.createControlPoint.value
			},
			set(value) {
				this.$store.commit('createControlPoint/setValue', value)
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
	},
	methods: {
		// set computed property with v-model causes error on complex objects, see: https://vuex.vuejs.org/guide/forms.html
		descriptionChange(desc, index) {
			this.$store.commit('createControlPoint/setDescription', {desc: desc, index: index})
		},
		optionValueChange(option, index) {
			this.$store.commit('createControlPoint/setOptionValues', {option: option, index: index})
		},
		attributeChange(att, index, prop) {
			this.$store.commit(`createControlPoint/setAttribute${prop}`, {att: att, index: index})
		},
		codeChange(code, index) {
			this.$store.commit('createControlPoint/setCodes', {code: code, index: index})
		},


		uploadImage(image) {
			if (image) {
				this.previewImage = URL.createObjectURL(image);
			} else {
				this.previewImage = null
			}
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
			if (this.optionValues.length === 1) {
				alert("there must be at least one option for the options type")
			} else {
				this.$store.commit('createControlPoint/removeOptionValue', index)
			}
		},
		removeCodes(index) {
			if (this.codes.length === 1) {
				alert("control point must have at least one item category code")
			} else {
				this.$store.commit('createControlPoint/removeCode', index)
			}
		},
		removeAttribute(index) {
			this.$store.commit('createControlPoint/removeAttribute', index)
		},
		deleteControlPoint() {
			alert("this will work only on edit control point while reusing this component")
			// localStorage.clear()
			// window.location.reload()
		},
		// rules works only with v-model. However, v-model can not be used on complex state properties
		validate() {
			for (let el of this.$store.state.createControlPoint.attributes) {
				if (el.id === null || el.id === undefined || el.id === "") {
					alert("attribute name can not be empty")
					break;
				}
			}
			for (let el of this.$store.state.createControlPoint.codes) {
				if (el.value === null || el.value === undefined || el.value === "") {
					alert("code value can not be empty")
					break;
				}
			}
		},
		submit() {
			this.validate()
			if (this.$refs.controlPointForm.validate() === true) {
				this.$store.dispatch('createControlPoint/submitControlPoint', {
					descriptions: this.descriptions,
					type: this.type,
					value: this.value,
					optionValues: this.optionValues,
					attributes: this.attributes,
					codes: this.codes
				})
			}
		}
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
}

.image {
	max-width: 300pt;
	max-height: 300pt;
}

.buttons {
	width: 100%;
	float: left;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}
</style>
