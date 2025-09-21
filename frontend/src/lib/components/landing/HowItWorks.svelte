<script lang="ts">
  import * as Card from '$lib/components/ui/card';
</script>

<div
  class="mx-auto w-4/5 py-24 text-flutter-gray dark:text-flutter-white"
  id="howitwork"
>
  <div class="flex flex-col justify-center gap-20">
    <p class="text-4xl font-extrabold">How It Works</p>
    <div class="flex gap-16">
      <Card.Root class="flex flex-1 flex-col justify-center rounded-xl p-8">
        <p class="text-6xl font-bold text-slate-300">01</p>
        <p class="text-xl font-bold">Application</p>
        <p class="text-lg">
          Start by submitting your startup <br />application to ChumCheck for
          evaluation <br />and confirmation.
        </p>
      </Card.Root>
      <Card.Root class="flex flex-1 flex-col justify-center rounded-xl p-8">
        <p class="text-6xl font-bold text-slate-300">02</p>
        <p class="text-xl font-bold">Incubation and Acceleration</p>
        <p class="text-lg">
          Accepted startups enter the program, <br />gaining mentorship and
          resources to
          <br />nurture their concepts towards success.
        </p>
      </Card.Root>
      <Card.Root class="flex flex-1 flex-col justify-center rounded-xl p-8">
        <p class="text-6xl font-bold text-slate-300">03</p>
        <p class="text-xl font-bold">Investment-Ready</p>
        <p class="text-lg">
          Incubation and acceleration make your <br />startup investment-ready,
          benefiting your
          <br />business and the startup ecosystem.
        </p>
      </Card.Root>
    </div>
  </div>
</div>
