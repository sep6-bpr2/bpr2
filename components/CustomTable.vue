<template>
	<table class="customTable">
		<tr>
			<th v-for="header in tableHeaders" :key="header.id">
				{{ header.name }}
			</th>
		</tr>
		<tr v-for="controlPoint in filteredRows" :key="controlPoint.id">
			<th
				v-for="[key, value] in Object.entries(controlPoint)"
				:key="key + value"
			>
				{{ value }}
			</th>
		</tr>
	</table>
</template>

<script>
export default {
	props: ["allowedHeaders", "rows", "tableHeaders"],
	computed: {
		filteredRows() {
			//Filter to only have the wanted headers shown in table
			let filtered = this.rows;
			const allowedHeaders = this.allowedHeaders;

			for (let i = 0; i < filtered.length; i++) {
				for (const [key, value] of Object.entries(filtered[i])) {
					if (!allowedHeaders.includes(key)) {
						delete filtered[i][key];
					}
				}
			}

			return filtered;
		},
	},
};
</script>

<style scoped>
.customTable th {
	color: black;
	padding: 1rem;
	border: 1px solid black;
}

.row {
	/* background-color: #555; */
	display: flex;
	flex-direction: row;
	justify-content: left;
}

.colum {
}
</style>
