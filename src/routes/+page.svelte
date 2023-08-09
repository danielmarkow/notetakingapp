<script>
	import {createQuery} from "@tanstack/svelte-query";

	const notesQry = createQuery({
		queryKey: ['notes'],
		queryFn: async () => {
			const result = await fetch("/notes/?userId=default-uid");
			return await result.json();
		},
	})
</script>

<div class="mt-5 border-2 border-gray-600 p-1">
	<h1 class="text-xl">Your notes</h1>
	{#if $notesQry.isLoading}
		<p>Loading...</p>
	{:else if $notesQry.isError}
		<p>An error occurred</p>
	{:else if $notesQry.isSuccess}
		{#each $notesQry.data as note}
			<p><a href={`/yournotes/${note.id}`}>{note.title}</a></p>
		{/each}
	{/if}
</div>
