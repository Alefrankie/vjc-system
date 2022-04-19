<script lang="ts">
	import type { IProduct } from '$lib/database/schemas/Product'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import {
		getDiscount,
		getDiscountTotal,
		getIva,
		getPrice,
		getSubTotal,
		getTotal
	} from '$lib/hooks/useMoney'
	import { Cart } from '$lib/stores/Cart'
	import { Fetch, Promise } from '$lib/stores/Fetch'
	import { Order } from '$lib/stores/Order'
	import { Products } from '$lib/stores/Products'
	import Loading from '../Loading.svelte'

	function updateQuantity(e, item: IProduct) {
		const quantity = e.target.value
		Cart.update(item, quantity, 'requested')
	}

	function updateDiscount(e, item) {
		const discount = e.target.value
		Cart.update(item, discount / 100, 'discount')
	}

	function removeItem(product) {
		Cart.remove(product)
		Products.add(product)
	}

	async function saveOrder() {
		Order.setCart($Cart)

		if (!$Order.customer) {
			return alert('Debe indicar el cliente')
		}
		if ($Cart.length === 0) {
			return alert('El carrito no puede estar vacío')
		}

		await Fetch.Post('/api/orders', { order: $Order })

		Cart.wipe()
		Order.wipe()
	}
</script>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Carrito</h4>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-xl-8">
		<div class="card">
			<div class="card-body">
				<div class="table-responsive">
					<table class="table mb-0 align-middle table-nowrap">
						<thead class="table-light">
							<tr>
								<th>Nombre</th>
								<th>Cantidad</th>
								<th>Descuento</th>
								<th colspan="2">Total</th>
							</tr>
						</thead>
						<tbody>
							{#each $Cart as product}
								<tr>
									<td>
										<h5 class="font-size-14 text-uppercase">{product.name}</h5>
									</td>
									<!-- Cantidad -->
									<td>
										<input
											type="text"
											class="form-control"
											on:keyup={(e) => updateQuantity(e, product)}
										/>
									</td>
									<!-- Descuento -->
									<td>
										<input
											type="text"
											class="form-control"
											on:keyup={(e) => updateDiscount(e, product)}
										/>
									</td>
									<!-- Total -->
									<td>
										<p class="mb-1">
											{useFormatNumber((getPrice(product) - getDiscount(product)) * $Order.rate)} Bs
										</p>
										<p class="mb-0">
											{useFormatNumber(getPrice(product) - getDiscount(product))} $
										</p>
									</td>
									<td>
										<span
											on:click={() => removeItem(product)}
											class="text-danger"
											style="cursor: pointer;"
										>
											<i class="mdi mdi-delete font-size-18" />
										</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- end row-->
			</div>
		</div>
	</div>

	<div class="col-xl-4">
		<div class="card">
			<div class="card-body">
				<h4 class="mb-3 card-title">Resumen</h4>

				<div class="table-responsive">
					<table class="table mb-0">
						<tbody>
							<tr>
								<td>Sub-Total :</td>
								<td>
									<p class="mb-1">
										{useFormatNumber(getSubTotal($Cart) * $Order.rate)} Bs
									</p>
									<p class="mb-0">
										{useFormatNumber(getSubTotal($Cart))} $
									</p>
								</td>
							</tr>
							<tr>
								<td>Descuento Total: </td>
								<td>
									<p class="mb-1">
										-{useFormatNumber(getDiscountTotal($Cart) * $Order.rate)} Bs
									</p>
									<p class="mb-0">
										-{useFormatNumber(getDiscountTotal($Cart))} $
									</p>
								</td>
							</tr>
							<!-- <tr>
								<td>Cargo de Envío:</td>
								<td>$0</td>
							</tr> -->

							{#if $Order.type === 'Sale'}
								<tr>
									<td>IVA: </td>
									<td>
										<p class="mb-1">
											+{useFormatNumber(getIva($Cart) * $Order.rate)} Bs
										</p>
										<p class="mb-0">
											+{useFormatNumber(getIva($Cart))} $
										</p>
									</td>
								</tr>
								<tr>
									<th>Total:</th>
									<th>
										<p class="mb-1">
											{useFormatNumber((getTotal($Cart) + getIva($Cart)) * $Order.rate)} Bs
										</p>
										<p class="mb-0">
											{useFormatNumber(getTotal($Cart) + getIva($Cart))} $
										</p>
									</th>
								</tr>
							{:else}
								<tr>
									<th>Total:</th>
									<th>
										<p class="mb-1">
											{useFormatNumber(getTotal($Cart) * $Order.rate)} Bs
										</p>
										<p class="mb-0">
											{useFormatNumber(getTotal($Cart))} $
										</p>
									</th>
								</tr>
							{/if}
						</tbody>
					</table>

					{#await $Promise}
						<Loading />
					{:then value}
						{#if value?.message}
							<div class="alert alert-success d-print-none">
								{value?.message}
								<a href="/orders/{value?.data._id}"> #{value?.data.code}</a>
							</div>
						{/if}

						{#if !value?.message}
							<div class="mt-4 text-sm-center">
								<button on:click={saveOrder} class="btn btn-success">
									<i class="mdi mdi-cart-arrow-right me-1" />
									Generar Orden
								</button>
							</div>
						{/if}
					{:catch { message }}
						<div class="alert alert-danger d-print-none">
							{message}
						</div>
					{/await}
				</div>
				<!-- end table-responsive -->
			</div>
		</div>
		<!-- end card -->
	</div>
</div>
