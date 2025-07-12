<script setup>
	import { useDebounceFn, useIntersectionObserver } from '@vueuse/core';

	// catalog functional
	const { catalog } = useApi();

	const selectedFilters = ref([]);
	const currentFilter   = ref('');
	const categorySlug    = useRoute().params.category;
	const currentPage     = ref(1);
	const totalPages      = ref(1);
	const isLoading       = ref(false);
	const category        = ref(null);
	const filters         = ref(null);
	const items           = ref([]);

	const fetchCatalog = async () => {
		if(currentPage.value > totalPages.value)
			return;

		isLoading.value = true;
		const response = await catalog.fetchCatalog(categorySlug, currentPage.value, 6, currentFilter.value)
			.catch(() => false);
		isLoading.value = false;

		if(!response)
			throw showError({ statusCode: '404', statusMessage: 'произошла ошибка' });

		currentPage.value += 1;
		totalPages.value  =  response.data.last_page;
		category.value    =  response.data.category;

		if (response.data.items.length) {
			items.value.push(...response.data.items.map((el) => {
				const img = el.pictures && el.pictures.length ? el.pictures[0].path : '';

				return {
					img,
					id: el.id,
					slug: el.slug,
					title: el.title,
					description: el.description,
				};
			}));
		};
	}
	await fetchCatalog();

	useSeoMeta({
		title      : category.value.seo_title || 'SKYBEAM | Категория. Список продукции',
		description: category.value.seo_description || 'SKYBEAM | Категория. Список продукции',
		keywords   : category.value.seo_keywords || 'SKYBEAM | Категория. Список продукции',
	});

    // filters functional
	const fetchCatalogFilters = async () => {
		const { data, error } = await catalog.fetchCatalogFilters(categorySlug);

		if(error.value) {
			console.log(error.value);
			return;
		};

		filters.value = data.value.data;
	};
	await fetchCatalogFilters();

	const handleSelect = useDebounceFn(async (val) => {
		items.value = [];
		currentPage.value = 1;
		selectedFilters.value = val;

		if (selectedFilters.value.length)
			currentFilter.value = '&' + selectedFilters.value.map(id => `filters[]=${id}`).join('&');
		else
			currentFilter.value = '';

		await fetchCatalog();
	}, 300);

	// pagination functional
	const paginationRef = ref(null);
	useIntersectionObserver(
		paginationRef,
		async ([entry]) => {
			if(entry?.isIntersecting || false && !isLoading.value)
				await fetchCatalog();
		},
	);

    // header functinal
	onMounted(() => {
		const headerStore = header();
		headerStore.changeType('black');
		headerStore.changeCurrentPage(category.value.title);
	});
</script>

<template>
    <div class="category">
        <the-title :title="category.title" :description="category.description" />
		<the-tabs
			v-if="filters && filters.length"
			:tabs="filters"
			:selected="selectedFilters"
			@changeSelected="handleSelect"
		/>
        <div class="container">
            <div class="category__items">
				<template v-if="items && items.length">
					<product-card
						v-for="el in items"
						:key="el.id"
						:img="el.img"
						:title="el.title"
						:slug="el.slug"
						:description="el.description"
					/>
				</template>
				<template v-if="isLoading">
					<ui-skeleton v-for="el in 6" :key="el" />
				</template>
            </div>
			<div v-if="!isLoading" ref="paginationRef" class="category__observer" />
        </div>
		<h3 v-if="items && !items.length && !isLoading" class="category__empty">
			В этой категории пока нет товаров.
		</h3>
    </div>
</template>

<style lang='scss'>
	.category
	{
		padding-bottom: 80px;

		@include mq($tablet) { padding-bottom: 120px; }
	}

    .category__items
    {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
        justify-content: center;
        gap: 8px;

		.ui-skeleton { min-height: 500px; }

        @include mq($tablet) { gap: 24px; }
    }

	.category__observer
	{
		height: 1px;
		background-color: transparent;
	}

	.category__empty
	{
		text-align: center;
		font-size: 20px;
		font-weight: 400;
		color: $black;
	}
</style>