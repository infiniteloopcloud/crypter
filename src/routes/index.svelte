<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';

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
		const keys = await window.crypto.subtle.generateKey(
			{
				name: 'RSA-OAEP',
				modulusLength: 2048,
				publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
				hash: { name: 'SHA-256' }
			},
			true,
			['encrypt', 'decrypt']
		);

		const exportedPublicKey = await window.crypto.subtle.exportKey('jwk', keys.publicKey);
		const exportedPrivateKey = await window.crypto.subtle.exportKey('jwk', keys.privateKey);

		return {
			keys,
			exportedPublicKey: exportedPublicKey,
			exportedPrivateKey: exportedPrivateKey,
			encryptionKey: window.btoa(JSON.stringify(exportedPublicKey))
		};
	};

	const encrypt = async () => {
		const encryptionKeyObj = JSON.parse(window.atob(encryptionKeyInput));
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

		const chipertextStr = String.fromCharCode.apply(null, new Uint8Array(chipertext));
		const chipertextBase64 = window.btoa(chipertextStr);

		// displayChipertext(chipertextBase64);
		chiperTextOutput = chipertextBase64;
	};

	const decrypt = async () => {
		const newChipertextStr = atob(chiperTextInput);
		const chipertext = str2ab(newChipertextStr);

		const decryptedAb = await window.crypto.subtle.decrypt(
			{ name: 'RSA-OAEP' },
			globalKeys.keys.privateKey,
			chipertext
		);

		const decrypted = String.fromCharCode.apply(null, new Uint8Array(decryptedAb));

		// displayPlaintext(decrypted);
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
		await main();
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>Crypter</h1>

	<h3>Encrypt</h3>
	<form on:submit|preventDefault={encrypt}>
		<label for="encryption_key">Encryption Key: </label>
		<input
			bind:value={encryptionKeyInput}
			type="text"
			id="encryption_key"
			name="encryption_key"
			class="mt-1
            block
            w-full
            rounded-md
            bg-gray-100
            border-transparent
            focus:border-gray-500 focus:bg-white focus:ring-0"
		/>
		<br />
		<br />
		<label for="plaintext">Plaintext:</label>
		<textarea
			bind:value={plainTextInput}
			id="plaintext"
			name="plaintext"
			rows="4"
			class="mt-1
            block
            w-full
            rounded-md
            bg-gray-100
            border-transparent
            focus:border-gray-500 focus:bg-white focus:ring-0"
		/>
		<br />
		<br />
		<button
			type="submit"
			class="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors text-white rounded-md"
		>
			Encrypt
		</button>
	</form>

	{#if chiperTextOutput}
		<p id="chipertext-output" class="break-words">{chiperTextOutput}</p>
	{/if}

	<h3>Decrypt</h3>
	{#if encryptionKeyOutput}
		<p id="public-key" class="break-words">{encryptionKeyOutput}</p>
	{/if}
	<form on:submit|preventDefault={decrypt}>
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
			class="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 transition-colors text-white rounded-md"
		>
			Decrypt
		</button>
	</form>

	{#if plainTextOutput}
		<p id="plaintext-output break-words">{plainTextOutput}</p>
	{/if}
</section>
