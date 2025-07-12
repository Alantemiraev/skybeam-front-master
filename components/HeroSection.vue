<script setup>
	const props = defineProps({
		slides: {
			type: Array,
			required: true,
		},
	});

	// swiper functional
	import 'swiper/css';
	import 'swiper/css/pagination';
	import { Pagination, Mousewheel } from 'swiper/modules';
	import { Swiper, SwiperSlide } from 'swiper/vue';

	const options = ref({
		speed: 500,
		mousewheel: {
			sensitivity: 1,
			thresholdDelta: 50,
		},
		breakpoints: {
			768:
			{
				direction: 'vertical',
				allowTouchMove: false,
			},
		},
		pagination: {
			el: '.hero-section__swiper-pagination',
			bulletClass: 'hero-section__swiper-pagination-bullet',
			bulletActiveClass: 'hero-section__swiper-pagination-bullet--active'
		},
		modules: [Pagination, Mousewheel],
	});
</script>

<template>
	<section class="hero-section">
		<div class="hero-section__swiper">
			<swiper
				v-bind="options"
			>
				<swiper-slide v-for="(el, i) in slides" :key="i">
					<div
						class="hero-section__swiper-item"
						:style="{ backgroundImage: `url(${el.img})` }"
					>
						<div class="hero-section__swiper-item-inner">
							<h2 class="hero-section__swiper-item-title">
								{{ el.title }}
							</h2>
							<nuxt-link :to="el.link">
								<ui-button>Смотреть все</ui-button>
							</nuxt-link>
						</div>
					</div>
				</swiper-slide>
			</swiper>

			<div class="hero-section__swiper-pagination" />
		</div>
	</section>
</template>

<style lang='scss'>
	.hero-section
	{
		width: 100%;
		height: 100dvh;

		@include mq($tablet) { height: 100dvh; }
	}

	.hero-section__swiper
	{
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;

		.swiper
		{
			width: 100%;
			height: 100%;
		}
	}

	.hero-section__swiper-item
	{
		user-select: none;

		width: 100%;
		height: 100%;
		padding: 20px;
		padding-bottom: 72px;

		background-color: black;
		background-repeat: no-repeat;
		background-size: cover;

		display: flex;
		align-items: end;
		justify-content: center;
	}

	.hero-section__swiper-item-inner
	{
		max-width: 400px;
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;

		@include mq($tablet) { max-width: 551px; }
	}

	.hero-section__swiper-item-title
	{
		font-weight: 300;
		font-size: 28px;
		line-height: 129%;
		letter-spacing: -0.01em;
		text-align: center;
		color: $white;

		@include mq($tablet)
		{
			font-size: 40px;
			line-height: 120%;
		}
	}

	// pagination styles -----------
	.hero-section__swiper-pagination
	{
		padding: 32px;

		position: absolute;
		z-index: 2;
		bottom: 0!important;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		width: 8px;

		@include mq($tablet)
		{
			right: 0!important;
			height: 100%;
			flex-direction: column;
		}
	}

	.hero-section__swiper-pagination-bullet
	{
		width: 8px;
		height: 8px;
		opacity: .3;
		border-radius: 12px;
		background: #d9d9d9;

		@include transition();

		&--active
		{
			width: 44px;
			opacity: 1;
		}

		@include mq($tablet)
		{
			&--active
			{
				width: 8px;
				height: 44px;
			}
		}
	}
</style>