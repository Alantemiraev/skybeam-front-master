<template>
	<div class="huge-preloader">
		<div class="huge-preloader__spinner"></div>
	</div>
</template>

<style lang='scss'>
	.huge-preloader
	{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		z-index: 9999;
		background-color: $white;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.huge-preloader__spinner
	{
		width: 50px;
		height: 50px;
		border: 5px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: $black;
		animation: spin 1s ease-in-out infinite;
	}

	@keyframes spin { to { transform: rotate(360deg); } }
</style>