<script lang="ts">
	import { OrderTypeEnum } from '$lib/enums/OrderTypeEnum'
	import { OrderVolumeEnum } from '$lib/enums/OrderVolumeEnum'
	import { OrderStore } from '$lib/stores/OrderStore'
	import { RateStore } from '$lib/stores/RateStore'

	function updateType(e: any) {
		OrderStore.setType(e.target.value)
	}

	function updateVolume(e: any) {
		if (e.target.value === OrderVolumeEnum.RETAIL) {
			OrderStore.setRate($RateStore.Retail)
		}

		if (e.target.value === OrderVolumeEnum.WHOLESALE) {
			OrderStore.setRate($RateStore.Wholesale)
		}

		OrderStore.setVolume(e.target.value)
	}
</script>

<div class="row">
	<div class="col-lg-6">
		<div class="card">
			<div class="card-body">
				<h4 class="mb-4 card-title">Tipo</h4>
				<div class="mb-3">
					<label for="selectt" class="control-label">Orden</label>
					<select
						id="selectt"
						class="form-control select2 select2-hidden-accessible"
						data-select2-id="1"
						tabindex="-1"
						aria-hidden="true"
						required
						value={$OrderStore.type}
						on:change={updateType}
					>
						<option value={OrderTypeEnum.DELIVERY_NOTE}>Nota de Entrega</option>
						<option value={OrderTypeEnum.BUDGET}>Presupuesto</option>
						<option value={OrderTypeEnum.SALE}>Factura Fiscal</option>
					</select>
				</div>
			</div>
		</div>
	</div>
	{#if $OrderStore.type !== OrderTypeEnum.SALE}
		<div class="col-lg-6">
			<div class="card">
				<div class="card-body">
					<h4 class="mb-4 card-title">Factura</h4>
					<div class="mb-3">
						<label for="selectt" class="control-label">Volumen</label>
						<select
							id="selectt"
							class="form-control select2 select2-hidden-accessible"
							required
							value={$OrderStore.volume}
							on:change={updateVolume}
						>
							<option value={OrderVolumeEnum.WHOLESALE}>Mayor</option>
							<option value={OrderVolumeEnum.RETAIL}>Detal</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
