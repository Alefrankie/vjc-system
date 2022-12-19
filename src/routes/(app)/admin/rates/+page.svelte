<script lang="ts">
	import Alert from '$lib/components/Alert.svelte'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import { Fetch } from '$lib/stores/Fetch'
	import { RateStore } from '$lib/stores/RateStore'

	let retail = {
		name: 'Retail',
		value: $RateStore.Retail
	}

	let wholesale = {
		name: 'Wholesale',
		value: $RateStore.Wholesale
	}

	const saveRetail = async () => {
		const { data } = await Fetch.post('/api/rates', retail)
		RateStore.setRetail(data.value)
	}

	const saveWholesale = async () => {
		const { data } = await Fetch.post('/api/rates', wholesale)
		RateStore.setWholesale(data.value)
	}

	console.log($RateStore.Wholesale)
</script>

<svelte:head>
	<title>VJC Import | Ajustes</title>
</svelte:head>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Ajustes</h4>
		</div>
	</div>
</div>
<!-- end page title -->
<Alert />
<div class="row">
	<div class="col-6">
		<div class="card">
			<div class="card-body">
				<h4 class="card-title">Tasa Al Detal</h4>
				<p class="card-title-desc">Rellena los campos</p>

				<form on:submit|preventDefault={saveRetail}>
					<div class="row">
						<div class="col-sm-6">
							<div class="mb-3">
								<div class="row">
									<div class="col-sm-6">
										<label for="selectt" class="control-label">Valor</label>
										<input id="dni" class="form-control" bind:value={retail.value} />
									</div>

									<div class="col-sm-6">
										<label for="dni">Preview</label>
										<span id="dni" class="form-control">
											BS {useFormatNumber(retail.value)}
										</span>
									</div>
								</div>
							</div>
						</div>

						<div class="flex-wrap gap-2 d-flex">
							<button type="submit" class="btn btn-primary waves-effect waves-light">
								Actualizar
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="col-6">
		<div class="card">
			<div class="card-body">
				<h4 class="card-title">Tasa Al Mayor</h4>
				<p class="card-title-desc">Rellena los campos</p>

				<form on:submit|preventDefault={saveWholesale}>
					<div class="row">
						<div class="col-sm-6">
							<div class="mb-3">
								<div class="row">
									<div class="col-sm-6">
										<label for="selectt" class="control-label">Valor</label>
										<input id="dni" class="form-control" bind:value={wholesale.value} />
									</div>

									<div class="col-sm-6">
										<label for="dni">Preview</label>
										<span id="dni" class="form-control">
											BS {useFormatNumber(wholesale.value)}
										</span>
									</div>
								</div>
							</div>
						</div>

						<div class="flex-wrap gap-2 d-flex">
							<button type="submit" class="btn btn-primary waves-effect waves-light">
								Actualizar
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
