<script>
	import '../app.css';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

  const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <slot />
  </div>
</QueryClientProvider>
