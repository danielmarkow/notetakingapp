<script>
	import { createQuery } from '@tanstack/svelte-query';

  export let data;
  const noteQry = createQuery({
    queryKey: ["notes", data.noteId],
    queryFn: async () => {
      const resp = await fetch(`/notes/?noteId=${data.noteId}`);
	    return await resp.json();
    }
  })
</script>

<p>{data.noteId}</p>
{#if $noteQry.isLoading}
  <p>Loading...</p>
{:else if $noteQry.isError}
  <p>An error occured</p>
{:else if $noteQry.isSuccess}
  {JSON.stringify($noteQry.data)}
{/if}