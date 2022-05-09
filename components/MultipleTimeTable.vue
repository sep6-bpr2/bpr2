<template>
	<table class="customTable">
		<thead>
			<tr>
				<th
					v-for="header in getTableHeaders"
					:key="header.id.toString() + header.letter.toString()"
				>
					<Translate :text="header.letter" />
				</th>
			</tr>
		</thead>
		<tbody>
			<td 
                v-for="(column, index) in getColumns" 
                :key="index" 
                :id="'multipleTimeTable' + index"
            >
				<tr
					v-for="(cell, cellIndex) in column"
					:key="cellIndex + Object.values(cell)[0].toString()"
				>
					<div class="cell">
						<input
							v-if="cell.type == 3 || cell.type == 1"
							v-model="originalColumns[index - 1][cellIndex].answer"
							v-on:input="updateParent(index - 1, cellIndex)"
                            :style="{color: validated(index - 1, cellIndex), 'border-color': validated(index - 1, cellIndex)}"
						/>
						<select
							v-else-if="cell.type == 0"
							v-model="originalColumns[index - 1][cellIndex].answer"
							v-on:change="updateParent(index - 1, cellIndex)"
                            :style="{color: validated(index - 1, cellIndex)}"
						>
							<option disabled selected value="">
								-- select an option --
							</option>
							<option
								v-for="option in tableHeaders[index - 1]
									.options"
								:key="index + option.value"
								:value="option.value"
							>
								{{ option.value }}
							</option>
						</select>
						<input
							v-else-if="cell.type == -1"
							class="number"
							disabled
							:value="cell.answer"
							:style="{
								'border-bottom': '2px solid transparent',
								width: '57px',
								color: 'black',
							}"
						/>
						<input
							v-else
							disabled
							:style="{
								'border-bottom': '2px solid transparent',
							}"
						/>
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
				let oldColumns = JSON.parse(JSON.stringify(this.columns));
				let max = 0;

				for (let i = 0; i < oldColumns.length; i++) {
					if (oldColumns[i].length > max) {
						max = oldColumns[i].length;
					}
				}

				let newColumnList = [];
				for (let i = 0; i < oldColumns.length; i++) {
					// Add enough data to the columns that are below max. This way all the columns are at the same level in the table
					let column = oldColumns[i];
					let iterations = max - column.length;

					for (let j = 0; j < iterations; j++) {
						column.push({
							type: -2,
						});
					}

					newColumnList.push(column);
				}

				let numbersColumn = [];
				for (let i = 0; i < max; i++) {
					numbersColumn.push({
						type: -1,
						answer: i + 1,
					});
				}
				newColumnList.unshift(numbersColumn);

				return newColumnList;
			}else{
                return [];
            }
		},
		getTableHeaders() {
			if (this.tableHeaders) {
				let oldHeaders = JSON.parse(JSON.stringify(this.tableHeaders));

				oldHeaders.unshift({
					id: -1,
					letter: "No.",
				});

				return oldHeaders;
			} else {
				return [];
			}
		},
	},
	methods: {
		updateParent(columnIndex, cellIndex) {
			this.valueUpdateCallback(
				columnIndex,
				cellIndex,
				this.originalColumns[columnIndex][cellIndex].answer
			);
		},
        validated(columnIndex, cellIndex){
            if(this.originalColumns[columnIndex][cellIndex].validated == null || this.originalColumns[columnIndex][cellIndex].validated == 1){
                return 'black'
            }else if (this.originalColumns[columnIndex][cellIndex].validated == 2){
                return 'DarkOrange'
            }else if (this.originalColumns[columnIndex][cellIndex].validated == 0){
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

.cell input {
	border-bottom: 2px solid #333;
	padding-left: 1rem;
	padding-right: 1rem;
}

.cell button {
	border: solid #333 2px;
	border-radius: 5px 5px 5px 5px;
	padding: 0.2rem;
	background: #333;
	color: #ffffff;
}

.cell select {
	cursor: pointer;
	/* To align the select boxes with the input boxes */
	border-bottom: 2px solid transparent;
}
</style>
