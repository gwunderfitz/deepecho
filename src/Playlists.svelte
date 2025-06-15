<script>
  import {createEventDispatcher} from "svelte";

  const STORAGE_KEY = 'deepecho_playlists';

  let playlists = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const dispatch = createEventDispatcher();

  function deletePlaylist(id) {
    playlists = playlists.filter(playlist => playlist.id !== id);
    savePlaylists();
  }

  function editPlaylist(id) {
    dispatch('navigate', { page: 'playlist', id: id });
  }

  function savePlaylists() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  }
</script>

<div class="page">
  <h1>Playlist Management</h1>
  <p class="subheading">Edit/delete your existing playlists</p>

  <ul class="playlist-list">
    {#each playlists as playlist}
      <li>
        <span>{playlist.name}</span>
        <button  on:click={() => editPlaylist(playlist.id)}>✏️</button>
        <button on:click={() => deletePlaylist(playlist.id)}>➖</button>
      </li>
    {/each}
  </ul>

  <div class="add">
    <button on:click={editPlaylist}>Add Playlist</button>
  </div>
</div>

<style>
  .page {
    padding: 2rem;
    min-height: 100vh;
  }

  .subheading {
    color: var(--cta);
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }

  .playlist-list {
    list-style: none;
    padding-left: 0;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .playlist-list li {
    background-color: white;
    color: black;
    padding: 0.6rem 1rem;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .playlist-list button {
    background: none;
    border: none;
    color: var(--error);
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
  }

  .add {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 300px;
  }

  .add input {
    padding: 0.5rem;
    border-radius: 6px;
    border: none;
    background-color: white;
    color: black;
  }

  .add button {
    align-self: flex-start;
    padding: 0.5rem 1rem;
    background-color: var(--cta);
    color: var(--bg-accent);
    border: none;
    border-radius: 6px;
    font-weight: 600;
  }

  .add button:hover {
    background-color: var(--hover);
    color: white;
  }
</style>
