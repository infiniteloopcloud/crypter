// import { persist, indexedDBStorage } from '@macfja/svelte-persistent-store';
import { writable, type Writable } from 'svelte/store';
// Types & Interfaces
// import type { PersistentStore } from '@macfja/svelte-persistent-store';
import type { KeyStore } from '$lib/models/interfaces/KeyStore.interface';

// KeyStore
// export const keyStore: PersistentStore<KeyStore | string> = persist(
//     writable(''),
//     indexedDBStorage(),
//     'keyz'
// );

// KS
export const keyStore: Writable<KeyStore | string> = writable('');
