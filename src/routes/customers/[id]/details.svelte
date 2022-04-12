<script context="module">
	export async function load({ params }) {
		console.log(params)
		const { data: customer } = await http.Get(`/api/customers/${params.id}`)
		return {
			props: { customer }
		}
	}
</script>

<script lang="ts">
	import type { ICustomer } from '$lib/database/schemas/Customer'
	import { getBestOrder, getRevenues, getTotal } from '$lib/hooks/useMoney'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import { useDate } from '$lib/hooks/useDate'
	import { Fetch } from '$lib/stores/Fetch'
	import { http } from '$lib/hooks/useFetch'
	export let customer: ICustomer

	$: revenues = getRevenues(customer.orders)
</script>

<svelte:head>
	<title>VJC Import | Dashboard</title>
</svelte:head>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Perfil</h4>
		</div>
	</div>
</div>
<!-- end page title -->

<div class="row">
	<div class="col-xl-4">
		<div class="overflow-hidden card">
			<div class="bg-primary bg-soft">
				<div class="row">
					<div class="col-7">
						<div class="p-3 text-primary" />
					</div>
					<div class="col-5 align-self-end">
						<img src="/img/avatar-3.png" alt="" class="img-fluid" />
					</div>
				</div>
			</div>
			<div class="pt-0 card-body">
				<div class="row">
					<div class="col-sm-4">
						<div class="mb-4 avatar-md profile-user-wid">
							<img src="/img/avatar-1.jpg" alt="" class="img-thumbnail rounded-circle" />
						</div>
						<h5 class="font-size-15 text-truncate">
							<!-- {customer.firstName}
							{customer.lastName} -->
						</h5>
					</div>

					<div class="col-sm-8">
						<div class="pt-4">
							<div class="row">
								<div class="col-12">
									<h5 class="font-size-14">
										{customer.firstName || ''}
										{customer.lastName || ''}
									</h5>
									<h5 class="font-size-13">
										Sexo: {customer.gender}
									</h5>
									<h5 class="font-size-13">
										Telf.: {customer.phone}
									</h5>
									<h5 class="font-size-13">
										{#if customer.email}
											Correo: {customer.email || ''}
										{/if}
									</h5>
									<h5 class="font-size-13">
										Dirección: {customer.address}
									</h5>
								</div>
								<div class="mt-4">
									<a
										href="/customers/{customer.dni}"
										class="btn btn-primary waves-effect waves-light btn-sm"
									>
										Modificar
										<i class="mdi mdi-arrow-right ms-1" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="col-xl-8">
		<div class="row">
			<div class="col-md-4">
				<div class="card mini-stats-wid">
					<div class="card-body">
						<div class="d-flex">
							<div class="flex-grow-1">
								<p class="text-muted fw-medium">Pedidos</p>
								<h4 class="mb-0">{customer.orders.length}</h4>
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
								<p class="text-muted fw-medium">Ganancias</p>
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
								<p class="text-muted fw-medium">Mejor Pedido</p>
								<h4 class="mb-0">${useFormatNumber(getBestOrder(customer.orders))}</h4>
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
<!-- end row -->
<div class="row">
	<div class="col-lg-8">
		<div class="card">
			<div class="card-body">
				<h4 class="mb-4 card-title">Pedidos Realizados</h4>
				<div class="table-responsive" style="height: 60vh; overflow: none scroll;">
					<table class="table align-middle table-nowrap table-check">
						<thead class="table-light">
							<tr>
								<th class="align-middle">#</th>
								<th class="align-middle">Fecha</th>
								<th class="align-middle">Total</th>
								<th class="align-middle">Tasa</th>
								<th class="align-middle">Tipo</th>
								<th class="align-middle">Volumen</th>
								<!-- <th class="align-middle">Action</th> -->
							</tr>
						</thead>
						<tbody>
							{#each customer.orders as item}
								<tr>
									<td>
										<a href="/orders/{item._id}" class="text-body fw-bold">
											#{item.code}
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
										{#if item.type === 'DeliveryNote'}
											Nota de Entrega
										{/if}
										{#if item.type === 'Budget'}
											Presupuesto
										{/if}
										{#if item.type === 'Sale'}
											Factura Fiscal
										{/if}

										<!-- <span class="badge badge-pill badge-soft-success font-size-12">Paid</span> -->
									</td>
									<td>
										{#if item.volume === 'Wholesale'}
											Al Mayor
										{/if}
										{#if item.volume === 'Retail'}
											Al Detal
										{/if}
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
				<div class="px-2">&nbsp;{customer.orders.length} Resultados</div>
				<!-- end table-responsive -->
			</div>
		</div>
	</div>

	<div class="col-xl-4">
		<div class="card">
			<div class="card-body">
				<h4 class="mb-4 card-title">Top Productos Comprados</h4>

				<div class="text-center">
					<div class="mb-4">
						<i class="bx bx-map-pin text-primary display-4" />
					</div>
					<h3>1,456</h3>
					<p>San Francisco</p>
				</div>

				<div class="mt-4 table-responsive">
					<table class="table align-middle table-nowrap">
						<tbody>
							<tr>
								<td style="width: 30%">
									<p class="mb-0">San Francisco</p>
								</td>
								<td style="width: 25%"> <h5 class="mb-0">1,456</h5></td>
							</tr>
							<tr>
								<td>
									<p class="mb-0">Los Angeles</p>
								</td>
								<td>
									<h5 class="mb-0">1,123</h5>
								</td>
							</tr>
							<tr>
								<td>
									<p class="mb-0">San Diego</p>
								</td>
								<td>
									<h5 class="mb-0">1,026</h5>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
