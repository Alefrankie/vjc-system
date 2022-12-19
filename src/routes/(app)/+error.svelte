<script>
	import { page } from '$app/stores'
	// import ErrorImage from '$lib/assets/avatar-1.jpg'
</script>

<div class="pt-5 my-5 account-pages">
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<div class="mb-5 text-center">
					<h1 class="display-2 fw-medium">
						4<i class="bx bx-buoy bx-spin text-primary display-3" />4
					</h1>

					<h4 class="text-uppercase">Sorry, {$page?.error?.message}</h4>
					<h4 class="text-uppercase">Status: {$page.status}</h4>
					<div class="mt-5 text-center">
						<a class="btn btn-primary waves-effect waves-light" href="/">Back to Dashboard</a>
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="row justify-content-center">
			<div class="col-md-8 col-xl-6">
				<div>
					<img src={ErrorImage} alt="" class="img-fluid" />
				</div>
			</div>
		</div> -->
	</div>
</div>
