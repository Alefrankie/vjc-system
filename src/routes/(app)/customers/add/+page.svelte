<script lang="ts">
	import Alert from '$lib/components/Alert.svelte'
	import type { ICustomer } from '$lib/database/schemas/Customer'
	import { Fetch } from '$lib/stores/Fetch'

	let customer = {} as ICustomer

	const saveData = async () => {
		Fetch.post('/api/customers', customer)
	}
</script>

<svelte:head>
	<title>VJCImport | Registro de Cliente</title>
</svelte:head>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Registro de Cliente</h4>
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

				<form on:submit|preventDefault={saveData}>
					<div class="row">
						<div class="col-sm-6">
							{#if customer.dniType === 'V'}
								<div class="mb-3">
									<label for="firstName">Nombre</label>
									<input
										id="firstName"
										class="form-control"
										bind:value={customer.firstName}
										required
									/>
								</div>
								<div class="mb-3">
									<label for="lastName">Apellido</label>
									<input
										id="lastName"
										required
										class="form-control"
										bind:value={customer.lastName}
									/>
								</div>

								<div class="mb-3">
									<label for="gender" class="control-label">Sexo</label>
									<select
										id="gender"
										class="form-control select2 select2-hidden-accessible"
										data-select2-id="1"
										tabindex="-1"
										aria-hidden="true"
										required
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
										required
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
										<input id="dni" required class="form-control" bind:value={customer.dni} />
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
									required
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
							Registrar
						</button>
						<a href="/customers" class="btn btn-secondary waves-effect waves-light"> Cancel </a>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
