import { writable } from 'svelte/store';

const SESSION_KEY = 'deepecho_session';
const savedUser = JSON.parse(localStorage.getItem(SESSION_KEY));

export const user = writable(savedUser || null);

// Automatically update localStorage when the user changes
user.subscribe((value) => {
  if (value) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(value));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
});
