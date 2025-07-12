<script setup>
	// if page loading
	const nuxtApp = useNuxtApp();
	const loading = ref(false);

	nuxtApp.hook("page:start", () => loading.value = true);
	nuxtApp.hook("page:finish", () => {
		loading.value = false;
		getScrollWidth();
	});

	const route = useRoute();
</script>

<template>
	<div class="default-layout">
		<Header />
		<main>
			<NuxtPage />
		</main>
		<Footer v-if="route.path !== '/'" />
	</div>

	<Teleport to="body">
		<HugePreloader v-if="loading" />
	</Teleport>
</template>

<style lang="scss">
	.default-layout
	{
		display: flex;
		flex-direction: column;
		min-height: 100vh;

		main { flex: 1; }
	}
</style>