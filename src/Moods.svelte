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
  let editingIndex = null;
  let editingText = '';

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

  function editMood(index) {
    editingIndex = index;
    editingText = moods[index];
     setTimeout(() => {
        const input = document.getElementById(`mood-input-${index}`);
        input?.focus();
     });
  }

  function saveEdit(index) {
    const trimmed = editingText.trim();
    if (trimmed) {
      moods[index] = trimmed;
      saveMoods();
    }
    editingIndex = null;
    editingText = '';
  }

  function saveMoods() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(moods));
  }
</script>

<div class="page">
  <h1>Mood Management</h1>

  <div class="mood">
    <input
            id="moodInput"
            bind:value={newMood}
            placeholder="e.g. Rainy weather"
            on:keydown={(e) => e.key === 'Enter' && addMood()}
    />
    <button on:click={addMood}>➕</button>
  </div>
  <p class="subheading">Edit/delete your existing mood tags</p>
  <ul class="mood-list">
  {#each moods as mood, i}
    <li class="mood">
      {#if editingIndex === i}
        <input
          id={"mood-input-" + i}
          bind:value={editingText}
          on:keydown={(e) => e.key === 'Enter' && saveEdit(i)}
          on:blur={() => saveEdit(i)}
        />
      {:else}
        <span>{mood}</span>
      {/if}
        <button  on:click={() => editMood(i)}>✏️</button>
        <button on:click={() => deleteMood(i)}>➖</button>
      </li>
    {/each}
  </ul>
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

  .mood {
    background-color: white;
    color: black;
    padding: 0.6rem 1rem;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2em;
  }

  .mood button {
    background: none;
    border: none;
    color: var(--error);
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
  }

  .mood input {
      border: none;
      height: 100%;
  }

  .mood *:first-child {
    flex-grow: 1;
  }
</style>
