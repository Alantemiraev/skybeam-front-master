<script setup>
	const props = defineProps({
		items: Array,
	});

	const getIcon = (el) => {
		if (el && el.length)
			return el[0].path;
		else
			return '';
	};
</script>

<template>
	<div class="product-instructions">
		<a
			v-for="el in items"
			:key="el.id"
			:href="el.link"
		>
			<div class="product-instructions__item">
				<span class="product-instructions__item-title">
					{{ el.title }}
				</span>
				<div class="product-instructions__item-icon">
					<img :src="getIcon(el.icon)" :alt="el.title">
				</div>
			</div>
		</a>
	</div>
</template>

<style lang='scss'>
	.product-instructions
	{
		padding: 12px 0;
		display: flex;
		flex-direction: column;
		gap: 12px;

		a:last-child
		{
			.product-instructions__item
			{
				border-bottom: 0;
				padding-bottom: 0;
			}
		}
	}

	.product-instructions__item
	{
		cursor: pointer;

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		border-bottom: 1px solid $dividerLight;
		padding-bottom: 12px;

		&:hover
		{
			.product-instructions__item-icon { scale: .95; }
		}
	}

	.product-instructions__item-title
	{
		font-weight: 400;
		font-size: 14px;
		line-height: 143%;
		letter-spacing: 0.01em;
	}

	.product-instructions__item-icon
	{
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		border-radius: 100px;

		display: flex;
		align-items: center;
		justify-content: center;

		background-color: $white;
		@include transition();

		img
		{
			width: 20px;
			height: 20px;
			object-fit: contain;
			object-position: center;
		}
	}
</style>