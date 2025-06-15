import { currentSong, currentPlaylist, currentIndex } from './stores/playback.js';

export const audio = new Audio();

currentSong.subscribe((songName) => {
  if (!songName) return;

  const songModules = import.meta.glob('/public/music/*.mp3', { as: 'url' });
  const allSongs = Object.entries(songModules).map(([path, url]) => ({
    name: path.split('/').pop().split('.')[0],
    url,
  }));

  const match = allSongs.find(s => s.name === songName);
  if (match) {
    audio.src = match.url;
    audio.play();
  }
});

audio.addEventListener('ended', () => {
  let playlist;
  let index;

  currentPlaylist.subscribe(p => playlist = p)();
  currentIndex.subscribe(i => index = i)();

  if (playlist && playlist.length > 0) {
    const nextIndex = (index + 1) % playlist.length;
    currentIndex.set(nextIndex);
    currentSong.set(playlist[nextIndex]);
  }
});
