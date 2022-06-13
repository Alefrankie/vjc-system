<script lang="ts">
	import { browser } from '$app/env'
	import Loading from '$lib/components/Loading.svelte'
	import type { IOrder } from '$lib/database/schemas/Order'
	import { useDate } from '$lib/hooks/useDate'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import { getTotal } from '$lib/hooks/useMoney'
	import { Fetch, Promise } from '$lib/stores/Fetch'
	// import type { IOrder } from '$lib/database/schemas/Order'

	let orders: IOrder[] = []
	let count = null
	let limit = 100
	let date = null
	let query = {}

	$: if (browser) {
		Fetch.Post(`/api/orders/filter`, {
			query,
			limit,
		}).then((res) => {
			orders = res.data
			count = res.count
		})
	}
</script>

<svelte:head>
	<title>VJC Import | Ordenes</title>
</svelte:head>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Órdenes</h4>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-9">
		<div class="card">
			<div class="card-body">
				<div class="mb-2 row">
					<div class="col-sm-4">
						<div class="mb-2 search-box me-2 d-inline-block">
							<div class="position-relative">
								<input type="text" class="form-control" placeholder="Search..." />
								<i class="bx bx-search-alt search-icon" />
							</div>
						</div>
					</div>
					<div class="col-sm-8">
						<div class="text-sm-end">
							<a
								href="/orders/add"
								class="mb-2 btn btn-success btn-rounded waves-effect waves-light me-2"
							>
								<i class="mdi mdi-plus me-1" /> Crear Nueva Órden
							</a>
						</div>
					</div>
					<!-- end col-->
				</div>

				{#await $Promise}
					<Loading />
				{:then}
					<div class="table-responsive" style="height: 60vh; overflow: none scroll;">
						<table class="table align-middle table-nowrap table-check">
							<thead class="table-light">
								<tr>
									<th class="align-middle">#</th>
									<th class="align-middle">Cliente</th>
									<th class="align-middle">Fecha</th>
									<th class="align-middle">Total</th>
									<th class="align-middle">Tasa</th>
									<th class="align-middle">Tipo</th>
									<th class="align-middle">Volumen</th>
									<!-- <th class="align-middle">Action</th> -->
								</tr>
							</thead>
							<tbody>
								{#each orders as item}
									<tr>
										<td>
											<a href="/orders/{item._id}" class="text-body fw-bold">
												#{item.code}
											</a>
										</td>
										<td>
											<a href="/customers/{item.customer.dni}">
												{item.customer.dniType}-{item.customer.dni}
											</a>
										</td>
										<td>{useDate(item.createdAt)}</td>
										<td>
											<p class="mb-1">
												{useFormatNumber(getTotal(item.cart) * item.rate)} Bs
											</p>
											<p class="mb-0">{useFormatNumber(getTotal(item.cart))} $</p>
										</td>
										<td>
											<!-- <span class="badge badge-pill badge-soft-success font-size-12" /> -->
											BS {useFormatNumber(item.rate)}
										</td>
										<td>
											{item.type}

											<!-- <span class="badge badge-pill badge-soft-success font-size-12">Paid</span> -->
										</td>
										<td>
											{item.volume}
											<!-- <i class="fab fa-cc-mastercard me-1" /> Mastercard -->
										</td>
										<!-- <td>
										<button
											type="button"
											class="btn btn-primary btn-sm btn-rounded"
											data-bs-toggle="modal"
											data-bs-target=".orderdetailsModal"
										>
											View Details
										</button>
										&nbsp; &nbsp; &nbsp;
									</td> -->
										<!-- <td>
										<div class="gap-3 d-flex">
											<a href="/#" class="text-success"
												><i class="mdi mdi-pencil font-size-18" /></a
											>
											<a href="/#" class="text-danger"
												><i class="mdi mdi-delete font-size-18" /></a
											>
										</div>
									</td> -->
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
					<br />
					<div class="px-2">&nbsp;{orders.length} Resultados</div>
				{:catch error}
					<p class="text-danger">{error}</p>
				{/await}

				<!-- {page} -->
				<!-- <ul class="mb-2 pagination pagination-rounded justify-content-end">
					<li class="page-item disabled">
						<button class="page-link" on:click={() => (page -= 1)} aria-label="Previous">
							<i class="mdi mdi-chevron-left" />
						</button>
					</li>
					<li class="page-item active">
						<button class="page-link" on:click={() => (page = 1)}>1</button>
					</li>
					<li class="page-item">
						<button class="page-link" on:click={() => (page = 2)}>2</button>
					</li>
					<li class="page-item">
						<button class="page-link" on:click={() => (page = 3)}>3</button>
					</li>
					<li class="page-item">
						<button class="page-link" on:click={() => (page = 4)}>4</button>
					</li>
					<li class="page-item">
						<button class="page-link" on:click={() => (page = 5)}>5</button>
					</li>
					<li class="page-item">
						<button class="page-link" on:click={() => (page += 1)} aria-label="Next">
							<i class="mdi mdi-chevron-right" />
						</button>
					</li>
				</ul> -->
			</div>
		</div>
	</div>

	<div class="col-3">
		<div class="card">
			<div class="card-header">
				<div class="page-title-box d-sm-flex align-items-center justify-content-between">
					<h4 class="mb-sm-0 font-size-18">Tipo</h4>
				</div>
			</div>
			<div class="card-body">
				<!-- Notas de Entrega -->
				<div class="mb-2 row">
					<div class="col-sm-10">
						<div class="dropdown">
							<button
								class="mb-2 text-white dropdown-toggle card-drop text-start btn btn-success btn-rounded waves-effect waves-light me-2 w-100"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<i class="bx bx-search-alt search-icon" /> Nota de Entrega
							</button>
							<ul class="dropdown-menu dropdown-menu-end">
								<li>
									<button on:click={() => (query = { type: 'DeliveryNote' })} class="dropdown-item">
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Todo
									</button>
								</li>
								<li>
									<button
										on:click={() => (query = { type: 'DeliveryNote', volume: 'Wholesale' })}
										class="dropdown-item"
									>
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Al Mayor
									</button>
								</li>
								<li>
									<button
										on:click={() => (query = { type: 'DeliveryNote', volume: 'Retail' })}
										class="dropdown-item"
									>
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Al Detal
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!-- Facturas Fiscales -->
				<div class="mb-2 row">
					<div class="col-sm-10">
						<div class="dropdown">
							<button
								class="mb-2 text-white dropdown-toggle card-drop text-start btn btn-success btn-rounded waves-effect waves-light me-2 w-100"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<i class="bx bx-search-alt search-icon" /> Factura Fiscal
							</button>
							<ul class="dropdown-menu dropdown-menu-end">
								<li>
									<button on:click={() => (query = { type: 'Sale' })} class="dropdown-item">
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Todo
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Presupuestos -->
				<div class="mb-2 row">
					<div class="col-sm-10">
						<div class="dropdown">
							<button
								class="mb-2 text-white dropdown-toggle card-drop text-start btn btn-success btn-rounded waves-effect waves-light me-2 w-100"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<i class="bx bx-search-alt search-icon" /> Presupuesto
							</button>
							<ul class="dropdown-menu dropdown-menu-end">
								<li>
									<button on:click={() => (query = { type: 'Budget' })} class="dropdown-item">
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Todo
									</button>
								</li>
								<li>
									<button
										on:click={() => (query = { type: 'Budget', volume: 'Wholesale' })}
										class="dropdown-item"
									>
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Al Mayor
									</button>
								</li>
								<li>
									<button
										on:click={() => (query = { type: 'Budget', volume: 'Retail' })}
										class="dropdown-item"
									>
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Al Detal
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Todo -->
				<div class="mb-2 row">
					<div class="col-sm-10">
						<div class="dropdown">
							<button
								class="mb-2 text-white dropdown-toggle card-drop text-start btn btn-success btn-rounded waves-effect waves-light me-2 w-100"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<i class="bx bx-search-alt search-icon" /> Todo
							</button>
							<ul class="dropdown-menu dropdown-menu-end">
								<li>
									<button on:click={() => (query = {})} class="dropdown-item">
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Todo
									</button>
								</li>
								<li>
									<button on:click={() => (query = { volume: 'Wholesale' })} class="dropdown-item">
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Al Mayor
									</button>
								</li>
								<li>
									<button on:click={() => (query = { volume: 'Retail' })} class="dropdown-item">
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Al Detal
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<div class="page-title-box d-sm-flex align-items-center justify-content-between">
					<h4 class="mb-sm-0 font-size-18">Limite</h4>
				</div>
			</div>
			<div class="card-body">
				<div class="mb-2 row">
					<div class="col-sm-10">
						<div>
							<input type="text" class="form-control" bind:value={limit} />
							<br />
							<input type="range" class="form-range" min="1" max={count} bind:value={limit} />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<div class="page-title-box d-sm-flex align-items-center justify-content-between">
					<h4 class="mb-sm-0 font-size-18">Fecha</h4>
				</div>
			</div>
			<div class="card-body">
				<div class="mb-2 row">
					<div class="col-sm-10">
						<div>
							<input
								type="date"
								class="form-control"
								bind:value={date}
								on:change={(e) => (query = { createdAt: { $regex: date + '.*' } })}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
