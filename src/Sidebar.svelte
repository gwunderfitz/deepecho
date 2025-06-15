<script>
  import { createEventDispatcher } from 'svelte';
  import logo from './assets/DE_Logo_1.png'; // ✅ this is how to load your logo

  const dispatch = createEventDispatcher();
  let showDropdown = false;

  function goTo(page) {
    dispatch('navigate', page);
    showDropdown = false;
  }

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }
</script>

<aside class="sidebar">
  <img src={logo} alt="Deepecho Logo" class="logo" />

  <div class="create-section">
    <button class="create-btn" on:click={toggleDropdown}>+ Create</button>
    {#if showDropdown}
      <div class="dropdown">
        <button on:click={() => goTo('moods')}>Mood</button>
        <button on:click={() => goTo('playlists')}>Playlist</button>
      </div>
    {/if}
  </div>

  <nav>
    <button on:click={() => goTo('home')}>Explore</button>
    <button on:click={() => goTo('moods')}>Moods</button>
    <button on:click={() => goTo('playlists')}>Playlists</button>
    <button on:click={() => goTo('statistics')}>Statistics</button>
    <button on:click={() => goTo('settings')}>Settings</button>
  </nav>
</aside>

<style>
  .sidebar {
    width: 240px;
    background-color: var(--bg-accent);
    color: white;
    min-height: 100vh;
    padding: 1rem;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    font-family: var(--font-text);
  }

  .logo {
    width: 100%;
    margin-bottom: 1.5rem;
    object-fit: contain;
  }

  .create-section {
    position: relative;
    margin-bottom: 2rem;
  }

  .create-btn {
    width: 100%;
    padding: 0.5rem;
    background-color: var(--cta);
    color: var(--bg-accent);
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  .dropdown {
    position: absolute;
    top: 110%;
    left: 0;
    background-color: white;
    color: black;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    width: 100%;
    z-index: 10;
    display: flex;
    flex-direction: column;
  }

  .dropdown button {
    padding: 0.5rem 1rem;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    font-family: var(--font-text);
  }

  .dropdown button:hover {
    background-color: #eee;
  }

  nav button {
    display: block;
    width: 100%;
    padding: 0.5rem;
    background: none;
    border: none;
    color: white;
    text-align: left;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  nav button:hover {
    color: var(--highlight);
  }
</style>
