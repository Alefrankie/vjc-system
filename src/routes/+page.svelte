<script>
	import { browser } from '$app/env'
	import Revenues from '$lib/components/Headers/Revenues.svelte'
	import Loading from '$lib/components/Loading.svelte'
	import TableWrap from '$lib/components/TableWrap.svelte'
	import { useDate } from '$lib/hooks/useDate'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import { getTotal } from '$lib/hooks/useMoney'
	import { Fetch, Promise } from '$lib/stores/Fetch'

	let orders = []
	let limit = 0
	let page = 1

	$: if (browser) {
		Fetch.Post(`/api/orders/revenues`, {
			query: { createdAt: { $regex: useDate(new Date().toISOString()) + '.*' } },
			limit,
			page
		}).then(({ data }) => {
			orders = data
		})
	}
</script>

<svelte:head>
	<title>VJC Import | Resumen</title>
</svelte:head>

{#await $Promise}
	<Loading />
{:then}
	<div class="row">
		<div class="col-12">
			<div class="page-title-box d-sm-flex align-items-center justify-content-between">
				<h4 class="mb-sm-0 font-size-18">Resumen de Hoy</h4>
			</div>
		</div>
	</div>
	<!-- end page title -->

	<Revenues bind:orders />
	<!-- end row -->

	<div class="row">
		<div class="col-lg-12">
			<div class="card">
				<div class="card-body">
					<h4 class="mb-4 card-title">Últimas Transacciones</h4>
					<TableWrap>
						<svelte:fragment slot="thead">
							<tr>
								{#each ['#', 'Cliente', 'Fecha', 'Total', 'Tasa', 'Tipo', 'Volumen'] as item}
									<th class="align-middle">{item}</th>
								{/each}
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
								</tr>
							{:else}
								<tr>
									<td class="text-center" colspan="7"> Hoy no se han realizado ventas </td>
								</tr>
							{/each}
						</svelte:fragment>
					</TableWrap>
				</div>
			</div>
		</div>
	</div>
	<!-- end row -->

	<div class="row">
		<div class="col-xl-12">
			<div class="card">
				<div class="card-body">
					<h4 class="mb-4 card-title">Social Source</h4>
					<div class="text-center">
						<div class="mx-auto mb-4 avatar-sm">
							<span class="avatar-title rounded-circle bg-primary bg-soft font-size-24">
								<i class="mdi mdi-facebook text-primary" />
							</span>
						</div>
						<p class="mb-2 font-16 text-muted" />
						<h5>
							<a href="/#" class="text-dark">
								Facebook - <span class="text-muted font-16">125 sales</span>
							</a>
						</h5>
						<p class="text-muted">
							Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis
							faucibus tincidunt.
						</p>
						<a href="/#" class="text-primary font-16"
							>Learn more <i class="mdi mdi-chevron-right" /></a
						>
					</div>
					<div class="mt-4 row">
						<div class="col-4">
							<div class="mt-3 text-center social-source">
								<div class="mx-auto mb-3 avatar-xs">
									<span class="avatar-title rounded-circle bg-primary font-size-16">
										<i class="text-white mdi mdi-facebook" />
									</span>
								</div>
								<h5 class="font-size-15">Facebook</h5>
								<p class="mb-0 text-muted">125 sales</p>
							</div>
						</div>
						<div class="col-4">
							<div class="mt-3 text-center social-source">
								<div class="mx-auto mb-3 avatar-xs">
									<span class="avatar-title rounded-circle bg-info font-size-16">
										<i class="text-white mdi mdi-twitter" />
									</span>
								</div>
								<h5 class="font-size-15">Twitter</h5>
								<p class="mb-0 text-muted">112 sales</p>
							</div>
						</div>
						<div class="col-4">
							<div class="mt-3 text-center social-source">
								<div class="mx-auto mb-3 avatar-xs">
									<span class="avatar-title rounded-circle bg-pink font-size-16">
										<i class="text-white mdi mdi-instagram" />
									</span>
								</div>
								<h5 class="font-size-15">Instagram</h5>
								<p class="mb-0 text-muted">104 sales</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- end row -->
{/await}
