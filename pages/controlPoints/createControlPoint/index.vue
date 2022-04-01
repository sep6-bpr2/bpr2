<template>
	<div>
		<div class="column">
			<v-card class="card1">
				<h3>
					<Translate :text="'Main information'"/>
				</h3>
				<div class="cptName innerElement">
					<a>
						<Translate :text="'Name'"/>
					</a>
					<v-text-field
						v-model="name"
					/>
				</div>
			</v-card>

			<v-card class="card3">
				<h3>
					<Translate :text="'Relationship with category items and attributes'"/>
				</h3>
				<div class="innerElement">
					<a>
						Attributes
					</a>
					<div class="attributes"
						 v-for="(attribute, index) in attributes"
					>
						<v-card class="attribute"

						>
							<a>Name</a>
							<v-select
								:items="attributesChoice"
								v-model="attribute.name"
							/>
							<a>Value</a>
							<v-text-field
								v-model="attribute.value"
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
						v-on:click="newAttribute"
					>
						<v-icon>
							mdi-pencil-plus-outline
						</v-icon>
						new attribute
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
			>Delete Control Point
			</v-btn>
			<v-btn
				v-on:click="submit"
			>Submit
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
			attributes: [{name: '', value: 0}]
		}
	},
	mounted() {
		if (localStorage.cpName) this.name = localStorage.cpName
		if (localStorage.attributes) this.attributes = JSON.parse(localStorage.getItem("attributes"))
	},
	watch: {
		name(newName) {
			console.log("name: " + name)
			localStorage.cpName = newName
		},
		attributes(list) {
			console.log(list)
			localStorage.setItem("attributes", JSON.stringify(this.attributes))
		}
	},
	computed: {
		attributesChoice() {
			return ['length', 'width', 'label']
		}
	},
	methods: {
		newAttribute() {
			this.attributes.push({name: '', value: 0})
		},
		removeAttribute(index) {
			this.attributes.splice(index, 1)
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

a {
	margin-right: 5pt;
}

.cptName {
	display: flex;
	flex-direction: row;
	align-items: baseline;
}

.innerElement {
	margin: 5pt;
}

.attribute {
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
