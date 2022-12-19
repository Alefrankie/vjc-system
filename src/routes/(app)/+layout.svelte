<script lang="ts">
	import { browser } from '$app/environment'
	import Header from '$lib/components/Headers/Header.svelte'
	import LeftSideBar from '$lib/components/LeftSideBar.svelte'
	import { Fetch } from '$lib/stores/Fetch'
	import { RateStore } from '$lib/stores/RateStore'

	let sideBar = false

	// Exchange Rates
	// $: {
	// 	Fetch.get('/api/rates').then(({ data: { Retail, Wholesale } }) => {
	// 		RateStore.setRetail(Retail)
	// 		RateStore.setWholesale(Wholesale)
	// 	})
	// }
</script>

<body data-sidebar="dark" class={sideBar ? 'sidebar-enable vertical-collpsed' : ''}>
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
