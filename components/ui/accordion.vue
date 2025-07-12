<script setup>
	const props = defineProps({
		title: { type: String, required: true },
		variant: { type: String, }, // default, alternative
		remove: { type: Boolean, },
	});

	const active = ref(false);
	const contentHeight = ref('0px');
	const contentRef = ref(null);

	const toggleActive = async () => {
		active.value = !active.value;

		if (active.value) {
			await nextTick();
			contentHeight.value = `${contentRef.value.scrollHeight}px`;
		}
		else
			contentHeight.value = '0px';
	};
</script>

<template>
	<div
		class="ui-accordion"
		:class="{
			'active': active,
			'alternative': variant === 'alternative',
			'remove': remove,
		}"
	>
		<div class="ui-accordion__head" @click.stop="toggleActive">
			<span class="ui-accordion__head-title">
				{{ title }}
			</span>
			<div class="ui-accordion__head-icon" :class="{'active': active}">
				<icons-plus v-if="!variant" />
				<icons-arrow-right v-else />
			</div>
		</div>
		<div
			class="ui-accordion__content"
			:style="{ maxHeight: contentHeight }"
			ref="contentRef"
		>
			<slot />
		</div>
	</div>
</template>

<style lang='scss'>
	.ui-accordion
	{
		border-radius: 12px;
		background: #f7f7f5;
		@include transition();

		&.active { padding-bottom: 18px; }

		&.alternative
		{
			.ui-accordion__head { padding: 18px 16px; }
			.ui-accordion__content { padding: 0 16px; }

			.ui-accordion__head-icon
			{
				svg path { fill: $tertiaryLight }

				&.active
				{
					rotate: 90deg;
					svg path { fill: $black }
				}
			}
		}

		&.remove
		{
			.ui-accordion__content { padding: 0; }
		}

		&.active.alternative { padding-bottom: 16px; }
	}

	.ui-accordion__head
	{
		cursor: pointer;
		padding: 18px 16px 18px 24px;
		transition: 500ms;

		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}

	.ui-accordion__head-title
	{
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		letter-spacing: 0.01em;
		color: $black;
	}

	.ui-accordion__head-icon
	{
		position: relative;
		width: 24px;
		height: 24px;
		flex-shrink: 0;
		line-height: 0;
		@include transition();
		svg path { @include transition(); }

		&.active
		{
			rotate: -45deg;
			svg path { fill: $black; }
		}
	}

	.ui-accordion__content
	{
		max-width: 100%;
		overflow: hidden;
		padding: 0 16px 0 24px;

		display: flex;
		flex-direction: column;
		gap: 12px;
		transition: max-height 500ms ease, opacity 150ms ease;
		opacity: 0;
		max-height: 0;

		font-weight: 400;
		font-size: 14px;
		line-height: 143%;
		letter-spacing: 0.01em;
		color: $secondaryLight;

		.ui-accordion.active &
		{
			opacity: 1;
			transition: max-height 500ms ease, opacity 150ms ease 150ms;
		}
	}
</style>