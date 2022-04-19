<script context="module">
	export async function load({ params }) {
		const { data: order } = await Fetch.get(`/api/orders/${params.id}`)
		return {
			props: { order }
		}
	}
</script>

<script lang="ts">
	import type { IOrder } from '$lib/database/schemas/Order'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import {
		getDiscount,
		getDiscountTotal,
		getPrice,
		getSubTotal,
		getTotal
	} from '$lib/hooks/useMoney'
	import { Fetch } from '$lib/stores/Fetch'
	export let order: IOrder
</script>

<div class="row d-print-none">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Detalles</h4>
		</div>
	</div>
</div>
<!-- end page title -->

<div class="row">
	<div class="col-lg-12">
		<div class="card">
			<div class="card-body">
				<div class="invoice-title ">
					<h4 class="float-end font-size-16">Pedido #{order.code}</h4>
					<div class="mb-4">
						<img src="/img/logo.png" alt="logo" height="100" />
					</div>
				</div>
				<hr />
				<div class="row">
					<div class="col-sm-6">
						<address>
							<strong>Comprado Por:</strong><br />
							{order.customer.firstName || ''}
							{order.customer.lastName || ''}
							{order.customer.socialReason || ''}
							<br />
							{order.customer.address || ''}<br />
						</address>
					</div>

					<div class="mt-3 col-sm-6 text-sm-end">
						<address>
							<strong>Fecha:</strong><br />
							{order.date}<br /><br />
						</address>
					</div>
				</div>
				<div class="pb-2 mt-3">
					<h3 class="font-size-15 fw-bold">Resumen</h3>
				</div>
				<div class="table-responsive">
					<table class="table table-nowrap">
						<thead>
							<tr>
								<th style="width: 70px;">No.</th>
								<th>Nombre</th>
								<th>Cantidad</th>
								<th>Descuento</th>
								<th class="text-end">Price</th>
							</tr>
						</thead>
						<tbody>
							{#each order.cart as item, index}
								<tr>
									<td>{index + 1}</td>
									<td>{item.name}</td>
									<td>{item.requested}</td>
									<td>
										{item.discount * 100}% | - BS {useFormatNumber(getDiscount(item) * order.rate)}
									</td>
									<td class="text-end">
										BS {useFormatNumber(getPrice(item) * order.rate)}
									</td>
								</tr>
							{/each}

							<tr>
								<td colspan="4" class="text-end">Sub Total</td>
								<td class="text-end">BS {useFormatNumber(getSubTotal(order.cart) * order.rate)}</td>
							</tr>
							<tr>
								<td colspan="4" class="border-0 text-end">Descuento</td>
								<td class="text-end"
									>- BS {useFormatNumber(getDiscountTotal(order.cart) * order.rate)}</td
								>
							</tr>
							<tr>
								<td colspan="4" class="border-0 text-end"> <strong>Total</strong></td>
								<td class="border-0 text-end"
									><h4 class="m-0">
										BS {useFormatNumber(getTotal(order.cart) * order.rate)}
									</h4></td
								>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="d-print-none">
					<div class="float-end">
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a
							href="javascript:window.print()"
							class="btn btn-success waves-effect waves-light me-1"
						>
							<i class="fa fa-print" />
						</a>
						<a href="/#" class="btn btn-primary w-md waves-effect waves-light">Send</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
