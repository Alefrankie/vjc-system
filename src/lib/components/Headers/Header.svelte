<script lang="ts">
	import { Fetch } from '$lib/stores/Fetch'
	import type { IUser } from '$lib/database/schemas/User'
	import { page } from '$app/stores'

	$: session = $page.data.session as IUser

	export let sideBar: any

	function showSidebar() {
		sideBar = !sideBar
	}

	async function signOut() {
		await Fetch.post('/api/users/sign-out', { _id: session._id })
		window.location.replace('/')
	}
</script>

<header id="page-topbar">
	<div class="navbar-header">
		<div class="d-flex">
			<!-- LOGO -->
			<div class="navbar-brand-box">
				<a href="/" class="logo logo-light">
					<span class="logo-lg">
						<img src="/img/logo-2.png" alt="" height="19" />
					</span>
				</a>
			</div>

			<button
				on:click={showSidebar}
				class="px-3 btn btn-sm font-size-16 header-item waves-effect"
				id="vertical-menu-btn"
			>
				<i class="fa fa-fw fa-bars" />
			</button>
		</div>

		<div class="d-flex">
			<div class="dropdown d-inline-block">
				<button
					type="button"
					class="btn header-item waves-effect"
					id="page-header-user-dropdown"
					data-bs-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					<img
						class="rounded-circle header-profile-user"
						src="/img/avatar-2.jpg"
						alt="Header Avatar"
					/>
					<span class="d-none d-xl-inline-block ms-1">{session.username}</span>
					<i class="mdi mdi-chevron-down d-none d-xl-inline-block" />
				</button>
				<div class="dropdown-menu dropdown-menu-end">
					<!-- item-->
					<a class="dropdown-item" href="/profile">
						<i class="align-middle bx bx-user font-size-16 me-1" />
						<span>Perfil</span>
					</a>

					<!-- <a
						class="dropdown-item"
						href="https://themesbrand.com/skote-mvc/layouts/index.html#"
						on:focus={() => signOut}
					>
						<i class="align-middle bx bx-lock-open font-size-16 me-1" />
						<span> Bloquear Pantalla </span>
					</a> -->
					<div class="dropdown-divider" />
					<button class="dropdown-item" on:click={signOut}>
						<i class="align-middle bx bx-power-off font-size-16 me-1 text-danger" />
						<span> Cerrar Sesión</span>
					</button>
				</div>
			</div>

			<div class="dropdown">
				<a
					style="display: flex; align-items: center"
					href="/admin/rates"
					class="btn header-item noti-icon right-bar-toggle waves-effect"
				>
					<i class="bx bx-cog bx-spin" />
				</a>
			</div>
		</div>
	</div>
</header>
