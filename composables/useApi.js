import catalog from '@/api/catalog.js';
import product from '@/api/product.js';
import slider from '@/api/slider.js';
import faq from '@/api/faq.js';

export const useApi = () => {
	return {
		catalog,
		product,
		slider,
		faq,
	};
};