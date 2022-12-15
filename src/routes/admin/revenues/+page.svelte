<script lang="ts">
	import { browser } from '$app/env'
	import Loading from '$lib/components/Loading.svelte'
	import TableWrap from '$lib/components/TableWrap.svelte'
	import { useDate } from '$lib/hooks/useDate'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import { getBestOrder, getRevenues, getTotal } from '$lib/hooks/useMoney'
	import { Fetch, Promise } from '$lib/stores/Fetch'

	let orders = []
	let limit = 10
	let date = null
	let count = 0
	let query = {}

	$: if (browser) {
		Fetch.Post(`/api/orders/filter`, {
			query,
			limit
		}).then((res) => {
			orders = res.data
			count = res.count
		})
	}

	$: revenues = getRevenues(orders)
	$: bestOrder = getBestOrder(orders)
</script>

<svelte:head>
	<title>VJC Import | Resumen</title>
</svelte:head>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Ingresos</h4>
		</div>
	</div>
</div>

{#await $Promise}
	<Loading />
{:then}
	<div class="row">
		<div class="col-xl-12">
			<div class="row">
				<div class="col-md-4">
					<div class="card mini-stats-wid">
						<div class="card-body">
							<div class="d-flex">
								<div class="flex-grow-1">
									<p class="text-muted fw-medium">Ventas</p>
									<h4 class="mb-0">{orders.length}</h4>
								</div>

								<div class="flex-shrink-0 align-self-center">
									<div class="mini-stat-icon avatar-sm rounded-circle bg-primary">
										<span class="avatar-title">
											<i class="bx bx-copy-alt font-size-24" />
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card mini-stats-wid">
						<div class="card-body">
							<div class="d-flex">
								<div class="flex-grow-1">
									<p class="text-muted fw-medium">Ingresos Totales</p>
									<h4 class="mb-0">{useFormatNumber(revenues.bolivars)} Bs</h4>
									<h4 class="mb-0">${useFormatNumber(revenues.dollars)}</h4>
								</div>

								<div class="flex-shrink-0 align-self-center ">
									<div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
										<span class="avatar-title rounded-circle bg-primary">
											<i class="bx bx-archive-in font-size-24" />
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card mini-stats-wid">
						<div class="card-body">
							<div class="d-flex">
								<div class="flex-grow-1">
									<p class="text-muted fw-medium">Mejor Venta</p>
									<h4 class="mb-0">{useFormatNumber(bestOrder.bolivars)} Bs</h4>
									<h4 class="mb-0">${useFormatNumber(bestOrder.dollars)}</h4>
								</div>

								<div class="flex-shrink-0 align-self-center">
									<div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
										<span class="avatar-title rounded-circle bg-primary">
											<i class="bx bx-purchase-tag-alt font-size-24" />
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- end row -->
		</div>
	</div>

	<div class="row">
		<div class="col-9">
			<div class="card">
				<div class="card-body">
					<TableWrap>
						<svelte:fragment slot="thead">
							<tr>
								<th class="align-middle">#</th>
								<th class="align-middle">Cliente</th>
								<th class="align-middle">Fecha</th>
								<th class="align-middle">Total</th>
								<th class="align-middle">Tasa</th>
								<th class="align-middle">Tipo</th>
								<th class="align-middle">Volumen</th>
							</tr>
						</svelte:fragment>

						<svelte:fragment slot="tbody">
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
										BS {useFormatNumber(item.rate)}
									</td>
									<td>
										{item.type}
									</td>
									<td>
										{item.volume}
										<i class="fab fa-cc-mastercard me-1" />
									</td>
								</tr>
							{/each}
						</svelte:fragment>
					</TableWrap>
					<br />
					<div class="px-2">&nbsp;{orders.length} Resultados</div>
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
										<button
											on:click={() => (query = { type: 'DeliveryNote' })}
											class="dropdown-item"
										>
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
										<button
											on:click={() => (query = { volume: 'Wholesale' })}
											class="dropdown-item"
										>
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
{:catch error}
	<p class="text-danger">{error}</p>
{/await}
