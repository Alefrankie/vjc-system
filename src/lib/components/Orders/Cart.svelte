<script lang="ts">
	import { goto } from '$app/navigation'
	import type { IProduct } from '$lib/database/schemas/Product'
	import { OrderTypeEnum } from '$lib/enums/OrderTypeEnum'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import {
		getDiscount,
		getDiscountTotal,
		getIvaByCart,
		getPrice,
		getSubTotalByCart,
		getTotalByCart
	} from '$lib/hooks/useMoney'
	import { CartStore } from '$lib/stores/CartStore'
	import { Fetch, Promise } from '$lib/stores/Fetch'
	import { OrderStore } from '$lib/stores/OrderStore'
	import { ProductStore } from '$lib/stores/ProductStore'
	import Loading from '../Loading.svelte'

	function updateQuantity(e: any, item: IProduct) {
		const quantity = e.target.value

		if (item.quantity < quantity) {
			alert('No hay suficiente cantidad')
			e.target.value = ''
			return
		}

		CartStore.update(item, quantity, 'requested')
	}

	function updateDiscount(e: any, item: IProduct) {
		const discount = e.target.value

		CartStore.update(item, discount / 100, 'discount')
	}

	function removeItem(product: IProduct) {
		CartStore.remove(product)
		ProductStore.add(product)
	}

	async function saveOrder() {
		OrderStore.setCart($CartStore)

		if (!$OrderStore.customer._id) {
			return alert('Debe indicar el cliente')
		}
		if (!$CartStore.length) {
			return alert('El carrito no puede estar vacío')
		}

		const { data } = await Fetch.post('/api/orders', { order: $OrderStore })

		// CartStore.wipe()
		// OrderStore.wipe()
		// window.location.replace(`/orders/${data._id}`)
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
								<th>Existencia</th>
								<th colspan="2">Total</th>
							</tr>
						</thead>
						<tbody>
							{#each $CartStore as product}
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
									<td>
										{product.quantity}
									</td>
									<!-- Total -->
									<td>
										<p class="mb-1">
											{useFormatNumber(
												(getPrice(product) - getDiscount(product)) * $OrderStore.rate
											)} Bs
										</p>
										<p class="mb-0">
											{useFormatNumber(getPrice(product) - getDiscount(product))} $
										</p>
									</td>
									<td>
										<!-- svelte-ignore a11y-click-events-have-key-events -->
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
										{useFormatNumber(getSubTotalByCart($CartStore) * $OrderStore.rate)} Bs
									</p>
									<p class="mb-0">
										{useFormatNumber(getSubTotalByCart($CartStore))} $
									</p>
								</td>
							</tr>
							<tr>
								<td>Descuento Total: </td>
								<td>
									<p class="mb-1">
										-{useFormatNumber(getDiscountTotal($CartStore) * $OrderStore.rate)} Bs
									</p>
									<p class="mb-0">
										-{useFormatNumber(getDiscountTotal($CartStore))} $
									</p>
								</td>
							</tr>
							<!-- <tr>
								<td>Cargo de Envío:</td>
								<td>$0</td>
							</tr> -->

							{#if $OrderStore.type === OrderTypeEnum.SALE}
								<tr>
									<td>IVA: </td>
									<td>
										<p class="mb-1">
											+{useFormatNumber(getIvaByCart($CartStore) * $OrderStore.rate)} Bs
										</p>
										<p class="mb-0">
											+{useFormatNumber(getIvaByCart($CartStore))} $
										</p>
									</td>
								</tr>
								<tr>
									<th />
									<th>
										<p class="mb-1">
											<!-- {useFormatNumber(
												(getTotal($Cart getIvaByCart($CartStore)) * $OrderStore.rate
											)} Bs -->
										</p>
										<p class="mb-0">
											{useFormatNumber(getTotalByCart($CartStore) + getIvaByCart($CartStore))} $
										</p>
									</th>
								</tr>
							{:else}
								<tr>
									<th>Total:</th>
									<th>
										<p class="mb-1">
											{useFormatNumber(getTotalByCart($CartStore) * $OrderStore.rate)} Bs
										</p>
										<p class="mb-0">
											{useFormatNumber(getTotalByCart($CartStore))} $
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
							<div class="alert alert-success d-print-none alert-dismissible fade show">
								{value?.message}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<span
									on:click={() => goto(`/orders/${value?.data._id}`)}
									style="cursor: pointer; color: blue"
								>
									#{value?.data.code}
								</span>
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
