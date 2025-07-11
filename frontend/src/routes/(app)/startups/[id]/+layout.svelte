<script lang="ts">
  import { page } from '$app/stores';
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { getData } from '$lib/utils';
  import { useQuery } from '@sveltestack/svelte-query';

  const { children, data } = $props();
  const { access, startupId } = data;

  const startupQuery = useQuery('startupData', () => getData(`/startups/${startupId}`, access!));

  const info: any = $derived($startupQuery.isSuccess ? $startupQuery.data : {});

  type m = 'readiness-level' | 'progress-report' | 'rns' | 'rna' | 'initiatives' | 'roadblocks';

  const getModule = (module: m) => {
    const modules = {
      'readiness-level': 'Readiness Level',
      'progress-report': 'Progress Report',
      rns: 'Recommended Next Steps',
      rna: 'Readiness and Needs Assessment',
      initiatives: 'Initiatives',
      roadblocks: 'Roadblocks'
    };

    return modules[module];
  };
</script>

<div class="flex max-h-full flex-1 flex-col gap-3">
  <Breadcrumb.Root>
    <Breadcrumb.List>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/startups">Startups</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page>{$startupQuery.isLoading ? 'Loading...' : info.name}</Breadcrumb.Page>
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
      <Breadcrumb.Item>
        <Breadcrumb.Page
          >{getModule($page.url.pathname.split('/').slice(-1)[0] as m) ||
            'Pending Approval'}</Breadcrumb.Page
        >
      </Breadcrumb.Item>
    </Breadcrumb.List>
  </Breadcrumb.Root>
  <div class="flex items-center justify-between">
    <div>
      <h2 class="text-3xl font-bold">{$startupQuery.isLoading ? 'Loading...' : info.name}</h2>
    </div>
  </div>
  {@render children()}
</div>
