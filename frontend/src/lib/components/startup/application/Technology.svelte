<script lang="ts">
  export let currentActive: number;
  export let question: any;
  import { Label } from '$lib/components/ui/label/index.js';
  import { Textarea } from '$lib/components/ui/textarea';
</script>

<div class="flex-1 overflow-scroll px-1" class:hidden={currentActive !== 4}>
  <div class="flex h-0 flex-col gap-5">
    {#each question as q, i}
      <div class="grid w-full gap-1.5">
        <Label for="message">{q.question}</Label>
        <Textarea placeholder="Type your message here." id="message" name={`technology${i}`} />
        <input type="hidden" name={`technology${i}id`} value={`${q.id}`} />
      </div>
    {/each}
  </div>
</div>
