import { writable } from 'svelte/store';

export const hoveredRNSCard = writable({
  rns: null,
  coords: null,
  visible: false
});
