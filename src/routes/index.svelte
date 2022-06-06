<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit';
    export const load: Load = async () => {
        return {};
    };
</script>

<script lang="ts">
    import type { KeyStore } from '$lib/models/interfaces/KeyStore.interface';
    import { checkBrowserCompatibility } from '$lib/utils/helpers';
    import { onMount } from 'svelte';
    import { get as getIdb, set as setIdb } from 'idb-keyval';
    import Send from '$lib/components/Send.svelte';
    import Receive from '$lib/components/Receive.svelte';

    interface GlobalKeys {
        keys: {
            publicKey: CryptoKey;
            privateKey: CryptoKey;
        };
        /* eslint-disable */
        exportedPublicKey: JsonWebKey;
        exportedPrivateKey: JsonWebKey;
        /* eslint-enable */

        encryptionKey: string;
    }

    let globalKeys: GlobalKeys;

    // Inputs
    let encryptionKeyInput: string;
    // let decryptionKeyInput: string;
    let plainTextInput: string;
    let chiperTextInput: string;

    // Outputs
    let encryptionKeyOutput: string;
    let plainTextOutput: string;
    let chiperTextOutput: string;

    // Existing keys from the IDB store
    let cachedKeys: KeyStore | undefined;

    // UI tab state
    let mode: 'send' | 'receive' = 'send';

    /** Load keys from cache(indexedDB) */
    const loadCachedKeys = async (keyStore: KeyStore) => {
        // Private keys used for decrypt
        const privateKey = await window.crypto.subtle.importKey(
            'jwk', //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
            JSON.parse(window.atob(keyStore.privateKey)),
            {
                //these are the algorithm options
                name: 'RSA-OAEP',
                hash: { name: 'SHA-256' } //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
            },
            true, //whether the key is extractable (i.e. can be used in exportKey)
            ['decrypt'] //"encrypt" or "wrapKey" for public key import or "decrypt" or "unwrapKey" for private key imports
        );
        // Public keys used for encrype
        const publicKey = await window.crypto.subtle.importKey(
            'jwk', //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
            JSON.parse(window.atob(keyStore.publicKey)),
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
    };

    /** Generate keys if isn't exist any key */
    const generateDefaultKeys = async () => {
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
    };

    /** Load keys based on cache */
    const loadKeys = async () => {
        // Check existing keys.
        if (cachedKeys?.privateKey && cachedKeys?.publicKey) {
            return await loadCachedKeys(cachedKeys);
        } else {
            return await generateDefaultKeys();
        }
    };

    const generateKey = async () => {
        // Checking existing key in the browser's IndexedDB storage.
        const { publicKey, privateKey } = await loadKeys();

        // Make JSONWebKeys from the loaded keys
        const exportedPublicKey = await window.crypto.subtle.exportKey('jwk', publicKey);
        const exportedPrivateKey = await window.crypto.subtle.exportKey('jwk', privateKey);

        // Make string keys from the loaded keys
        const encryptionPublicKey = window.btoa(JSON.stringify(exportedPublicKey));
        const encryptionPrivateKey = window.btoa(JSON.stringify(exportedPrivateKey));

        // If there is NO existing cached key, we will caching it to the IDB
        if (!cachedKeys) {
            await setIdb('combinedKey', {
                privateKey: encryptionPrivateKey,
                publicKey: encryptionPublicKey
            });
        }

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
        /* eslint-disable */
        const encryptionJWK = JSON.parse(window.atob(encryptionKeyInput)) as JsonWebKey;
        /* eslint-enable */
        const type = {
            name: 'RSA-OAEP',
            hash: 'SHA-256'
        };

        // Imported PUBLIC KEY
        const encryptionKeyImported = await crypto.subtle.importKey(
            'jwk',
            encryptionJWK,
            type,
            true,
            ['encrypt']
        );

        const chiperText = await window.crypto.subtle.encrypt(
            { name: 'RSA-OAEP' },
            encryptionKeyImported,
            new TextEncoder().encode(plainTextInput)
        );

        const chiperTextStr = String.fromCharCode.apply(
            null,
            Array.from(new Uint8Array(chiperText))
        );
        const chipertextBase64 = window.btoa(chiperTextStr);

        chiperTextOutput = chipertextBase64;
    };

    const decrypt = async () => {
        // If the user has own key, then we'll iport it
        const newChiperTextStr = window.atob(chiperTextInput);
        const chiperText = str2ab(newChiperTextStr);

        const decryptedAb = await window.crypto.subtle.decrypt(
            { name: 'RSA-OAEP' },
            globalKeys.keys.privateKey,
            chiperText
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
        globalKeys = await generateKey();
        encryptionKeyOutput = globalKeys.encryptionKey; // Public key;
    };

    onMount(async () => {
        await checkBrowserCompatibility();
        cachedKeys = await getIdb<KeyStore>('combinedKey');
        await main();
        encryptionKeyInput = encryptionKeyOutput;
    });
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<h1 class="text-6xl font-bold text-center my-10">Messaging ecrypted. Simply and safely.</h1>

<section>
    <div class="grid grid-cols-12 my-5">
        <div class="flex border border-white rounded-full p-[2px] col-start-5 col-end-9">
            <button
                class="px-6 py-2 text-2xl font-semibold w-full transition-colors rounded-full {mode ===
                'send'
                    ? 'bg-secondary-500 hover:bg-secondary-700 text-primary-800'
                    : 'hover:bg-secondary-500/30'}"
                on:click={() => (mode = 'send')}
            >
                Send
            </button>
            <button
                class="px-6 py-2 text-2xl font-semibold w-full transition-colors rounded-full {mode ===
                'receive'
                    ? 'bg-secondary-500 hover:bg-secondary-700  text-primary-800'
                    : 'hover:bg-secondary-500/30'}"
                on:click={() => (mode = 'receive')}
            >
                Receive
            </button>
        </div>
    </div>
    <div class="grid grid-cols-2 gap-32">
        {#if mode === 'send'}
            <Send
                bind:plainTextInput
                bind:encryptionKeyInput
                {chiperTextOutput}
                on:submit={encrypt}
            />
        {:else}
            <Receive
                bind:chiperTextInput
                {encryptionKeyOutput}
                {plainTextOutput}
                on:submit={decrypt}
            />
        {/if}
    </div>
</section>
