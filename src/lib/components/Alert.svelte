<script lang="ts">
	import { Promise } from '$lib/stores/Fetch'
	import { fade } from 'svelte/transition'
	import Loading from './Loading.svelte'
</script>

{#await $Promise}
	<Loading />
{:then value}
	{#if value?.message}
		<div class="alert alert-success d-print-none" transition:fade>
			<p>{value?.message}</p>
		</div>
	{/if}
{:catch { message }}
	<div class="alert alert-danger d-print-none">
		{message}
	</div>
{/await}
