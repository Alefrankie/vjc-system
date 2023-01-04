<script lang="ts">
	import { page } from '$app/stores'
	import Loading from '$lib/components/Loading.svelte'
	import type { IProduct } from '$lib/database/schemas/Product'
	import type { IUser } from '$lib/database/schemas/User'
	import { UserRolesEnum } from '$lib/enums/UserRolesEnum'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import { Fetch, Promise } from '$lib/stores/Fetch'
	import { ProductStore } from '$lib/stores/ProductStore'
	import { RateStore } from '$lib/stores/RateStore'

	$: session = $page.data.session as IUser

	const removeProduct = async (product: IProduct) => {
		const isSure = confirm('¿Desea remover el registro?')
		if (isSure) {
			await Fetch.delete(`/api/products/${product._id}`)
			ProductStore.remove(product)
		}
	}

	let timeoutId: NodeJS.Timeout

	const productFinder = async (e: KeyboardEvent) => {
		const { value } = e.target as HTMLInputElement

		if (timeoutId) clearTimeout(timeoutId)

		timeoutId = setTimeout(async () => {
			const { data }: { data: IProduct[] } = await Fetch.get(`/api/products/filter/?key=${value}`)

			ProductStore.set(data)
		}, 500)
	}
</script>

<svelte:head>
	<title>VJC Import | Productos</title>
</svelte:head>

<div class="row">
	<div class="col-12">
		<div class="page-title-box d-sm-flex align-items-center justify-content-between">
			<h4 class="mb-sm-0 font-size-18">Productos</h4>
		</div>
	</div>
</div>
<!-- end page title -->

<div class="row">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<div class="mb-2 row d-print-none">
					<div class="col-sm-4">
						<div class="mb-2 search-box me-2 d-inline-block">
							<div class="position-relative">
								<input on:keyup={productFinder} class="form-control" placeholder="Search..." />
								<i class="bx bx-search-alt search-icon" />
							</div>
						</div>
					</div>
					<div class="col-sm-8">
						<div class="text-sm-end">
							<!-- svelte-ignore a11y-invalid-attribute -->
							<a
								href="javascript:window.print()"
								class="mb-2 btn btn-success btn-rounded waves-effect waves-light me-2"
							>
								<i class="fa fa-print" />
							</a>

							<a
								href="/admin/products/add"
								class="mb-2 btn btn-success btn-rounded waves-effect waves-light me-2"
							>
								<i class="mdi mdi-plus me-1" />
								Registrar Producto
							</a>
						</div>
					</div>
					<!-- end col-->
				</div>

				{#await $Promise}
					<Loading />
				{:then value}
					{#if value?.message}
						<div class="alert alert-success d-print-none">
							{value?.message}
						</div>
					{/if}
					<div class="table-responsive" style="min-height: 60vh;">
						<table class="table align-middle table-nowrap table-check">
							<thead class="table-light">
								<tr>
									<th class="align-middle">#</th>
									<th class="align-middle d-print-none">Código</th>
									<th class="align-middle">Nombre</th>
									<th class="align-middle">Precio Al Mayor</th>
									<th class="align-middle">Precio Al Detal</th>
									<th class="align-middle">Cantidad</th>
									<th class="align-middle d-print-none">&nbsp;</th>
								</tr>
							</thead>
							<tbody>
								{#each $ProductStore as item, index}
									<tr>
										<td class="">{index + 1}</td>
										<td class="d-print-none">
											<a href="/admin/products/{item._id}"> #{item.code}</a>
										</td>
										<td>{item.name}</td>
										<td>
											<p style="margin-top: 5px; margin-bottom: 10px">
												{useFormatNumber(item.price * $RateStore.Wholesale)} Bs
											</p>
											<p style="margin-bottom: 4px; margin-top: 0px">
												{useFormatNumber(item.price)} $
											</p>
										</td>
										<td>
											<p style="margin-top: 5px; margin-bottom: 10px">
												{useFormatNumber(item.price * $RateStore.Retail)} Bs
											</p>
											<p style="margin-bottom: 4px; margin-top: 0px">
												{useFormatNumber(item.price)} $
											</p>
										</td>
										<td>
											<span
												class:badge-soft-danger={item.quantity < 1}
												class:badge-soft-success={item.quantity > 1}
											>
												{useFormatNumber(item.quantity)}
												{item.unit}
											</span>
										</td>

										<td class="d-print-none">
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
														<a href="/admin/products/{item._id}" class="dropdown-item">
															<i class="mdi mdi-pencil font-size-16 text-success me-1" />
															Modificar
														</a>
													</li>

													{#if session.role === UserRolesEnum.ADMIN}
														<li>
															<button on:click={() => removeProduct(item)} class="dropdown-item">
																<i class="mdi mdi-trash-can font-size-16 text-danger me-1" />
																Remover
															</button>
														</li>
													{/if}
												</ul>
											</div>
										</td>
									</tr>
								{:else}
									<tr class="text-center text-muted">
										<td colspan="7"> No hay registros </td>
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

<style>
	table {
		font-size: 10px;
	}

	table tr td {
		padding: 0;
		margin: 0;
		line-height: 1;
		font-size: 14px;
	}

	@media print {
		table {
			font-size: 10px;
		}

		table tr td {
			padding: 0;
			margin: 0;
			line-height: 0;
			font-size: 7px;
		}
	}
</style>
