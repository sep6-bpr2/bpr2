<template>
	<table class="customTable">
		<thead>
			<tr>
				<th
					v-for="header in getHeaders"
					:key="header.id.toString() + header.letter.toString()"
				>
					<Translate :text="header.letter" />
				</th>
			</tr>
		</thead>
		<tbody>
			<td v-for="(column, index) in getColumns" :key="index">
				<tr
					v-for="(cell, cellIndex) in column"
					:key="cellIndex + cell.id"
				>
					<div class="cell">
						<input
							v-if="cell.type == 3 || cell.type == 1"
							v-model="originalColumns[index][cellIndex].answer"
                            v-on:input="updateParent(index, cellIndex)"
						/>
						<select
							v-else-if="cell.type == 0"
                            v-model="originalColumns[index][cellIndex].answer"
                            v-on:change="updateParent(index, cellIndex)"
						>
							<option disabled selected value="">
								-- select an option --
							</option>
							<option
								v-for="option in getHeaders[index].options"
								:key="index + option.value"
                                :value="option.value"
							>
								{{ option.value }}
							</option>
						</select>
					</div>
				</tr>
			</td>
		</tbody>
	</table>
</template>

<script>
import Translate from "./Translate.vue";

export default {
	components: {
		Translate,
	},
	props: ["tableHeaders", "columns", "valueUpdateCallback"],
	data() {
		return {
			originalColumns: this.columns,
		};
	},
	computed: {
		getColumns() {
			if (this.columns) {
				return this.columns;
			} else {
				return [];
			}
		},
		getHeaders() {
			if (this.tableHeaders) {
				return this.tableHeaders;
			} else {
				return [];
			}
		},
	},
    methods: {
        updateParent(columnIndex, cellIndex){
            this.valueUpdateCallback(columnIndex, cellIndex, this.originalColumns[columnIndex][cellIndex].answer)
        }
    }
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
	text-align: center;
}

.customTable th {
	background-color: #333;
}

.customTable thead th,
.customTable thead td {
	padding: 12px 15px;
}
.cell {
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

input {
    border-bottom: 2px solid #333;
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
    /* To align the select boxes with the input boxes */
    border-bottom: 2px solid transparent;
}

</style>
