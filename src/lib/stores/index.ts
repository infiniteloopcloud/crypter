import { persist, indexedDBStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';
// Types & Interfaces
import type { PersistentStore, SelfUpdateStorageInterface } from '@macfja/svelte-persistent-store';
import type { KeyStore } from '$lib/models/interfaces/KeyStore.interface';

// KeyStore
// export const keyStore: PersistentStore<string> = persist(
//     writable(''),
//     indexedDBStorage(),
//     'keyStorage'
// );

export const keyStore = persist(writable(''), indexedDBStorage(), 'keyz');

// function myStorage<T>(): SelfUpdateStorageInterface<T> {
//     const listeners: Array<{ key: string; listener: (newValue: T) => void }> = [];
//     const listenerFunction = (eventKey: string, newValue: T) => {
//         listeners
//             .filter(({ key }) => key === eventKey)
//             .forEach(({ listener }) => listener(newValue));
//     };
//     return {
//         getValue(key: string): T | null {
//             readRealStorageWithPromise(key).then((value) => listenerFunction(key, value));
//             return null; // Tell the store to use current decorated store value
//         }
//         // ... addListener, removeListener, setValue, deleteValue
//     };
// }
