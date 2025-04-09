import { motion } from 'motion/react';

interface WaveformProps {
    waveform: { peaks: number[] };
    progress: number; // 0 to 100
}

const Waveform = ({ waveform, progress }: WaveformProps) => {
    const waveformData = Array.isArray(waveform.peaks) && waveform.peaks.length > 0
        ? waveform.peaks
        : Array(960).fill(50);

    const pathData = waveformData.map((peak, i) => `${i},${100 - peak}`).join(' ');
    const viewBoxWidth = waveformData.length;

    return (
        <div className="relative w-[70%] h-8 my-2 mx-auto">
            <svg
                width="100%"
                height="32px"
                viewBox={`0 0 ${viewBoxWidth} 100`}
                preserveAspectRatio="none"
                className="bg-slate-400/40 p-1 rounded"
            >
                <path
                    d={`M 0,100 L ${pathData}`}
                    stroke="#666"
                    strokeWidth="1"
                    fill="none"
                />
                <motion.path
                    d={`M 0,100 L ${pathData}`}
                    stroke="purple"
                    strokeWidth="2"
                    fill="none"
                    animate={{ pathLength: progress / 100 }}
                    transition={{ duration: 0, ease: 'linear' }} // Instant update
                />
            </svg>
            <motion.div
                className="absolute top-0 left-0 h-full bg-green-200/20 rounded"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0, ease: 'linear' }} // Instant update
            />
        </div>
    );
};

export default Waveform;