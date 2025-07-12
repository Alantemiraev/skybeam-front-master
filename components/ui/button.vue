<script setup>
	const props = defineProps({
		disabled: Boolean,
	});
</script>

<template>
	<button
		class="ui-button"
		:disabled="disabled"
	>
		<slot />
	</button>
</template>

<style lang='scss'>
	.ui-button
	{
		// base styles
		cursor: pointer;
		width: max-content;
		border: none;
		border-radius: 100px;
		padding: 18px 28px;
		backdrop-filter: blur(80px);
		background: rgba(108, 108, 108, 0.32);

		font-weight: 300;
		font-size: 14px;
		line-height: 100%;
		letter-spacing: 0.01em;
		color: $white;

		@include transition();
		// effects
		&:disabled
		{
			pointer-events: none;
			opacity: .7;
		}
		&:hover { opacity: .9; }
	}
</style>