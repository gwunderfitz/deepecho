<script>
  const STORAGE_KEY = 'deepecho_moods';

  // Load from localStorage
  let moods = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    'Crushing plates mad',
    'Walking on Sunshine',
    'Cry Yourself to Sleep',
    'Rainy weather',
    'Spooky vibes',
    'Chill Studying'
  ];

  let newMood = '';

  function addMood() {
    const trimmed = newMood.trim();
    if (trimmed && !moods.includes(trimmed)) {
      moods = [...moods, trimmed];
      newMood = '';
      saveMoods();
    }
  }

  function deleteMood(index) {
    moods = moods.filter((_, i) => i !== index);
    saveMoods();
  }

  function saveMoods() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(moods));
  }
</script>

<div class="page">
  <h1>Mood Management</h1>
  <p class="subheading">Edit/delete your existing mood tags</p>

  <ul class="mood-list">
    {#each moods as mood, i}
      <li>
        <span>{mood}</span>
        <button on:click={() => deleteMood(i)}>×</button>
      </li>
    {/each}
  </ul>

  <div class="add">
    <label for="moodInput">New Mood Name</label>
    <input
      id="moodInput"
      bind:value={newMood}
      placeholder="e.g. Rainy weather"
      on:keydown={(e) => e.key === 'Enter' && addMood()}
    />
    <button on:click={addMood}>Add Mood</button>
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

  .mood-list {
    list-style: none;
    padding-left: 0;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

    .mood-list li {
    background-color: var(--bg-accent);
    color: var(--fg-main);
    padding: 0.6rem 1rem;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

    .mood-list button {
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
