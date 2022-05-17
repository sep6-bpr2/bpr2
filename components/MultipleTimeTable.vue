<template>
	<table class="customTable">
		<tbody>
			<tr 
                v-for="(column, index) in getColumns" 
                :key="index" 
                :id="'multipleTimeTable' + index"
            >
                <!-- This is the header. The style is because font is overriden and the border didnt work normaly -->
                <td 
                    :style="{'font-size': '1em', 'border-radius': getColumns.length == index+ 1 ?'0px 5px 0px 0px': '0px'}"
                    class="tableHeader"
                    :key="getTableHeaders[index].id.toString() + getTableHeaders[index].letter.toString()"
                    >
                    <Translate :text="getTableHeaders[index].letter" />
                </td>
				<td
					v-for="(cell, cellIndex) in column"
					:key="cellIndex + Object.values(cell)[0].toString()"
				>
					<div class="cell">
						<input
							v-if="cell.inputType == 3 || cell.inputType == 1"
							v-model="originalColumns[index - 1][cellIndex].answer"
							v-on:input="updateParent(index - 1, cellIndex)"
                            :style="{color: validated(index - 1, cellIndex), 'border-color': validated(index - 1, cellIndex)}"
                            :disabled="inputsDisabled != null && inputsDisabled"
                            :title="'Author: ' + originalColumns[index - 1][cellIndex].author"

						/>
						<select
							v-else-if="cell.inputType == 0"
							v-model="originalColumns[index - 1][cellIndex].answer"
							v-on:change="updateParent(index - 1, cellIndex)"
                            :style="{color: validated(index - 1, cellIndex), cursor: (inputsDisabled != null && inputsDisabled ? 'default': 'pointer')}"
                            :disabled="inputsDisabled != null && inputsDisabled"
                            :title="'Author: ' + originalColumns[index - 1][cellIndex].author"
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
							v-else-if="cell.inputType == -1"
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
	props: ["tableHeaders", "columns", "valueUpdateCallback", "inputsDisabled"],
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
							inputType: -2,
						});
					}

					newColumnList.push(column);
				}

				let numbersColumn = [];
				for (let i = 0; i < max; i++) {
					numbersColumn.push({
						inputType: -1,
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
table tbody{
    display: table;
}

table tbody tr {
    display: table-cell;
}

table thead tr {
    display: table-cell;
}

table tbody tr td{
    display: block;
}

.tableHeader{
    color: #ffffff;
	text-align: center;
    background-color: #333;
    font-size: 0.9em;
	font-family: sans-serif;
    font-weight: bold;
}


.customTable {
	border-collapse: collapse;
	font-size: 0.9em;
	font-family: sans-serif;
	min-width: 400px;
	border-radius: 5px 5px 0 0;
	overflow: hidden;
	margin: 5px;
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

.customTable tbody td:last-of-type {
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
	/* To align the select boxes with the input boxes */
	border-bottom: 2px solid transparent;
}
</style>
