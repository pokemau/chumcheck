<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import { QualificationStatus } from '$lib/enums/qualification-status.enum';
  let {
    startup,
    role,
    initiatives
  }: { startup: any; role: any; initiatives: any[] } = $props();

  const statusMap: Record<
    number,
    { label: string; border: string; text: string; bg: string }
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
    },
    5: {
      label: 'Rejected',
      border: 'border-red-400',
      text: 'text-red-400',
      bg: 'bg-red-900'
    },
    6: {
      label: 'Paused',
      border: 'border-gray-400',
      text: 'text-gray-400',
      bg: 'bg-gray-900'
    },
  };
  const status = $derived(
    statusMap[startup?.qualificationStatus] ?? statusMap[1]
  );
</script>

<a
  href={`/startups/${startup.id}/${startup?.qualificationStatus === QualificationStatus.QUALIFIED ? 'assessment' : 'pending'}`}
  class="block"
  on:click={(e) => {
    if (startup?.qualificationStatus === QualificationStatus.WAITLISTED) {
      e.preventDefault();
      const event = new CustomEvent('openApplication', { detail: { startup } });
      window.dispatchEvent(event);
    }
  }}
>
  <Card.Root
    class="h-44 cursor-pointer rounded-xl border border-gray-700 bg-background p-0 transition-colors duration-150 hover:bg-accent"
  >
    <Card.Content class="h-full">
      <div class="flex h-full flex-col justify-between p-3">
        <div class="mb-1 flex w-full items-center gap-3">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563eb] text-base font-bold text-white"
          >
            {startup.name
              .split(' ')
              .map((word: any) => word.charAt(0).toUpperCase())
              .join('')
              .slice(0, 3)}
          </div>
          <span
            class="max-w-[120px] truncate text-base font-semibold text-white"
            title={startup.name}
          >
            {startup.name.length > 10
              ? startup.name.slice(0, 10) + '...'
              : startup.name}
          </span>
          <span
            class="ml-auto rounded border px-2 py-0.5 text-xs font-semibold {status.border} {status.text} {status.bg}"
          >
            {status.label === 'Qualified' && role === 'Mentor'
              ? 'Active'
              : status.label}
          </span>
        </div>
        <div class="mb-1 flex items-center gap-2 text-xs text-[#b3bed7]">
          Initiatives
          <span class="ml-1 font-bold text-white"
            >{initiatives.filter((initiative) => initiative.status === 4)
              .length} / {initiatives.length}</span
          >
        </div>
        <div class="mb-2 h-2 w-full rounded bg-gray-800">
          <div
            class="h-2 rounded bg-white"
            style="width: {(initiatives.filter(
              (initiative) => initiative.status === 4
            ).length /
              initiatives.length) *
              100}%"
          ></div>
        </div>
        <div class="flex items-center gap-2 text-xs text-[#b3bed7]">
          <img src="/checked.png" alt="Checked" class="h-4 w-4" />
          <span class="text-[#b3bed7]"
            >{startup.consultationText ?? 'No consultation pending'}</span
          >
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</a>
