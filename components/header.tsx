import auraLogo from "../src/assets/aura-logo.png"
interface HeaderProps {
    style?: string;
}

export default function Header({ style }: HeaderProps) {
    return (
        <header className={`flex items-center justify-center p-2 rounded-md text-white/80 ${style} transition-all duration-300`}>
            <img src={auraLogo} alt="logo" className='w-20 animate-pulse' />
            <div className='text-4xl font-bold'>AuraVibes</div>
        </header>
    )
}
