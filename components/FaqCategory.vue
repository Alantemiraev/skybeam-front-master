<script setup>
	const props = defineProps({
		title: String,
		items: Array,
	});
</script>

<template>
	<div class="faq-category">
		<h6 class="faq-category__title">
			{{ title }}
		</h6>
		<div class="faq-category__faqs">
			<ui-accordion
				v-for="(el, i) in items"
				:key="i"
				:title="el.question"
			>
				{{ el.answer }}
			</ui-accordion>
		</div>
	</div>
</template>

<style lang='scss'>
	.faq-category
	{
		display: flex;
		flex-direction: column;
		gap: 12px;

		@include mq($tablet) { gap: 24px; }
	}

	.faq-category__title
	{
		font-weight: 500;
		font-size: 12px;
		line-height: 133%;
		letter-spacing: 0.02em;
		color: rgba(102, 102, 102, 1);
	}

	.faq-category__faqs
	{
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
</style>