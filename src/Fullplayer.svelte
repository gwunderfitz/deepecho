<script>
  import { fade } from 'svelte/transition';
  import { audio } from './audio.js';

  export let isPlaying;
  export let currentTime;
  export let duration;
  export let volume;
  export let togglePlay;
  export let togglePlayer;
  export let onSeek;
  export let onVolumeChange;
  let isSeeking = false;

  function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
</script>

{#if isPlaying !== undefined}
  <div class="full-player" transition:fade>
    <button class="collapse-btn" on:click={togglePlayer}>⬇</button>

    <img src="/song-cover.jpeg" alt="Cover" class="large-cover" />

    <!-- Bottom control bar -->
    <div class="player-controls-bar">
      <div class="progress-group">
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          bind:value={currentTime}
          on:mousedown={() => isSeeking = true}
          on:mouseup={() => {
            isSeeking = false;
            audio.currentTime = currentTime;
          }}
          on:touchstart={() => isSeeking = true}
          on:touchend={() => {
            isSeeking = false;
            audio.currentTime = currentTime;
          }}
        />
        <div class="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <div class="buttons">
          <button>⏮</button>
          <button on:click={togglePlay}>{isPlaying ? '⏸' : '▶'}</button>
          <button>⏭</button>
        </div>
      </div>

      <div class="volume">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          on:input={onVolumeChange}
          class=volume-vertical
        />
      </div>
    </div>
  </div>
{/if}

<style>
  .full-player {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--bg);
    color: var(--text);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem 2rem 0;
    box-sizing: border-box;
    z-index: 999;
    justify-content: space-between;
  }

  .collapse-btn {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    background: var(--bg-accent);
    border: none;
    color: var(--fg-main);
    font-size: 1.4rem;
    padding: 0.5rem 0.9rem;
    border-radius: 9999px;
    cursor: pointer;
    z-index: 1001;
  }

  .large-cover {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }

  .player-controls-bar {
    width: 100%;
    background-color: var(--bg-accent);
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    box-sizing: border-box;
  }

  .progress-group {
    flex-grow: 2;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .progress {
    width: 100%;
    accent-color: var(--fg-main);
  }

  .time-display {
    font-size: 0.85rem;
    color: var(--text);
    text-align: center;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .buttons button {
    background-color: var(--fg-main);
    border: none;
    color: var(--bg-accent);
    font-size: 1.5rem;
    padding: 0.6rem 1.2rem;
    border-radius: 9999px;
    cursor: pointer;
  }

  .volume input[type='range'] {
    width: 120px;
    accent-color: var(--fg-main);
  }
  
  .volume-vertical {
    width: 150px;
    height: 50px;
    writing-mode: vertical-lr;
    transform: rotate(180deg); 
  }
</style>
