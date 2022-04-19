<script>
	import { session } from '$app/stores'
	import { useDate } from '$lib/hooks/useDate'
</script>

<main>
	<section>
		<span>
			{#if $Order?.customer.dniType == 'V'}
				Cliente: {$Order?.customer.firstName} {$Order?.customer.lastName}
			{:else}
				Razón Social: {$Order?.customer.socialReason}
			{/if}
		</span>
		<span>
			<br />
			{#if $Order?.customer.dniType == 'V'}
				C.I: {$Order?.customer.dni} &nbsp;
			{:else}
				Rif: {$Order?.customer.dni} &nbsp;
			{/if}

			Teléfono: +58 {$Order?.customer.phone}
		</span>
		<span><br /> Dirección: {$Order?.customer.address}</span>
	</section>

	<aside>
		<span>Fecha: {useDate($Order?.createdAt)}</span>
		<span><br />Forma de Pago: {$Order?.payCondition}</span>
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
