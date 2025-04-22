<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { Edit, Ellipsis, Plus, Trash } from 'lucide-svelte';
  import { RnaCreateDialog, RnaViewEditDeleteDialog } from '.';
  let { rna, update, ai, addToRna, deleteRna, role, readinessData, checkIfExist } = $props();

  let open = $state(false);

  const onOpenChange = () => {
    open = !open;
  };

  const closeDialog = () => {
    open = false;
  };
</script>

<Card.Root
  class="h-full min-w-[calc(25%-1.25rem*3/4)] cursor-pointer"
  onclick={() => {
    open = true;
  }}
>
  <Card.Content class="flex flex-col gap-2">
    <div class="flex items-center justify-between">
      <h2 class="text-[15px] font-semibold leading-none tracking-tight">
        {rna.readiness_type_rl_type}
      </h2>
    </div>
    <div class="text-sm text-muted-foreground">
      {rna.rna.substring(0, 150) + `${rna.rna.length > 150 ? '...' : ''}`}
    </div>
    <div class="text-sm text-muted-foreground">
      Current Level: <Badge variant="secondary"
        >{readinessData?.filter((d: any) => d?.readiness_type === rna?.readiness_type_rl_type)[0]
          ?.readiness_level}</Badge
      >
    </div>
  </Card.Content>
</Card.Root>

<RnaViewEditDeleteDialog
  {open}
  {onOpenChange}
  rns={rna}
  {update}
  deleteRns={deleteRna}
  {readinessData}
  {closeDialog}
  {ai}
  {addToRna}
  {checkIfExist}
  {role}
/>
