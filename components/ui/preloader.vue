<template>
    <div class="ui-preloader">
		<div class="ui-preloader__spinner"></div>
    </div>
</template>

<style lang='scss'>
    .ui-preloader
    {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
    }

	.ui-preloader__spinner
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