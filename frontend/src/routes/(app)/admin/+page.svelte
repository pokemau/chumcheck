<script lang="ts">
  import { Users, Rocket, ClipboardList } from 'lucide-svelte';
  export let data: {
    recent: Array<{ date: string; action: string; details: string }>;
  };
  let recent = data.recent;

  const cards = [
    {
      title: 'Manage Users',
      description: 'Create, edit, and manage user accounts',
      href: '/admin/users',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Manage Startups',
      description: 'Oversee startup applications and data',
      href: '/admin/startups',
      icon: Rocket,
      color: 'text-purple-500'
    },
    {
      title: 'Assessment Types',
      description: 'Configure assessment fields and types',
      href: '/admin/assessments',
      icon: ClipboardList,
      color: 'text-green-500'
    }
  ];
</script>

<div class="space-y-6">
  <div>
    <h1 class="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
    <p class="text-muted-foreground mt-1 text-sm">
      Manage your platform from one place
    </p>
  </div>

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each cards as card}
      <a
        data-sveltekit-preload-data="tap"
        href={card.href}
        class="bg-card hover:border-flutter-blue group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1 space-y-2">
            <div class="flex items-center gap-3">
              <div
                class="bg-muted group-hover:bg-flutter-blue/10 rounded-lg p-2 transition-colors"
              >
                <svelte:component
                  this={card.icon}
                  class="h-5 w-5 {card.color} transition-transform group-hover:scale-110"
                />
              </div>
              <h3 class="text-lg font-semibold">{card.title}</h3>
            </div>
            <p class="text-muted-foreground text-sm leading-relaxed">
              {card.description}
            </p>
          </div>
          <div
            class="text-muted-foreground/0 group-hover:text-muted-foreground transition-all group-hover:translate-x-1"
          >
            →
          </div>
        </div>
      </a>
    {/each}
  </div>

  <div class="bg-card rounded-lg border shadow-sm">
    <div
      class="bg-muted/50 flex items-center justify-between border-b px-6 py-4"
    >
      <h2 class="font-semibold">Recent Activity</h2>
      {#if recent.length}
        <span class="text-muted-foreground text-xs"
          >{recent.length} {recent.length === 1 ? 'item' : 'items'}</span
        >
      {/if}
    </div>
    <div class="p-6">
      {#if !recent.length || recent.length === 0}
        <div
          class="flex flex-col items-center justify-center py-12 text-center"
        >
          <div class="bg-muted mb-3 rounded-full p-3">
            <ClipboardList class="text-muted-foreground h-6 w-6" />
          </div>
          <p class="text-muted-foreground text-sm font-medium">
            No activity yet
          </p>
          <p class="text-muted-foreground mt-1 text-xs">
            Recent actions will appear here
          </p>
        </div>
      {:else}
        <ul class="space-y-3">
          {#each recent as r}
            <li
              class="bg-card hover:border-flutter-blue/50 hover:bg-muted/30 group flex items-start justify-between gap-4 rounded-lg border p-4 transition-all"
            >
              <div class="flex-1 space-y-1">
                <div class="flex items-center gap-2">
                  <div class="bg-flutter-blue h-1.5 w-1.5 rounded-full"></div>
                  <span class="font-medium">{r.action}</span>
                </div>
                <div class="text-muted-foreground ml-3.5 text-xs">
                  {new Date(r.date).toLocaleString?.() || r.date}
                </div>
              </div>
              <div class="text-muted-foreground max-w-xs text-right text-sm">
                {r.details}
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>
