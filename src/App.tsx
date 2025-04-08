import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Header from '../components/header';
import Footer from '../components/footer';
import { fetchSongs, Track } from './utils';

const moods = ['chill', 'hype', 'gloomy', 'happy', 'anger'] as const;

const moodStyles = {
  chill: { color: "bg-blue-500", btn: "bg-blue-800 text-sky-200", header: "bg-gradient-to-r from-blue-600 to-sky-400", card: "bg-blue-100" },
  hype: { color: "bg-red-500", btn: "bg-red-800 text-pink-200", header: "bg-gradient-to-r from-red-600 to-red-400", card: "bg-red-100" },
  gloomy: { color: "bg-purple-500", btn: "bg-purple-800 text-pink-200", header: "bg-gradient-to-r from-purple-600 to-purple-400", card: "bg-purple-200" },
  happy: { color: "bg-pink-500", btn: "bg-pink-800 text-pink-200", header: "bg-gradient-to-r from-pink-600 to-pink-400", card: "bg-pink-100" },
  anger: { color: "bg-yellow-300", btn: "bg-yellow-700 text-yellow-100", header: "bg-gradient-to-r from-yellow-600 to-yeellow-400", card: "bg-yellow-100" },
}

function App() {
  const [mood, setMood] = useState<typeof moods[number] | null>(null);
  const [tracks, setTracks] = useState([]);


  useEffect(() => {
    if (mood) {
      // Fetch songs based on the selected mood
      fetchSongs(mood)
        .then((data) => {
          setTracks(data as never);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [mood]);

  return (
    <div className={`${moodStyles[mood || 'chill']?.color} transition-all duration-300 min-h-screen ${!mood ? 'flex' : ""} flex-col items-center justify-center`}>
      <Header style={moodStyles[mood || 'chill']?.header} />
      <h1 className='text-4xl text-center py-3 text-white/70'>Mood Playlist Curator</h1>
      {!mood && (
        <div>What's your mood today?</div>
      )}
      <div className='flex flex-wrap gap-4 justify-center p-6'>
        {moods.map(m => (
          <motion.button key={m} onClick={() => setMood(m)} whileHover={{ scale: 1.1 }} className={`${moodStyles[mood || 'chill']?.btn} px-4 py-2 rounded-md cursor-pointer ${mood === m ? 'border-2 border-white/75' : ''} transition-all duration-300`}>
            {m}
          </motion.button>
        ))}
      </div>
      <section>
        {tracks.length > 0 && (
          <div className="grid gap-4 justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-6">
            {tracks.map((track: Track) => (
              <div
                key={track.id}
                className={`flex flex-col items-center p-4 rounded-lg shadow w-96 h-[26rem] overflow-hidden mx-auto ${moodStyles[mood || 'chill']?.card} transition-all duration-300`}
              >
                <img
                  src={track.album_image}
                  alt={track.album_name}
                  className="w-32 h-32 rounded my-6 object-cover"
                />
                <h2 className="text-xl font-bold truncate w-full text-center">
                  {track.album_name}
                </h2>
                <p className="text-gray-600 truncate w-full text-center">{track.album}</p>
                <p className="text-gray-600 truncate w-full text-center">
                  {track.artist_name}
                </p>
                <p className="truncate w-full text-center">{track.name}</p>
                <audio controls src={track.audio} className="w-full mt-auto" />
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default App;


