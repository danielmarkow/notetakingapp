<script>
	import '../app.css';
  import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  });
</script>

<QueryClientProvider client={queryClient}>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<slot />
	</div>
</QueryClientProvider>
