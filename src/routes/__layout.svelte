<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<Header />

<main class="mx-auto container">
	<slot />
</main>

<footer>
	<p>foo</p>
</footer>
