<script lang="ts">
	import { page } from '$app/stores'
	import { UserRolesEnum } from '$lib/enums/UserRolesEnum'

	$: session = $page.data.session
	$: pathname = $page.url.pathname
</script>

{#if session.role === UserRolesEnum.ADMIN || ['/admin/products'].includes(pathname)}
	<slot />
{:else}
	<div class="pt-5 my-5 account-pages">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="mb-5 text-center">
						<h1 class="display-2 fw-medium">
							4<i class="bx bx-buoy bx-spin text-primary display-3" />4
						</h1>
						<h4 class="text-uppercase">Sorry, no tiene los permisos para acceder.</h4>
						<div class="mt-5 text-center">
							<a class="btn btn-primary waves-effect waves-light" href="/"> Back to Dashboard</a>
						</div>
					</div>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-8 col-xl-6">
					<div>
						<img src="/img/logo.png" alt="" class="img-fluid" />
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
