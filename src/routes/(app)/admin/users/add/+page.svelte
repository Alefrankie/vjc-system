<script lang="ts">
	import Alert from '$lib/components/Alert.svelte'
	import type { IUser } from '$lib/database/schemas/User'
	import { UserGendersEnum } from '$lib/enums/UserGendersEnum'
	import { UserRolesEnum } from '$lib/enums/UserRolesEnum'
	import { UserStatusEnum } from '$lib/enums/UserStatusEnum'
	import { Fetch } from '$lib/stores/Fetch'

	let user = {
		username: '',
		status: UserStatusEnum.OFFLINE,
		role: UserRolesEnum.USER,
		dniType: 'V',
		locked: false,
		address: '',
		dni: '',
		firstName: '',
		lastName: '',
		phone: '',
		gender: UserGendersEnum.MALE,
		email: '',
		password: ''
	} as IUser

	const saveUser = () => {
		Fetch.post('/api/users', user)
	}
</script>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Registro de Usuario</h4>
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
				<form on:submit|preventDefault={saveUser}>
					<div class="row">
						<div class="col-sm-6">
							<div class="mb-3">
								<label for="firstName">Nombre</label>
								<input id="firstName" class="form-control" bind:value={user.firstName} />
							</div>
							<div class="mb-3">
								<label for="lastName">Apellido</label>
								<input id="lastName" class="form-control" bind:value={user.lastName} />
							</div>

							<div class="mb-3">
								<label for="gender" class="control-label">Sexo</label>
								<select
									id="gender"
									class="form-control select2 select2-hidden-accessible"
									data-select2-id="1"
									tabindex="-1"
									aria-hidden="true"
									bind:value={user.gender}
								>
									<option value={UserGendersEnum.MALE}>Masculino</option>
									<option value={UserGendersEnum.FEMALE}>Femenino</option>
								</select>
							</div>
							<div class="mb-3">
								<label for="username">Nombre de Usuario</label>
								<input id="username" class="form-control" bind:value={user.username} />
							</div>
							<div class="mb-3">
								<label for="password">Contraseña</label>
								<input
									type="password"
									id="password"
									required
									class="form-control"
									bind:value={user.password}
								/>
							</div>
						</div>

						<div class="col-sm-6">
							<div class="mb-3">
								<div class="row">
									<div class="col-sm-2">
										<label for="selectt" class="control-label">DNI</label>
										<select id="selectt" class="form-control" bind:value={user.dniType}>
											<option value="V">V</option>
											<option value="J">J</option>
											<option value="E">E</option>
										</select>
									</div>
									<div class="col-sm-10">
										<label for="dni">&nbsp;</label>
										<input id="dni" class="form-control" bind:value={user.dni} />
									</div>
								</div>
							</div>
							<div class="mb-3">
								<label for="phone">Teléfono</label>
								<input id="phone" class="form-control" bind:value={user.phone} />
							</div>

							<div class="mb-3">
								<label for="email">Email</label>
								<input type="email" id="email" class="form-control" bind:value={user.email} />
							</div>
							<div class="mb-3">
								<label for="address">Dirección</label>
								<textarea class="form-control" id="address" bind:value={user.address} rows="5" />
							</div>
						</div>
					</div>

					<div class="flex-wrap gap-2 d-flex">
						<button type="submit" class="btn btn-primary waves-effect waves-light">
							Registrar
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
