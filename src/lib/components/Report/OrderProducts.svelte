<script>
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import {
		getDiscount,
		getDiscountTotal,
		getIva,
		getPrice,
		getSubTotal,
		getTotal
	} from '$lib/hooks/useMoney'
	import { OrderStore } from '$lib/stores/OrderStore'
</script>

<main>
	<table>
		<thead>
			<tr>
				<th>Cantidad</th>
				<th>Descripción</th>
				<th>Precio Unitario</th>
				<th>Descuento</th>
				<th>Monto</th>
			</tr>
		</thead>
		<tbody>
			{#each $OrderStore.cart as item}
				<tr>
					<td
						style="padding-left: 0.5rem; display: flex; align-items: center;align-items: center; width: 20%;"
					>
						<span style="width: 1.5rem;">{item.requested}</span>
						<span style="width: 1rem;">{item.unit}</span>
					</td>
					<td style="display: flex;align-items: center; width: 20%;">
						{item.name}
					</td>
					<td
						style="display: flex; justify-content: end; padding-right: 4rem;align-items: center; width: 20%;"
					>
						{useFormatNumber(item.price * $OrderStore.rate)} Bs
					</td>
					<td
						style="display: flex; justify-content: end;align-items: center; width: 20%; padding-right: 2rem;"
					>
						{item.discount * 100}%
					</td>
					<td style="display: flex; justify-content: end;align-items: center; width: 20%;">
						{useFormatNumber(getPrice(item) * $OrderStore.rate)} Bs
					</td>
				</tr>
			{/each}
		</tbody>

		<tfoot>
			<tr>
				<td style="flex-grow: 1; padding-left: 0.5rem">
					<span>
						{#if $OrderStore.volume === 'Wholesale'}
							Al Mayor<br />
						{/if}
						{#if $OrderStore.volume === 'Retail'}
							Al Detal<br />
						{/if}
					</span>
					<span>Factura: #{$OrderStore.code}</span>
				</td>
				<td style="text-align: right; padding-left: 0; display: flex; flex-direction: column;">
					<span>
						Sub-Total:
						{useFormatNumber(getSubTotal($OrderStore.cart) * $OrderStore.rate)} Bs
					</span>

					<span>
						Descuento: -{useFormatNumber(getDiscountTotal($OrderStore.cart) * $OrderStore.rate)} Bs
					</span>
					{#if $OrderStore.type !== 'Sale'}
						<span>
							Iva: +{useFormatNumber(getIva($OrderStore.cart) * $OrderStore.rate)} Bs
						</span>

						<span
							>Total: {useFormatNumber(
								(getTotal($OrderStore.cart) + getIva($OrderStore.cart)) * $OrderStore.rate
							)} Bs</span
						>
						<span class="d-print-none">
							Total Dólares: {useFormatNumber(
								getTotal($OrderStore.cart) + getIva($OrderStore.cart)
							)} Bs
						</span>
					{:else}
						<span>Total: {useFormatNumber(getTotal($OrderStore.cart) * $OrderStore.rate)} Bs</span>
						<span class="d-print-none">
							Total Dólares: {useFormatNumber(getTotal($OrderStore.cart))} Bs
						</span>
					{/if}
				</td>
			</tr>
		</tfoot>
	</table>
</main>

<style>
	main {
		display: flex;
		border-bottom: 1px solid black;
	}

	table {
		min-width: 100%;
	}

	table thead tr {
		display: flex;
		justify-content: space-between;
	}

	table tbody {
		border-bottom: 1px solid black;
	}
	table tbody tr {
		display: flex;
	}

	table tfoot tr {
		display: flex;
	}

	@media print {
		main {
			font-size: 9px;
		}
	}
</style>
