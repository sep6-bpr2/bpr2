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
				v-for="row in filteredRows"
				:key="Object.values(row)[0].toString()"
				v-on:click="clickList(row)"
			>
				<td
					v-for="[key, value] in Object.entries(row)"
					:key="key + value"
				>
					{{ value }}
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
	props: ["allowedHeaders", "rows", "tableHeaders", "callback"],
	computed: {
		filteredRows() {
			//Filter to only have the wanted headers shown in table
			let filtered = this.rows;
			const allowedHeaders = this.allowedHeaders;

			if (filtered) {
				for (let i = 0; i < filtered.length; i++) {
					for (const [key, value] of Object.entries(filtered[i])) {
						if (!allowedHeaders.includes(key)) {
							delete filtered[i][key];
						}
					}
				}
				return filtered;
			} else {
				return [];
			}
		},
	},
	methods: {
		clickList(row) {
			if (this.callback) this.callback(row);
		},
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
	border-bottom: 2px solid #333;
}

.customTable tbody tr:hover {
	background-color: #ccc;
	cursor: pointer;
}
</style>
