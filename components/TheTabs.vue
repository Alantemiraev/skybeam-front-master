<script setup>
	const props = defineProps({
		tabs: Array,
		selected: Array,
	});

	const emit = defineEmits(['changeSelected']);

	const handleSelect = (id) => {
		const selectedCopy = props.selected;

		if(selectedCopy.includes(id)) {
			const idx = selectedCopy.findIndex((slectedId) => id === slectedId);
			selectedCopy.splice(idx, 1);
		}
		else
			selectedCopy.push(id);

		emit('changeSelected', selectedCopy);
	};
</script>

<template>
	<div class="the-tabs">
		<div class="the-tabs__inner">
			<ui-tab
				v-for="el in tabs"
				:key="el.id"
				:element="el"
				:is-active="selected.includes(el.id)"
				@trigger="handleSelect(el.id)"
			/>
		</div>
	</div>
</template>

<style lang='scss'>
	.the-tabs
	{
		margin-bottom: 24px;
		overflow-x: auto;

		&::-webkit-scrollbar { scrollbar-width: none; }

		@include mq($tablet) { margin-bottom: 96px; }
	}

	.the-tabs__inner
	{
		padding: 0 20px;
		min-width: max-content;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}
</style>