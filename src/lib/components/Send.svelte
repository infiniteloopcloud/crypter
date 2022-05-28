<script lang="ts">
    import CodeBlock from './blocks/CodeBlock.svelte';

    export let plainTextInput: string;
    export let encryptionKeyInput: string;
    export let encryptionKeyOutput: string;
    export let chiperTextOutput: string;
</script>

<div class="mt-8">
    <form on:submit|preventDefault autocomplete="off">
        <div>
            <label for="plaintext" class="ml-8">Compose Message</label>
            <textarea
                bind:value={plainTextInput}
                id="plaintext"
                name="plaintext"
                rows="4"
                class="mt-1 block w-full rounded-[40px] h-80 bg-primary-500 border border-secondary-500 focus:bg-primary-600 focus:ring-0 transition-colors"
            />
        </div>
        <div class="mt-5">
            <label for="encryption_key" class="ml-8" title="Paste the encryption key">
                Recipient's Encryption Key
            </label>
            <input
                bind:value={encryptionKeyInput}
                type="text"
                id="encryption_key"
                name="encryption_key"
                class="mt-1 h-16 block w-full rounded-full bg-primary-500 border-secondary-500 focus:bg-primary-600 focus:ring-0 
                focus:shadow-sm transition-colors"
                required
            />
            {#if encryptionKeyOutput}
                <div class="my-3">
                    <h4>Encryption key:</h4>
                    <CodeBlock text={encryptionKeyOutput} />
                </div>
            {/if}
        </div>
        <button
            type="submit"
            class="my-6 px-14 py-4 font-bold text-xl bg-secondary-500 text-primary-900 hover:bg-indigo-300 active:bg-indigo-400 transition-colors rounded-full"
        >
            Encrypt
        </button>
    </form>

    {#if chiperTextOutput}
        <div class="my-4">
            <h3 class="font-normal text-xl">Result</h3>
            <small>aka chipertext</small>
            <CodeBlock class="bg-green-50" text={chiperTextOutput} />
        </div>
    {/if}
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
