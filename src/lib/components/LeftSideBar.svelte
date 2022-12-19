<script lang="ts">
	import { page } from '$app/stores'
	import type { IUser } from '$lib/database/schemas/User'
	import { UserRolesEnum } from '$lib/enums/UserRolesEnum'

	$: session = $page.data.session as IUser

	function collapseMenu(e: any) {
		e.target.parentNode.classList.toggle('mm-active')
		e.target.nextElementSibling.classList.toggle('mm-show')
	}

	export let sideBar: any
</script>

<div class="vertical-menu">
	{#if !sideBar}
		<div data-simplebar="init" class="h-100">
			<div class="simplebar-wrapper" style="margin: 0px;">
				<div class="simplebar-height-auto-observer-wrapper">
					<div class="simplebar-height-auto-observer" />
				</div>
				<div class="simplebar-mask">
					<div class="simplebar-offset" style="right: -17px; bottom: 0px;">
						<div class="simplebar-content-wrapper" style="height: 100%; overflow: hidden scroll;">
							<div class="simplebar-content" style="padding: 0px;">
								<!--- Sidemenu -->
								<div id="sidebar-menu" class="mm-active">
									<!-- Left Menu Start -->
									<ul class="metismenu list-unstyled mm-show" id="side-menu">
										<li class="menu-title">Menu</li>

										<li class="mm-active">
											<a href="/" class="waves-effect mm-active">
												<i class="bx bx-home-circle" />
												<span>Resumen</span>
											</a>
										</li>

										<li class="menu-title">Apps</li>

										<li>
											<a href="/customers" class="waves-effect">
												<i class="bx bxs-user-detail" />
												<span>Clientes</span>
											</a>
										</li>

										<li>
											<a
												href="/#"
												on:click|preventDefault={collapseMenu}
												class="has-arrow waves-effect"
											>
												<i class="bx bx-store" />
												Órdenes
											</a>
											<ul class="sub-menu mm-collapse">
												<li>
													<a href="/orders/add">Nueva</a>
												</li>
												<li>
													<a href="/orders/">Lista</a>
												</li>
											</ul>
										</li>

										{#if session.role === UserRolesEnum.ADMIN}
											<li class="menu-title">Admin</li>

											<li>
												<a href="/admin/users" class="waves-effect">
													<i class="bx bx-user-circle" />
													<span>Usuarios</span>
												</a>
											</li>

											<li>
												<a href="/admin/products" class="waves-effect">
													<i class="bx bx-box" />
													<span>Productos</span>
												</a>
											</li>

											<li>
												<a href="/admin/revenues" class="waves-effect">
													<i class="bx bx-money" />
													<span>Ingresos</span>
												</a>
											</li>
										{/if}
									</ul>
								</div>
								<!-- Sidebar -->
							</div>
						</div>
					</div>
				</div>
				<div class="simplebar-placeholder" style="width: auto; height: 1321px;" />
			</div>
			<div class="simplebar-track simplebar-horizontal" style="visibility: hidden;">
				<div
					class="simplebar-scrollbar"
					style="transform: translate3d(0px, 0px, 0px); display: none;"
				/>
			</div>
			<div class="simplebar-track simplebar-vertical" style="visibility: visible;">
				<div
					class="simplebar-scrollbar"
					style="height: 331px; transform: translate3d(0px, 0px, 0px); display: block;"
				/>
			</div>
		</div>
	{/if}
</div>
