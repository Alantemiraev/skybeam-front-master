export const header = defineStore('header', {
	state: () => ({
		type: '',
		currentPage: '',
	}),
	actions: {
		changeType(type) {
			this.type = type;
		},
		changeCurrentPage(page) {
			this.currentPage = page;
		},
	},
});