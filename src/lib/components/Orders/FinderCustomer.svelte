<script lang="ts">
	import { Fetch, Promise } from '$lib/stores/Fetch'
	import { OrderStore } from '$lib/stores/OrderStore'
	import Loading from '../Loading.svelte'
	import { onMount } from 'svelte'

	// let dni = ''
	let dni = '21156744'

	async function findCustomer() {
		const { data } = await Fetch.Get(`/api/customers/${dni}`)
		OrderStore.setCustomer(data)
	}

	onMount(() => {
		findCustomer()
	})
</script>

<div class="row">
	<div class="col-lg-4">
		<div class="card">
			<div class="card-body">
				<h4 class="mb-4 card-title">Cliente</h4>
				<div class="mb-2 search-box me-2 d-inline-block">
					<div class="position-relative">
						<input
							type="text"
							class="form-control"
							bind:value={dni}
							on:keyup={(e) => {
								if (e.code == 'Enter') {
									findCustomer()
								}
							}}
							placeholder="Search..."
							required
						/>
						<i class="bx bx-search-alt search-icon" />
					</div>
				</div>
			</div>
		</div>
	</div>

	{#await $Promise}
		<Loading />
	{:then}
		<!-- {JSON.stringify($OrderStore.customer)} -->
		{#if $OrderStore.customer}
			<div class="col-lg-8">
				<div class="mt-4 mt-xl-3">
					<small class="text-muted">{$OrderStore.customer?.gender || ''}</small>
					<h4 class="mt-1 mb-3">
						{$OrderStore.customer?.firstName || ''}
						{$OrderStore.customer?.lastName || ''}
						{$OrderStore.customer?.socialReason || ''}
					</h4>

					<p class="mb-4 text-muted">{$OrderStore.customer?.orders?.length} Compras Realizadas</p>

					<h6 class="text-success text-uppercase">
						DNI:
						{$OrderStore.customer?.dniType}-{$OrderStore.customer?.dni}
					</h6>
					{#if $OrderStore.customer?.socialReason}
						<h6 class="text-success text-uppercase">
							Razón Social: {$OrderStore.customer?.socialReason}
						</h6>
					{/if}

					{#if $OrderStore.customer?.phone}
						<h6 class="text-success text-uppercase">
							Teléfono: +58 {$OrderStore.customer?.phone}
						</h6>
					{/if}
					<h6 class="text-success text-uppercase">
						Dirección: {$OrderStore.customer?.address}
					</h6>
				</div>
			</div>
		{/if}
	{:catch { message }}
		<div class="alert alert-danger d-print-none">
			{message}
		</div>
	{/await}
</div>
