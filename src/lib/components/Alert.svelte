<script lang="ts">
	import { AppConfig } from '$lib/configuration/app.config'
	import { httpService, Promise } from '$lib/services/Http.service'

	import Loading from './Loading.svelte'
</script>

{JSON.stringify($AppConfig)}
{#await $Promise}
	<Loading />
{:then value}
	{JSON.stringify(value)}

	<!-- {#if value?.message}
			<div class="alert alert-success d-print-none" transition:fade>
				<p>{value?.message}</p>
			</div>
		{/if} -->
{:catch { message }}
	<div class="alert alert-danger d-print-none">
		{message}
	</div>
{/await}
