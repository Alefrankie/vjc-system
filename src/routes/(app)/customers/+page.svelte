<script lang="ts">
	import { goto } from '$app/navigation'
	import Loading from '$lib/components/Loading.svelte'
	import TableWrap from '$lib/components/TableWrap.svelte'
	import type { ICustomer } from '$lib/database/schemas/Customer'
	import { CustomerStore } from '$lib/stores/CustomerStore'
	import { Fetch, Promise } from '$lib/stores/Fetch'
	import { OrderStore } from '$lib/stores/OrderStore'
	import { fade } from 'svelte/transition'

	const removeCustomer = (customer: ICustomer) => {
		const isSure = confirm('¿Desea remover al cliente?')
		if (isSure) {
			Fetch.delete(`/api/customers/${customer._id}`)
			CustomerStore.remove(customer)
		}
	}
	let timeoutId: NodeJS.Timeout
	const customerFinder = async (e: KeyboardEvent) => {
		const { value } = e.target as HTMLInputElement

		if (timeoutId) clearTimeout(timeoutId)

		timeoutId = setTimeout(async () => {
			const { data } = await Fetch.get(`/api/customers/filter/?key=${value}`)
			CustomerStore.set(data)
		}, 500)
	}
</script>

<svelte:head>
	<title>VJC Import | Clientes</title>
</svelte:head>
<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Lista de Clientes</h4>
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
									on:keyup={customerFinder}
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
								href="/customers/add"
								class="mb-2 btn btn-success btn-rounded waves-effect waves-light me-2"
							>
								<i class="mdi mdi-plus me-1" />
								Registrar Cliente
							</a>
						</div>
					</div>
				</div>
				<!-- 176 -->
				{#await $Promise}
					<Loading />
				{:then value}
					{#if value?.message}
						<div class="alert alert-success d-print-none" transition:fade={{ duration: 1000 }}>
							{value?.message}
						</div>
					{/if}

					<TableWrap>
						<svelte:fragment slot="thead">
							<tr>
								<th>#</th>
								<th>Cliente</th>
								<th>DNI</th>
								<th />
							</tr>
						</svelte:fragment>

						<svelte:fragment slot="tbody">
							{#each $CustomerStore as item, index}
								<tr>
									<td>
										{index + 1}
									</td>
									<td>
										{item.firstName || ''}
										{item.lastName || ''}
										{item.socialReason || ''}
									</td>

									<td>{item.dniType}-{item.dni}</td>
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
													<button
														on:click={() => goto(`/customers/${item._id}/details`)}
														class="dropdown-item"
													>
														<i class="align-middle bx bx-user font-size-16 me-1 text-success" />
														Detalles
													</button>
												</li>
												<li>
													<a
														href="/orders/add"
														on:click={() => OrderStore.setCustomer(item)}
														class="dropdown-item"
													>
														<i class="mdi mdi-shopping font-size-16 text-success me-1" />
														Crear Orden
													</a>
												</li>
												<li>
													<a href="/customers/{item._id}" class="dropdown-item">
														<i class="mdi mdi-pencil font-size-16 text-success me-1" />
														Modificar
													</a>
												</li>
												<li>
													<button on:click={() => removeCustomer(item)} class="dropdown-item">
														<i class="mdi mdi-trash-can font-size-16 text-danger me-1" />
														Remover
													</button>
												</li>
											</ul>
										</div>
									</td>
								</tr>
							{/each}
						</svelte:fragment>
					</TableWrap>
				{:catch error}
					<h1>{error}</h1>
				{/await}
			</div>
		</div>
	</div>
</div>
