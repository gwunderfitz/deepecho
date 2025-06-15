<script>
  import { audio } from './audio.js';
  export let isPlaying;
  export let currentTime;
  export let duration;
  export let volume;
  export let togglePlay;
  export let togglePlayer;
  export let onSeek;
  export let onVolumeChange;
</script>

<div class="bottom-bar">
  <div class="left">
    <span>{isPlaying ? '▶' : '❚❚'} Now playing: Crystal Skies</span>
  </div>

  <input type="range" min="0" max={duration} step="0.1" value={currentTime} on:input={onSeek} class="progress" />

  <div class="controls-mini">
    <button>⏮</button>
    <button on:click={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
    <button>⏭</button>
  </div>

  <div class="volume bottom-volume">
    <input type="range" min="0" max="1" step="0.01" value={volume} on:input={onVolumeChange} />
  </div>

  <button class="toggle-button" on:click={togglePlayer}>
    ▲
  </button>

  <img src="/song-cover.jpeg" alt="Cover" class="small-cover" />
</div>

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

  .controls-mini {
    display: flex;
    gap: 0.4rem;
  }

  .controls-mini button {
    background-color: var(--fg-main);
    border: none;
    color: var(--bg-accent);
    font-size: 1.2rem;
    height: 2rem;
    width: 2.5rem;
    border-radius: 10px;
    cursor: pointer;
  }

  .bottom-volume {
    width: 100px;
  }

  .bottom-volume input {
    width: 100%;
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
</style>
