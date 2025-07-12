export default {
	fetchFaq: async (filter) => {
		return await useClientRequest('/faqs' + filter);
	},
	fetchFaqCategories: async () => {
		return await useRequest('/faqs/category');
	},
}