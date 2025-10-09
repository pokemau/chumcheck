<script lang="ts">
  import { AdminHeader } from '$lib/components/shared';
  export let data;
</script>

<AdminHeader user={data.user} />
<div class="mx-auto w-full max-w-7xl p-4 pt-4">
  <slot />
</div>
