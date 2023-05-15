<script>
	import { OrderTypeEnum } from '$lib/enums/OrderTypeEnum'
	import { useMakeCode } from '$lib/hooks/useMakeCode'
	import { OrderStore } from '$lib/stores/OrderStore'
</script>

<main>
	<figure>
		<img src="/img/logo-2.png" alt="vjc-import-logo" />
	</figure>

	<section>
		<p>
			RIF: J-40667650-0
			<br />Dirección Fiscal: Vereda 2, Casa N° 12, Urb. Cruz Verde
			<br />Santa Ana de Coro - Mcpio. Miranda - Edo. Falcón - Zona Postal 4101
			<br />Calle Falcón entre Calle Chevrolet y Sierralta - Edif. Nicol - Piso P.B Local 174 - Coro
			- Falcón
			<br />Tlf.: 0424-640.17.98 / 0412-660.87.13
			<br />Correo: inversionesvjcimport@gmail.com
		</p>
	</section>

	<aside>
		<span style="font-style: italic;">¡Somos Gente de Soluciones!</span>
		<br /><span>
			{#if $OrderStore.type === OrderTypeEnum.DELIVERY_NOTE}
				Nota De Entrega
			{/if}
			{#if $OrderStore.type === OrderTypeEnum.BUDGET}
				Presupuesto
			{/if}
			{#if $OrderStore.type === OrderTypeEnum.SALE}
				Factura Fiscal
			{/if}
		</span>

		<br /><span>#{useMakeCode($OrderStore.code)}</span>
	</aside>
</main>

<style>
	main {
		display: flex;
		border-bottom: 1px solid black;
	}

	figure {
		margin-right: 0.5rem;
		width: 7rem;
		height: 100%;
		/* border: solid black 1px; */
	}

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	aside {
		flex-grow: 1;
		text-align: right;
		/* border: solid black 1px; */
	}

	p {
		line-height: 0.75rem;
	}

	@media print {
		main {
			font-size: 9px;
		}
	}
</style>
