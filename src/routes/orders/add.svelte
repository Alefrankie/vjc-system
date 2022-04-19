<script lang="ts">
	import Cart from '$lib/components/Orders/Cart.svelte'
	import FinderCustomer from '$lib/components/Orders/FinderCustomer.svelte'
	import Products from '$lib/components/Orders/Products.svelte'
	import TypeVolume from '$lib/components/Orders/TypeVolume.svelte'
	import { Rates } from '$lib/stores/Rates'
	import { onMount } from 'svelte'

	onMount(() => {
		Order.setRate($Rates.Retail)
	})
</script>

<svelte:head>
	<title>VJC Import | Orden</title>
</svelte:head>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Ajustes</h4>
		</div>
	</div>
</div>
<!-- {JSON.stringify($Order)} -->

<FinderCustomer />

<TypeVolume />

<Products />

<Cart />
