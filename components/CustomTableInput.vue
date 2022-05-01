<template>
	<table class="customTable">
		<thead>
			<tr>
				<th
					v-for="header in tableHeaders"
					:key="header.id.toString() + header.name.toString()"
				>
					<Translate :text="header.name" />
				</th>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="(row, index) in originalRows"
				:key="Object.keys(row)[0].toString() + index"
			>
				<td v-for="value in allowedHeaders" :key="value + index">
					<input
						v-if="value == 'answer' && (originalRows[index].type == 3 || originalRows[index].type == 1)"
						v-model="originalRows[index].answer"
                        v-on:input="updateParent(index)"
                        :style="{color: validated(index), 'border-color': validated(index)}"
					/>
					<select
						v-else-if="value == 'answer' && originalRows[index].type == 0"
						v-model="originalRows[index].answer"
                        v-on:change="updateParent(index)"
                        :style="{color: validated(index)}"
					>
						<option disabled selected value="">
							-- select an option --
						</option>
						<option
							v-for="option in originalRows[index].options"
							:key="value + index + option.value"
                            :value="option.value"
						>
							{{ option.value }}
						</option>
					</select>
					<button
						v-else-if="value == 'image'"
                        v-on:click="showImageCallback(originalRows[index].image)"
					>
						Show guide
					</button>
					<div v-else>{{ originalRows[index][value] }}</div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import Translate from "./Translate.vue";

export default {
	components: {
		Translate,
	},
	/**
	 * Needs:
	 *  Rows - that it is going to display (Just the raw objects)
	 *  Headers - that are going to be the name of the columns
	 *  AllowedHeaders - What headers to use. You may not want to use all keys from the data as headers
	 *  callback - what function to call if clicked on row. OPTIONAL
	 */
	props: ["allowedHeaders", "rows", "tableHeaders", "callback", "imageCallback", "valueUpdateCallback"],
	data() {
		return {
			originalRows: this.rows,
		};
	},
	methods: {
		clickList(row) {
			if (this.callback) this.callback(row);
		},
        showImageCallback(image){
            if (this.imageCallback) this.imageCallback(image);
        },
        updateParent(index){
            if(this.valueUpdateCallback){
                this.valueUpdateCallback(index, this.originalRows[index].answer)
            }
        },
        validated(index){
            if(this.originalRows[index].validated == null || this.originalRows[index].validated){
                return 'black'
            }else{
                return 'red'
            }
        }
	},
};
</script>

<style scoped>
.customTable {
	border-collapse: collapse;
	font-size: 0.9em;
	font-family: sans-serif;
	min-width: 400px;
	border-radius: 5px 5px 0 0;
	overflow: hidden;
    margin: 5px;
}

.customTable thead tr {
	color: #ffffff;
	text-align: left;
}

.customTable th {
	background-color: #333;
}

.customTable th,
.customTable td {
	padding: 12px 15px;
}

.customTable tbody tr {
	border-bottom: 1px solid #dddddd;
}

.customTable tbody tr:nth-of-type(even) {
	background-color: #f3f3f3;
}

.customTable tbody tr:last-of-type {
	border-bottom: 4px solid #333;
}
/* 
.customTable tbody tr:hover {
	background-color: #ccc;
	cursor: pointer;
} */

input {
    border-bottom: solid black 2px;
    padding-left: 1rem;
    padding-right: 1rem;
}

button {
    border: solid #333 2px;
	border-radius: 5px 5px 5px 5px;
    padding: 0.2rem;
    background: #333;
    color: #ffffff;
}

select {
	cursor: pointer;
}

</style>
