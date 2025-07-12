<script setup>
	const viewport = useViewport();

	const props = defineProps({
		items: Array,
	});

	import 'swiper/css';
	import { Swiper, SwiperSlide } from 'swiper/vue';

	const options = ref({
		slidesPerView: 2.7,
		slidesOffsetBefore: 16,
		slidesOffsetAfter: 16,
		spaceBetween: 8,
	});
</script>

<template>
	<div class="product-markets">
		<div v-if="viewport.isLessThan('tablet')" class="product-markets__swiper">
			<swiper v-bind="options">
				<swiper-slide v-for="el in items" :key="el.id">
					<a
						:href="el.link"
						target="_blank"
					>
						<div class="product-markets__item">
							<div class="product-markets__item-wr">
								<div class="product-markets__item-icon">
									<img :src="el.img" :alt="el.title">
								</div>
								<div class="product-markets__item-inner">
									<h4 class="product-markets__item-title">{{ el.title }}</h4>
									<span class="product-markets__item-price">{{ formatPrice(el.price) }}</span>
								</div>
							</div>
							<button class="product-markets__item-button">Перейти</button>
							<div class="product-markets__item-icon-tablet">
								<icons-arrow-right />
							</div>
						</div>
					</a>
				</swiper-slide>
			</swiper>
		</div>
		<template v-else>
			<a
				v-for="el in items"
				:key="el.id"
				:href="el.link"
				target="_blank"
			>
				<div class="product-markets__item">
					<div class="product-markets__item-wr">
						<div class="product-markets__item-icon">
							<img :src="el.img" :alt="el.title">
						</div>
						<div class="product-markets__item-inner">
							<h4 class="product-markets__item-title">{{ el.title }}</h4>
							<span class="product-markets__item-price">{{ formatPrice(el.price) }}</span>
						</div>
					</div>
					<button class="product-markets__item-button">Перейти</button>
					<div class="product-markets__item-icon-tablet">
						<icons-arrow-right />
					</div>
				</div>
			</a>
		</template>
	</div>
</template>

<style lang='scss'>
	.product-markets
	{
		width: 100%;

		@include mq($tablet)
		{
			padding: 0 16px;
			display: flex;
			flex-direction: column;
			gap: 4px;
		}
	}

	.product-markets__swiper
	{
		width: 100%;
		display: grid;

		.swiper
		{
			width: 100%;
			max-width: 100%;
			max-height: 100vh;
			min-height: 0;
			min-width: 0;
		}
	}

	.product-markets__item
	{
		border-radius: 12px;
		padding: 12px;
		background-color: $white;

		&:hover
		{
			.product-markets__item-icon-tablet { svg path { fill: rgba(51, 51, 51, .7); } }
		}

		@include mq($tablet)
		{
			padding: 8px 12px;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.product-markets__item-wr
	{
		display: flex;
		flex-direction: column;
		gap: 16px;

		@include mq($tablet)
		{
			flex-direction: row;
			align-items: center;
			gap: 12px;
		}
	}

	.product-markets__item-inner
	{
		display: flex;
		flex-direction: column;
		margin-bottom: 8px;

		@include mq($tablet) { margin-bottom: 0; }
	}

	.product-markets__item-icon
	{
		flex-shrink: 0;
		width: 32px;
		height: 32px;
		border-radius: 100px;

		img
		{
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.product-markets__item-title
	{
		font-weight: 400;
		font-size: 12px;
		line-height: 133%;
		letter-spacing: 0.02em;
		color: $secondaryLight;
	}

	.product-markets__item-price
	{
		font-weight: 400;
		font-size: 14px;
		line-height: 143%;
		letter-spacing: 0.01em;
	}

	.product-markets__item-icon-tablet
	{
		display: none;
		line-height: 0;

		svg path
		{
			fill: $tertiaryLight;
			@include transition();
		}

		@include mq($tablet) { display: block; }
	}

	.product-markets__item-button
	{
		cursor: pointer;
		display: block;
		border: none;
		width: 100%;
		padding: 8px 16px;
		border: 1px solid $primary-10;
		background-color: transparent;
		border-radius: 1000px;
		font-weight: 400;
		font-size: 12px;
		line-height: 133%;
		letter-spacing: 0.02em;
		text-align: center;
		color: $black;

		@include mq($tablet)
		{
			display: none;
		}
	}
</style>