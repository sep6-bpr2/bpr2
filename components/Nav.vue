<template>
	<header :color="cols.KonfairPrimary" class="header">
		<h1 class="title">KONFAIR</h1>
		<div>
			<ul>
				<li v-for="link in links" :key="link.id">
					<nuxt-link
                        :id="'nav'+link.id"
						:to="{ path: link.link }"
						v-bind:style="[
							currentLinkName == link.link
								? { 'background-color': cols.KonfairPrimary }
								: {},
						]"
						><Translate :text="link.name"
					/></nuxt-link>
				</li>
			</ul>
		</div>
		<button v-on:click="logout" style="margin-left: auto" :style="{ display: show }" >
			<Translate :text="'Logout'" />
		</button>
	</header>
</template>

<script>
import colors from "../styles/colors";
import Translate from "./Translate.vue";

export default {
	components: {
		Translate,
	},
	name: "Nav",
	data: function () {
		return {
			cols: colors,
			links: [],
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
			this.$store.dispatch("nav/logout");
            localStorage.clear()
			this.$router.push("/login");
		},
	},
	computed: {
		allLinks() {
			this.links = this.$store.state.nav.availableLinks;
			return this.$store.state.nav.availableLinks;
		},
		show() {
            if (this.$store.state.login.user){
                return 'inline'
            }else{
                return 'none'
            }
		},
		//For handling selected page
		currentLinkName() {
			const paths = this.$nuxt.$route.path.split("/");
			return "/" + paths[1];
		},
	},
    watch: {
		"$store.state.nav.availableLinks": function () {
			this.links = this.$store.state.nav.availableLinks;
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
	height: 64px;
}

.header a {
	color: #fff;
	height: 64px;
	width: 150px;
	padding: 0.3rem 0.3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.header button {
	color: #fff;
	height: 64px;
	width: 150px;
	padding: 0.3rem 0.3rem;
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
