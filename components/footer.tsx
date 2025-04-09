
export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="p-4 text-white/80 backdrop-blur-md transition-all duration-300">
            <a target="__blank" href="https://moonflowerlabs.vercel.app" className='text-xl font-semibold'>&copy; Moonflower Labs {year}</a>
        </footer>
    )
}
