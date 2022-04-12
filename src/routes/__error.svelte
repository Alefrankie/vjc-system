<script context="module">
	/** @type {import('@sveltejs/kit').ErrorLoad} */
	export function load({ error, status }) {
		return {
			props: {
				status: status,
				text: error.message
			}
		}
	}
</script>

<script>
	export let text
</script>

<div class="pt-5 my-5 account-pages">
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<div class="mb-5 text-center">
					<h1 class="display-2 fw-medium">
						4<i class="bx bx-buoy bx-spin text-primary display-3" />4
					</h1>
					<h4 class="text-uppercase">Sorry, {text}</h4>
					<div class="mt-5 text-center">
						<a class="btn btn-primary waves-effect waves-light" href="/">Back to Dashboard</a>
					</div>
				</div>
			</div>
		</div>
		<div class="row justify-content-center">
			<div class="col-md-8 col-xl-6">
				<div>
					<img src="assets/images/error-img.png" alt="" class="img-fluid" />
				</div>
			</div>
		</div>
	</div>
</div>
