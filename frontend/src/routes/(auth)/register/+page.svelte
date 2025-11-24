<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import type { PageData } from './$types';
  import { superForm } from 'sveltekit-superforms';
  import { toast } from 'svelte-sonner';
  import { goto } from '$app/navigation';

  // export let data: PageData;
  let { data }: { data: PageData } = $props();
  let isLoading = false;

  // async function onSubmit() {
  //   isLoading = true;

  //   setTimeout(() => {
  //     isLoading = false;
  //   }, 3000);
  // }

  const { form, errors, enhance, message, submitting } = superForm(data.form);

  $effect(() => {
    if ($submitting) {
      toast.dismiss();
      toast.info('Creating account...');
    }

    if ($message && !$submitting) {
      toast.dismiss();
      toast.success('Account created successfully');
      goto('/login');
    }
    if ($errors.repeatPassword && !$submitting) {
      toast.dismiss();
      toast.error('Signup failed', {
        description: $errors.repeatPassword.toString()
      });
    }
  });
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div
  class="bg-muted/40 relative flex h-full flex-1 flex-col items-center rounded-bl-xl rounded-tl-xl"
>
  <div class="absolute flex w-full cursor-pointer items-center gap-2 p-5">
    <img src="launchlab_logo.png" alt="citeams_logo" class="h-7 w-7" />
    <a href="/" class="cursor-pointer text-xl font-black normal-case"
      >LaunchUp</a
    >
  </div>

  <div class="flex flex-1 items-center justify-center">
    <img src="register.svg" alt="" class="h-3/4 w-3/4" />
  </div>
</div>
<div
  class="bg-background flex h-full flex-1 items-center justify-center rounded-br-xl rounded-tr-xl"
>
  <form
    method="post"
    class="flex items-center justify-center py-12"
    use:enhance
  >
    <div class="mx-auto grid w-[350px] gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Register</h1>
        <p class="text-muted-foreground text-balance text-[15px]">
          Enter all information below to create an account
        </p>
      </div>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="firstName">First name</Label>
          </div>
          <Input
            name="firstName"
            id="firstName"
            type="text"
            required
            placeholder="John"
            bind:value={$form.firstName}
          />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="lastName">Last name</Label>
          </div>
          <Input
            name="lastName"
            id="lastName"
            type="text"
            required
            bind:value={$form.lastName}
            placeholder="Doe"
          />
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="johndoe@example.com"
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
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="repeatPassword">Repeat Password</Label>
          </div>
          <Input
            name="repeatPassword"
            id="repeatPassword"
            type="password"
            required
            bind:value={$form.repeatPassword}
          />
        </div>
        <Button type="submit" class="w-full">Create Account</Button>
        <!-- <Button type="submit" class="w-full" disabled={$submitting}>
          Login
        </Button> -->
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="/login" class="underline"> Login </a>
      </div>
    </div>
  </form>
</div>
