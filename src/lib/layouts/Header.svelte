<script lang="ts">
    import { page } from '$app/stores';
    // import logo from './svelte-logo.svg';
</script>

<header class="mx-auto container py-4 text-white font-bold">
    <div class="flex min-h-[40px] justify-between">
        <div>
            <a href="http://infiniteloop.cloud/">
                <!-- <img class="h-6 w-6" src={logo} alt="SvelteKit" /> -->
                <div>
                    <h3 class="text-5xl">Crypter</h3>
                    <p class="float-right text-2xl font-light">by</p>
                </div>
            </a>
        </div>
        <nav>
            <ul class="inline-flex gap-5">
                <li class:active={$page.url.pathname === '/about'}>
                    <a sveltekit:prefetch href="/">About infinite loop</a>
                </li>
                <li class:active={$page.url.pathname === '/services'}>
                    <a sveltekit:prefetch href="/">Services</a>
                </li>
                <li class:active={$page.url.pathname === '/career'}>
                    <a sveltekit:prefetch href="/">Careers</a>
                </li>
                <li class:active={$page.url.pathname === '/contact'}>
                    <a sveltekit:prefetch href="/">Contact Us</a>
                </li>
            </ul>
        </nav>
    </div>
</header>
