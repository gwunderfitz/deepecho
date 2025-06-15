<script>
  const USERS_KEY = 'deepecho_users';

  let firstName = '';
  let lastName = '';
  let email = '';
  let phone = '';
  let password = '';
  let repeatPassword = '';
  let error = '';
  let success = '';

  function register() {
    error = '';
    success = '';

    if (!firstName || !lastName || !email || !password || !repeatPassword) {
      error = 'Please fill in all required fields.';
      return;
    }

    if (password !== repeatPassword) {
      error = 'Passwords do not match.';
      return;
    }

    let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    if (users.some(u => u.email === email)) {
      error = 'User already exists.';
      return;
    }

    users.push({ firstName, lastName, email, phone, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    success = 'Registration successful! You can now log in.';
    firstName = lastName = email = phone = password = repeatPassword = '';
  }
</script>

<div class="form-page">
  <h1>Register</h1>

  {#if error}
    <p class="error">{error}</p>
  {/if}
  {#if success}
    <p class="success">{success}</p>
  {/if}

  <div class="form">
    <input bind:value={firstName} placeholder="First name" />
    <input bind:value={lastName} placeholder="Last name" />
    <input type="email" bind:value={email} placeholder="Email" />
    <input bind:value={phone} placeholder="Phone number" />
    <input type="password" bind:value={password} placeholder="Password" />
    <input type="password" bind:value={repeatPassword} placeholder="Repeat password" />

    <button on:click={register}>Submit</button>
  </div>
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

  .success {
    color: var(--fg-main);
    font-weight: bold;
  }
</style>
