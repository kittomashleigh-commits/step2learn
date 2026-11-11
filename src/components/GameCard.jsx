import React from 'react';
import { Play, Star, Sparkles, Terminal } from 'lucide-react';

export const GameCard = ({
  game,
  onPlay,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <article
      onClick={() => onPlay(game)}
      className="group relative flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-xs"
    >
      <div>
        {/* Top visual graphic / banner */}
        <div
          className="relative w-full h-36 rounded-lg mb-4 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]"
          style={{
            background: `linear-gradient(135deg, ${game.color}22 0%, ${game.color}11 50%, #020617 100%)`,
            border: `1px solid ${game.color}33`,
          }}
        >
          {/* Subtle ambient geometry graphic */}
          <div
            className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full blur-2xl opacity-40 pointer-events-none"
            style={{ backgroundColor: game.color }}
          />

          <div className="relative flex flex-col items-center gap-2 text-center p-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: game.color, color: '#0f172a' }}
            >
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            </div>
            <span className="text-xs font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200">
              {game.title}
            </span>
          </div>

          {/* Quick Play overlay button on hover */}
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
            <span className="px-4 py-2 bg-white text-slate-950 font-semibold text-xs rounded-lg shadow-lg flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
              <Play className="w-3.5 h-3.5 fill-current" />
              Launch Iframe
            </span>
          </div>

          {/* Top-Right Favorite Button */}
          <button
            onClick={(e) => onToggleFavorite(game.id, e)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-black/40 hover:bg-black/60 text-slate-300 hover:text-amber-400 transition-colors z-10"
          >
            <Star
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
              }`}
            />
          </button>

          {game.featured && (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-black/50 px-2 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Featured</span>
            </div>
          )}

          {game.custom && (
            <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-black/60 px-1.5 py-0.5 rounded">
              <Terminal className="w-2.5 h-2.5" />
              <span>Custom Iframe</span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
          {game.title}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
          {game.description}
        </p>
      </div>

      {/* Unboxed Metadata Footer with typographic separators */}
      <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="text-slate-700 dark:text-slate-300">{game.category}</span>
          <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
          <span className="font-mono tabular-nums">★ {Number(game.rating).toFixed(1)}</span>
        </div>

        <span className="font-mono tabular-nums text-slate-400 dark:text-slate-500">
          {(game.plays / 1000).toFixed(1)}k plays
        </span>
      </div>
    </article>
  );
};
