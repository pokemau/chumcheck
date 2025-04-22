<script lang="ts">
  import axiosInstance from '$lib/axios';
  import { useQuery } from '@sveltestack/svelte-query';
  import type { PageData } from './$types';
  export let data: PageData;
  const queryResult = useQuery(
    'startupData',
    async () =>
      (
        await axiosInstance.get(`/startups/${data.startupId}`, {
          headers: {
            Authorization: `Bearer ${data.access}`
          }
        })
      ).data,
    {
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false
    }
  );
</script>

<svelte:head>
  <title>Settings - Capsule Proposal</title>
</svelte:head>
<div class="flex flex-col gap-5">
  <h1 class="text-xl font-semibold">Capsule Proposal</h1>
  <div class="h-[650px] w-full overflow-scroll">
    {#if $queryResult.isSuccess}
      <object
        data={$queryResult.data.capsule_proposal}
        type="application/pdf"
        width="1000"
        height="1000"
        title="capsule_proposal"
      ></object>
    {/if}
  </div>
</div>
