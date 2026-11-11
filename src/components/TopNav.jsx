import React from 'react';
import { ShieldAlert, Sun, Moon } from 'lucide-react';

export const TopNav = ({
  activeTab,
  setActiveTab,
  favoritesCount,
  onOpenJsonManager,
  onOpenCloakModal,
  onTriggerPanic,
  isDark,
  toggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => setActiveTab('all')}
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
        >
          Nova Arcade
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          <button
            onClick={() => setActiveTab('all')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'all' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            All Games
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'categories' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeTab === 'favorites' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Favorites {favoritesCount > 0 && `(${favoritesCount})`}
          </button>
          <button
            onClick={onOpenJsonManager}
            className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            JSON Store
          </button>
          <button
            onClick={onOpenCloakModal}
            className="whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            Tab Cloaker
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-lg border border-slate-200 dark:border-slate-800"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onTriggerPanic}
            title="Emergency Panic Cloak (Shortcut: Escape)"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors whitespace-nowrap shrink-0"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Panic [Esc]</span>
          </button>
        </div>
      </div>
    </header>
  );
};
