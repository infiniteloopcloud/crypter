<script lang="ts">
    import { copyToClipboard } from '$lib/utils/helpers';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let text: string;
    export let isCopied = false;

    const handleClick = () => {
        if (isCopied) return;

        const onSuccess = () => {
            isCopied = true;
            const resetCopiedState = setTimeout(() => {
                isCopied = false;
                clearTimeout(resetCopiedState);
            }, 1000);
            dispatch('copyClipboard', text);
        };
        const onFailure = () => {};

        copyToClipboard(
            text,
            () => onSuccess(),
            () => onFailure()
        );
    };
</script>

<clipboard-copy
    aria-label="Copy"
    class="align-middle bg-gray-200 {isCopied
        ? 'border-green-400'
        : 'hover:bg-gray-300 active:bg-gray-400 active:border-gray-400 border-gray-300'} border-solid 
    rounded-md border shadow-md m-2 p-0 tooltipped-no-delay relative inline-block invisible group-hover:visible select-none appearance-none 
    whitespace-nowrap cursor-pointer"
    data-copy-feedback="Copied!"
    data-tooltip-direction="w"
    value={text}
    tabindex="0"
    role="button"
    on:click={handleClick}
>
    {#if isCopied}
        <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            class="m-2 align-middle text-green-600 inline-block overflow-visible fill-current"
        >
            <path
                fill-rule="evenodd"
                d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
            />
        </svg>
    {:else}
        <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            class="m-2 align-middle text-gray-600 inline-block overflow-visible fill-current"
        >
            <path
                fill-rule="evenodd"
                d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"
            />
            <path
                fill-rule="evenodd"
                d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"
            />
        </svg>
    {/if}
</clipboard-copy>
