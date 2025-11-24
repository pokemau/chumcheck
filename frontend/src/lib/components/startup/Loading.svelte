<script lang="ts">
  import { Skeleton } from "../ui/skeleton";

  const { data } = $props();
</script>

<div class="flex h-full flex-col gap-3">
<div class="flex justify-between">
    <div class="flex gap-3">
    <div class="bg-background" class:hidden={data.role === 'Startup'}>
        <Skeleton class="h-9 w-[126px]" />
    </div>
    <div class="bg-background">
        <Skeleton class="h-9 w-[170px]" />
    </div>
    <div class="flex">
        {#each [1, 2] as item, index}
        <Skeleton
            class={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-background ${
            index !== 2 - 1 ? '-mr-1' : ''
            } `}
        >
            ?
        </Skeleton>
        {/each}
    </div>
    </div>
    <div class="ml-auto bg-background">
    <Skeleton class="h-9 w-[90px]" />
    </div>
</div>

<div class="grid h-full grid-cols-4 gap-5">
    <div class="h-full w-full bg-background">
    <Skeleton class="h-full" />
    </div>
    <div class="h-full w-full bg-background">
    <Skeleton class="h-full" />
    </div>
    <div class="h-full w-full bg-background">
    <Skeleton class="h-full" />
    </div>
    <div class="h-full w-full bg-background">
    <Skeleton class="h-full" />
    </div>
</div>
</div>