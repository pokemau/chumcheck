<script lang="ts">
  import '../app.css';
  import { ModeWatcher } from 'mode-watcher';
  import { Toaster } from '$lib/components/ui/sonner';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

  let { children } = $props();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false
      }
    }
  });
</script>

<ModeWatcher />
<Toaster richColors duration={2000} />
<QueryClientProvider client={queryClient}>
  <div class="h-screen w-screen">
    {@render children()}
  </div>
</QueryClientProvider>
