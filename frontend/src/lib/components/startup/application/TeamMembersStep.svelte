<script lang="ts">
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Button } from '$lib/components/ui/button';
  import { Plus, Trash2 } from 'lucide-svelte';

  export let form: any;
  export let errors: any;

  function addMember() {
    const newMember = { name: '', role: '' };
    $form.members = [...($form.members ?? []), newMember];
  }
  function removeMember(index: number) {
    $form = {
      ...$form,
      members: ($form.members ?? []).filter((_, i) => i !== index)
    };
  }
</script>

<div class="space-y-6">
  <!-- Team Members -->
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <Label>Team Members</Label>
      <Button type="button" variant="outline" size="sm" onclick={addMember}>
        <Plus class="mr-2 h-4 w-4" />
        Add Member
      </Button>
    </div>
    {#if ($form.members ?? []).length === 0}
      <div
        class="rounded-lg border border-dashed p-8 text-center text-muted-foreground"
      >
        <p class="text-sm">
          No team members added yet. Click "Add Member" to get started.
        </p>
      </div>
    {:else}
      {#each $form.members ?? [] as _, index}
        <div
          class="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-4"
        >
          <div class="space-y-2">
            <Label for="memberName-{index}">Name *</Label>
            <Input
              id="memberName-{index}"
              name={`members[${index}].name`}
              placeholder="Member name"
              bind:value={$form.members[index].name}
              class={$errors.members?.[index]?.name ? 'border-red-500' : ''}
            />
            {#if $errors.members?.[index]?.name}
              <p class="text-sm text-red-500">{$errors.members[index].name}</p>
            {/if}
          </div>
          <div class="space-y-2">
            <Label for="memberRole-{index}">Role *</Label>
            <Input
              id="memberRole-{index}"
              name={`members[${index}].role`}
              placeholder="Member role"
              bind:value={$form.members[index].role}
              class={$errors.members?.[index]?.role ? 'border-red-500' : ''}
            />
            {#if $errors.members?.[index]?.role}
              <p class="text-sm text-red-500">{$errors.members[index].role}</p>
            {/if}
          </div>
          <!-- <div class="space-y-2"> -->
          <!--   <Label for="memberEmail-{index}">Email (Optional)</Label> -->
          <!--   <Input -->
          <!--     id="memberEmail-{index}" -->
          <!--     name={`members[${index}].email`} -->
          <!--     placeholder="member@email.com" -->
          <!--     type="email" -->
          <!--     bind:value={$form.members[index].email} -->
          <!--   /> -->
          <!-- </div> -->
          <div class="flex items-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onclick={() => removeMember(index)}
              class="text-red-500 hover:text-red-700"
            >
              <Trash2 class="h-4 w-4" />
            </Button>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Curriculum Vitae -->
  <div class="space-y-2">
    <Label for="curriculumVitae">Curriculum Vitae *</Label>
    <Textarea
      id="curriculumVitae"
      name="curriculumVitae"
      placeholder="Provide details about the team leader's curriculum vitae..."
      bind:value={$form.curriculumVitae}
      class={$errors.curriculumVitae ? 'border-red-500' : ''}
      rows={6}
    />
    {#if $errors.curriculumVitae}
      <p class="text-sm text-red-500">{$errors.curriculumVitae}</p>
    {/if}
  </div>
</div>
