<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';
    export const load: Load = async () => {
        return {};
    };
</script>

<script lang="ts">
    import { checkBrowserCompatibility } from '$lib/utils/storeController';
    import CodeBlock from '$lib/components/blocks/CodeBlock.svelte';
    import { onMount } from 'svelte';
    import { keyStore } from '$lib/stores';
    import { get as getIdb, set as setIdb } from 'idb-keyval';
    import type { KeyStore } from '$lib/models/interfaces/KeyStore.interface';

    let globalKeys: Record<string, any>;

    // Inputs
    let encryptionKeyInput: string;
    let plainTextInput: string;
    let chiperTextInput: string;

    // Outputs
    let encryptionKeyOutput: string;
    let plainTextOutput: string;
    let chiperTextOutput: string;

    const generateKey = async () => {
        // Checking existing key in the browser's IndexedDB storage.
        const cachedKeys = await getIdb<KeyStore>('combinedKey');

        const loadKeys = async () => {
            // If key is exists then import it.
            if (cachedKeys?.privateKey && cachedKeys?.publicKey) {
                const privateKey = await window.crypto.subtle.importKey(
                    'jwk', //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
                    JSON.parse(window.atob(cachedKeys.privateKey)) as JsonWebKey,
                    {
                        //these are the algorithm options
                        name: 'RSA-OAEP',
                        hash: { name: 'SHA-256' } //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
                    },
                    true, //whether the key is extractable (i.e. can be used in exportKey)
                    ['decrypt'] //"encrypt" or "wrapKey" for public key import or "decrypt" or "unwrapKey" for private key imports
                );
                const publicKey = await window.crypto.subtle.importKey(
                    'jwk', //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
                    JSON.parse(window.atob(cachedKeys.publicKey)) as JsonWebKey,
                    {
                        //these are the algorithm options
                        name: 'RSA-OAEP',
                        hash: { name: 'SHA-256' } //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
                    },
                    true, //whether the key is extractable (i.e. can be used in exportKey)
                    ['encrypt'] //"encrypt" or "wrapKey" for public key import or "decrypt" or "unwrapKey" for private key imports
                );
                return {
                    publicKey,
                    privateKey
                };
            } else {
                // Generate keys.
                const { privateKey, publicKey } = await window.crypto.subtle.generateKey(
                    {
                        name: 'RSA-OAEP',
                        modulusLength: 2048,
                        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                        hash: { name: 'SHA-256' }
                    },
                    true,
                    ['encrypt', 'decrypt']
                );

                return {
                    publicKey,
                    privateKey
                };
            }
        };

        const { publicKey, privateKey } = await loadKeys();

        const exportedPublicKey = await window.crypto.subtle.exportKey('jwk', await publicKey);
        const exportedPrivateKey = await window.crypto.subtle.exportKey('jwk', await privateKey);
        const encryptionPublicKey = window.btoa(JSON.stringify(exportedPublicKey));
        const encryptionPrivateKey = window.btoa(JSON.stringify(exportedPrivateKey));

        // If there is existing cached key, we don't want to update it.
        if (!cachedKeys) {
            await setIdb('combinedKey', {
                privateKey: encryptionPrivateKey,
                publicKey: encryptionPublicKey
            });
        }

        // Store keys in a svelte store, to reach them easily.
        $keyStore = { privateKey: encryptionPrivateKey, publicKey: encryptionPublicKey };

        return {
            keys: {
                publicKey,
                privateKey
            },
            exportedPublicKey,
            exportedPrivateKey,
            encryptionKey: encryptionPublicKey
        };
    };

    const encrypt = async () => {
        const encryptionKeyObj = JSON.parse(window.atob(encryptionKeyInput)) as JsonWebKey;
        const type = {
            name: 'RSA-OAEP',
            hash: 'SHA-256'
        };

        const encryptionKeyImported = await crypto.subtle.importKey(
            'jwk',
            encryptionKeyObj,
            type,
            true,
            ['encrypt']
        );

        const chipertext = await window.crypto.subtle.encrypt(
            { name: 'RSA-OAEP' },
            encryptionKeyImported,
            new TextEncoder().encode(plainTextInput)
        );

        const chipertextStr = String.fromCharCode.apply(
            null,
            Array.from(new Uint8Array(chipertext))
        );
        const chipertextBase64 = window.btoa(chipertextStr);

        chiperTextOutput = chipertextBase64;
    };

    const decrypt = async () => {
        const newChipertextStr = window.atob(chiperTextInput);
        const chipertext = str2ab(newChipertextStr);

        const decryptedAb = await window.crypto.subtle.decrypt(
            { name: 'RSA-OAEP' },
            globalKeys.keys.privateKey,
            chipertext
        );

        const decrypted = String.fromCharCode.apply(null, Array.from(new Uint8Array(decryptedAb)));

        plainTextOutput = decrypted;
    };

    const str2ab = (str: string) => {
        var buf = new ArrayBuffer(str.length); // 2 bytes for each char
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    };

    const main = async () => {
        const keys = await generateKey();
        globalKeys = keys;
        encryptionKeyOutput = keys.encryptionKey;
    };

    onMount(async () => {
        await checkBrowserCompatibility();
        await main();
    });
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<section>
    <h1 class="font-medium leading-tight text-5xl mt-0 mb-2 text-gray-600">Crypter</h1>

    <div class="rounded-md border border-gray-100 p-4">
        <h2 class=" font-normal text-2xl">Encrypt</h2>

        <form on:submit|preventDefault={encrypt} autocomplete="off" class="my-2">
            <label for="encryption_key">Encryption Key: </label>
            <small class="block">Paste the encryption key</small>
            <input
                bind:value={encryptionKeyInput}
                type="text"
                id="encryption_key"
                name="encryption_key"
                class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 
                focus:shadow-sm transition-colors"
                required
            />
            {#if encryptionKeyOutput}
                <div class="my-3">
                    <h4>Encryption key:</h4>
                    <CodeBlock text={encryptionKeyOutput} />
                </div>
            {/if}
            <br />
            <label for="plaintext">Plaintext:</label>
            <textarea
                bind:value={plainTextInput}
                id="plaintext"
                name="plaintext"
                rows="4"
                class="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 
                transition-colors"
            />
            <br />
            <br />
            <button
                type="submit"
                class="px-8 py-2 bg-indigo-200 text-indigo-700 hover:bg-indigo-300 active:bg-indigo-400 transition-colors rounded-md"
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

    <div class="rounded-md border border-gray-100 p-4 my-4">
        <h2 class=" font-normal text-2xl">Decrypt</h2>
        <form on:submit|preventDefault={decrypt} class="my-2" autocomplete="off">
            <label for="chipertext">Chipertext:</label>
            <input
                bind:value={chiperTextInput}
                type="text"
                id="chipertext"
                name="chipertext"
                class="mt-1
            block
            w-full
            rounded-md
            bg-gray-100
            border-transparent
            focus:border-gray-500 focus:bg-white focus:ring-0"
            /><br /><br />
            <button
                type="submit"
                class="px-8 py-2 bg-indigo-200 text-indigo-700 hover:bg-indigo-300 active:bg-indigo-400 transition-colors rounded-md"
            >
                Decrypt
            </button>
        </form>

        {#if plainTextOutput}
            <h2>Result</h2>
            <p id="plaintext-output break-words">{plainTextOutput}</p>
        {/if}
    </div>
</section>
