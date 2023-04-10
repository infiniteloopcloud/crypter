import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
        vitePreprocess({
            postcss: true
        })
    ],
    kit: {
        adapter: adapterStatic()
    }
};

export default config;
