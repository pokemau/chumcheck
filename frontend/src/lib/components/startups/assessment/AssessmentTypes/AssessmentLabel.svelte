<script lang="ts">
  import { Label } from '$lib/components/ui/label';
  
  export let description: string;
  export let htmlFor: string | undefined = undefined;
</script>

<Label for={htmlFor} class="text-base font-medium">
  {description}
</Label>