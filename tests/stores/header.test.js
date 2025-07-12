import { setActivePinia, createPinia } from 'pinia';
import { header } from '@/stores/header';

describe('Header Store', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it('Проверка начального состояния', () => {
		const store = header();
		expect(store.type).toBe('');
		expect(store.currentPage).toBe('');
	});

	describe('Actions', () => {
		it('changeType', async () => {
			const store = header();
			const originalType = store.type;
			const newType = 'black';

			await store.changeType(newType);

			expect(store.type).not.toBe(originalType);
			expect(store.type).toBe(newType);
			expect(store.type).toBeTypeOf('string');
		});

		it('changeCurrentPage', async () => {
			const store = header();
			const originalPage = store.currentPage;
			const newPage = 'Домофоны';

			await store.changeCurrentPage(newPage);

			expect(store.currentPage).not.toBe(originalPage);
			expect(store.currentPage).toBe(newPage);
			expect(store.type).toBeTypeOf('string');
		});
	});
});