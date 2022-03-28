<template>
	<header :color="cols.KonfairPrimary" class="header">
		<h1 class="title">KONFAIR</h1>
		<ul>
			<li v-for="link in allLinks" :key="link.id">
				<nuxt-link :to="{ path: link.link }">{{ link.name }}</nuxt-link>
			</li>
		</ul>
		<nuxt-link
			:to="{ path: '/login' }"
			style="margin-left: auto"
			v-if="user"
			@click="logout"
			>Log out</nuxt-link
		>
	</header>
</template>

<script>
import colors from "../styles/colors";

export default {
	name: "Nav",
	data: function () {
		return {
			cols: colors,
		};
	},
	created() {
		this.loadLinks();
	},
	methods: {
		loadLinks() {
			this.$store.dispatch("nav/loadLinks");
		},
		logout() {
			console.log("LOGOUT HANDLER");

			this.$store.dispatch("nav/logout");
		},
	},
	computed: {
		allLinks() {
			return this.$store.state.nav.availableLinks;
		},
		user() {
			return this.$store.state.login.user;
		},
	},
};
</script>

<style>
.header {
	display: flex;
	justify-content: left;
	align-items: center;
	background: #333;
}

.header .title {
	font-size: 3rem;
	color: #fff;
}

.title {
	padding: 0.3rem 2rem;
	margin-right: 2rem;
}

.header ul {
	display: flex;
}

.header a {
	color: #fff;
	height: 64px;
	width: 100px;
	padding: 0.3rem 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.header a:hover {
	background: #555;
	color: #fff;
}
</style>
