<template>
	<div class="frame">
		<div class="displayName">{{ name }}</div>
		<div class="displayData">{{ data }}</div>
	</div>
</template>

<script>
export default {
	props: ["name", "data"],
};
</script>

<style scoped>
.frame {
	display: flex;
	justify-content: left;
	align-items: center;
}

.displayName {
    width: 200px;
	padding: 10px;
    background: #333;
	color: #ffffff;
    border-radius: 5px 0px 0px 5px;
}

.displayData {
    width: 200px;
    padding: 10px;
    background: #f3f3f3;
    border-radius: 0px 5px 5px 0px;
}
</style>
