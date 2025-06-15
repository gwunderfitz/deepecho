import { writable } from 'svelte/store';

export const user = writable(
  JSON.parse(sessionStorage.getItem('user')) || null
);

user.subscribe((value) => {
  if (value) {
    sessionStorage.setItem('user', JSON.stringify(value));
  } else {
    sessionStorage.removeItem('user');
  }
});
