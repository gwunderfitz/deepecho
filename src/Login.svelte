<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  const USERS_KEY = 'deepecho_users';
  const SESSION_KEY = 'deepecho_session';

  let email = '';
  let password = '';
  let error = '';

  function login() {
    error = '';

    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      error = 'Invalid credentials';
      return;
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    alert('Logged in as ' + user.firstName);

    dispatch('navigate', { page: 'home' });
  }
</script>

<div class="form-page">
  <h1>Login</h1>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <div class="form">
    <input type="email" bind:value={email} placeholder="Email" />
    <input type="password" bind:value={password} placeholder="Password" />

    <button on:click={login}>Login</button>
  </div>
  <button on:click={() => dispatch('navigate', {page:'register'})} class="alt-btn">
    Need an account? Register here
  </button>

</div>

<style>
  .form-page {
    padding: 2rem;
    min-height: 100vh;
  }

  h1 {
    font-family: var(--font-title);
    color: var(--highlight);
    margin-bottom: 1.5rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 400px;
  }

  input {
    padding: 0.6rem;
    border-radius: 6px;
    border: none;
    background-color: white;
    color: black;
    font-family: var(--font-text);
  }

  button {
    padding: 0.6rem 1rem;
    background-color: var(--cta);
    color: var(--bg-accent);
    border: none;
    border-radius: 6px;
    font-weight: bold;
  }

  button:hover {
    background-color: var(--hover);
    color: white;
  }

  .error {
    color: var(--error);
    font-weight: bold;
  }

  .alt-btn {
  background: none;
  border: none;
  color: var(--highlight);
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.5rem;
}

</style>
