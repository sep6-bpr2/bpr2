<template>
	<div>Control point {{ $route.params.id }}</div>
</template>

<script>
import {authorizeUser} from "../../../mixins/authorizeUser.js"

export default {
    mixins: [authorizeUser],
};
</script>

<style></style>
