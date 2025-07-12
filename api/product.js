export default {
	fetchProduct: async (slug) => {
		return await useClientRequest(`/product/${slug}`);
	},
};