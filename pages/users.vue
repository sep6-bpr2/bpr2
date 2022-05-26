<template>
	<div class="users">
		<AlertModal
			class="alert"
			v-if="notification"
			:id="1"
			:message="notification.message"
			:show="modalAlertShowSubmit"
			:status="notificationStatus"
			:closeCallback="closeAlertModal"
		/>
		<h1>
			<Translate :text="'User management'"/>
		</h1>
		<button id="createUser" v-on:click="handleCreateUser">
			<Translate :text="'Create User'"/>
		</button>

	 <div style="display: flex; align-items:flex-start">
		 <CustomTable
			 :allowedHeaders="allowedHeaders"
			 :rows="userList"
			 :tableHeaders="headers"
			 :deleteRowCallback="deleteRowCallback"
             :scrolledToBottomCallback="loadMoreUsers"
		 />
		 <Transition >
			 <div style="min-height: 248px; display: table" v-if="shouldCreateUser" class="create_User_form ml-5">
				 <v-form ref="form">

						<v-text-field
							v-model="userName"
							id="usernameInput"
							:counter="10"
							:rules="userNameRules.concat(maxValRules)"

							label="Username"
							required
						></v-text-field>

						<v-select
							v-model="roleValue"
							id="roles"
							:items="roles"
							:rules="[(v) => !!v || 'Item is required']"
							label="Role"
							required
						>
						</v-select>

					 <v-btn
						 v-if="!shouldConfirm"
						 color="#333"
						 id="submitCreateUser"
						 @click="handleSubmitClick"
					 >
						 Submit
					 </v-btn>

						<v-btn
							v-if="shouldConfirm"
							color="#b22222"
							@click="handleConfirmClick"
						>
							confirm
						</v-btn>

						<v-btn
							color="#333"
							id="cancelCreateUser"
							@click="handleCancelClick"
						>
							Cancel
						</v-btn>
					</v-form>
				</div>
			</Transition>
		</div>

	</div>
</template>

<script>
import CustomTable from "../components/CustomTable.vue";
import colors from "../styles/colors";
import {authorizeUser} from "../mixins/authorizeUser.js"
import {translate} from "../mixins/translate";
import {alerts} from "../mixins/alerts";
import {header} from "../mixins/header";


export default {
	name: "users",
	components: {CustomTable},
	data: () => ({
		notification: null,
		modalAlertShowSubmit: false,
		modalAlertShowError: false,
		cols: colors,
		shouldConfirm: false,
		isConfirmed: "",
		users: [],
		roleValue: "",
		shouldCreateUser: false,
		userName: "",
		userNameRules: [(v) => !!v || "Name is required" ],
		maxValRules: [v => v.length <= 50 || 'Max 50 characters'],
		offset: 0,
		limit: 25,
	}),
	mixins: [authorizeUser, translate, alerts, header],
	methods: {
		handleCreateUser() {
			this.shouldCreateUser = true
		},
		handleSubmitClick() {
			if (this.$refs.form.validate()) {
				this.handleOperation("Are you sure you want to create a user?", "create")
			}
		},
		handleCancelClick() {
			this.handleOperation("Are you sure you want to cancel?", "cancel")

		},

		handleOperation(text, value) {
			this.shouldConfirm = true
			this.notification = {response: 2, message: text}
			this.modalAlertShowSubmit = true;
			this.isConfirmed = value
		},

		handleConfirmClick() {
			console.log(this.isConfirmed)
			if (this.isConfirmed === "create") {
				this.submitCreateUser()
			} else this.cancelCreateUser()
		},
		submitCreateUser() {
			let user = {username: this.userName, role: this.roleValue}
			if (!this.userList.some(userListVal => userListVal.username === user.username)) {
				this.$store
					.dispatch("users/createUser", user).then(result => {
					if (result) {
						this.notification = {response: 1, message: "User has been created"}
						this.modalAlertShowSubmit = true;
					} else {
						this.notification = {response: 0, message: "User cannot be created"}
						this.modalAlertShowSubmit = true;
					}
				})
				this.shouldCreateUser = false
				this.$refs.form.reset()
			} else {
				this.notification = {response: 0, message: "User already exists in System!"}
				this.modalAlertShowSubmit = true;
			}
			this.shouldConfirm = false
		},
		deleteRowCallback(row) {
			let user = {username: row.username, role: row.role}
			let currentUser = this.$store.state.login.user
			if (user.username === currentUser.username) {
				this.notification = {response: 0, message: "You cannot delete user with username: " + user.username}
				this.modalAlertShowSubmit = true;
			} else {
				if (confirm("Are you sure you want to delete user with username: " + row.username) == true) {

					this.$store.dispatch("users/deleteUser", user).then(result => {
						if (result) {
							this.notification = {
								response: 1,
								message: "You have successfully deleted user: " + user.username
							}
							this.$store.dispatch("users/loadUsers", {offset: 0,limit: this.limit})
						} else {
							this.notification = {
								response: 0,
								message: "You cannot delete user with username: " + user.username
							}
						}
						this.modalAlertShowSubmit = true;
					})
				}
			}
		},
		cancelCreateUser() {
			this.shouldCreateUser = false
			this.$refs.form.reset()
			this.shouldConfirm = false
		},
		closeAlertModal(id) {
			if (id == 1) this.modalAlertShowSubmit = false;
		},
		loadMoreUsers() {
            this.offset = this.offset + this.limit;
			this.$store.dispatch("users/loadUsers", {
				offset: this.offset,
				limit: this.limit,
			});
		},
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
		userList() {
			return this.$store.state.users.userList;
		},
		headers() {
			return this.$store.state.users.tableHeaders;
		},
		allowedHeaders() {
			return this.$store.state.users.allowedHeaders;
		},
		roles() {
			return this.$store.state.users.roles;
		},
	},
	mounted() {
		this.$store.dispatch("users/loadUsers", {
			offset: this.offset,
			limit: this.limit,
		});
	},
};
</script>

<style scoped>
.users {
	margin: 10px;
}

.users button {
	background-color: #333;
	color: white;
	border-radius: 5px;
	padding: 12px 15px;
	margin-top: 10px;
	margin-bottom: 10px;
}
.create_User_form {
	transition: ease-in;
	width: 400px;
	height: 242px;
	border: 1px solid #ddd;
	border-radius: 5px;
	padding: 10px;
}

.v-leave-active,
.v-enter-active {
	transition: 0.5s ease;
}
.v-enter {
	opacity: 0;
	transform: translate(0, -8%);
}
.v-leave-to {
	opacity: 0;
	transform: translate(0, -8%);
}

.alert{
	padding: 10px;
	width: 600px;
}

</style>
