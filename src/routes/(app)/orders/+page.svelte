<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import Loading from '$lib/components/Loading.svelte'
	import type { IOrder } from '$lib/database/schemas/Order'
	import { OrderTypeEnum } from '$lib/enums/OrderTypeEnum'
	import { OrderVolumeEnum } from '$lib/enums/OrderVolumeEnum'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import { getTotalByCart } from '$lib/hooks/useMoney'
	import { Fetch, Promise } from '$lib/stores/Fetch'
	import { page } from '$app/stores'
	import dayjs from 'dayjs'
	import type { IUser } from '$lib/database/schemas/User'
	import { UserRolesEnum } from '$lib/enums/UserRolesEnum'
	import { OrderStore } from '$lib/stores/OrderStore'

	$: session = $page.data.session as IUser
	let orders: IOrder[] = []
	let count = 0
	let limit = 100
	let date = new Date()
	let query = {}

	$: if (browser) {
		Fetch.post(`/api/orders/filter`, {
			query,
			limit
		}).then((res) => {
			orders = res.data
			count = res.count
		})
	}

	const removeOrder = (order: IOrder) => {
		const isSure = confirm('¿Desea remover ésta orden?')
		if (isSure) {
			Fetch.delete(`/api/orders/${order._id}`)
			orders = orders.filter((e) => e._id !== order._id)
		}
	}

	let timeoutId: NodeJS.Timeout

	const ordersFinder = async (e: KeyboardEvent) => {
		const { value } = e.target as HTMLInputElement

		if (timeoutId) clearTimeout(timeoutId)

		timeoutId = setTimeout(async () => {
			const res: { data: IOrder[]; count: number } = await Fetch.get(
				`/api/orders/filter/?key=${value}&limit=${limit}`
			)

			orders = res.data
			count = res.count
		}, 500)
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
								<input
									type="text"
									on:keyup={ordersFinder}
									class="form-control"
									placeholder="Search..."
								/>
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
								<i class="mdi mdi-plus me-1" /> Crear Nueva Orden
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
									<th class="align-middle">Action</th>
								</tr>
							</thead>
							<tbody>
								{#each orders as e}
									<tr>
										<td>
											<a href="/orders/{e._id}" class="text-body fw-bold">
												#{e.code}
											</a>
										</td>
										<td>
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<span
												on:click={() => goto(`/customers/${e.customer._id}`)}
												style="cursor: pointer; color: green"
											>
												{e.customer.dniType}-{e.customer.dni}
											</span>
										</td>
										<td>{dayjs(e.createdAt).format('DD-MM-YYYY')}</td>
										<td>
											<p class="mb-1">
												{useFormatNumber(getTotalByCart(e.cart) * e.rate)} Bs
											</p>
											<p class="mb-0">{useFormatNumber(getTotalByCart(e.cart))} $</p>
										</td>
										<td>
											<!-- <span class="badge badge-pill badge-soft-success font-size-12" /> -->
											BS {useFormatNumber(e.rate)}
										</td>
										<td>
											{#if e.type === OrderTypeEnum.SALE}
												Factura Fiscal
											{/if}
											{#if e.type === OrderTypeEnum.DELIVERY_NOTE}
												Nota de Entrega
											{/if}
											{#if e.type === OrderTypeEnum.BUDGET}
												Presupuesto
											{/if}
										</td>
										<td>
											{#if e.volume === OrderVolumeEnum.WHOLESALE}
												Mayor
											{/if}
											{#if e.volume === OrderVolumeEnum.RETAIL}
												Detal
											{/if}
										</td>

										<td>
											<div class="dropdown">
												<a
													href="/#"
													class="dropdown-toggle card-drop"
													data-bs-toggle="dropdown"
													aria-expanded="false"
												>
													<i class="mdi mdi-dots-horizontal font-size-18" />
												</a>
												<ul class="dropdown-menu dropdown-menu-end">
													<li>
														<button on:click={() => goto(`/orders/${e._id}`)} class="dropdown-item">
															<i class="align-middle bx bx-user font-size-16 me-1 text-success" />
															Detalles
														</button>
													</li>

													{#if session.role === UserRolesEnum.ADMIN}
														<li>
															<button on:click={() => removeOrder(e)} class="dropdown-item">
																<i class="mdi mdi-trash-can font-size-16 text-danger me-1" />
																Remover
															</button>
														</li>
													{/if}
												</ul>
											</div>
										</td>
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
										on:click={() => (query = { type: OrderTypeEnum.DELIVERY_NOTE })}
										class="dropdown-item"
									>
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Todo
									</button>
								</li>
								<li>
									<button
										on:click={() =>
											(query = {
												type: OrderTypeEnum.DELIVERY_NOTE,
												volume: OrderVolumeEnum.WHOLESALE
											})}
										class="dropdown-item"
									>
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Al Mayor
									</button>
								</li>
								<li>
									<button
										on:click={() =>
											(query = {
												type: OrderTypeEnum.DELIVERY_NOTE,
												volume: OrderVolumeEnum.RETAIL
											})}
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
									<button
										on:click={() => (query = { type: OrderTypeEnum.SALE })}
										class="dropdown-item"
									>
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
									<button
										on:click={() => (query = { type: OrderTypeEnum.BUDGET })}
										class="dropdown-item"
									>
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Todo
									</button>
								</li>
								<li>
									<button
										on:click={() =>
											(query = { type: OrderTypeEnum.BUDGET, volume: OrderVolumeEnum.WHOLESALE })}
										class="dropdown-item"
									>
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Al Mayor
									</button>
								</li>
								<li>
									<button
										on:click={() =>
											(query = { type: OrderTypeEnum.BUDGET, volume: OrderVolumeEnum.RETAIL })}
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
										on:click={() => (query = { volume: OrderVolumeEnum.WHOLESALE })}
										class="dropdown-item"
									>
										<i class="mdi mdi-shopping font-size-16 text-success me-1" />
										Al Mayor
									</button>
								</li>
								<li>
									<button
										on:click={() => (query = { volume: OrderVolumeEnum.RETAIL })}
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
								on:change={(e) => {
									return (query = {
										createdAt: {
											$gte: new Date(`${date}T04:00:00.000+00:00`),
											$lt: new Date(`${date}T04:24:00.000+00:00`)
										}
									})
									// return (query = { createdAt: new Date(date + 'T04:00:00.000+00:00') })
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
