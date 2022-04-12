<script>
	import { session } from '$app/stores'
	import { useDate } from '$lib/hooks/useDate'
	import { OrderStore } from '$lib/stores/OrderStore'
</script>

<main>
	<section>
		<span>
			{#if $OrderStore?.customer.dniType == 'V'}
				Cliente: {$OrderStore?.customer.firstName} {$OrderStore?.customer.lastName}
			{:else}
				Razón Social: {$OrderStore?.customer.socialReason}
			{/if}
		</span>
		<span>
			<br />
			{#if $OrderStore?.customer.dniType == 'V'}
				C.I: {$OrderStore?.customer.dni} &nbsp;
			{:else}
				Rif: {$OrderStore?.customer.dni} &nbsp;
			{/if}

			Teléfono: +58 {$OrderStore?.customer.phone}
		</span>
		<span><br /> Dirección: {$OrderStore?.customer.address}</span>
	</section>

	<aside>
		<span>Fecha: {useDate($OrderStore?.createdAt)}</span>
		<span><br />Forma de Pago: {$OrderStore?.payCondition}</span>
		<span class="d-print-none"><br />Usuario: {$session.username}</span>
	</aside>
</main>

<style>
	main {
		display: flex;
		border-bottom: 1px solid black;
	}

	section {
		flex-grow: 1;
	}

	@media print {
		main {
			font-size: 9px;
		}
	}
</style>
