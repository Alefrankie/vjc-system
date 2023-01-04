<script>
	import Alert from '$lib/components/Alert.svelte'
	import { httpService } from '$lib/services/Http.service'
	import { Fetch } from '$lib/stores/Fetch'

	const user = {
		username: '',
		password: ''
	}

	const signUp = async () => {
		await httpService.post('/api/users', user).then(() => {
			window.location.replace('/sign-in')
		})
	}
</script>

<svelte:head>
	<title>VJC Import | Registro</title>
</svelte:head>

<div class="col-xl-3">
	<div class="p-4 auth-full-page-content p-md-5">
		<div class="w-100">
			<div class="d-flex flex-column h-100">
				<div class="mb-4 mb-md-5">
					<span class="d-block auth-logo">
						<img src="/img/logo.png" alt="" height="150" />
					</span>
				</div>
				<div class="my-auto">
					<div>
						<h5 class="text-primary">¡Registro!</h5>
						<p class="text-muted">Regístrate para disfrutar del sistema.</p>
					</div>

					<div class="mt-4">
						<Alert />

						<form on:submit|preventDefault={signUp}>
							<div class="mb-3">
								<label for="username" class="form-label">Nombre de Usuario</label>
								<input
									class="form-control"
									id="username"
									placeholder="Tiburcio123..."
									bind:value={user.username}
								/>
							</div>

							<div class="mb-3">
								<div class="float-end">
									<!-- <a href="auth-recoverpw-2.html" class="text-muted"> ¿Olvidó su Contraseña? </a> -->
								</div>
								<label for="password" class="form-label">Contraseña</label>
								<div class="input-group auth-pass-inputgroup">
									<input
										type="password"
										id="password"
										class="form-control"
										placeholder="Ej. 123456"
										bind:value={user.password}
										aria-label="Password"
										aria-describedby="password-addon"
									/>
									<button class="btn btn-light " type="button" id="password-addon">
										<i class="mdi mdi-eye-outline" />
									</button>
								</div>
							</div>

							<div class="mt-3 d-grid">
								<button class="btn btn-primary waves-effect waves-light" type="submit">
									Registrarme
								</button>
							</div>
						</form>
						<div class="mt-5 text-center">
							<p>
								¿Ya tienes cuenta? <a href="/sign-in" class="fw-medium text-primary">
									Inicia Sesión
								</a>
							</p>
						</div>
					</div>
				</div>

				<div class="mt-4 text-center mt-md-5">
					<p class="mb-0">
						© <script>
						</script>2022 AJMA. Desigend and Developed by
						<i class="mdi mdi-heart text-danger" />
						Ing. Alefrank Martínez
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
