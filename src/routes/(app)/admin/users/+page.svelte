<script lang="ts">
	import { browser } from '$app/environment'
	import Alert from '$lib/components/Alert.svelte'
	import Loading from '$lib/components/Loading.svelte'
	import type { IUser } from '$lib/database/schemas/User'
	import { UserGendersEnum } from '$lib/enums/UserGendersEnum'
	import { Fetch, Promise } from '$lib/stores/Fetch'

	export let data
	let users: IUser[] = data.users

	const removeUser = async (user: IUser) => {
		const isSure = confirm('¿Desea Remover al Usuario?')
		if (isSure) {
			users = users.filter((e) => e !== user)
			Fetch.delete(`/api/users/${user._id}`)
		}
	}
</script>

<svelte:head>
	<title>VJC Import | Usuarios</title>
</svelte:head>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Lista de Usuarios</h4>
		</div>
	</div>
</div>
<!-- end page title -->

<div class="row">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<div class="mb-2 row">
					<div class="col-sm-4">
						<div class="mb-2 search-box me-2 d-inline-block">
							<div class="position-relative">
								<input type="text" class="form-control" placeholder="Search..." />
								<i class="bx bx-search-alt search-icon" />
							</div>
						</div>
					</div>
					<div class="col-sm-8">
						<div class="text-sm-end">
							<a
								href="/admin/users/add"
								class="mb-2 btn btn-success btn-rounded waves-effect waves-light me-2"
							>
								<i class="mdi mdi-plus me-1" />
								Registrar Usuario
							</a>
						</div>
					</div>
					<!-- end col-->
				</div>

				{#await $Promise}
					<Loading />
				{:then}
					<Alert />
					<div class="table-responsive">
						<table class="table align-middle table-nowrap">
							<thead>
								<tr>
									<th>#</th>
									<th>Nombre</th>
									<th>Sexo</th>
									<th>Username</th>
									<th>Teléfono / Email</th>
									<th>DNI</th>
									<th>Dirección</th>
									<th>Estado</th>
									<th>Permisos</th>
									<th>Rol</th>
									<th />
								</tr>
							</thead>
							<tbody>
								{#each users as item, index}
									<tr>
										<td>
											{index + 1}
										</td>
										<td>{item.firstName} {item.lastName}</td>
										<td>
											{#if item.gender === UserGendersEnum.MALE}
												Masculino
											{/if}
											{#if item.gender === UserGendersEnum.FEMALE}
												Femenino
											{/if}
										</td>
										<td>{item.username}</td>
										<td>
											<p class="mb-1">{item.phone || ''}</p>
											<p class="mb-0">{item.email || ''}</p>
										</td>

										<td>{item.dniType || ''}-{item.dni || ''}</td>
										<td>{item.address || ''}</td>
										<td>
											{#if item?.status}
												<span class="badge bg-success font-size-12">
													<i class="mdi mdi-star me-1" />
													Online
												</span>
											{/if}

											{#if !item?.status}
												<span class="badge bg-warning font-size-12">
													<i class="mdi mdi-star me-1" />
													Offline
												</span>
											{/if}
										</td>
										<td class="text-center">
											{#if !item?.locked}
												<span class="badge bg-success font-size-14">
													<i class="mdi mdi-lock-open-outline" />
												</span>
											{/if}

											{#if item?.locked}
												<span class="badge bg-danger font-size-14">
													<i class="mdi mdi-lock-outline" />
												</span>
											{/if}
										</td>
										<td>{item.role}</td>
										<td>
											<div class="dropdown">
												<a
													href="/#"
													class="dropdown-toggle card-drop"
													data-bs-toggle="dropdown"
													aria-expanded="false"
												>
													<i class="mdi mdi-dots-horizontal font-size-18" />
												</a>
												<ul class="dropdown-menu dropdown-menu-end">
													<li>
														<a href="/admin/users/{item._id}" class="dropdown-item">
															<i class="mdi mdi-pencil font-size-16 text-success me-1" />Modificar
														</a>
													</li>
													<li>
														<button on:click={() => removeUser(item)} class="dropdown-item">
															<i class="mdi mdi-trash-can font-size-16 text-danger me-1" />
															Remover
														</button>
													</li>
												</ul>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{:catch error}
					<h1>{error}</h1>
				{/await}
			</div>
		</div>
	</div>
</div>
