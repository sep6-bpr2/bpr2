<template>
	<div>
		<div>Control point {{ $route.params.id }}</div>
		<ControlPoint></ControlPoint>
	</div>
</template>

<script>
import ControlPoint from "../../../components/ControlPoint";
export default {
	components: {ControlPoint},
	created() {
		this.$store.dispatch("createControlPoint/getControlPointData", this.$route.params.id)
	}
};
</script>

<style></style>
