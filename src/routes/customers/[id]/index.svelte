<script context="module">
	import Alert from '$lib/components/Alert.svelte'
	import { http } from '$lib/hooks/useFetch'
	import { Fetch } from '$lib/stores/Fetch'
	export async function load({ params }) {
		const { data: customer } = await http.Get(`/api/customers/${params.id}`)
		return {
			props: { customer }
		}
	}
</script>

<script>
	export let customer = {}

	const modifyData = async () => {
		Fetch.Patch(`/api/customers/${customer._id}`, customer)
	}
</script>

<svelte:head>
	<title>VJC Import | Actualización</title>
</svelte:head>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Actualización de Cliente</h4>
		</div>
	</div>
</div>

<div class="row">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<h4 class="card-title">Información Básica</h4>
				<p class="card-title-desc">Rellena los campos</p>

				<Alert />

				<form on:submit|preventDefault={modifyData}>
					<div class="row">
						<div class="col-sm-6">
							{#if customer.dniType === 'V'}
								<div class="mb-3">
									<label for="firstName">Nombre</label>
									<input id="firstName" class="form-control" bind:value={customer.firstName} />
								</div>
								<div class="mb-3">
									<label for="lastName">Apellido</label>
									<input id="lastName" class="form-control" bind:value={customer.lastName} />
								</div>

								<div class="mb-3">
									<label for="gender" class="control-label">Sexo</label>
									<select
										id="gender"
										class="form-control select2 select2-hidden-accessible"
										data-select2-id="1"
										tabindex="-1"
										aria-hidden="true"
										bind:value={customer.gender}
									>
										<option>Seleccione</option>
										<option value="Masculino">Masculino</option>
										<option value="Femenino">Femenino</option>
									</select>
								</div>
							{/if}

							{#if customer.dniType !== 'V'}
								<div class="mb-3">
									<label for="socialReason">Razón Social</label>
									<input
										id="socialReason"
										class="form-control"
										bind:value={customer.socialReason}
									/>
								</div>
							{/if}
						</div>

						<div class="col-sm-6">
							<div class="mb-3">
								<div class="row">
									<div class="col-sm-2">
										<label for="selectt" class="control-label">DNI</label>
										<select id="selectt" class="form-control" bind:value={customer.dniType}>
											<option value="V">V</option>
											<option value="J">J</option>
											<option value="E">E</option>
										</select>
									</div>
									<div class="col-sm-10">
										<label for="dni">&nbsp;</label>
										<input id="dni" class="form-control" bind:value={customer.dni} />
									</div>
								</div>
							</div>
							<div class="mb-3">
								<label for="phone">Teléfono</label>
								<input id="phone" required class="form-control" bind:value={customer.phone} />
							</div>

							<div class="mb-3">
								<label for="email">Email</label>
								<input type="email" id="email" class="form-control" bind:value={customer.email} />
							</div>
							<div class="mb-3">
								<label for="address">Dirección</label>
								<textarea
									class="form-control"
									id="address"
									bind:value={customer.address}
									rows="5"
								/>
							</div>
						</div>
					</div>

					<div class="flex-wrap gap-2 d-flex">
						<button type="submit" class="btn btn-primary waves-effect waves-light">
							Actualizar
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
