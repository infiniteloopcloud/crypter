<script lang="ts">
    import Footer from '$lib/layouts/Footer.svelte';
    import Header from '$lib/layouts/Header.svelte';
    import Notifications from 'svelte-notifications';
    import '../app.css';
</script>

<Header />

<Notifications>
    <main class="mx-auto container text-white">
        <slot />
    </main>
</Notifications>

<Footer />
