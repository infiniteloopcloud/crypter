<script lang="ts">
    import { page } from '$app/stores';
    // import logo from './svelte-logo.svg';
</script>

<header class="mx-auto container py-4 text-white font-bold">
    <div class="flex min-h-[40px] justify-between">
        <div class="flex">
            <a href="http://infiniteloop.cloud/">
                <div>
                    <h3 class="text-5xl">Crypter</h3>
                    <p class="float-right text-2xl font-light">by</p>
                </div>
            </a>
            <div class="mx-3 mt-2">
                <svg
                    version="1.1"
                    id="i8logo"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    height="62px"
                    x="0px"
                    y="0px"
                    viewBox="0 0 321.8 165.6"
                    xml:space="preserve"
                >
                    <style type="text/css">
                        .st0 {
                            fill: #ffffff;
                        }
                    </style>
                    <path
                        class="st0"
                        d="M0,81c0.1-1.8,0.3-3.6,0.4-5.4c1-12.3,4.5-24.2,10.3-35c3.5-6.9,7.9-13.2,13.2-18.7
	c9.4-9.5,20.9-15.1,33.9-17.8c4.8-1.1,9.7-1.6,14.6-1.6c10.1,0.1,19.8,3.9,27.1,10.9c1.8,1.7,3.4,3.6,5.2,5.3c0.6,0.6,1.2,1,1.9,1.4
	c1.7,0.7,3.1,2,4.1,3.5c13.2,21.5,26.5,42.9,39.8,64.3c0.2,0.4,0.5,0.8,1.1,1.7c0.1-0.4,0.3-0.8,0.5-1.1c12.5-14,25-28,37.5-42
	c10.7-11.9,22-23.2,35.1-32.5c7.1-5.1,14.6-9.5,23.1-11.9c3.4-1,7-1.3,10.6-1.9c0.3,0,0.5-0.1,0.8-0.2h3.8c1.6,0.2,3.1,0.4,4.7,0.6
	c8.9,1.4,17.1,5.6,23.6,11.9c8.4,8,14.8,17.8,18.9,28.6c5,12.6,8.4,25.7,10.1,39.2c1.3,9,1.5,18.2,0.7,27.2
	c-1.5,14.9-6.7,28.2-17.6,38.8c-13.5,13.2-29.7,19.8-48.6,19c-11-0.4-21.3-3.6-31.4-8c-14.1-6.1-26.7-14.6-38.5-24.3
	c-12-9.9-22.3-21.4-31.6-33.8c-0.5-0.7-1.1-1.4-1.6-2c-5,4.7-9.9,9.3-14.8,13.8c-11,9.9-22.5,19.1-35.3,26.7
	c-8.9,5.5-18.5,9.8-28.5,12.8c-22.9,6.5-46.3-3.8-57.8-18c-4.8-6.1-8.4-13.1-10.6-20.5c-2.8-8.7-4.4-17.8-4.6-27
	c0-0.3-0.1-0.5-0.2-0.8L0,81z M317.2,96.5c-0.2-4-0.4-8-0.8-12.1c-1.1-10.4-3.1-20.6-6.1-30.6c-3.8-13.3-9.8-25.4-19.4-35.5
	c-12-12.7-27.5-16.8-44-10.8c-10.2,3.7-19.1,9.7-27.4,16.7c-7.2,6.3-14,13-20.2,20.2c-14.6,16.1-29.1,32.4-43.6,48.6
	c-0.5,0.3-0.6,0.9-0.2,1.4c0,0.1,0.1,0.1,0.1,0.1c0.2,0.3,0.4,0.6,0.6,0.9c9.6,13.7,21.1,26,34.2,36.3c12.7,10,26.5,18.3,41.6,24
	c11.7,4.4,23.7,6.4,36.1,4c21.8-4.1,36.9-16.7,45-37.3C316.4,114.2,317.1,105.4,317.2,96.5z M147.9,91.9l0.4,0.3
	c-0.2-0.4-0.4-0.8-0.6-1.1c-2.8-4.7-5.7-9.4-8.5-14c-7.3-12.2-14.7-24.5-22-36.8c-0.4-0.8-1.2-1.4-2.1-1.3c-0.9,0.1-1.3-0.4-1.6-1.1
	c-0.4-1.2-1-2.4-1.6-3.5c-3-4.2-5.9-8.4-9.1-12.3c-5.4-6.6-12-11.5-20.4-13.8c-6.4-1.7-12.7-1.4-19-0.4
	c-20.8,3.4-36.8,13.7-47.7,31.9c-7,11.4-11,24.5-11.6,37.9c-0.4,12.8,1.9,25.6,6.8,37.4c3.9,10,11,18.4,20.1,24
	c8.1,5.1,17,8.1,26.6,8.3c7.1,0,14.1-1.3,20.7-4c11.8-4.6,22.6-11.1,32.8-18.6c10.6-7.9,20.7-16.5,30.1-25.8
	C143.6,96.8,145.7,94.3,147.9,91.9z"
                    />
                </svg>
                <small class="font-light float-right">infinite loop</small>
            </div>
        </div>
        <nav>
            <ul class="inline-flex gap-5">
                <li class:active={$page.url.pathname === '/about'}>
                    <a data-sveltekit-preload-code href="/#">About infinite loop</a>
                </li>
                <li class:active={$page.url.pathname === '/services'}>
                    <a data-sveltekit-preload-code href="/#">Services</a>
                </li>
                <li class:active={$page.url.pathname === '/career'}>
                    <a data-sveltekit-preload-code href="/#">Careers</a>
                </li>
                <li class:active={$page.url.pathname === '/contact'}>
                    <a data-sveltekit-preload-code href="/#">Contact Us</a>
                </li>
            </ul>
        </nav>
    </div>
</header>
