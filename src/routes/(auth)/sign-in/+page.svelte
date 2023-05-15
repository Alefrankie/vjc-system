<!--  -->
<script>
	import { goto } from '$app/navigation'
	import Alert from '$lib/components/Alert.svelte'
	import { Fetch } from '$lib/stores/Fetch'

	const user = {
		username: '',
		password: ''
	}

	const signIn = async () => {
		await Fetch.post('/api/users/sign-in', user)
		window.location.replace('/')
	}
</script>

<svelte:head>
	<title>Iniciar Sesión</title>
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
						<h5 class="text-primary">¡Bienvenido de Vuelta!</h5>
						<p class="text-muted">Inicia Sesión para disfrutar del sistema.</p>
					</div>

					<div class="mt-4">
						<Alert />

						<form on:submit|preventDefault={signIn}>
							<div class="mb-3">
								<label for="username" class="form-label">Nombre de Usuario</label>
								<input
									class="form-control"
									id="username"
									placeholder="Escribe..."
									bind:value={user.username}
								/>
							</div>

							<div class="mb-3">
								<!-- <div class="float-end">
									<a href="auth-recoverpw-2.html" class="text-muted">¿Olvidó su Contraseña? </a>
								</div> -->
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
									<button class="btn btn-light" type="button" id="password-addon">
										<i class="mdi mdi-eye-outline" />
									</button>
								</div>
							</div>

							<div class="form-check">
								<input class="form-check-input" type="checkbox" id="remember-check" />
								<label class="form-check-label" for="remember-check">Recuérdame </label>
							</div>

							<div class="mt-3 d-grid">
								<button class="btn btn-primary waves-effect waves-light" type="submit">
									Iniciar
								</button>
							</div>
						</form>

						<div class="mt-5 text-center">
							<p>
								¿No tienes cuenta? <a href="/sign-up" class="fw-medium text-primary">
									Regístrate
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
