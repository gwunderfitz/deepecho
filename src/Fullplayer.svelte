<script>
  import { onMount } from 'svelte';
  export let showPlayer = false;
  export let togglePlayer;

  let isPlaying = false;
  let currentTime = 0;
  let duration = 0;
  let volume = 0.5;
  let audio;

  onMount(() => {
    audio = new Audio('/music/Crystal_Skies.mp3'); 
    audio.volume = volume;

    audio.addEventListener('loadedmetadata', () => {
      duration = audio.duration;
    });

    audio.addEventListener('timeupdate', () => {
      currentTime = audio.currentTime;
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
</script>

<!-- Bottom Bar -->
<div class="bottom-bar">
  <div class="left">
    <span>{isPlaying ? '▶' : '❚❚'} Now playing: Crystal Skies</span>
  </div>

  <input
    type="range"
    min="0"
    max={duration}
    step="0.1"
    value={currentTime}
    on:input={onSeek}
    class="progress"
  />

  <div class="volume bottom-volume">
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={volume}
      on:input={onVolumeChange}
    />
  </div>

  <button class="toggle-button" on:click={togglePlayer}>
    {showPlayer ? '▲' : '▼'}
  </button>

  <img src="/song-cover.jpeg" alt="Cover" class="small-cover" />
</div>


<!-- Fullscreen Player -->
{#if showPlayer}
  <div class="full-player">
    <button class="collapse-btn" on:click={togglePlayer}>⬇</button>

    <img src="/song-cover.jpeg" alt="Cover" class="large-cover" />

    <div class="controls">
      <button>⏮</button>
      <button on:click={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
      <button>⏭</button>
    </div>

    <input
      type="range"
      min="0"
      max={duration}
      step="0.1"
      value={currentTime}
      on:input={onSeek}
      class="progress-main"
    />

    <div class="volume">
      <label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          on:input={onVolumeChange}
          class="volume-vertical"
        />
      </label>
    </div>
  </div>
{/if}

<style>
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--bg-accent);
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.7rem 1rem;
    gap: 1rem;
    z-index: 50;
  }

  .left {
    flex: 1;
    font-size: 0.95rem;
  }

  .progress {
    flex: 2;
    accent-color: var(--fg-main);
  }

  .toggle-button {
    background: none;
    border: 2px solid var(--fg-main);
    color: var(--fg-main);
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }

  .small-cover {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 6px;
  }

  .full-player {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--bg);
    color: var(--text);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    z-index: 100;
  }

  .collapse-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: 2px solid var(--fg-main);
    color: var(--fg-main);
    font-size: 1.2rem;
    padding: 0.3rem 0.7rem;
    border-radius: 8px;
    cursor: pointer;
  }

  .large-cover {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 16px;
    margin: 2rem 0;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 1rem 0;
  }

  .controls button {
    background-color: var(--fg-main);
    border: 2px solid var(--fg-main);
    color: var(--bg-accent);
    font-size: 1.5rem;
    height: 2rem;
    width: 4rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
  }

  .progress-main {
    width: 80%;
    margin: 1rem 0;
    accent-color: var(--fg-main);
  }

  .volume {
    margin-top: 1rem;
  }

  .volume input[type="range"] {
    accent-color: var(--fg-main);
    width: 150px;
  }

  .volume-vertical {
    width: 150px;
    height: 125px;
    writing-mode: vertical-lr;
    transform: rotate(180deg); 
  }

  .bottom-volume {
   width: 100px;
  }

  .bottom-volume input {
   width: 100%;
   accent-color: var(--fg-main);
  }

</style>
