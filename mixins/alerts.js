export const alerts = {
	// for html element check https://vuetifyjs.com/en/components/alerts/#type
	data: ()=> ({
		successAlert: {show: false, text: ''},
		warningAlert: {show: false, text: ''},
		//info
		//error
	}),
	methods: {
		showAlert(type, text) {
			switch (type) {
				case 'warning':
					this.warningAlert.show = true
					this.warningAlert.text = text
					setTimeout(() => {
						this.warningAlert.show = false
					}, 2000);
					break;
				case 'success':
					this.successAlert.show = true
					this.successAlert.text = text
					setTimeout(() => {
						this.successAlert.show = false
					}, 2000);
			}
		}
	}
}
