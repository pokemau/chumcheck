<script lang="ts">
  import type { PageData } from './$types';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { superForm } from 'sveltekit-superforms';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';
  import { Loader } from 'lucide-svelte';

  let { data }: { data: PageData } = $props();

  const { form, errors, enhance, message, submitting } = superForm(data.form);

  $effect(() => {
    if ($message && !$submitting) {
      toast.dismiss();
      toast.success('Login successful');
      goto('/startups');
    }

    if ($errors.email && !$submitting) {
      toast.dismiss();
      toast.error('Login failed');
    }
  });
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div
  class="bg-muted/40 text-flutter-gray dark:text-flutter-white relative flex h-full flex-1 flex-col items-center rounded-bl-xl rounded-tl-xl"
>
  <div class="absolute flex w-full cursor-pointer items-center gap-2 p-5">
    <img src="launchlab_logo.png" alt="citeams_logo" class="h-7 w-7" />
    <a href="/" class="cursor-pointer text-xl font-black normal-case">ChumCheck</a>
  </div>

  <div class="flex flex-1 items-center justify-center">
    <img src="loginv2.svg" alt="" class="h-3/4 w-3/4" />
  </div>
</div>
<div
  class="bg-background text-flutter-gray dark:text-flutter-white flex h-full flex-1 items-center justify-center rounded-br-xl rounded-tr-xl"
>
  <form method="post" use:enhance class="flex items-center justify-center py-12">
    <div class="mx-auto grid w-[350px] gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Login</h1>
        <p class="text-muted-foreground text-balance text-[15px]">
          Enter your email below to login to your account
        </p>
      </div>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            bind:value={$form.email}
          />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
          </div>
          <Input
            name="password"
            id="password"
            type="password"
            required
            bind:value={$form.password}
          />
        </div>
        {#if $errors.email}
          <p class="text-sm text-red-500">Invalid credentials</p>
        {/if}
        <Button type="submit" class="w-full" disabled={$submitting}>
          {#if $submitting}
            <Loader class="mr-2 h-4 w-4 animate-spin" />
          {/if}
          Login
        </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Don&apos;t have an account?
        <a href="/register" class="underline"> Sign up </a>
      </div>
    </div>
  </form>
</div>
