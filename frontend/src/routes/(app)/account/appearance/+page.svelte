<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as RadioGroup from '$lib/components/ui/radio-group';
  import { mode, setMode } from 'mode-watcher';

  let selectedMode: 'dark' | 'light' | 'system' = 'light';

  function updateTheme() {
    setMode(selectedMode);
  }
</script>

<svelte:head>
  <title>Account - Appearance</title>
</svelte:head>
<Card.Root>
  <Card.Header>
    <Card.Title>Profile</Card.Title>
    <Card.Description>Manage your personal information.</Card.Description>
  </Card.Header>
  <Card.Content>
    <h1 class="text-sm font-semibold">Theme</h1>
    <h2 class="text-xs text-muted-foreground">
      Select the theme for the dashboard.
    </h2>
    <RadioGroup.Root
      class="grid max-w-md grid-cols-2 gap-8 pt-2"
      orientation="horizontal"
      value={$mode}
    >
      <Label class="[&:has([data-state=checked])>div]:border-primary">
        <RadioGroup.Item
          value="light"
          class="sr-only"
          onclick={() => (selectedMode = 'light')}
        />
        <div
          class="items-center rounded-md border-2 border-muted p-1 hover:border-accent"
        >
          <div class="space-y-2 rounded-sm bg-[#ecedef] p-2">
            <div class="space-y-2 rounded-md bg-white p-2 shadow-sm">
              <div class="h-2 w-[80px] rounded-lg bg-[#ecedef]"></div>
              <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
            </div>
            <div
              class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"
            >
              <div class="h-4 w-4 rounded-full bg-[#ecedef]"></div>
              <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
            </div>
            <div
              class="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"
            >
              <div class="h-4 w-4 rounded-full bg-[#ecedef]"></div>
              <div class="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
            </div>
          </div>
        </div>
        <span class="block w-full p-2 text-center font-normal"> Light </span>
      </Label>

      <Label class="[&:has([data-state=checked])>div]:border-primary">
        <RadioGroup.Item
          value="dark"
          class="sr-only"
          onclick={() => (selectedMode = 'dark')}
        />
        <div
          class="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground"
        >
          <div class="space-y-2 rounded-sm bg-slate-950 p-2">
            <div class="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
              <div class="h-2 w-[80px] rounded-lg bg-slate-400"></div>
              <div class="h-2 w-[100px] rounded-lg bg-slate-400"></div>
            </div>
            <div
              class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm"
            >
              <div class="h-4 w-4 rounded-full bg-slate-400"></div>
              <div class="h-2 w-[100px] rounded-lg bg-slate-400"></div>
            </div>
            <div
              class="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm"
            >
              <div class="h-4 w-4 rounded-full bg-slate-400"></div>
              <div class="h-2 w-[100px] rounded-lg bg-slate-400"></div>
            </div>
          </div>
        </div>
        <span class="block w-full p-2 text-center font-normal"> Dark </span>
      </Label>
      <!-- <RadioGroup.Input name="theme" /> -->
    </RadioGroup.Root>
  </Card.Content>
  <Card.Footer class="border-t px-6 py-4">
    <Button size="sm" onclick={updateTheme}>Update</Button>
  </Card.Footer>
</Card.Root>
