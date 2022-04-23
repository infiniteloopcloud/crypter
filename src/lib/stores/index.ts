import { writable, type Writable } from 'svelte/store';
// Types & Interfaces
import type { KeyStore } from '$lib/models/interfaces/KeyStore.interface';

// KeyStore
export const keyStore: Writable<KeyStore> = writable();
