<script lang="ts">
  import type { PageData } from './$types';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { superForm } from 'sveltekit-superforms';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import { Loader } from 'lucide-svelte';

  let { data }: { data: PageData } = $props();
  const { form, errors, enhance, message, submitting } = superForm(data.form);

  $effect(() => {
    if ($message && !$submitting) {
      toast.dismiss();
      toast.success('Admin login successful');
      goto('/admin');
    }
    if ($errors.email && !$submitting) {
      toast.dismiss();
      toast.error($errors.email as string);
    }
  });
</script>

<svelte:head><title>Admin Login</title></svelte:head>

<div class="flex min-h-screen w-full bg-muted/40">
  <div class="flex flex-1 flex-col items-center justify-center p-4">
    <a href="/" class="mb-8 flex items-center gap-2">
      <!-- <img src="/logo.png" alt="logo" class="h-8 w-8" /> -->
      <span class="text-xl font-bold">LaunchUp Admin</span>
    </a>
    <form method="post" use:enhance class="w-full max-w-sm space-y-5 rounded-md border bg-background p-6 shadow-sm">
      <div class="space-y-1 text-center">
        <h1 class="text-2xl font-semibold tracking-tight">Admin Login</h1>
      </div>
      <div class="space-y-4">
        <div class="grid gap-1">
          <Label for="email">Email</Label>
          <Input id="email" name="email" type="email" required bind:value={$form.email} />
        </div>
        <div class="grid gap-1">
          <Label for="password">Password</Label>
          <Input id="password" name="password" type="password" required bind:value={$form.password} />
        </div>
        {#if $errors.email}
          <p class="text-sm text-red-500">{$errors.email}</p>
        {/if}
        <Button type="submit" class="w-full" disabled={$submitting}>
          {#if $submitting}
            <Loader class="mr-2 h-4 w-4 animate-spin" />
          {/if}
          Login
        </Button>
      </div>
    </form>
  </div>
</div>
