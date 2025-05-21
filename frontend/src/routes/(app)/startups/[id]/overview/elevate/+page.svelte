<script lang="ts">
  import axiosInstance from '$lib/axios';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label/index.js';
  import { useQuery } from '@sveltestack/svelte-query';
  import type { PageData } from './$types';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import * as Select from '$lib/components/ui/select';
  import { Filter } from 'lucide-svelte';
  import axios from 'axios';
  import { toast } from 'svelte-sonner';
  import * as Table from '$lib/components/ui/table';
  import { getData, getReadinessLevels } from '$lib/utils';
  import { Textarea } from '$lib/components/ui/textarea';
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

  const readinessData = useQuery(
    'readinessData',
    async () =>
      (
        await axiosInstance.get(
          `/startup-readiness-levels/?startup_id=${data.startupId}`,
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        )
      ).data,
    {
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false
    }
  );

  const rnaData = useQuery('rnaDataElevate', async () =>
    getData(`/startup-rna/?startup_id=${data.startupId}`, data.access!)
  );

  const readinessLevel = useQuery(
    'readinessLevels',
    async () =>
      (
        await axiosInstance.get(`/readinesslevel/readiness-levels/`, {
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

  // $: if ($readinessData.isSuccess) {
  //   console.log($readinessData.data.results);
  // }

  // $: if ($rnaData.isSuccess) {
  //   console.log($rnaData.data.results.filter((d) => d.is_ai_generated === false));
  // }

  let elevatedReadiness: any = [0, 0, 0, 0, 0, 0];
  let elevatedRemark: any = ['', '', '', '', '', ''];

  async function elevate() {
    // console.log(elevatedReadiness);
    const readinessToUpdate = elevatedReadiness
      .map((r: any, index: number) => ({
        readinessLevel: r,
        remark: elevatedRemark[index]
      }))
      .filter((item: any) => item.readinessLevel !== 0);

    if (readinessToUpdate.length > 0) {
      const requests = readinessToUpdate.map((item: any) =>
        axiosInstance.post(
          `/startup-readiness-levels/`,
          {
            startup_id: data.startupId,
            readiness_level_id: item.readinessLevel,
            remark: item.remark ? item.remark : ' '
          },
          {
            headers: {
              Authorization: `Bearer ${data.access}`
            }
          }
        )
      );

      try {
        await axios.all(requests);
        console.log('All readiness levels updated successfully');
        toast.success('Elevated successfully');
        elevatedReadiness = [0, 0, 0, 0, 0, 0];
        elevatedRemark = ['', '', '', '', '', ''];
        $readinessData.refetch().then((res) => {
          res.data.results
            .slice(-6)
            .sort((a, b) => a.readiness_type.localeCompare(b.readiness_type))
            .map(
              (x, index) => (elevatedReadiness[index] = x.readiness_level_id)
            );
        });
      } catch (error) {
        console.error('Error updating readiness levels:', error);
      }
    } else {
      console.log('No readiness levels to update');
    }
  }

  const getLevel = (levels: any, id) => {
    if (id === 0) return '';
    return levels.filter((level: any) => Number(level.id) === Number(id))[0]
      .level;
  };

  let t = false;

  $: if ($readinessData.isSuccess && !t) {
    t = true;
    $readinessData.data.results
      .slice(-6)
      .sort((a, b) => a.readiness_type.localeCompare(b.readiness_type))
      .map((x, index) => {
        elevatedReadiness[index] = x.readiness_level_id;
        elevatedRemark[index] = x.remark;
      });

    // console.log(elevatedReadiness);
  }
</script>

<svelte:head>
  <title>Settings - Elevate</title>
</svelte:head>
<div class="flex flex-col gap-5">
  <h1 class="text-xl font-semibold">Elevate</h1>
  <div class="flex items-center justify-between">
    {#if $readinessData.isLoading}
      <Skeleton class="h-10" />
    {:else}
      <div class="w-3/4 rounded-md border">
        <Table.Root class="bg-background rounded-lg">
          <Table.Header>
            <Table.Row class="text-centery h-12">
              <Table.Head class="pl-5">Type</Table.Head>
              <Table.Head class="">Initial Level</Table.Head>
              <Table.Head class="">Current Level</Table.Head>
              {#if data.role !== 'Startup'}
                <Table.Head class="">Next Level</Table.Head>
              {/if}
              <Table.Head class="">Remarks</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#if $queryResult.isLoading}
              <Skeleton class="h-40" />
            {:else}
              {#each $readinessData.data.results
                .slice(-6)
                .sort( (a, b) => a.readiness_type.localeCompare(b.readiness_type) ) as r, index}
                {@const initial = $readinessData.data.results
                  .slice(0, 6)
                  .sort((a, b) =>
                    a.readiness_type.localeCompare(b.readiness_type)
                  )[index]}
                <Table.Row class="h-14 cursor-pointer">
                  <Table.Cell class="pl-5">{r.readiness_type}</Table.Cell>
                  <Table.Cell class="">{initial.readiness_level}</Table.Cell>
                  <Table.Cell class="">{r.readiness_level}</Table.Cell>
                  {#if data.role !== 'Startup'}
                    <Table.Cell class="">
                      <Select.Root
                        type="single"
                        bind:value={elevatedReadiness[index]}
                      >
                        <Select.Trigger class="w-[100px]">
                          {#if elevatedReadiness[index] !== r.readiness_level_id}
                            {getLevel(
                              getReadinessLevels(r.readiness_type),
                              elevatedReadiness[index]
                            )}
                          {/if}
                        </Select.Trigger>
                        <Select.Content>
                          {#each getReadinessLevels(r.readiness_type) as item}
                            <Select.Item value={`${item.id}`}
                              >{item.level}</Select.Item
                            >
                          {/each}
                        </Select.Content>
                      </Select.Root>
                    </Table.Cell>
                  {/if}
                  <Table.Cell>
                    {#if data.role !== 'Startup'}
                      {#if elevatedReadiness[index] === r.readiness_level_id}
                        <Textarea rows={1} bind:value={r.remark} readonly />
                      {:else}
                        <Textarea rows={1} bind:value={elevatedRemark[index]} />
                      {/if}
                    {:else}
                      <Textarea
                        rows={1}
                        class="border-none outline-none active:border-none active:outline-none"
                        readonly
                        value={r.remark}
                      />
                    {/if}
                  </Table.Cell>
                </Table.Row>
              {/each}
            {/if}
          </Table.Body>
        </Table.Root>
      </div>
    {/if}
  </div>
  {#if data.role !== 'Startup'}
    <div><Button onclick={elevate}>Elevate</Button></div>
  {/if}
</div>
