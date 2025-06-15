<script>
  import { user } from './stores/user.js';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function logout() {
    user.set(null);
    dispatch('navigate', 'register');
  }

  let openIndex = null; // which FAQ is open

  const faqs = [
    {
      question: "Can I create custom playlists?",
      answer: "Yes! Use the 'Create Playlist' feature from the sidebar."
    },
    {
      question: "Will my data be saved?",
      answer: "Session data is stored per tab, but playlists persist!"
    },
    {
      question: "Can I play my own music?",
      answer: "You can upload or use your local test files during development!"
    }
  ];
</script>

<div class="settings-page">
  <h1>Settings</h1>

  <section class="info">
    <h2>About Deepecho</h2>
    <p>Deepecho is your personalized mood-based music streaming platform, designed with style and vibes in mind 🎧</p>
    {#if $user}
      <p><strong>Logged in as:</strong> {$user.email}</p>
    {/if}
  </section>

  <section class="faq">
    <h2>FAQ</h2>
    <div class="faq-list">
        {#each faqs as faq, i}
        <div class="faq-item">
            <div class="faq-question" on:click={() => openIndex = openIndex === i ? null : i}>
            <span>{faq.question}</span>
            <span>{openIndex === i ? '▲' : '▼'}</span>
            </div>
            {#if openIndex === i}
            <div class="faq-answer">
                {faq.answer}
            </div>
            {/if}
        </div>
        {/each}
    </div>
  </section>

  <section class="logout">
    <button on:click={logout}>Log out</button>
  </section>
</div>

<style>
  .settings-page {
    padding: 2rem;
    font-family: var(--font-text);
    color: var(--text);
  }

  h1 {
    font-family: var(--font-title);
    color: var(--highlight);
    margin-bottom: 1.5rem;
  }

  section {
    margin-bottom: 2rem;
  }

  h2 {
    color: var(--fg-main);
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 1rem;
  }

  button {
    background: var(--cta);
    border: none;
    color: var(--bg-accent);
    padding: 0.6rem 1rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--hover);
    color: white;
  }

  .logout {

  }

  .faq {
    margin-bottom: 2rem;
  }

  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .faq-item {
    background: var(--bg-accent);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: var(--text);
  }

  .faq-question {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    cursor: pointer;
  }

  .faq-answer {
    margin-top: 0.5rem;
    font-weight: normal;
    animation: fade-in 0.2s ease-in-out;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

</style>
