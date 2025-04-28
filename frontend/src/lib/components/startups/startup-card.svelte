<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  let { startup, role }: { startup: any; role: any } = $props();
</script>

<a
  href={`/startups/${startup.id}/${startup?.qualificationStatus === 3 ? 'readiness-level' : 'pending'}`}
>
  <Card.Root class="h-40 cursor-pointer hover:bg-secondary">
    <Card.Content class="h-full">
      <div class="flex h-full items-center justify-center">
        <div class="flex flex-col items-center justify-center gap-3">
          <div
            class="flex h-[65px] w-[65px] items-center justify-center rounded-lg bg-flutter-blue text-3xl font-bold"
          >
            {startup.name
              .split(' ')
              .map((word: any) => word.charAt(0).toUpperCase())
              .join('')
              .slice(0, 2)}
          </div>
          <h1>{startup.name}</h1>
          {#if role === 'Manager as Mentor'}
            <h1>
              Mentor: {startup?.mentors[0]?.first_name}
              {startup?.mentors[0]?.last_name}
            </h1>
          {/if}
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</a>
