import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from '../components/header';
import Footer from '../components/footer';
import TrackCard from '../components/trackcard';
// import Waveform from '../components/waveform';
import { fetchSongs, type Track } from './utils';

const moods = ['chill', 'hype', 'gloomy', 'happy', 'anger', 'sad'] as const;

const moodStyles = {
  chill: { color: "bg-blue-500", btn: "bg-blue-800 text-sky-200", header: "bg-blue-600", card: "bg-blue-100" },
  hype: { color: "bg-red-500", btn: "bg-red-800 text-pink-200", header: "bg-red-600", card: "bg-red-100" },
  gloomy: { color: "bg-purple-500", btn: "bg-purple-800 text-pink-200", header: "bg-purple-600", card: "bg-purple-200" },
  happy: { color: "bg-pink-500", btn: "bg-pink-800 text-pink-200", header: "bg-pink-600", card: "bg-pink-100" },
  anger: { color: "bg-yellow-300", btn: "bg-yellow-500 text-yellow-100", header: "bg-yellow-500", card: "bg-yellow-100" },
  sad: { color: "bg-zinc-300", btn: "bg-zinc-500 text-zinc-100", header: "bg-zinc-500", card: "bg-zinc-100" },
};

function App() {
  const [mood, setMood] = useState<typeof moods[number] | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  useEffect(() => {
    if (mood) {
      fetchSongs(mood)
        .then((data) => setTracks(data as Track[]))
        .catch((error) => console.error(error));
    }
  }, [mood]);

  const playTrack = (trackId: string) => {
    if (playingTrackId && playingTrackId !== trackId) {
      const prevAudio = document.getElementById(playingTrackId) as HTMLAudioElement;
      if (prevAudio) {
        prevAudio.pause();
        prevAudio.currentTime = 0; // Reset the previous track
      }
    }
    const newAudio = document.getElementById(trackId) as HTMLAudioElement;
    if (newAudio) {
      setPlayingTrackId(trackId);
      setTimeout(() => newAudio.play(), 0); // Delay to ensure the audio is ready
    } else {
      console.error('Audio element not found for trackId:', trackId);
    }
  };

  useEffect(() => {
    if (playingTrackId) {
      const audioElement = document.getElementById(playingTrackId) as HTMLAudioElement;
      if (audioElement) {
        audioElement.play().catch((error) => console.error('Error auto-playing audio:', error));
      }
    }
  }, [playingTrackId]);

  const stopTrack = () => setPlayingTrackId(null);

  const currentMood = mood || 'chill';
  const styles = moodStyles[currentMood];

  return (
    <div
      className={`${styles.color} transition-all duration-300 ease-in-out min-h-screen flex flex-col gap-2 items-center justify-center`}
    >
      {/* Main content with flex-grow to push Footer */}
      <div className="flex-grow w-full flex flex-col items-center gap-2">
        <Header className={styles.header} />
        <h1 className="text-4xl text-center py-3 text-white/70">Mood Playlist Curator</h1>
        {!mood && <div>What's your mood today?</div>}
        <div className="flex flex-wrap gap-4 justify-center p-6">
          {moods.map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`${styles.btn} px-4 py-2 w-26 rounded-md cursor-pointer hover:scale-110 ${mood === m ? 'border-2 border-white/75' : ''} transition-all duration-300`}
            >
              {m}
            </button>
          ))}
        </div>
        <section className="flex-grow w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {tracks.length > 0 && (
              <motion.div
                key={mood}
                className="grid gap-4 justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-6 mx-4"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
              >
                {tracks.map((track) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    moodStyles={moodStyles}
                    currentMood={currentMood}
                    isPlaying={playingTrackId === track.id}
                    playTrack={playTrack}
                    stopTrack={stopTrack}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;