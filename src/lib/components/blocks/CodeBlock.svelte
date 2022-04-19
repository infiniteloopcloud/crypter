<script lang="ts">
    import CopyClipboard from '../buttons/CopyClipboard.svelte';
    export let text: string;
    export let preLang = 'no-highlight';
    export let copyClipboard = true;
</script>

<div
    class="{$$props.class
        ? `${$$props.class}`
        : 'bg-gray-100'} relative overflow-auto rounded-md p-3 group"
>
    <pre lang={preLang} id="public-key" class="whitespace-normal my-4 mx-0">
        <code class="break-all">{text}</code>
    </pre>
    {#if copyClipboard}
        <div class="absolute right-0 top-0 ">
            <CopyClipboard {text} />
        </div>
    {/if}
</div>
