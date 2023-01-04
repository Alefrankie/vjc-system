<script lang="ts">
	import type { IProduct } from '$lib/database/schemas/Product'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import { CartStore } from '$lib/stores/CartStore'
	import { Fetch, Promise } from '$lib/stores/Fetch'
	import { OrderStore } from '$lib/stores/OrderStore'
	import { ProductStore } from '$lib/stores/ProductStore'
	import Loading from '../Loading.svelte'
	let timeoutId: NodeJS.Timeout

	const productFinder = async (e: KeyboardEvent) => {
		const { value } = e.target as HTMLInputElement

		if (timeoutId) clearTimeout(timeoutId)

		timeoutId = setTimeout(async () => {
			const { data }: { data: IProduct[] } = await Fetch.get(`/api/products/filter/?key=${value}`)

			ProductStore.set(
				data.filter((e) => !$CartStore.find((iCart) => e._id === iCart._id)).filter(Boolean)
			)
		}, 500)
	}

	function addItemCart(item: IProduct) {
		CartStore.add(item)
		ProductStore.remove(item)
	}
</script>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Productos</h4>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<div class="mb-2 row">
					<div class="col-sm-4">
						<div class="mb-2 search-box me-2 d-inline-block">
							<div class="position-relative">
								<input
									type="text"
									class="form-control"
									placeholder="Search..."
									on:keyup={productFinder}
								/>
								<i class="bx bx-search-alt search-icon" />
							</div>
						</div>
					</div>
				</div>

				<div class="table-responsive" style="height: 50vh; overflow: hidden scroll;">
					<table class="table align-middle table-nowrap table-check">
						<thead class="table-light">
							<tr>
								<th style="width: 20px;" class="align-middle"> # </th>
								<th class="align-middle">Código</th>
								<th class="align-middle">Nombre</th>
								<th class="align-middle">Precio</th>
								<th class="align-middle">Cantidad</th>
								<th class="align-middle">&nbsp;</th>
							</tr>
						</thead>

						{#await $Promise}
							<Loading />
						{:then}
							<tbody>
								<!-- {#each $ProductStore.filter((e) => e.quantity >= 0.99 && e.price >= 0.99) as item, index} -->
								{#each $ProductStore as item, index}
									<tr on:click={() => addItemCart(item)}>
										<td>
											{index + 1}
										</td>
										<td><span class="text-body fw-bold">#{item.code}</span> </td>
										<td>{item.name}</td>
										<td>
											<p class="mb-1">
												{useFormatNumber(item.price * $OrderStore.rate)} Bs
											</p>
											<p class="mb-0">{useFormatNumber(item.price)} $</p>
										</td>
										<td>
											{#if item.quantity < 1}
												<span class="badge badge-pill badge-soft-danger font-size-16">
													{item.quantity}
													{item.unit}
												</span>
											{/if}
											{#if item.quantity >= 1}
												<span class="badge badge-pill badge-soft-success font-size-16">
													{item.quantity}
													{item.unit}
												</span>
											{/if}
										</td>
										<td />
									</tr>
								{/each}
							</tbody>
						{/await}
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
