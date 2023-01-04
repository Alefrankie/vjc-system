<script lang="ts">
	import { get } from 'svelte/store'
	import Loading from './Loading.svelte'
</script>

<!-- {#await promisex}
	<Loading />
{:then value}
	{JSON.stringify(value)} -->
<!-- 
		{#if value?.message}
			<div class="alert alert-success d-print-none" transition:fade>
				<p>{value?.message}</p>
			</div>
		{/if}
	-->
<!-- {:catch { message }}
	<div class="alert alert-danger d-print-none">
		{message}
	</div>
{/await} -->
