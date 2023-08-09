<script>
	import { marked } from 'marked';
	import { createMutation } from '@tanstack/svelte-query';

	let title = '';
	let value = '';
	let savedTitle = '';
	let savedValue = '';

	const notesMutation = createMutation({
		mutationFn: async () => {
			const response = await fetch('/notes', {
				method: 'POST',
				body: JSON.stringify({ title, note: value }),
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

<div class="grid grid-cols-2 mt-5 gap-2">
	<div class="flex flex-col gap-1">
		<input id="title" type="text" bind:value={title} placeholder="Title" />
		<textarea bind:value rows="5" cols="40" placeholder="Input your notes..." />
	</div>
	<div class="border border-black">
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
	class="mt-1 border border-gray-500 hover:border-gray-300 px-10 bg-white hover:bg-gray-100"
	>Save</button
>

<p>saved title: {savedTitle}</p>
<p>title status: {titleStatus}</p>
<p>---</p>
<p>saved value: {savedValue}</p>
<p>value status: {valueStatus}</p>
