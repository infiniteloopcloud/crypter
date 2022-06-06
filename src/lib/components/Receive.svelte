<script lang="ts">
    import CodeBlock from './blocks/CodeBlock.svelte';

    export let chiperTextInput: string;
    export let plainTextOutput: string;
    export let encryptionKeyOutput: string;
</script>

<div class="mt-8">
    <form on:submit|preventDefault autocomplete="off">
        <label for="chipertext" class="ml-8 text-2xl">Crypted Message</label>
        <textarea
            bind:value={chiperTextInput}
            rows="8"
            type="text"
            id="chipertext"
            name="chipertext"
            class="mt-1 block w-full rounded-[40px] bg-primary-500 border-white focus:bg-primary-600 focus:ring-0 
            focus:shadow-sm transition-colors"
        />
        <button
            type="submit"
            class="mt-6 px-14 py-3 font-bold text-xl bg-secondary-500 text-primary-900 hover:bg-secondary-700 active:bg-secondary-800 transition-colors rounded-full"
        >
            Decrypt
        </button>
    </form>
    {#if plainTextOutput}
        <div class="my-3">
            <h4 class="ml-8 text-2xl mb-1">Decrypted message:</h4>
            <CodeBlock text={plainTextOutput} />
        </div>
    {/if}
    {#if encryptionKeyOutput}
        <div class="my-3">
            <h4 class="ml-8 text-2xl mb-1">Encryption key:</h4>
            <CodeBlock text={encryptionKeyOutput} />
        </div>
    {/if}
</div>
<div class="mt-8">
    <div>
        <h2 class="text-4xl font-bold text-secondary-500">How decrypting works?</h2>
        <ul>
            <li class="my-3">Paste the crypted message into the box</li>
            <li class="my-3">Click Decrypt using your already present Personal Encryption Key</li>
            <li class="my-3">Magic!</li>
        </ul>
    </div>
    <div class="mt-20">
        <h2 class="text-2xl font-bold text-secondary-500 mb-3">
            What's actually happening behind the scenes?
        </h2>
        <p>You can only successfully Decrypt a message if it is meant for you.</p>
        <p>
            The Sender will always need the recipient's Personal Encryption Key for a successful
            encryption.
        </p>
        <p>If you can't decrypt the message, then it's probably not for your eyes to see, sorry</p>
    </div>
</div>
