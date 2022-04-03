<template>
	<div>
		<div class="column">
			<v-card class="card1">
				<h3>
					<Translate :text="'Main information'"/>
				</h3>
				<div class="innerElement row">
					<p>
						<Translate :text="'Name'"/>
					</p>
					<v-text-field
						v-model="name"
					/>
				</div>

				<div class="innerElement row">
					<p>
						<Translate :text="'Type'"/>
					</p>
					<v-select
						:items="allTypes"
						v-model="type"
					/>
				</div>


				<div class="innerElement row">
					<p>
						<Translate :text="'Value'"/>
					</p>
					<v-text-field
						
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
									v-model="attribute.name"
								/>
								<p>
									<Translate :text="'Min value'"/>
								</p>
								<v-text-field
									v-model="attribute.minValue"
								/>
								<p>
									<Translate :text="'Max value'"/>
								</p>
								<v-text-field
									v-model="attribute.maxValue"
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


	</div>
</template>

<script>
import Translate from "../../../components/Translate";

export default {
	name: "index",
	components: {Translate},
	data: () => {
		return {
			name: "",
			allTypes: ['number', 'text', 'options'],
			type: '',
			value: null, // number or string
			optionValues: [],// {value: '',}
			attributes: [],//{name: '', minValue: 0, maxValue: 0}
			codes: [{value: null}]
		}
	},
	mounted() {
		if (localStorage.cpName) this.name = localStorage.cpName
		if (localStorage.attributes) this.attributes = JSON.parse(localStorage.getItem("attributes"))
	},
	watch: {
		name(newName) {
			localStorage.cpName = newName
		},
		attributes(list) {
			localStorage.setItem("attributes", JSON.stringify(this.attributes))
		}
	},
	computed: {
		attributesChoice() {
			return ['length', 'width', 'label']
		}
	},
	methods: {
		newValue(list) {
			list.push({name: '', value: 0})
		},
		removeValue(index, list) {
			list.splice(index, 1)
		},
		deleteControlPoint() {
			alert("this will work only on edit control point while reusing this component")
		},
		submit() {
			// push stuff to db
			// check if successful
			localStorage.clear()
			// navigate to control points page
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
