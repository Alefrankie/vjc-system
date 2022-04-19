<script context="module">
	import { browser } from '$app/env'
	import { session } from '$app/stores'
	import Header from '$lib/components/Headers/Header.svelte'
	import LeftSideBar from '$lib/components/LeftSideBar.svelte'
	import { Fetch } from '$lib/stores/Fetch'
	import { Products } from '$lib/stores/Products'
	import { Rates } from '$lib/stores/Rates'

	// import '../../static/css/app.min.css'
	// import '../../static/css/bootstrap.min.css'
	// import '../../static/css/icons.min.css'
	/** @type {import('./[slug]').Load} */
	export const load = async (ctx) => {
		const { session } = ctx
		// console.log(ctx)
		if (!session.authenticated) {
			return {
				status: 302,
				redirect: '/auth/sign-in'
			}
		}

		// console.count()
		if (browser) {
			// Products
			const { data: products } = await Fetch.get('/api/products')

			Products.set(products)

			// Exchange Rates
			const {
				data: { Retail, Wholesale }
			} = await Fetch.get('/api/rates')

			Rates.setRetail(Retail)
			Rates.setWholesale(Wholesale)
		}

		return {}
	}
</script>

<script lang="ts">
	let sideBar = false
</script>

<!-- <svelte:head>
	<link rel="stylesheet" href="/static/css/app.min.css" />
	<link rel="stylesheet" href="/static/css/bootstrap.min.css" />
	<link rel="stylesheet" href="/static/css/icons.min.css" />
</svelte:head> -->

{#if $session.authenticated}
	<body data-sidebar="dark" class={sideBar ? 'sidebar-enable vertical-collpsed' : ''}>
		<!-- Begin page -->
		<div id="layout-wrapper">
			<Header bind:sideBar />

			<LeftSideBar bind:sideBar />

			<div class="main-content">
				<div class="page-content">
					<div class="container-fluid">
						<slot />
					</div>
				</div>
			</div>

			<footer class="footer">
				<div class="container-fluid">
					<div class="row">
						<div class="col-sm-6">2022 © AJMA.</div>
						<div class="col-sm-6">
							<div class="text-sm-end d-none d-sm-block">
								Design &amp; Developed by Ing. Alefrank Martínez
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	</body>
{/if}
