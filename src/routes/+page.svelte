<script>
	import { goto } from "$app/navigation";
	import { createQuery, createMutation } from "@tanstack/svelte-query";

	const notesQry = createQuery({
		queryKey: ['notes'],
		queryFn: async () => {
			const result = await fetch("/notes/?userId=default-uid");
			return await result.json();
		},
	})

	const createMut = createMutation({
		mutationFn: async () => {
			const response = await fetch('/notes', {
				method: 'POST',
				body: JSON.stringify({
          title: "",
          note: ""
        }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			return await response.json();
		},
		onSuccess: (data) => {
			goto(`/yournotes/${data.id}`);
		}
	});
</script>

<div class="mt-5 border-2 border-gray-600 p-1">
	<h1 class="text-xl">Your notes</h1>
	<button on:click={() => {
		$createMut.mutate()
	}} class="mt-1 border-2 border-black px-2 bg-cyan-400">Create note</button>
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
