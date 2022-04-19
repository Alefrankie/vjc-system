<script>
	import { useFormatNumber } from '$lib/hooks/useFormatNumber'
	import { getDiscountTotal, getIva, getPrice, getSubTotal, getTotal } from '$lib/hooks/useMoney'
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
			{#each $Order.cart as item}
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
						{useFormatNumber(item.price * $Order.rate)} Bs
					</td>
					<td
						style="display: flex; justify-content: end;align-items: center; width: 20%; padding-right: 2rem;"
					>
						{item.discount * 100}%
					</td>
					<td style="display: flex; justify-content: end;align-items: center; width: 20%;">
						{useFormatNumber(getPrice(item) * $Order.rate)} Bs
					</td>
				</tr>
			{/each}
		</tbody>

		<tfoot>
			<tr>
				<td style="flex-grow: 1; padding-left: 0.5rem">
					<span>
						{#if $Order.volume === 'Wholesale'}
							Al Mayor<br />
						{/if}
						{#if $Order.volume === 'Retail'}
							Al Detal<br />
						{/if}
					</span>
					<span>Factura: #{$Order.code}</span>
				</td>
				<td style="text-align: right; padding-left: 0; display: flex; flex-direction: column;">
					<span>
						Sub-Total:
						{useFormatNumber(getSubTotal($Order.cart) * $Order.rate)} Bs
					</span>

					<span>
						Descuento: -{useFormatNumber(getDiscountTotal($Order.cart) * $Order.rate)} Bs
					</span>
					{#if $Order.type !== 'Sale'}
						<span>
							Iva: +{useFormatNumber(getIva($Order.cart) * $Order.rate)} Bs
						</span>

						<span
							>Total: {useFormatNumber((getTotal($Order.cart) + getIva($Order.cart)) * $Order.rate)}
							Bs</span
						>
						<span class="d-print-none">
							Total Dólares: {useFormatNumber(getTotal($Order.cart) + getIva($Order.cart))} Bs
						</span>
					{:else}
						<span>Total: {useFormatNumber(getTotal($Order.cart) * $Order.rate)} Bs</span>
						<span class="d-print-none">
							Total Dólares: {useFormatNumber(getTotal($Order.cart))} Bs
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
