export default {
	fetchSlider: async () => {
		return await useRequest('/sliders');
	},
}