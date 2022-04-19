<script context="module">
	export async function load({ params }) {
		const { data: order } = await Fetch.get(`/api/orders/${params.id}`)
		Order.setOrder(order)
		return {
			props: {}
		}
	}
</script>

<script lang="ts">
	import CompanyDetails from '$lib/components/Report/CompanyDetails.svelte'
	import OrderDetails from '$lib/components/Report/OrderDetails.svelte'
	import OrderProducts from '$lib/components/Report/OrderProducts.svelte'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import { getTotal } from '$lib/hooks/useMoney'
	import { Fetch } from '$lib/stores/Fetch'
</script>

<div class="row d-print-none">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Orden: #{$Order.code}</h4>

			<button class="btn btn-success waves-effect waves-light me-1" on:click={() => window.print()}>
				<i class="fa fa-print" />
			</button>
		</div>
	</div>
</div>
<!-- end page title -->

<CompanyDetails />
<OrderDetails />
<OrderProducts />

<footer class="text-center d-print-none">
	Total: ${useFormatNumber(getTotal($Order.cart))} / Bs {useFormatNumber(
		getTotal($Order.cart) * $Order.rate
	)}, equivalentes a la tasa de cambio de 1$ por ${useFormatNumber($Order.rate)} Bs.S
</footer>
