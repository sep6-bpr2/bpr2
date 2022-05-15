<template>
	<v-app>
		<div>
			<Nav />
		</div>
		<v-main>
			<Nuxt />
		</v-main>
	</v-app>
</template>

<script>
import Nav from "../components/Nav.vue";

export default {
	components: {
		Nav,
	}
};
</script>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 1rem;
	line-height: 1.6;
	background: #fff;
}

a {
	color: #666;
	text-decoration: none;
}

ul {
	list-style: none;
}

.pageHeader{
	background-color: #555555;
	color: white;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 20pt;
	padding: 7pt;
}

.container {
	/* max-width: 800px; */
	/* margin: 2rem auto; */
	overflow: hidden;
	/*padding: 1rem 2rem;*/
	background: #fff;
}
</style>
