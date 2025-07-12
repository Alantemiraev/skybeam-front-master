export const useSeo = async (slug) => {
	let object  = {};

	try {
		const { data } = await useRequest(`seo/${slug}`);

		object = {
			seoTitle   : data.value.data.seo_title || '',
			seoDesc    : data.value.data.seo_description || '',
			seoKeywords: data.value.data.seo_keywords || '',
		}

		return object;
	} catch {
		object = {
			seoTitle   : 'SKYBEAM',
			seoDesc    : 'SKYBEAM | description',
			seoKeywords: 'SKYBEAM | keywords',
		}

		return object;
	}

};