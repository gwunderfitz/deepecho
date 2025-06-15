<script>
  import Sidebar from './Sidebar.svelte';
  import MiniPlayer from './MiniPlayer.svelte';
  import FullPlayer from './FullPlayer.svelte';
  import Home from './Home.svelte';
  import Moods from './Moods.svelte';
  import Playlists from './Playlists.svelte';
  import Login from './Login.svelte';
  import Register from './Register.svelte';
  import Settings from './Settings.svelte';
  import { user } from './stores/user.js';
  import { audio } from './audio.js';
  import { onMount } from 'svelte';
  import Playlist from "./Playlist.svelte";

  let currentPage = 'home';
  $user; 
  onMount(() => {
    if ($user) {
      currentPage = 'home';
    } else {
      currentPage = 'register';
    }
  });

  let showPlayer = false;
  let isSeeking = false;
  let isPlaying = false;
  let currentTime = 0;
  let duration = 0;
  let volume = 0.5;

  const savedTime = parseFloat(localStorage.getItem('lastPlayedTime'));

  onMount(() => {
    audio.volume = volume;

    audio.addEventListener('loadedmetadata', () => {
      const savedTime = parseFloat(localStorage.getItem('lastPlayedTime'));
      if (!isNaN(savedTime) && savedTime < audio.duration) {
        audio.currentTime = savedTime;
        currentTime = savedTime;
      } else {
        currentTime = 0;
      }
      duration = audio.duration;
    });

    audio.addEventListener('timeupdate', () => {
      if (!isSeeking) {
        currentTime = audio.currentTime;
        localStorage.setItem('lastPlayedTime', currentTime.toString());
      }
    });
    audio.addEventListener('ended', () => {
      isPlaying = false;
      currentTime = 0;
    });
  });

  function togglePlay() {
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    isPlaying = !isPlaying;
  }

  function onSeek(event) {
    currentTime = event.target.value;
    audio.currentTime = currentTime;
  }

  function onVolumeChange(event) {
    volume = event.target.value;
    audio.volume = volume;
  }

  function togglePlayer() {
    showPlayer = !showPlayer;
  }

  let props = {};

  const pages = {
    home: Home,
    moods: Moods,
    playlists: Playlists,
    playlist: Playlist,
    login: Login,
    register: Register,
    settings: Settings
  };

  function handleNavigate(event) {
    const { page, id } = event.detail;
    currentPage = page;
    props = { id };
  }

  $: showBottomBar = currentPage !== 'login' && currentPage !== 'register';
  $: showUI = currentPage !== 'login' && currentPage !== 'register';
</script>

<div style="display: flex">
  {#if showBottomBar}
    <Sidebar on:navigate={handleNavigate} />
  {/if}

  <div style="flex: 1; position: relative;">
    <svelte:component on:navigate={handleNavigate} this={pages[currentPage]} {...props} />

    {#if showUI && !showPlayer}
      <MiniPlayer
        {isPlaying}
        {currentTime}
        {duration}
        {volume}
        {togglePlay}
        {togglePlayer}
        {onSeek}
        {onVolumeChange}
      />
    {/if}

    {#if showUI && showPlayer}
      <FullPlayer
        {isPlaying}
        {currentTime}
        {duration}
        {volume}
        {togglePlay}
        {togglePlayer}
        {onSeek}
        {onVolumeChange}
      />
    {/if}
  </div>
</div>
