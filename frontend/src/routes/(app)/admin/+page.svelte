<script lang="ts">
  export let data: { recent: Array<{ date: string; action: string; details: string }> };
  let recent = data.recent;
</script>

<h1 class="mb-4 text-3xl font-bold tracking-tight">Admin Dashboard</h1>

<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
  <a data-sveltekit-preload-data="tap" href="/admin/users" class="rounded-md border p-4 transition-colors hover:border-flutter-blue hover:bg-muted/40">
    <div class="text-lg font-semibold">Manage Users</div>
    <p class="text-sm text-muted-foreground">List, edit, and delete users</p>
  </a>
  <a data-sveltekit-preload-data="tap" href="/admin/startups" class="rounded-md border p-4 transition-colors hover:border-flutter-blue hover:bg-muted/40">
    <div class="text-lg font-semibold">Manage Startups</div>
    <p class="text-sm text-muted-foreground">List, edit, and delete startups</p>
  </a>
</div>

<div class="rounded-md border">
  <div class="border-b p-4 font-medium">Recent Activity</div>
  <div class="p-4">
    {#if recent.length === 0}
      <p class="text-sm text-muted-foreground">No activity yet.</p>
    {:else}
      <ul class="space-y-2">
        {#each recent as r}
          <li class="flex items-start justify-between gap-4 rounded border p-2">
            <div>
              <div class="text-xs text-muted-foreground">{new Date(r.date).toLocaleString?.() || r.date}</div>
              <div class="font-medium">{r.action}</div>
            </div>
            <div class="text-sm">{r.details}</div>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<div class="mt-6">
  <a href="/admin" class="text-sm text-flutter-blue hover:underline">Back to dashboard</a>
</div>
