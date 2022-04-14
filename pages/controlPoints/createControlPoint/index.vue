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
						v-for="description in descriptions"
					>
						<div class="innerElement row">
							<p>
								{{ description.lang }}
								<Translate :text="'Description'"/>
							</p>
							<v-text-field
								v-model="description.value"
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
								v-model="option.value"
								class="shrink"
								:rules="rules.input"
							/>
							<v-btn
								v-on:click="removeValue(index, optionValues)"
							>
								<v-icon>
									mdi-delete
								</v-icon>
							</v-btn>
						</div>
						<v-btn
							v-on:click="newValue(optionValues)"
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
									v-model="attribute.id"
									:rules="rules.number"
								/>
								<p>
									<Translate :text="'Min value'"/>
								</p>
								<v-text-field
									v-model="attribute.minValue"
									class="shrink"
								/>
								<p>
									<Translate :text="'Max value'"/>
								</p>
								<v-text-field
									v-model="attribute.maxValue"
									class="shrink"
								/>
								<v-btn
									v-on:click="removeValue(index, attributes)"
								>
									<v-icon>
										mdi-delete
									</v-icon>
								</v-btn>
							</v-card>
						</div>

						<v-btn
							v-on:click="newValue(attributes)"
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
									v-model="code.value"
									type="number"
									class="shrink"
									:rules="rules.input"
								/>
								<v-btn
									v-on:click="removeValue(index, codes)"
								>
									<v-icon>
										mdi-delete
									</v-icon>
								</v-btn>
							</v-card>
						</div>
						<v-btn
							v-on:click="newValue(codes)"
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
			descriptions: [{lang: "English", value: ""}, {lang: "Danish", value: ""}, {lang: "Lithuanian", value: ""}],
			type: '',
			value: null, // number or string
			optionValues: [{value: null}],// {value: '',}
			attributes: [],//{id: '', minValue: 0, maxValue: 0}
			codes: [{value: null}],

			rules: {
				input: [val => (val || '').length > 0 || 'This field is required'],
				number: [val => val !== '' || 'This field is required']
			},
		}
	},
	created() {
		this.$store.dispatch("createControlPoint/getAllTypes")
		this.$store.dispatch("createControlPoint/getAllAttributesNames")
	},
	mounted() {

		if (localStorage.descriptions) this.descriptions = JSON.parse(localStorage.getItem("descriptions"))
		if (localStorage.type) this.type = JSON.parse(localStorage.getItem("type"))
		if (localStorage.value) this.value = JSON.parse(localStorage.getItem("value"))
		if (localStorage.optionValues) this.optionValues = JSON.parse(localStorage.getItem("optionValues"))
		if (localStorage.attributes) this.attributes = JSON.parse(localStorage.getItem("attributes"))
		if (localStorage.codes) this.codes = JSON.parse(localStorage.getItem("codes"))
	},
	watch: {
		descriptions: {
			handler() {
				localStorage.setItem("descriptions", JSON.stringify(this.descriptions))
			},
			deep: true
		},
		type() {
			localStorage.setItem("type", JSON.stringify(this.type))
		},
		value() {
			localStorage.setItem("value", JSON.stringify(this.value))
		},
		optionValues: {
			handler() {
				localStorage.setItem("optionValues", JSON.stringify(this.optionValues))
			},
			deep: true
		},
		attributes: {
			handler() {
				localStorage.setItem("attributes", JSON.stringify(this.attributes))
			},
			deep: true
		},
		codes: {
			handler() {
				localStorage.setItem("codes", JSON.stringify(this.codes))
			},
			depp: true
		}
	},
	computed: {
		allTypes() {
			return this.$store.state.createControlPoint.allTypes
		},
		attributesChoice() {
			return this.$store.state.createControlPoint.attributesNames
		}
	},
	methods: {
		newValue(list) {
			list.push(list === this.attributes ?
				{id: '', minValue: null, maxValue: null} :
				{value: null})
		},
		removeValue(index, list) {
			if (list === this.codes & this.codes.length === 1) {
				alert("control point must have at least one item category code")
			} else if (list === this.optionValues & this.optionValues.length === 1) {
				alert("there must be at least one option for the options type")
			} else {
				list.splice(index, 1)
			}
		},
		deleteControlPoint() {
			alert("this will work only on edit control point while reusing this component")
			localStorage.clear()
			window.location.reload()
		},
		submit() {
			if (this.$refs.controlPointForm.validate() === true) {
				this.$store.dispatch(
					'createControlPoint/submitControlPoint',
					{
						descriptions: this.descriptions,
						type: this.type,
						value: this.value,
						optionValues: this.optionValues,
						attributes: this.attributes,
						codes: this.codes
					}
				)
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

.buttons {
	width: 100%;
	float: left;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}
</style>
