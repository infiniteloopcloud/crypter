<script lang="ts">
    import { copyToClipboard } from '$lib/utils/helpers';
    import CodeBlock from './blocks/CodeBlock.svelte';

    export let plainTextInput: string;
    export let encryptionKeyInput: string;
    export let chiperTextOutput: string;
    import { getNotificationsContext } from 'svelte-notifications';
    const { addNotification } = getNotificationsContext();
</script>

<div class="mt-8">
    <form on:submit|preventDefault autocomplete="off">
        <div>
            <label for="plaintext" class="text-2xl ml-8">Compose Message</label>
            <textarea
                bind:value={plainTextInput}
                id="plaintext"
                name="plaintext"
                rows="4"
                class="mt-1 block w-full rounded-[40px] h-80 bg-primary-500 border border-white focus:bg-primary-600 focus:ring-0 transition-colors"
            />
        </div>

        {#if chiperTextOutput}
            <div class="my-4">
                <h3 class="ml-8 font-normal text-2xl">Encrypted Message</h3>
                <small class="ml-8">aka chipertext</small>
                <CodeBlock class="" text={chiperTextOutput} />
            </div>
        {/if}

        <div class="mt-5">
            <label for="encryption_key" class="text-2xl ml-8" title="Paste the encryption key">
                Recipient's Encryption Key
            </label>
            <input
                bind:value={encryptionKeyInput}
                type="text"
                id="encryption_key"
                name="encryption_key"
                class="mt-1 h-16 block w-full rounded-full bg-primary-500 border-white focus:bg-primary-600 focus:ring-0 
                focus:shadow-sm transition-colors"
                required
            />
        </div>
        <div class="flex my-6 items-center gap-4">
            <button
                type="submit"
                class="px-14 py-4 font-bold text-xl bg-secondary-500 text-primary-900 hover:bg-secondary-700 active:bg-secondary-800 transition-colors rounded-full"
            >
                Encrypt
            </button>

            <div
                class="text-white hover:text-secondary-700 cursor-pointer"
                on:click={() =>
                    copyToClipboard(
                        encryptionKeyInput,
                        () => {
                            addNotification({
                                text: 'Copied to clipboard.',
                                removeAfter: 2000,
                                type: 'success',
                                position: 'bottom-center'
                            });
                        },
                        () => {
                            addNotification({
                                text: 'Failed to copy to clipboard!',
                                removeAfter: 2000,
                                type: 'error',
                                position: 'bottom-center'
                            });
                        }
                    )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                </svg>
            </div>
        </div>
    </form>
</div>
<div class="mt-8">
    <div>
        <h2 class="text-4xl font-bold text-secondary-500">How encrypting works?</h2>
        <ul>
            <li class="my-3">Compose your message</li>
            <li class="my-3">Insert the recipient’s Personal Encryption Key</li>
            <li class="my-3">Click Encrypt</li>
            <li class="my-3">Magic!</li>
        </ul>
    </div>
    <div class="mt-20">
        <h2 class="text-2xl font-bold text-secondary-500 mb-3">
            What's actually happening behind the scenes?
        </h2>
        <p>
            We use an XYZ method to encrypt your message, which can only be decrypted by the person
            who's Personal Encryption Key was used for encryption here.
        </p>
    </div>
</div>
