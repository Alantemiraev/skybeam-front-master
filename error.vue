<script setup>
	const props = defineProps({ error: Object });

	const handleError = () => clearError({ redirect: '/' });
</script>

<template>
	<div class="error-layout">
		<div class="error-layout__logo">
			<icons-logo />
		</div>

		<h1 class="error-layout__title">{{ error.statusCode }}</h1>
		<p class="error-layout__text">ошибка: {{ error.statusMessage }}</p>

		<ui-button @click="handleError">
			Вернуться на главную
		</ui-button>
	</div>
</template>

<style lang="scss">
	.error-layout
	{
		padding: 20px;
		width: 100%;
		height: 100vh;
		background-color: $black;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 30px;
	}

	.error-layout__logo { line-height: 0; }

	.error-layout__title
	{
		color: $white;
		font-size: 96px;
	}

	.error-layout__text
	{
		color: $secondary;
		font-size: 20px;
	}
</style>