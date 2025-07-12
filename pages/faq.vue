<script setup>
	// seo
	const { seoTitle, seoDesc, seoKeywords } = await useSeo('faq');

	useSeoMeta({
		title      : seoTitle,
		description: seoDesc,
		keywords   : seoKeywords,
	});

	// faq list functional
	const { faq } = useApi();
	const categories = ref(null);
	const selectedCategories = ref([]);
	const filter = ref('');

	const { data: faqArray, error, refresh, status } = await useAsyncData('faqs', () => faq.fetchFaq(filter.value));

	if (error.value)
		throw showError({ statusCode: error.value.statusCode || '404', statusMessage: error.value.message || 'произошла ошибка' });

	const fetchCategories = async () => {
		const { data, error } = await faq.fetchFaqCategories();

		if (error.value) {
			console.error(error.value);
			return;
		};

		categories.value = data.value.data;
	}
	await fetchCategories();

	const handleSelect = (val) => {
		selectedCategories.value = val;

		if (selectedCategories.value.length)
			filter.value = '?' + selectedCategories.value.map(id => `faqIds[]=${id}`).join('&');
		else
			filter.value = '';

		refresh();
	};

	// header functinal
	onMounted(() => {
		const headerStore = header();
		headerStore.changeType('black');
		headerStore.changeCurrentPage('Поддержка');
	});
</script>

<template>
	<div class="faq">
		<the-title :title="'Вопросы и ответы'" />
		<the-tabs
			v-if="Array.isArray(categories)"
			:tabs="categories"
			:selected="selectedCategories"
			@changeSelected="handleSelect"
		/>
		<div
			v-if="status !== 'pending' && Array.isArray(faqArray.data)"
			class="faq__items faq__container"
		>
			<faq-category
				v-for="(el, i) in faqArray.data"
				:key="i"
				:title="el.title"
				:items="el.faqs"
			/>
		</div>
		<div
			v-else
			class="faq__skeleton faq__container"
		>
			<div class="faq__skeleton-category">
				<ui-skeleton />
			</div>
			<div class="faq__skeleton-items">
				<ui-skeleton v-for="el in 5" :key="el" />
			</div>
		</div>
	</div>
</template>

<style lang='scss'>
	.faq__items
	{
		display: flex;
		flex-direction: column;
		gap: 60px;
	}

	.faq__skeleton
	{
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;

		.ui-skeleton { height: 60px; }
	}

	.faq__container
	{
		padding: 0 20px;
		max-width: 660px;
		width: 100%;
		margin: 0 auto 80px auto;

		@include mq($tablet) { margin: 0 auto 120px auto; }
	}

	.faq__skeleton-category
	{
		.ui-skeleton
		{
			border-radius: 4px;
			max-width: 240px;
			max-height: 20px;
		}
	}

	.faq__skeleton-items
	{
		display: flex;
		flex-direction: column;
		gap: 4px;

		.ui-skeleton
		{
			max-height: 60px;
			border-radius: 12px;
		}
	}
</style>