<script>
  export let id;
  const isNew = typeof id !== 'number';

  let playlists = JSON.parse(localStorage.getItem('deepecho_playlists'));
  let playlist = playlists.find(p => p.id === id);

  let playlistTitle = playlist?.name;

  function removeSong(index) {
    if (!playlist || !playlist.songs) return;

    playlist.songs.splice(index, 1);
    playlists = [...playlists];

    // Reassign playlist so Svelte updates UI
    playlist = playlists.find(p => p.id === id);

    localStorage.setItem('deepecho_playlists', JSON.stringify(playlists));
  }
</script>

<div class="page">
  <h1>{isNew ? 'Create' : 'Edit'} playlist with id: {id}</h1>

  <div class="mood">
    <input
            id="title"
            bind:value={playlistTitle}
            placeholder="New Playlist Name"
    />
  </div>
  <p class="subheading">Edit/delete your current songs</p>
  <ul class="songs">
    {#each playlist?.songs as song, i}
      <li class="mood">
          <span>{song}</span>
          <button on:click={() => removeSong(i)}>➖</button>
      </li>
    {/each}
  </ul>
</div>