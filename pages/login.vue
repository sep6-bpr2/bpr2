<template>
	<v-main>
		<AlertModal
			class="alert"
			v-if="notification"
			:id="1"
			:message="notification.message"
			:show="modalAlertShowSubmit"
			:status="notificationStatus"
			:closeCallback="closeAlertModal"
		/>
		<v-form ref="form">
			<v-card width="500" v-on:keyup.enter="hanldeLogin" class="mx-auto mt-9">
				<v-select
					id="selectLanguage"
					:items="allLanguages"
					v-model="language"
					prepend-icon="mdi-account-voice"
					class="px-4"
				>
					<template slot="selection" slot-scope="data">
						{{ data.item.name }}
						<flag :iso="data.item.flag" class="ml-1"/>
					</template>
					<template slot="item" slot-scope="data">
						{{ data.item.name }}
						<flag :iso="data.item.flag" class="ml-1"/>
					</template>
				</v-select>
				<v-divider></v-divider>
				<v-card-text>
					<v-text-field
						id="enterUsername"
						:rules="usernameRules"
						required
						v-model="username"
						v-bind:label="translateText('username')"
						prepend-icon="mdi-account-circle"
					/>
					<v-select
						id="selectLocation"
						required
						:rules="locationRules"
						:items="allLocations"
						v-model="location"
						v-bind:label="translateText('choose location')"
						prepend-icon="mdi-office-building"
					>
					</v-select>
				</v-card-text>

				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						id="submitLogin"
						v-on:click="hanldeLogin"
						:color="cols.KonfairPrimary"
						style="float: right"
					>
						<Translate :text="'Login'"
						/>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</v-main>
</template>

<script>
import colors from "../styles/colors";
import FlagIcon from "vue-flag-icon";
import Vue from "vue";
import Translate from "../components/Translate.vue";
import lanugages from "../store/languages";
import {authorizeUser} from "../mixins/authorizeUser.js"
import {header} from "../mixins/header";

Vue.use(FlagIcon);

export default {
	components: {
		Translate,
	},
	mixins: [authorizeUser,header],
	name: "LogIn",
	data: function () {
		return {
			modalAlertShowSubmit: false,
			modalAlertShowError: false,
			notification: null,
			cols: colors,
			username: "",
			canLogIn: false,
			usernameRules: [(v) => !!v || "Name is required"],
			locationRules: [(v) => !!v || "location is required"],
		};
	},
	mounted() {
		this.$store.dispatch("login/getLocations")
	},
	computed: {
		notificationStatus() {
			if (this.notification) {
				if (this.notification.response == 0) {
					return "danger";
				} else if (this.notification.response == 1) {
					return "success";
				} else if (this.notification.response == 2) {
					return "warning";
				} else {
					return "other";
				}
			}
		},
		allLocations() {
			return this.$store.state.login.allLocations;
		},
		location: {
			get() {
				return this.$store.state.login.chosenLocation;
			},
			set(newLocation) {
				this.$store.commit("login/setLocation", newLocation);
			},
		},
		allLanguages() {
			return this.$store.state.login.allLanguages;
		},
		language: {
			get() {
				return this.$store.state.login.chosenLanguage;
			},
			set(newLanguage) {
				this.$store.commit("login/setLanguage", newLanguage);
			},
		},
	},
	methods: {
		hanldeLogin() {
			if (this.$refs.form.validate() == true) {
				if (this.username != "") {
					return this.$store
						.dispatch("login/loginUser", {
							username: this.username,
						})
						.then((result) => {
							if (result === true) {
								if (
									this.$store.state.login.user.role == "admin"
								) {
									this.$router.push("/controlPoints");
								} else {
									this.$router.push("/releasedOrders");
								}
							} else if (result !== false) {
								this.notification = {response: 0, message: result}
								this.modalAlertShowSubmit = true
							}
						});
				}
			}
		},
		closeAlertModal(id) {
			this.modalAlertShowSubmit = false;
		},
		translateText(text) {
			return lanugages.translateFunction(
				text,
				this.$store.state.login.chosenLanguage.name
			);
		},
	},
};
</script>

<style>
.v-btn__content {
	color: white;
}
</style>
