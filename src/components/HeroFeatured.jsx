import React from 'react';
import { Play, Star, ShieldCheck, Sparkles, X } from 'lucide-react';

export const HeroFeatured = ({
  game,
  onPlay,
  isFavorite,
  onToggleFavorite,
  onDismiss,
}) => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm mb-10">
      {/* Ambient gradient mesh */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: game.color }}
      />
      <div className="absolute -left-12 -bottom-12 w-80 h-80 rounded-full blur-3xl opacity-10 bg-indigo-500 pointer-events-none" />

      {/* Dismiss button */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          title="Hide banner"
          className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <div className="relative p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Details */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Pick · Ad-Free</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            {game.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-6">
            {game.description}
          </p>

          {/* Clean Unboxed Metadata line */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
            <span className="font-medium text-slate-700 dark:text-slate-300">{game.category}</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span className="font-mono tabular-nums">★ {Number(game.rating).toFixed(1)} rating</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span className="font-mono tabular-nums">{game.plays.toLocaleString()} plays</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
            <span>JSON Iframe Embed</span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onPlay(game)}
              className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 shrink-0"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play Now in Theater</span>
            </button>

            <button
              onClick={(e) => onToggleFavorite(game.id, e)}
              className="px-4 py-2.5 text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-2"
            >
              <Star
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'
                }`}
              />
              <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Preview Canvas */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            onClick={() => onPlay(game)}
            className="group relative w-full max-w-sm aspect-4/3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:border-indigo-500/50 transition-all"
            style={{
              background: `radial-gradient(circle at center, ${game.color}25 0%, #030712 85%)`
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-slate-950 shadow-xl group-hover:scale-110 transition-transform duration-200"
              style={{ backgroundColor: game.color }}
            >
              <Play className="w-8 h-8 fill-current translate-x-0.5" />
            </div>

            <span className="mt-3 text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
              Click to Open Iframe
            </span>

            <div className="absolute bottom-3 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Sandbox · Offline Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
