<script setup>
	// seo
	const { seoTitle, seoDesc, seoKeywords } = await useSeo('index');

	useSeoMeta({
		title      : seoTitle,
		description: seoDesc,
		keywords   : seoKeywords,
	});

	// slider functional
	const { slider } = useApi();
	const slides = ref(null);

	const fecthSlider = async () => {
		const { data, error } = await slider.fetchSlider();

		if (error.value)
			throw showError({ statusCode: error.value.statusCode || '404', statusMessage: error.value.message || 'произошла ошибка' });

		try {
			slides.value = data.value.data.map((el) => {
				const img = Array.isArray(el.picture) ? el.picture[0].path : '';

				return {
					id: el.id,
					title: el.title,
					link: el.link,
					img,
				};
			});
		}
		catch(e) {
			console.log(e);
			throw showError({ statusCode: error.value.statusCode || '404', statusMessage: error.value.message || 'произошла ошибка' });
		}
	};
	await fecthSlider();

	// header functinal
	onMounted(() => {
		const headerStore = header();
		headerStore.changeType('white');
		headerStore.changeCurrentPage('');
	});
</script>

<template>
	<div class="index-page">
		<HeroSection :slides="slides" />
	</div>
</template>