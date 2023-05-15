<script lang="ts">
	import Alert from '$lib/components/Alert.svelte'
	import Loading from '$lib/components/Loading.svelte'
	import type { IProduct } from '$lib/database/schemas/Product'
	import type { IUser } from '$lib/database/schemas/User'
	import { UserRolesEnum } from '$lib/enums/UserRolesEnum'
	import { Fetch, Promise } from '$lib/stores/Fetch'
	import { ProductStore } from '$lib/stores/ProductStore'
	import { RateStore } from '$lib/stores/RateStore'

	export let data
	let product = data.product as IProduct
	let session = data.session as IUser

	const modifyData = async () => {
		Fetch.patch(`/api/products/${product._id}`, product)

		ProductStore.set(
			$ProductStore.map((e) => {
				if (e._id === product._id) {
					e = product
				}
				return e
			})
		)
	}
</script>

<svelte:head>
	<title>Actualización</title>
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

				{#await $Promise}
					<Loading />
				{:then value}
					<Alert />
					<form on:submit|preventDefault={modifyData}>
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
											<input
												id="dni"
												class="form-control"
												placeholder="Precio en Dólares"
												bind:value={product.price}
											/>
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

							{#if session.role === UserRolesEnum.ADMIN}
								<div class="flex-wrap gap-2 d-flex">
									<button type="submit" class="btn btn-primary waves-effect waves-light">
										Actualizar
									</button>
								</div>
							{/if}
						</div>
					</form>
				{:catch error}
					<h1>
						{error}
					</h1>
				{/await}
			</div>
		</div>
	</div>
</div>
