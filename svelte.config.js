import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import staticAdapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
export default {
    kit: {
        adapter: staticAdapter()
    },
    preprocess: [vitePreprocess()]
};
