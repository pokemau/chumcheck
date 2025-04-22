<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  let { selectedTab, name, updateTab } = $props();
  let tabs = [name, `ai-${name}`];
</script>

<Tabs.Root value={selectedTab}>
  <Tabs.List class="border bg-flutter-gray/20">
    {#each tabs as tab}
      <Tabs.Trigger value={tab} onclick={() => updateTab(tab)} class="capitalize"
        >{tab}</Tabs.Trigger
      >
    {/each}
  </Tabs.List>
</Tabs.Root>
