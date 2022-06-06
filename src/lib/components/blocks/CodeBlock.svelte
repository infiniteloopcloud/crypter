<script lang="ts">
    import CopyClipboard from '../buttons/CopyClipboard.svelte';
    export let text: string;
    export let preLang = 'no-highlight';
    export let copyClipboard = true;
</script>

<div
    class="{$$props.class
        ? `${$$props.class}`
        : 'rounded-[40px] bg-primary-500 border-white focus:bg-primary-600'} border relative overflow-auto p-3 group"
>
    <pre lang={preLang} id="public-key" class="whitespace-normal my-4 mx-0">
        <code class="break-all">{text}</code>
    </pre>
    {#if copyClipboard}
        <div class="absolute right-2 top-2 ">
            <CopyClipboard {text} />
        </div>
    {/if}
</div>
