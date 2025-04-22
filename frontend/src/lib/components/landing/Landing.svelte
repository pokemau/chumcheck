<script lang="ts">
  import AboutUs from './AboutUs.svelte';
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import Hero from './Hero.svelte';
  import HowItWorks from './HowItWorks.svelte';
</script>

<svelte:head>
  <title>ChumCheck</title>
</svelte:head>

<div class="z-10 mx-auto">
  <Header />
  <Hero />
  <HowItWorks />
  <AboutUs />
  <Footer />
</div>
