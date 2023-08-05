<script>
	import { marked } from 'marked';
	let title = '';
	let value = '';
</script>

<div class="grid grid-cols-2 mt-5 gap-2">
	<div class="flex flex-col gap-1">
		<input id="title" type="text" bind:value={title} placeholder="Title" />
		<textarea bind:value rows="5" cols="40" placeholder="Input your notes..." />
	</div>
	<div class="border border-dotted border-black">
		<article class="prose prose-sm">{@html marked(value)}</article>
	</div>
</div>
<button
	on:click={async () => {
		const response = await fetch('/notes', {
			method: 'POST',
			body: JSON.stringify({ title, note: value }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}}
	class="mt-1 border border-gray-500 hover:border-gray-300 px-10 bg-white hover:bg-gray-100"
	>Save</button
>
