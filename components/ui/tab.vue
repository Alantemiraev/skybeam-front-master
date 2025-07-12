<script setup>
	const props = defineProps({
		element: Object,
		isActive: Boolean,
	});

	const emit = defineEmits(['trigger']);

	const trigger = () => emit('trigger', props.element.id);
</script>

<template>
	<div
		class="ui-tab"
		:class="{ 'ui-tab--active': isActive }"
		@click="trigger"
	>
		<span class="ui-tab__text">
			{{ element.title }}
		</span>
		<div class="ui-tab__icon">
			<icons-close />
		</div>
	</div>
</template>

<style lang='scss'>
	.ui-tab
	{
		cursor: pointer;
		padding: 8px 20px;
		background-color: $surface;
		border-radius: 100px;

		display: flex;
		align-items: center;

		transition: .3s all ease;

		&:hover { opacity: .8; }

		&--active
		{
			background-color: $black;
			padding: 8px 8px 8px 20px;

			.ui-tab__text { color: $white; }
			.ui-tab__icon
			{
				scale: 1;
				margin-left: 4px;
				width: 32px;
			}

			&:hover
			{
				opacity: 1;

				.ui-tab__icon
				{
					svg path
					{
						fill: $white;
					}
				}
			}
		}
	}

	.ui-tab__icon
	{
		width: 32px;
		flex-shrink: 0;
		scale: 0;
		width: 0;
		line-height: 0;
		transition: .3s all ease;

		svg path { transition: .3s all ease; }
	}

	.ui-tab__text
	{
		user-select: none;
		font-weight: 400;
		font-size: 16px;
		line-height: 175%;
		letter-spacing: -0.01em;
		color: $black;

		transition: .3s all ease;
	}
</style>