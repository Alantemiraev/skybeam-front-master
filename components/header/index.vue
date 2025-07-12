<script setup>
	// burger functional
	const isBurgerOpen = ref(false);
	const contentHeight = ref('0px');
	const contentRef = ref(null);

	const toggleBurger = async (val) => {
		if (val)
			isBurgerOpen.value = false;
		else
			isBurgerOpen.value = !isBurgerOpen.value;

		if (isBurgerOpen.value) {
			await nextTick();
			contentHeight.value = `${contentRef.value.scrollHeight}px`;
		}
		else
			contentHeight.value = '0px';
	}

	// scroll
	onMounted(() => {
		window.addEventListener('scroll', () => toggleBurger('close'));
	})

	// links
	const links = ref([
		{
			title: 'Видеодомофоны',
			link: '/catalog/videodomofony',
		},
		{
			title: 'Терморегуляторы',
			link: '/catalog/termoregulyatory',
		},
		{
			title: 'Удлинители',
			link: '/catalog/udliniteli',
		},
		{
			title: 'Поддержка',
			link: '/faq',
		},
		{
			title: 'Где купить?',
			link: '#',
		},
	]);

	// click outside
	import { onClickOutside } from '@vueuse/core';
	const headerRef = ref('');
	onClickOutside(headerRef, () => toggleBurger('close'))

	// store functional
	const headerStore = header();
</script>

<template>
	<div class="header-wr">
		<header
			class="header"
			ref="headerRef"
			:class="{'active': isBurgerOpen, 'black': headerStore?.type === 'black' }"
			@click.stop
		>
			<div class="header__top">
				<div class="header__top-wr">
					<div class="header__top-logo">
						<nuxt-link to="/" @click="toggleBurger('close')">
							<icons-logo />
						</nuxt-link>
					</div>

					<template v-if="headerStore?.currentPage">
						<div class="header__top-line" />
						<span class="header__top-page">
							{{ headerStore?.currentPage }}
						</span>
					</template>
				</div>

				<div
					class="header__top-burger"
					:class="{'active': isBurgerOpen }"
					@click="toggleBurger()"
				/>
			</div>

			<div
				ref="contentRef"
				class="header__nav-wr"
				:style="{ maxHeight: contentHeight }"
			>
				<nav class="header__nav">
					<nuxt-link
						v-for="(el, i) in links"
						:key="i"
						:to="el.link"
						@click="toggleBurger('close')"
					>
						<div class="header__nav-item">
							<div
								class="header__nav-item-icon header__nav-item-icon--active"
								:class="{'hidden': !$route.path.includes(el.link)}"
							>
								<icons-arrow-right />
							</div>
							<span class="header__nav-item-text">{{ el.title }}</span>
							<div class="header__nav-item-icon header__nav-item-icon--hover">
								<icons-arrow-right />
							</div>
						</div>
					</nuxt-link>
				</nav>
			</div>
		</header>
	</div>
</template>

<style lang='scss'>
	.header-wr
	{
		position: fixed;
		z-index: 10;
		top: 16px;
		left: 50%;
		transform: translateX(-50%);

		padding: 0 16px;
		max-width: 650px;
		width: 100%;

		@include mq($tablet) { top: 24px; }
	}

	.header
	{
		overflow: hidden;
		width: 100%;
		border-radius: 30px;
		backdrop-filter: blur(60px);
		background-color: $surfaceLight;
		transition: .5s all ease;

		&.black
		{
			background: rgba(217, 217, 217, 0.4);

			.header__top-logo { svg path { fill: $black; } }
			.header__nav-item-text { color: $secondary }
			.header__top-burger { &:before, &:after { background-color: $black; } }
			.header__nav-item-icon { &--hover { svg path { fill: $black; } } }
			.header__nav-item:hover { .header__nav-item-text { color: $black!important; } }
		}

		&.active
		{
			background: rgba(217, 217, 217, 0.4);
			border-radius: 24px;

			.header__top { margin-bottom: 15px; }
		}

		&.black.active
		{
			.header__top-logo { svg path { fill: $black; } }
			.header__top-burger { &:before, &:after { background-color: $black; } }
			.header__nav-item { border-color: $dividerLight; }
			.header__nav-item-text { color: $secondaryLight }
		}

		@include mq($tablet)
		{
			&.active
			{
				border-radius: 16px;

				.header__top { margin-bottom: 28px; }
			}
		}
	}

	// header top styles -------------
	.header__top
	{
		padding: 12px 20px 12px 24px;

		display: flex;
		align-items: center;
		justify-content: space-between;

		transition: .5s all ease;

		@include mq($tablet) { padding: 16px 24px 16px 32px; }
	}

	.header__top-wr
	{
		display: flex;
		align-items: center;
		gap: 8px;

		@include mq($tablet) { gap: 16px; }
	}

	.header__top-line
	{
		background-color: $dividerLight;
		width: 1px;
		height: 16px;
		transition: .5s all ease;

		@include mq($tablet) { height: 32px; }
	}

	.header__top-logo
	{
		line-height: 0;

		svg
		{
			width: 89px;
			height: 12px;
			
			path { transition: .5s all ease; }
		}

		@include mq($tablet)
		{
			svg
			{
				width: 126px;
				height: 18px;
			}
		}
	}

	.header__top-page
	{
		font-weight: 400;
		font-size: 12px;
		line-height: 150%;
		color: $tertiaryLight;
		transition: .5s all ease;

		@include mq($tablet) { font-size: 16px; }
	}

	.header__top-burger
	{
		cursor: pointer;
		width: 24px;
		height: 24px;
		line-height: 0;

		display: flex;
		align-items: center;
		justify-content: center;

		&:before, &:after
		{
			content: '';
			width: 15px;
			height: 2px;
			background: $white;

			position: absolute;
			transition: .5s all ease;
			will-change: transform;
		}

		&:before { transform: translateY(-2.5px); }
		&:after { transform: translateY(2.5px); }

		&.active
		{
			&:before { transform: translateY(0) rotate(45deg); }
			&:after { transform: translateY(0) rotate(-45deg); }
		}

		@include mq($tablet)
		{
			width: 32px;
			height: 32px;

			&:before, &:after
			{
				width: 20px;
			}
		}
	}

	// nav styles --------------------------
	.header__nav-wr { transition: .3s all ease; }
	.header__nav
	{
		overflow: hidden;
		padding: 0 24px 24px 24px;

		a:last-child
		{
			.header__nav-item
			{
				margin-bottom: 0;
				padding-bottom: 0;
				border-bottom: 0;
			}
		}

		.router-link-exact-active
		{
			cursor: auto;

			.header__nav-item-text { color: $tertiaryLight!important; }
			.header__nav-item-icon--active
			{
				opacity: 1;
				margin-right: 4px;
			}

			.header__nav-item:hover
			{
				.header__nav-item-text { color: $tertiaryLight!important; }
				.header__nav-item-icon--hover { opacity: 0; }
			}

			@include mq($tablet)
			{
				.header__nav-item-icon--active { margin-right: 4px; }
			}
		}

		@include mq($tablet) { padding: 0 32px 32px 32px; }
	}

	.header__nav-item
	{
		margin-bottom: 12px;
		padding-bottom: 12px;
		border-bottom: 1px solid $divider;

		display: flex;
		align-items: center;

		&:hover
		{
			.header__nav-item-text { color: $white!important; }

			.header__nav-item-icon--hover
			{
				opacity: 1;
				margin-left: 4px;
			}
		}

		@include mq($tablet)
		{
			margin-bottom: 20px;
			padding-bottom: 20px;

			&:hover
			{
				.header__nav-item-icon--hover { margin-left: 4px; }
			}
		}
	}

	.header__nav-item-icon
	{
		line-height: 0;
		opacity: 0;
		transition: all 0.3s ease;
		width: auto;

		svg
		{
			width: 16px;
			height: 16px;

			path { transition: .5s all ease; }
		}

		&--hover { svg path { fill: $white; } }
		&--active
		{
			opacity: 0;
			svg path { fill: $tertiaryLight; }
			&.hidden
			{
				opacity: 0;
				width: 0;
				margin: 0;
				transition: all 0.3s ease;
			}
		}

		@include mq($tablet)
		{
			svg
			{
				width: 24px;
				height: 24px;
			}
		}
	}

	.header__nav-item-text
	{
		font-weight: 400;
		font-size: 14px;
		line-height: 143%;
		letter-spacing: 0.01em;
		color: $secondary;

		transition: .5s all ease;

		@include mq($tablet)
		{
			font-size: 20px;
			line-height: 120%;
		}
	}

	// blur styles -------------------------
	.header-blur
	{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 8;

		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
	}
</style>