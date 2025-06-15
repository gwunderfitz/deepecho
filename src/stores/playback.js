import { writable } from 'svelte/store';

export const currentPlaylist = writable(null); // array of song names
export const currentSong = writable(null);     // string (song name)
export const currentIndex = writable(0);
