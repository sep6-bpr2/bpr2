export const header = {
	head() {
		return {
			title: this.currentUsername(),
		}
	},
	methods: {
		currentUsername(){
			if(this.$store.state.login.user){
				return this.$store.state.login.user.username
			}else{
				return 'Konfair'
			}
		}
	}
}
