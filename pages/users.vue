<template>
	<div class="users">
		<h1><Translate :text="'User management'" /></h1>

		<button id="createUser" v-on:click="handleCreateUser">
			<Translate :text="'Create User'" />
		</button>

		<div style="display: flex">
			<CustomTable
				:allowedHeaders="allowedHeaders"
				:rows="userList"
				:tableHeaders="headers"
			/>
			<Transition>
				<div v-if="shouldCreateUser" class="create_User_form ml-5">
					<v-form ref="form">
						<h4>New User</h4>

						<v-text-field
							v-model="userName"
							id="usernameInput"
							:counter="10"
							:rules="userNameRules"
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
							color="#333"
							id="submitCreateUser"
							@click="submitCreateUser"
						>
							Submit
						</v-btn>

						<v-btn
							color="#333"
							id="cancelCreateUser"
							@click="cancelCreateUser"
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
import CustomTable from "../components/CustomTable";
import colors from "../styles/colors";
import login from "./login";
import { authorizeUser } from "../mixins/authorizeUser.js";

export default {
	name: "users",
	components: { CustomTable },
	mixins: [authorizeUser],
	data: () => ({
		cols: colors,
		users: [],
		roleValue: "",
		shouldCreateUser: false,
		userName: "",
		userNameRules: [(v) => !!v || "Name is required"],
		offset: 0,
		limit: 25,
	}),
	methods: {
		handleCreateUser() {
			this.shouldCreateUser = true;
		},
		submitCreateUser() {
			if (this.$refs.form.validate()) {
				let text =
					"You are about to create a user!\npress OK to continue";
				let user = { username: this.userName, role: this.roleValue };

				if (confirm(text) == true) {
					if (
						!this.userList.some(
							(userListVal) =>
								userListVal.username === user.username
						)
					) {
						this.$store.dispatch("users/createUser", user);
						alert("You have created a user!");
						this.shouldCreateUser = false;
						this.$refs.form.reset();
					} else {
						alert("User already exists!");
					}
				}
			}
		},
		cancelCreateUser() {
			let text = "Are you sure you want to cancel?\npress OK to continue";
			if (confirm(text) == true) {
				this.shouldCreateUser = false;
				this.$refs.form.reset();
			}
		},
		loadMoreUsers() {
			this.$store.dispatch("users/loadUsers", {
				offset: this.offset,
				limit: this.limit,
			});
		},
	},
	computed: {
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
		window.onscroll = () => {
			if (
				window.innerHeight + window.scrollY >=
				document.body.offsetHeight
			) {
				this.offset = this.offset + this.limit;
				this.loadMoreUsers();
				console.log("Reached the end of the list");
			}
		};
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
</style>
