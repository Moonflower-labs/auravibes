import { useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import Waveform from './waveform';

interface AudioPlayerProps {
    src: string;
    id: string; // Added id prop to the interface
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
    onEnded: () => void;
    setProgress: (progress: number) => void;
    moodStyle: string;
    waveform?: number[]; // Optional waveform prop
    progress?: number; // Optional progress prop
}

const AudioPlayer = ({ id, src, isPlaying, onPlay, onPause, progress, setProgress, onEnded, moodStyle, waveform }: AudioPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    // const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch((error) => console.error('Error playing audio:', error));
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            setProgress((currentTime / duration) * 100);
        }
    };

    const handleStop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setProgress(0);
        }
    };

    return (
        <div className="w-full mt-auto flex flex-col items-center gap-2">

            <Waveform
                progress={progress!}
                waveform={{ peaks: waveform as number[] }}
            />
            <audio
                ref={audioRef}
                id={id}
                src={src}
                onPlay={onPlay}
                onPause={onPause}
                onEnded={onEnded}
                onTimeUpdate={handleTimeUpdate}
            />
            <div className="flex justify-center gap-4 mt-2">
                <button
                    onClick={() => (isPlaying ? audioRef.current?.pause() : audioRef.current?.play())}
                    className={`p-3 rounded-full shadow-md transition-all duration-300 ${moodStyle} hover:scale-110`}
                >
                    {isPlaying ? <FaPause className="text-white text-xl" /> : <FaPlay className="text-white text-xl" />}
                </button>
                <button
                    onClick={handleStop}
                    className={`p-3 rounded-full shadow-md transition-all duration-300 ${moodStyle} hover:scale-110`}
                >
                    <FaStop className="text-white text-xl" />
                </button>
            </div>
            <div className="text-zinc-500 text-sm mt-2">
                {audioRef.current && audioRef.current.duration ? (
                    `${Math.floor(audioRef.current.currentTime / 60)}:${Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0')} / ${Math.floor(audioRef.current.duration / 60)}:${Math.floor(audioRef.current.duration % 60).toString().padStart(2, '0')}`
                ) : (
                    '0:00 / 0:00'
                )}
            </div>
        </div>
    );
};

export default AudioPlayer;