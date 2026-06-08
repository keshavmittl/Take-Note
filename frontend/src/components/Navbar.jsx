import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { PlusIcon, SunIcon, MoonIcon } from "lucide-react";
import { SearchIcon } from "lucide-react";
const Navbar = ({searchTerm, setSearchTerm}) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-content/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-primary tracking-tight">
          TakeNote
        </Link>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/50" />

            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-64 pl-10"
            />
          </div>

          <Link to="/create" className="btn btn-primary">
            <PlusIcon className="size-5" />
            <span>New Note</span>
          </Link>

          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === "night" ? (
              <SunIcon className="size-5" />
            ) : (
              <MoonIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
