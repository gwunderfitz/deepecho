<script>
  export let id;
  const isNew = typeof id !== 'number';

  let playlists = JSON.parse(localStorage.getItem('deepecho_playlists'));
  let playlist = playlists.find(p => p.id === id);

  const songModules = import.meta.glob('/public/music/*.mp3', { as: 'url' });

  let songs = [];
  Object.entries(songModules).forEach(([path]) => {
    songs.push({
      name: path.split('/').pop().split('.')[0],
      url: path,
    })
  });

  let playlistTitle = playlist?.name ?? '';

  function removeSong(index) {
    if (!playlist || !playlist.songs) return;

    playlist.songs.splice(index, 1);
    playlists = [...playlists];

    // Reassign playlist so Svelte updates UI
    playlist = playlists.find(p => p.id === id);

    localStorage.setItem('deepecho_playlists', JSON.stringify(playlists));
  }

  function addSong(song) {
    if (!playlist) return;

    // Avoid duplicates
    if (!playlist.songs.includes(song.name)) {
      playlist.songs.push(song.name);
      playlists = [...playlists];
      playlist = playlists.find(p => p.id === id);

      localStorage.setItem('deepecho_playlists', JSON.stringify(playlists));
    }
  }
</script>

<div class="page">
  <h1>{isNew ? 'Create' : 'Edit'} playlist with id: {id}</h1>

  <div class="song">
    <input
            id="title"
            bind:value={playlistTitle}
            placeholder="New Playlist Name"
    />
  </div>
  <p class="subheading">Edit/delete your current songs</p>
  <ul class="songs">
    {#each playlist?.songs as song, i}
      <li class="song">
          <span>{song}</span>
          <button on:click={() => removeSong(i)}>➖</button>
      </li>
    {/each}
  </ul>
  <p class="subheading">Available songs</p>
  <ul class="songs">
    {#each songs as song, i}
      <li class="song">
          <span>{song.name}</span>
          <button on:click={() => addSong(song)}>➕</button>
      </li>
    {/each}
  </ul>
</div>
<style>
  .songs {
    list-style: none;
    padding-left: 0;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .song {
    background-color: white;
    color: black;
    padding: 0.6rem 1rem;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2em;
  }

  .song input {
    border: none;
    height: 100%;
  }
  .song *:first-child {
    flex-grow: 1;
  }
</style>