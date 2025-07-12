<script setup>
	const props = defineProps({
		title: String,
		description: String,
	})
</script>

<template>
	<div class="the-title">
		<h1 class="the-title__title">
			{{ title }}
		</h1>
		<p
			v-if="description"
			class="the-title__description"
		>
			{{ description }}
		</p>
	</div>
</template>

<style lang='scss'>
	.the-title
	{
		padding: 0 20px;
		max-width: 610px;
		width: 100%;
		margin: 144px auto 48px auto;

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;

		@include mq($tablet)
		{
			margin: 184px auto 48px auto;
			gap: 16px;
		}
	}

	.the-title__title
	{
		font-weight: 400;
		font-size: 28px;
		line-height: 129%;
		letter-spacing: -0.01em;
		text-align: center;
		color: $black;

		@include mq($tablet)
		{
			font-size: 40px;
			line-height: 120%;
			letter-spacing: -0.02em;
		}
	}

	.the-title__description
	{
		font-weight: 400;
		font-size: 14px;
		line-height: 143%;
		letter-spacing: 0.01em;
		text-align: center;
		color: $secondaryLight;

		@include mq($tablet)
		{
			font-size: 20px;
			line-height: 140%;
		}
	}
</style>