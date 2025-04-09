import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import type { Track } from '../src/utils';
import AudioPlayer from './AudioPlayer';

interface TrackCardProps {
    track: Track;
    moodStyles: Record<string, { card: string, header: string }>;
    currentMood: string;
    isPlaying: boolean;
    playTrack: (trackId: string) => void;
    stopTrack: () => void;
}

const TrackCard = ({ track, moodStyles, currentMood, isPlaying, playTrack, stopTrack }: TrackCardProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);
    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play();
            const interval = setInterval(() => {
                const current = audioRef.current?.currentTime || 0;
                const duration = audioRef.current?.duration || 30;
                setProgress((current / duration) * 100);
            }, 100); // 100ms updates
            return () => clearInterval(interval);
        } else {
            audioRef.current?.pause();
            setProgress(0);
        }
    }, [isPlaying]);

    const handlePlay = () => playTrack(track.id as string);
    const handlePause = () => stopTrack();

    console.log('Track waveform:', track.waveform); // Debugging log for waveform data

    return (
        <motion.div
            className={`flex flex-col items-center p-4 rounded-lg shadow-lg w-full md:w-96 h-[26rem] overflow-hidden mx-auto ${moodStyles[currentMood].card} transition-all duration-300`}
            variants={{
                hidden: { opacity: 0, scale: 0.9, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
            }}
        >
            <img src={track.album_image} alt={track.album_name} className="w-32 h-32 rounded my-6 object-cover" />
            <h2 className="text-xl font-bold truncate w-full text-center">{track.album_name}</h2>
            <p className="text-gray-600 truncate w-full text-center">{track.album}</p>
            <p className="text-gray-600 truncate w-full text-center">{track.artist_name}</p>
            <p className="truncate w-full text-center">{track.name}</p>

            <AudioPlayer
                progress={progress}
                setProgress={setProgress}
                src={track.audio!}
                id={track.id as string}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handlePause}
                moodStyle={moodStyles[currentMood].header}
                waveform={JSON.parse(track.waveform || '{"peaks": []}').peaks as number[]}
            />
        </motion.div>
    );
};

export default TrackCard;