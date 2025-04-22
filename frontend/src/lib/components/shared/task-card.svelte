<script lang="ts">
  import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)]">
  <Card.Header>
    <div class="flex items-center justify-between">
      <h2 class="text-[15px] font-semibold leading-none tracking-tight">{name}</h2>
      <!-- <button>
        <Plus class="h-4 w-4" />
      </button> -->
    </div>
  </Card.Header>
  <Card.Content></Card.Content>
</Card.Root>
