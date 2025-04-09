import auraLogo from "../src/assets/aura-logo.png";

interface HeaderProps {
    className?: string;
}

export default function Header({ className }: HeaderProps) {
    return (
        <header className={`flex items-center justify-center gap-4 p-2 px-4 mt-3 rounded-xl text-white/80 ${className} transition-all duration-300 ease-in-out`}>
            <img src={auraLogo} alt="logo" className="w-20 animate-pulse" />
            <div className="text-4xl font-bold">AuraVibes</div>
        </header>
    );
}