<script lang="ts">
	import { PayConditionEnum } from '$lib/enums/PayConditiomEnum'
	import { page } from '$app/stores'
	import { OrderStore } from '$lib/stores/OrderStore'
	import dayjs from 'dayjs'
	import type { IUser } from '$lib/database/schemas/old/UserOld'

	let session = $page.data.session as IUser
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
		<span>Fecha: {dayjs($OrderStore?.createdAt).format('DD-MM-YYYY')}</span>
		<span
			><br />Forma de Pago:

			{#if $OrderStore?.payCondition === PayConditionEnum.CASH}
				Contado
			{/if}
			{#if $OrderStore?.payCondition === PayConditionEnum.CREDIT}
				Crédito
			{/if}
		</span>
		<span class="d-print-none"><br />Usuario: {session.username}</span>
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
