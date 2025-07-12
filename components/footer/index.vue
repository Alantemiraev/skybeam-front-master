<script setup>
	const navigation = ref([
		{
			title: 'Компания',
			items: [
				{
					title: 'Контакты',
					link: '',
				},
				{
					title: 'Обратная связь',
					link: '',
				},
			]
		},
		{
			title: 'Продукты',
			items: [
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
			]
		},
		{
			title: 'Поддержка',
			items: [
				{
					title: 'Точки продаж',
					link: '',
				},
				{
					title: 'Вопросы и ответы',
					link: '/faq',
				},
				{
					title: 'Написать в поддержку',
					link: '',
				},
			]
		},
		{
			title: 'Партнёрам',
			items: [
				{
					title: 'Логотип и брендбук',
					link: '',
				},
			]
		},
	])
</script>

<template>
	<footer class="footer">
		<div class="container">
			<nuxt-link to="/">
				<div class="footer__logo">
					<icons-logo />
				</div>
			</nuxt-link>

			<nav class="footer__nav">
				<div
					v-for="(el, i) in navigation"
					:key="i"
					class="footer__nav-item"
				>
					<h4 class="footer__nav-item-title">{{ el.title }}</h4>
					<nuxt-link
						v-for="(link, j) in el.items"
						:key="j"
						:to="link.link"
						class="footer__nav-item-link"
					>
						{{ link.title }}
					</nuxt-link>
				</div>
			</nav>
		</div>
	</footer>
</template>

<style lang='scss'>
	.footer
	{
		color: $white;
		padding: 24px 0 64px 0;
		background-color: $black;

		@include mq($tablet) { padding: 40px 0 48px 0; }

		.container
		{
			display: flex;
			flex-direction: column;
			gap: 48px;

			@include mq($tablet)
			{
				justify-content: space-between;
				flex-wrap: wrap;
				flex-direction: row;
			}
		}
	}

	.footer__logo
	{
		line-height: 0;

		svg
		{
			width: 141px;
			height: 20px;

			path { fill: #707070 }
		}
	}

	.footer__nav
	{
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 24px;

		@include mq($tablet) { flex-direction: row; }
	}

	.footer__nav-item
	{
		padding-bottom: 24px;
		border-bottom: 1px solid $divider;

		display: flex;
		flex-direction: column;
		gap: 12px;

		&:last-child
		{
			padding-bottom: 0;
			border-bottom: none;
		}

		@include mq($tablet)
		{
			width: 168px;
			padding-bottom: 0;
			border-bottom: none;
			gap: 18px;
		}
	}

	.footer__nav-item-title
	{
		font-weight: 300;
		font-size: 14px;
		line-height: 143%;
		letter-spacing: 0.01em;
		color: $surfaceLight;

		@include mq($tablet)
		{
			font-weight: 500;
			letter-spacing: -0.02em;
		}
	}

	.footer__nav-item-link
	{
		cursor: pointer;
		width: max-content;

		font-weight: 300;
		font-size: 14px;
		line-height: 143%;
		letter-spacing: 0.01em;
		color: $secondary;
		@include transition();

		&:hover { color: $white; }

		&.router-link-active
		{
			cursor: auto;
			color: $white;
		}

		@include mq($tablet) { letter-spacing: -0.02em; }
	}
</style>