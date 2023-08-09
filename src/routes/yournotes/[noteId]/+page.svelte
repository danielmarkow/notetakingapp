<script>
	import { marked } from 'marked';
	import { createMutation, createQuery } from '@tanstack/svelte-query';

	let title = '';
	let value = '';
	let savedTitle = '';
	let savedValue = '';

  export let data;
  
  const noteQry = createQuery({
    queryKey: ["notes", data.noteId],
    queryFn: async () => {
      const resp = await fetch(`/notes/?noteId=${data.noteId}`);
	    return await resp.json();
    },
    onSuccess: (data) => {
      title = data.title;
      value = data.note;
      savedTitle = data.title;
			savedValue = data.note;
    }
  });

	const notesMutation = createMutation({
		mutationFn: async () => {
			const response = await fetch('/notes', {
				method: 'PUT',
				body: JSON.stringify({
          id: data.noteId,
          title,
          note: value
        }),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			return await response.json();
		},
		onSuccess: (data) => {
			savedTitle = data.title;
			savedValue = data.note;
		}
	});

	$: titleStatus = title === savedTitle;
	$: valueStatus = value === savedValue;
</script>


{#if $noteQry.isLoading}
  <p>Loading...</p>
{:else if $noteQry.isError}
  <p>An error occurred...</p>
{:else if $noteQry.isSuccess}
<div class="grid grid-cols-2 mt-5 gap-2">
	<div class="flex flex-col gap-1">
		<input id="title" type="text" bind:value={title} placeholder="Title" class="border-2 border-black" />
		<textarea bind:value rows="5" cols="40" placeholder="Input your notes..." class="border-2 border-black" />
	</div>
	<div class="border-2 border-black">
    {#if value === ""}
      <span class="text-gray-500 p-2 text-base">Nothing here yet</span>
    {:else}
    <article class="prose prose-sm">
      {@html marked(value, { mangle: false, headerIds: false })}
    </article>

    {/if}
	</div>
</div>
<button
	on:click={async () => {
		$notesMutation.mutate();
	}}
	class="mt-1 border-2 border-black px-10 bg-cyan-400"
	>Save</button
>

<p>saved title: {savedTitle}</p>
<p>title status: {titleStatus}</p>
<p>---</p>
<p>saved value: {savedValue}</p>
<p>value status: {valueStatus}</p>
{/if}