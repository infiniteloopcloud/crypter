<script lang="ts">
	import { page } from '$app/stores';
	import logo from './svelte-logo.svg';
</script>

<header>
	<div class="flex">
		<div class="corner">
			<a href="https://kit.svelte.dev">
				<img class="h-6 w-6" src={logo} alt="SvelteKit" />
			</a>
		</div>
		<nav>
			<ul>
				<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			</ul>
		</nav>
	</div>
</header>
