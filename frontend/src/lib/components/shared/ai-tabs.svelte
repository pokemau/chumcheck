<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs/index.js';
  let { selectedTab, name, realName, updateTab } = $props();
  let tabs = [name, `ai-${name}`];
  let realTabs = [realName, `AI-${realName}`]
</script>

<Tabs.Root value={selectedTab}>
  <Tabs.List class="border bg-flutter-gray/20">
    {#each tabs as tab, i}
      <Tabs.Trigger value={tab} onclick={() => updateTab(tab)} class="capitalize"
        >{realTabs[i]}</Tabs.Trigger
      >
    {/each}
  </Tabs.List>
</Tabs.Root>
