import { RiCheckboxCircleLine, RiGithubLine } from "react-icons/ri";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6 px-4 sm:px-0 animate-fade-in">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
          <RiCheckboxCircleLine className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
            TodoFlow
          </h1>
          <p className="text-xs text-gray-600">Organize · Focus · Achieve</p>
        </div>
      </div>

      {/* Badge */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        id="github-link"
        className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-gray-200 transition-all duration-200 hover:border-white/20"
      >
        <RiGithubLine className="text-base" />
        <span className="hidden sm:block">MERN Stack</span>
      </a>
    </header>
  );
}
