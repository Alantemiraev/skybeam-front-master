<script setup>
	const props = defineProps({
		img: String,
		title: String,
		description: String,
		slug: String,
	});

	const isOpen = ref(false);
	const route = useRoute()

	const openModal = () => {
		isOpen.value = true;
		navigateTo({
			query: {
				...route.query,
				product: props.slug
			}
		}, { replace: true });
	};

	const closeModal = () => {
		isOpen.value = false;
		const { product, ...restQuery } = route.query;
		navigateTo({
			query: restQuery
		}, { replace: true });
	};

	onMounted(() => {
		if (route.query.product === props.slug)
			isOpen.value = true;
	});
</script>

<template>
	<div class="product-card" @click="openModal">
		<img :src="img" :alt="title" class="product-card__img">

		<div class="product-card__wr">
			<h4 class="product-card__title">{{ title }}</h4>
			<span class="product-card__description">{{ description }}</span>
		</div>
	</div>
	<Teleport to="body">
		<transition>
			<product-popup
				v-if="isOpen"
				:slug="slug"
				@close="closeModal"
			/>
		</transition>
	</Teleport>
</template>

<style lang='scss'>
	.product-card
	{
		cursor: pointer;
		padding: 24px;
		background-color: $surface;
		border-radius: 16px;

		display: flex;
		flex-direction: column;
		gap: 32px;

		@include transition();

		@include mq($tablet)
		{
			padding: 40px;
			gap: 64px;
		}

		&:hover { scale: 0.99; }
	}

	.product-card__img
	{
		width: 100%;
		aspect-ratio: 1 / 1;
		object-fit: contain;
	}

	.product-card__wr
	{
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.product-card__title
	{
		font-weight: 450;
		font-size: 17px;
		line-height: 141%;
		letter-spacing: -0.01em;
		color: $black;

		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.product-card__description
	{
		font-weight: 400;
		font-size: 13px;
		line-height: 146%;
		color: $tertiaryLight;

		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>