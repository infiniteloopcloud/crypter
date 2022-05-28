import { writable, type Writable } from 'svelte/store';

// js is allowed.
export const js: Writable<boolean> = writable();
