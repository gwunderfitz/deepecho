<script>
  let yourPlaylists = [
    'Crushing Plates', 'Sad Vibes', 'Chill Night', 'Study Flow'
  ];

  let trendingPlaylists = [
    'Emo Summer', 'Techno Vortex', 'Spooky Season', 'Y2K Nostalgia'
  ];
</script>

<div class="home-page">
  <input type="text" placeholder="Search for something..." class="search" />

  <h2>Your Top Playlists</h2>
  <div class="carousel">
    {#each yourPlaylists as item}
      <div class="card">{item}</div>
    {/each}
  </div>

  <h2>What others listen to</h2>
  <div class="carousel">
    {#each trendingPlaylists as item}
      <div class="card">{item}</div>
    {/each}
  </div>
</div>

<style>
  .home-page {
    padding: 2rem;
  }

  .search {
    width: 100%;
    padding: 0.7rem;
    margin-bottom: 2rem;
    border-radius: 8px;
    border: none;
    background-color: white;
    color: black;
  }

  h2 {
    color: var(--highlight);
    font-family: var(--font-title);
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .carousel {
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .card {
    min-width: 160px;
    background-color: var(--bg-accent);
    color: var(--fg-main);
    padding: 1rem;
    border-radius: 10px;
    font-weight: bold;
  }
</style>