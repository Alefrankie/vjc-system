<script lang="ts">
	import type { IOrder } from '$lib/database/schemas/Order'
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'

	import { getBestOrder, getRevenues } from '$lib/hooks/useMoney'

	export let orders = [] as IOrder[]

	$: revenues = getRevenues(orders)
	$: bestOrder = getBestOrder(orders)
</script>

<div class="row">
	<div class="col-xl-12">
		<div class="row">
			<div class="col-md-4">
				<div class="card mini-stats-wid">
					<div class="card-body">
						<div class="d-flex">
							<div class="flex-grow-1">
								<p class="text-muted fw-medium">Ventas</p>
								<h4 class="mb-0">{orders.length}</h4>
							</div>

							<div class="flex-shrink-0 align-self-center">
								<div class="mini-stat-icon avatar-sm rounded-circle bg-primary">
									<span class="avatar-title">
										<i class="bx bx-copy-alt font-size-24" />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card mini-stats-wid">
					<div class="card-body">
						<div class="d-flex">
							<div class="flex-grow-1">
								<p class="text-muted fw-medium">Ingresos Totales</p>
								<h4 class="mb-0">{useFormatNumber(revenues.bolivars)} Bs</h4>
								<h4 class="mb-0">{useFormatNumber(revenues.dollars)}$</h4>
							</div>

							<div class="flex-shrink-0 align-self-center ">
								<div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
									<span class="avatar-title rounded-circle bg-primary">
										<i class="bx bx-archive-in font-size-24" />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card mini-stats-wid">
					<div class="card-body">
						<div class="d-flex">
							<div class="flex-grow-1">
								<p class="text-muted fw-medium">Mejor Venta</p>
								<h4 class="mb-0">{useFormatNumber(bestOrder.dollars)} $</h4>
							</div>

							<div class="flex-shrink-0 align-self-center">
								<div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
									<span class="avatar-title rounded-circle bg-primary">
										<i class="bx bx-purchase-tag-alt font-size-24" />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- end row -->
	</div>
</div>
