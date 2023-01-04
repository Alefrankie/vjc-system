<script lang="ts">
	import Alert from '$lib/components/Alert.svelte'
	import { httpService } from '$lib/services/Http.service'
	import { Fetch } from '$lib/stores/Fetch'
	import { RateStore } from '$lib/stores/RateStore'

	let product = {
		code: '',
		name: '',
		price: 0,
		quantity: 0,
		unit: 'LTS.'
	}

	const saveData = async () => {
		await httpService.post('/api/products', product)
	}
</script>

<svelte:head>
	<title>VJC Import | Registro</title>
</svelte:head>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Registro de Producto</h4>
		</div>
	</div>
</div>
<!-- end page title -->

<div class="row">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<h4 class="card-title">Información Básica</h4>
				<p class="card-title-desc">Rellena los campos</p>

				<Alert />
				<form on:submit|preventDefault={saveData}>
					<div class="row">
						<div class="col-sm-6">
							<div class="mb-3">
								<label for="productCode">Código</label>
								<input id="productCode" class="form-control" bind:value={product.code} />
							</div>
							<div class="mb-3">
								<label for="productName">Nombre</label>
								<input id="productName" class="form-control" bind:value={product.name} />
							</div>

							<div class="mb-3">
								<div class="row">
									<div class="col-sm-2">
										<label for="selectt" class="control-label">Cantidad</label>
										<select id="selectt" class="form-control" bind:value={product.unit}>
											<option value="LTS.">LTS.</option>
											<option value="UNITS.">UNITS.</option>
										</select>
									</div>
									<div class="col-sm-10">
										<label for="dni">&nbsp;</label>
										<input id="dni" class="form-control" bind:value={product.quantity} />
									</div>
								</div>
							</div>
						</div>

						<div class="col-sm-6">
							<div class="mb-3">
								<div class="row">
									<div class="col-sm-4">
										<label for="selectt" class="control-label">Precio</label>
										<input id="dni" class="form-control" bind:value={product.price} />
									</div>
								</div>
							</div>
							<div class="mb-3">
								<div class="mb-3">
									<div class="row">
										<div class="col-sm-6">
											<label for="dni">Mayor</label>
											<span id="dni" class="form-control">
												{product.price * $RateStore.Wholesale}
											</span>
										</div>
										<div class="col-sm-6">
											<label for="dni">Detal</label>
											<span id="dni" class="form-control">
												{product.price * $RateStore.Retail}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="flex-wrap gap-2 d-flex">
							<button type="submit" class="btn btn-primary waves-effect waves-light">
								Registrar
							</button>
							<a href="/admin/products" class="btn btn-secondary waves-effect waves-light">
								Cancel
							</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
