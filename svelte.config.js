import preprocess from 'svelte-preprocess';
import adapterStatic from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
        preprocess({
            postcss: true
        })
    ],
    kit: {
        adapter: adapterStatic(),
        trailingSlash: 'always'
    }
};

export default config;
