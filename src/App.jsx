import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Star,
  Gamepad2,
  FileCode2,
  HelpCircle,
  Plus,
  RefreshCw,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { INITIAL_GAMES } from './data/initialGames.js';
import { TopNav } from './components/TopNav.jsx';
import { HeroFeatured } from './components/HeroFeatured.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayerModal } from './components/GamePlayerModal.jsx';
import { JsonManagerModal } from './components/JsonManagerModal.jsx';
import { CloakModal } from './components/CloakModal.jsx';
import { PanicDisguise } from './components/PanicDisguise.jsx';
import { DEFAULT_CLOAK_CONFIG, applyCloak } from './utils/cloak.js';

export default function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [dismissFeatured, setDismissFeatured] = useState(() => {
    return localStorage.getItem('nova_dismiss_featured') === 'true';
  });

  // Active game playing in modal
  const [activeGame, setActiveGame] = useState(null);

  // Modals
  const [showJsonManager, setShowJsonManager] = useState(false);
  const [showCloakModal, setShowCloakModal] = useState(false);

  // Panic disguise
  const [isPanicked, setIsPanicked] = useState(false);

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cloak Config
  const [cloakConfig, setCloakConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_cloak_config');
      return saved ? JSON.parse(saved) : DEFAULT_CLOAK_CONFIG;
    } catch {
      return DEFAULT_CLOAK_CONFIG;
    }
  });

  // Dark / Light Theme
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('nova_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Load games from public/games.json or localStorage
  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const localData = localStorage.getItem('nova_games_store');
        if (localData) {
          const parsed = JSON.parse(localData);
          const cleaned = parsed.map((g) => ({
            ...g,
            description: (g.description || '').replace(/\bvs AI\b/gi, 'vs CPU'),
          }));
          setGames(cleaned);
          setLoading(false);
          return;
        }

        const jsonUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/games.json`;
        const res = await fetch(jsonUrl);
        if (res.ok) {
          const data = await res.json();
          setGames(data);
          localStorage.setItem('nova_games_store', JSON.stringify(data));
        } else {
          setGames(INITIAL_GAMES);
          localStorage.setItem('nova_games_store', JSON.stringify(INITIAL_GAMES));
        }
      } catch (err) {
        setGames(INITIAL_GAMES);
        localStorage.setItem('nova_games_store', JSON.stringify(INITIAL_GAMES));
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Sync theme to documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nova_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nova_theme', 'light');
    }
  }, [isDark]);

  // Apply tab cloak
  useEffect(() => {
    applyCloak(cloakConfig);
    localStorage.setItem('nova_cloak_config', JSON.stringify(cloakConfig));
  }, [cloakConfig]);

  // Emergency Panic Key Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === cloakConfig.panicKey || e.code === cloakConfig.panicKey) {
        // Trigger panic
        if (cloakConfig.panicAction === 'redirect') {
          window.location.href = cloakConfig.panicRedirectUrl || 'https://classroom.google.com';
        } else {
          setIsPanicked((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cloakConfig]);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('nova_favorites', JSON.stringify(next));
      return next;
    });
  };

  const handleAddGame = (newGame) => {
    const updated = [newGame, ...games];
    setGames(updated);
    localStorage.setItem('nova_games_store', JSON.stringify(updated));
  };

  const handleDeleteGame = (id) => {
    const updated = games.filter((g) => g.id !== id);
    setGames(updated);
    localStorage.setItem('nova_games_store', JSON.stringify(updated));
    if (activeGame?.id === id) setActiveGame(null);
  };

  const handleImportJson = (imported) => {
    setGames(imported);
    localStorage.setItem('nova_games_store', JSON.stringify(imported));
  };

  const handleResetToDefault = async () => {
    try {
      const jsonUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/games.json`;
      const res = await fetch(jsonUrl);
      if (res.ok) {
        const data = await res.json();
        setGames(data);
        localStorage.setItem('nova_games_store', JSON.stringify(data));
      } else {
        setGames(INITIAL_GAMES);
        localStorage.setItem('nova_games_store', JSON.stringify(INITIAL_GAMES));
      }
    } catch {
      setGames(INITIAL_GAMES);
      localStorage.setItem('nova_games_store', JSON.stringify(INITIAL_GAMES));
    }
  };

  // Filtered games
  const categories = ['All', 'Arcade', 'Action', 'Puzzle', 'Retro', 'Casual', 'Sports'];

  const filteredGames = useMemo(() => {
    let result = [...games];

    // Navigation tab filter
    if (activeTab === 'favorites') {
      result = result.filter((g) => favorites.includes(g.id));
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((g) => g.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          (g.tags && g.tags.some((t) => t.toLowerCase().includes(q))) ||
          g.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'popular') return b.plays - a.plays;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'alpha') return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [games, activeTab, selectedCategory, searchQuery, sortBy, favorites]);

  // Top featured game for the hero banner
  const heroGame = useMemo(() => {
    return games.find((g) => g.featured) || games[0] || null;
  }, [games]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Tab Navigation following Top Bar Contract */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={(t) => {
          setActiveTab(t);
          if (t === 'categories') setSelectedCategory('Arcade');
          else if (t === 'all') setSelectedCategory('All');
        }}
        favoritesCount={favorites.length}
        onOpenJsonManager={() => setShowJsonManager(true)}
        onOpenCloakModal={() => setShowCloakModal(true)}
        onTriggerPanic={() => setIsPanicked(true)}
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Spotlight Featured Game */}
        {!dismissFeatured && heroGame && activeTab === 'all' && !searchQuery && (
          <HeroFeatured
            game={heroGame}
            onPlay={(g) => setActiveGame(g)}
            isFavorite={favorites.includes(heroGame.id)}
            onToggleFavorite={toggleFavorite}
            onDismiss={() => {
              setDismissFeatured(true);
              localStorage.setItem('nova_dismiss_featured', 'true');
            }}
          />
        )}

        {/* Filter, Search & Segmented Controls Bar */}
        <section className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games, categories, or keywords..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & Quick Add buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl shadow-2xs">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-slate-800 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer text-xs"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="alpha">A to Z</option>
                </select>
              </div>

              <button
                onClick={() => setShowJsonManager(true)}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Iframe</span>
              </button>
            </div>
          </div>

          {/* Functional Category Segmented Filter Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Section Header with unboxed counter */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {activeTab === 'favorites'
                ? 'Your Saved Games'
                : selectedCategory === 'All'
                ? 'All Unblocked Games'
                : `${selectedCategory} Collection`}
            </h2>
            <span className="text-xs text-slate-400 font-mono tabular-nums">
              ({filteredGames.length})
            </span>
          </div>

          {/* Quick indicator */}
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            Each game loads in a sandboxed iframe via games.json
          </span>
        </div>

        {/* Games Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin mb-3 text-indigo-500" />
            <p className="text-sm">Loading games repository from JSON...</p>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center p-8 bg-white/50 dark:bg-slate-900/40">
            <Gamepad2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              No matching games found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              {activeTab === 'favorites'
                ? 'You haven’t added any games to your favorites yet. Click the star icon on any card to save it.'
                : 'Try adjusting your search query, or add a custom game to the JSON database.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setActiveTab('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onPlay={(g) => setActiveGame(g)}
                isFavorite={favorites.includes(game.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {/* Informative Repository Footnote */}
        <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-indigo-500" />
            <span>Database: /public/games.json · 100% Ad-Free (Zero Popups or Interstitials)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowJsonManager(true)}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Edit Raw JSON
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setShowCloakModal(true)}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Configure Panic Cloak
            </button>
          </div>
        </section>
      </main>

      {/* Interactive Game Player Modal */}
      {activeGame && (
        <GamePlayerModal
          game={activeGame}
          onClose={() => setActiveGame(null)}
          isFavorite={favorites.includes(activeGame.id)}
          onToggleFavorite={toggleFavorite}
          onSelectGame={(g) => setActiveGame(g)}
          allGames={games}
          onTriggerPanic={() => setIsPanicked(true)}
        />
      )}

      {/* JSON Repository Manager Modal */}
      {showJsonManager && (
        <JsonManagerModal
          games={games}
          onClose={() => setShowJsonManager(false)}
          onAddGame={handleAddGame}
          onDeleteGame={handleDeleteGame}
          onImportJson={handleImportJson}
          onResetToDefault={handleResetToDefault}
        />
      )}

      {/* Tab Cloaker Settings Modal */}
      {showCloakModal && (
        <CloakModal
          config={cloakConfig}
          onClose={() => setShowCloakModal(false)}
          onSaveConfig={(conf) => setCloakConfig(conf)}
        />
      )}

      {/* Emergency School Homework Disguise Screen */}
      {isPanicked && <PanicDisguise onDismiss={() => setIsPanicked(false)} />}
    </div>
  );
}
