<script lang="ts">
    import Footer from '$lib/layouts/Footer.svelte';
    import Header from '$lib/layouts/Header.svelte';
    import '../app.css';
</script>

<Header />

<main class="mx-auto container text-white">
    <slot />
</main>

<Footer />
