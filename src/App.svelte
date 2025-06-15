<script>
  import Sidebar from './Sidebar.svelte';
  import Player from './Fullplayer.svelte';
  import Home from './Home.svelte';
  import Moods from './Moods.svelte';
  import Playlists from './Playlists.svelte';
  import Login from './Login.svelte';
  import Register from './Register.svelte';

  let currentPage = 'home';
  let showPlayer = false;

  let props = {};

  const pages = {
    home: Home,
    moods: Moods,
    playlists: Playlists,
    login: Login,
    register: Register
  };

  function togglePlayer() {
    showPlayer = !showPlayer;
  }

  function handleNavigate(event) {
    const { page, id } = event.detail;
    currentPage = page;
    props = { id };
  }

  $: showBottomBar = currentPage !== 'login' && currentPage !== 'register';
</script>

<div style="display: flex">
  {#if showBottomBar}
    <Sidebar on:navigate={handleNavigate} />
  {/if}

  <div style="flex: 1; position: relative;">
    <svelte:component on:navigate={handleNavigate} this={pages[currentPage]} {...props} />

    <!-- 🎵 Mini Player Bar (only if not on login/register) -->
    {#if showBottomBar}
      <Player {showPlayer} {togglePlayer} />
    {/if}
  </div>
</div>

<button on:click={() => { localStorage.clear(); location.reload(); }}>
  🔁 Reset All Data
</button>
