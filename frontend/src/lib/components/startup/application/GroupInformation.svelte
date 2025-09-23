<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public';
  export let stepName: string;
  export let currentStep: string;
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import Add from 'lucide-svelte/icons/plus';

  export let access: string;
  export let startup: any = null;

  let members: any = [];
  let search: string;
  let searchedUsers: any[] = [];
  let formData = {
    groupName: startup?.groupName ?? '',
    universityName: startup?.universityName ?? ''
    // Add other fields as needed
  };

  async function searchUsers() {
    const response = await fetch(`${PUBLIC_API_URL}/users/?search=${search}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access}`
      }
    });
    const d = await response.json();

    if (response.ok) {
      const membersSet = new Set(members.map((member: any) => member.id)); // Assuming each user has a unique id
      searchedUsers = d.results.filter((user: any) => !membersSet.has(user.id));
    }
  }

  function addMember(member: any) {
    members = [...members, member];
    searchedUsers = searchedUsers.filter((d) => d.email != member.email);
  }

  function removeMember(member: any) {
    members = members.filter((d: any) => d != member);
    searchedUsers = [...searchedUsers, member];
  }
</script>

<div class="flex-1 overflow-auto px-1" class:hidden={currentStep !== stepName}>
  <div class="flex h-0 flex-col gap-5">
    <div class="grid gap-2">
      <Label for="group_name">Group name</Label>
      <Input
        name="group_name"
        id="group_name"
        type="text"
        placeholder="group name"
        required
        bind:value={formData.groupName}
      />
    </div>

    <div class="grid gap-2">
      <Label for="university_name">University name</Label>
      <Input
        name="university_name"
        id="university_name"
        type="text"
        placeholder="university name"
        required
        bind:value={formData.universityName}
      />
    </div>
    <div class="grid gap-2">
      <Label for="group_name">Members</Label>
      {#each members as user, i}
        <input type="hidden" name={`member_${i + 2}`} value={user.id} />
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <img
              src="/images/placeholder.jpg"
              width={36}
              height={36}
              alt="Avatar"
              class="overflow-hidden rounded-full"
            />
            <p>{user.email}</p>
          </div>
          <button on:click|preventDefault={() => removeMember(user)}>
            <Add class="h-4 w-4" />
          </button>
        </div>
      {/each}
    </div>
    <form on:submit|preventDefault={searchUsers}>
      <div class="grid gap-2">
        <Label for="email"
          >Type an email, then invite them to your startup.</Label
        >
        <Input
          name="email"
          id="email"
          type="text"
          placeholder="m@example.com"
          bind:value={search}
        />
      </div>
    </form>
    <div class="flex flex-col gap-5">
      {#each searchedUsers as user}
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <img
              src="/images/placeholder.jpg"
              width={36}
              height={36}
              alt="Avatar"
              class="overflow-hidden rounded-full"
            />
            <p>{user.email}</p>
          </div>
          <button on:click|preventDefault={() => addMember(user)}>
            <Add class="h-4 w-4" />
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>
