<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  let { startup, role }: { startup: any; role: any } = $props();
</script>

<a
  href={`/startups/${startup.id}/${startup?.qualificationStatus === 3 ? 'readiness-level' : 'pending'}`}
  class="block"
>
  <Card.Root class="h-44 cursor-pointer bg-background border border-gray-700 hover:bg-accent rounded-xl p-0 transition-colors duration-150">
    <Card.Content class="h-full">
      <div class="flex flex-col h-full p-3 justify-between">
        <div class="flex items-center gap-3 mb-1 w-full">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563eb] text-white text-base font-bold">
            {startup.name
              .split(' ')
              .map((word: any) => word.charAt(0).toUpperCase())
              .join('')
              .slice(0, 3)}
          </div>
          <span class="text-base font-semibold text-white truncate max-w-[120px]" title={startup.name}>
            {startup.name.length > 10 ? startup.name.slice(0, 10) + '...' : startup.name}
          </span>
          <span class="ml-auto border 
            {startup.qualificationStatus == 1 ? "border-yellow-400 text-yellow-400 bg-yellow-900" : "border-blue-500 text-blue-500 bg-slate-900"}
            rounded px-2 py-0.5 text-xs font-semibold"
          > 
            {startup.qualificationStatus == 1 ? 'Pending' : 'Qualified'}
          </span>
        </div>
        <div class="flex items-center gap-2 text-xs text-[#b3bed7] mb-1">
          Initiatives
          <span class="ml-1 font-bold text-white">{startup.initiatives ?? '8/12'}</span>
        </div>
        <div class="w-full h-2 bg-[#232b3b] rounded mb-2">
          <div
            class="h-2 bg-white rounded"
            style="width: {startup.initiativesProgress ?? '60%'}"
          ></div>
        </div>
        <div class="flex items-center gap-2 text-xs text-[#b3bed7]">
          <img src="/checked.png" alt="Checked" class="h-4 w-4" />
          <span class="text-[#b3bed7]">{startup.consultationText ?? 'No consultation pending'}</span>
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</a>