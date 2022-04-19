<script>
	function updateType(e) {
		Order.setType(e.target.value)
	}

	function updateVolume(e) {
		Order.setVolume(e.target.value)
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
						value={$Order.type}
						on:change={updateType}
					>
						<option>Seleccione</option>
						<option value="DeliveryNote">Nota de Entrega</option>
						<option value="Budget">Presupuesto</option>
						<option value="Sale">Factura Fiscal</option>
					</select>
				</div>
			</div>
		</div>
	</div>
	{#if ['DeliveryNote', 'Budget'].includes($Order.type)}
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
							value={$Order.volume}
							on:change={updateVolume}
						>
							<option>Seleccione</option>
							<option value="Wholesale">Mayor</option>
							<option value="Retail">Detal</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
