<script setup>
	const props = defineProps({
		items: Array,
	});
</script>

<template>
	<div class="product-characteristics">
		<div
			v-for="(el, i) in items"
			:key="i"
			class="product-characteristics__item"
		>
			<span class="product-characteristics__item-title">{{ el.title }}</span>
			<span class="product-characteristics__item-value">{{ el.value }}</span>
		</div>
	</div>
</template>

<style lang='scss'>
	.product-characteristics
	{
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.product-characteristics__item
	{
		display: flex;
		flex-direction: column;
		gap: 2px;

		padding-bottom: 8px;
		border-bottom: 1px solid $dividerLight;

		&:last-child
		{
			padding-bottom: 0;
			border-bottom: 0;
		}
	}

	.product-characteristics__item-title
	{
		font-weight: 400;
		font-size: 12px;
		line-height: 133%;
		letter-spacing: 0.02em;
		color: $tertiaryLight;
	}

	.product-characteristics__item-value
	{
		font-weight: 400;
		font-size: 14px;
		line-height: 143%;
		letter-spacing: 0.01em;
		color: $black;
	}
</style>