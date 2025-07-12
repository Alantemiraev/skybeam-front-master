<script setup>
	// usable stuff
	const props = defineProps(['slug']);
	const emit = defineEmits(['close']);
	const { product } = useApi();

	// variables
	const characteristics = ref(null);
	const instructions    = ref(null);
	const description     = ref(null);
	const isLoading       = ref(false);
	const category        = ref(null);
	const markets         = ref(null);
	const title           = ref(null);
	const imgs            = ref(null);
	const popupContent    = ref(null);
	const isScrolled      = ref(false);

	// functions
	const fetchProduct = async () => {
		const response = await product.fetchProduct(props.slug)
			.catch(() => false);

		if(!response) {
			useToast('error', 'Что-то пошло не так!')
			closePopup();
			return;
		};

		characteristics.value = Object.values(response.data.characteristics).map(el => ({
			title: el.title,
			value: el.value
		}));
		markets.value = response.data.market_places.map((el) => {
			const img = el.icon && el.icon.length ? el.icon[0].path : '';

			return {
				img,
				id: el.id,
				link: el.link,
				title: el.title,
				price: el.price,
			};
		});

		instructions.value = response.data.manuals;
		description.value  = response.data.description;
		category.value     = response.data.category;
		title.value        = response.data.title;
		imgs.value         = response.data.pictures.map((el) => el.path);
	};
	const closePopup = () => emit('close');

	const handleScroll = () => {
		if (!popupContent.value)
			return;

		const scrollTop = popupContent.value.scrollTop;
		const scrollThreshold = 5;

		if (scrollTop > scrollThreshold && !isScrolled.value)
			isScrolled.value = true;
		else if (scrollTop <= scrollThreshold && isScrolled.value)
			isScrolled.value = false;
	};

	onMounted(async () => {
		isLoading.value = true;
		await fetchProduct();
		isLoading.value = false;

		nextTick(() => {
			if (popupContent.value)
				popupContent.value.addEventListener('scroll', handleScroll);
		});
	});

	onBeforeUnmount(() => {
		if (popupContent.value)
			popupContent.value.removeEventListener('scroll', handleScroll);
	});
</script>

<template>
	<div
		class="product-popup"
		:class="{ 'full-width': isScrolled }"
		@click="closePopup"
	>
		<div
			class="product-popup__content"
			ref="popupContent"
			@click.stop
		>
			<template v-if="!isLoading">
				<div class="product-popup__content-wr">
					<div class="product-popup__content-mobile">
						<p class="product-popup__content-mobile-category">{{ category }}</p>
						<h3 class="product-popup__content-mobile-title">{{ title }}</h3>
					</div>
					<div class="product-popup__content-imgs">
						<img
							v-for="(el, i) in imgs"
							:key="i"
							:src="el"
							:alt="title"
						>
					</div>
					<div class="product-popup__content-info">
						<div class="product-popup__content-info-title-wr">
							<p class="product-popup__content-info-title-category">{{ category }}</p>
							<h3 class="product-popup__content-info-title">{{ title }}</h3>
						</div>
						<p class="product-popup__content-info-description">
							{{ description }}
						</p>
						<div class="product-popup__content-info-spoilers">
							<ui-accordion
								v-if="characteristics && characteristics.length"
								:title="'Характеристики'"
								:variant="'alternative'"
							>
								<product-characteristics :items="characteristics" />
							</ui-accordion>
							<ui-accordion
								v-if="markets && markets.length"
								:title="'Где купить'"
								:variant="'alternative'"
								:remove="true"
							>
								<product-markets :items="markets" />
							</ui-accordion>
							<ui-accordion
								v-if="instructions && instructions.length"
								:title="'Инструкция'"
								:variant="'alternative'"
							>
								<product-instructions :items="instructions" />
							</ui-accordion>
						</div>
					</div>
				</div>
			</template>
			<ui-preloader v-else />
			<div
				v-if="!isLoading"
				class="product-popup__content-close"
				@click="closePopup"
			>
				<icons-alt-close />
			</div>
		</div>
	</div>
</template>

<style lang='scss'>
	.product-popup
	{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;

		width: 100%;
		height: 100dvh;
		background-color: #00000060;
		padding: 0;
		box-sizing: border-box;

		@include transition();
		@include mq($tablet) { padding: 20px; }

		&:not(.full-width) { @include mq($tablet) { padding: 20px; } }

		&.full-width { padding: 0; }
	}

	.product-popup__content
	{
		position: relative;
		margin: 0 auto;
		width: 100%;
		height: 100%;
		background-color: $white;
		overflow-y: auto;
		transition: all .8s ease;

		@include mq($tablet) { border-radius: 20px; }

		.full-width &
		{
			max-width: 100%;
			border-radius: 0;
		}
	}

	.product-popup__content-close
	{
		line-height: 0;
		cursor: pointer;
		position: absolute;
		top: 16px;
		right: 16px;

		svg path { @include transition(); }
	}

	.product-popup__content-wr
	{
		width: 100%;
		display: grid;
		grid-template-columns: 1fr;

		@include mq($tablet)
		{
			grid-template-columns: repeat(3, 1fr);
			gap: 32px;
			padding: 32px;
		}
	}

	.product-popup__content-imgs
	{
		margin-bottom: 40px;
		padding: 0 20px;
		overflow-x: auto;
		display: flex;
		gap: 8px;

		&::-webkit-scrollbar { scrollbar-width: none; }

		img
		{
			flex-shrink: 0;
			border-radius: 16px;
			width: 320px;
			max-height: 420px;
			min-height: 420px;
			object-fit: contain;
			object-position: center;
			background-color: $surface;
		}

		@include mq($tablet)
		{
			margin-bottom: 0;
			padding: 0;
			flex-direction: column;
			gap: 16px;
			grid-column: 1 / 3;

			img
			{
				width: 100%;
				max-height: 620px;
				min-height: 620px;
			}
		}
	}

	.product-popup__content-mobile
	{
		padding: 0 20px;
		margin: 80px 0 32px 0;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;

		@include mq($tablet) { display: none; }
	}

	.product-popup__content-mobile-category
	{
		font-weight: 400;
		font-size: 12px;
		line-height: 133%;
		letter-spacing: 0.02em;
		text-align: center;
		color: $tertiaryLight;
	}

	.product-popup__content-mobile-title
	{
		font-weight: 400;
		font-size: 28px;
		line-height: 129%;
		letter-spacing: -0.01em;
		text-align: center;
	}

	.product-popup__content-info
	{
		position: sticky;
		top: 10px;
		height: max-content;
	}

	.product-popup__content-info-title-wr
	{
		display: none;

		@include mq($tablet)
		{
			margin-bottom: 16px;

			display: flex;
			flex-direction: column;
			gap: 16px;
		}
	}

	.product-popup__content-info-title-category
	{
		font-weight: 500;
		font-size: 12px;
		line-height: 167%;
		letter-spacing: -0.01em;
		color: $black;
	}

	.product-popup__content-info-title
	{
		font-weight: 400;
		font-size: 30px;
		line-height: 133%;
		color: $black;
	}

	.product-popup__content-info-description
	{
		padding: 0 20px;
		margin-bottom: 40px;
		font-weight: 400;
		font-size: 14px;
		line-height: 143%;
		letter-spacing: 0.01em;
		color: $secondaryLight;

		@include mq($tablet)
		{
			margin-bottom: 32px;
			padding: 0;
		}
	}

	.product-popup__content-info-spoilers
	{
		padding: 0 20px;
		margin-bottom: 80px;
		display: flex;
		flex-direction: column;
		gap: 4px;

		@include mq($tablet) { padding: 0; }
	}
</style>