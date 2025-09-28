<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import { QualificationStatus } from '$lib/enums/qualification-status.enum';
  import { getBadgeColor } from '$lib/utils';
  import Badge from '../ui/badge/badge.svelte';
  let {
    startup,
    role,
    initiatives
  }: { startup: any; role: any; initiatives: any[] } = $props();

  const statusMap: Record<
    number,
    {
      label: 'Pending' | 'Waitlisted' | 'Qualified' | 'Completed';
      border: string;
      text: string;
      bg: string;
    }
  > = {
    1: {
      label: 'Pending',
      border: 'border-yellow-400',
      text: 'text-yellow-400',
      bg: 'bg-yellow-900'
    },
    2: {
      label: 'Waitlisted',
      border: 'border-purple-400',
      text: 'text-purple-400',
      bg: 'bg-purple-900'
    },
    3: {
      label: 'Qualified',
      border: 'border-blue-500',
      text: 'text-blue-500',
      bg: 'bg-slate-900'
    },
    4: {
      label: 'Completed',
      border: 'border-green-500',
      text: 'text-green-500',
      bg: 'bg-green-900'
    }
    // 5: {
    //   label: 'Rejected',
    //   border: 'border-red-400',
    //   text: 'text-red-400',
    //   bg: 'bg-red-900'
    // },
    // 6: {
    //   label: 'Paused',
    //   border: 'border-gray-400',
    //   text: 'text-gray-400',
    //   bg: 'bg-gray-900'
    // }
  };
  const status = $derived(
    statusMap[startup?.qualificationStatus] ?? statusMap[1]
  );

</script>

<a
  href={`/startups/${startup.id}/${startup?.qualificationStatus === 3 ? 'readiness-level' : 'pending'}`}
  class="block"
  onclick={(e) => {
    if (startup?.qualificationStatus === QualificationStatus.WAITLISTED) {
      e.preventDefault();
      const event = new CustomEvent('openApplication', { detail: { startup } });
      window.dispatchEvent(event);
    }
  }}
>
  <Card.Root
    class="bg-background hover:bg-accent h-44 cursor-pointer rounded-xl border  p-0 transition-colors duration-150"
  >
    <Card.Content class="h-full">
      <div class="flex h-full flex-col justify-between p-3">
        <div class="mb-1 flex w-full items-center gap-3">
          <div
            class="bg-primary text-primary-foreground flex h-9 w-9 items-center justify-center rounded-lg text-base font-bold"
          >
            {startup.name
              .split(' ')
              .map((word: any) => word.charAt(0).toUpperCase())
              .join('')
              .slice(0, 3)}
          </div>
          <span
            class="max-w-[120px] truncate text-base font-semibold"
            title={startup.name}
          >
            {startup.name.length > 10
              ? startup.name.slice(0, 10) + '...'
              : startup.name}
          </span>
          <Badge class={`ml-auto rounded px-2 py-0.5 text-xs font-semibold ${getBadgeColor(status.label)}`}>
            {status.label === 'Qualified' && role === 'Mentor'
              ? 'Active'
              : status.label}
          </Badge>
        </div>
        <div class="mb-1 flex items-center gap-2 text-xs">
          Initiatives
          <span class="ml-1 font-bold"
            >{initiatives.filter((initiative) => initiative.status === 4)
              .length} / {initiatives.length}</span
          >
        </div>
        <div class="bg-accent mb-2 h-2 w-full rounded">
          <div
            class="bg-primary h-2 rounded"
            style="width: {(initiatives.filter(
              (initiative) => initiative.status === 4
            ).length /
              initiatives.length) *
              100}%"
          ></div>
        </div>
        <div class="flex items-center gap-2 text-xs">
          <img src="/checked.png" alt="Checked" class="h-4 w-4" />
          <span>{startup.consultationText ?? 'No consultation pending'}</span>
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</a>
