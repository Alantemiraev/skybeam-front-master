export default {
	fetchCatalog: async (slug, page = 1, limit = 7, filter = '') => {
		return await useClientRequest(`/catalog/${slug}?page=${page}&limit=${limit}${filter}`);
	},
	fetchCatalogFilters: async (slug) => {
		return await useRequest(`/catalog/filters?slug=${slug}`);
	},
}