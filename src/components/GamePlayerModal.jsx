import React, { useState, useRef, useEffect } from 'react';
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  Star,
  X,
  Code,
  Share2,
  Tv,
  Check,
  Info,
  ShieldAlert,
} from 'lucide-react';

export const GamePlayerModal = ({
  game,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectGame,
  allGames,
  onTriggerPanic,
}) => {
  const [isTheater, setIsTheater] = useState(false);
  const [aspect, setAspect] = useState('auto');
  const [copied, setCopied] = useState(false);
  const [showJsonSnippet, setShowJsonSnippet] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (game?.aspectRatio) {
      setAspect(game.aspectRatio);
    } else {
      setAspect('auto');
    }
  }, [game]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!game) return null;

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  const copyEmbedJson = () => {
    const snippet = JSON.stringify(game, null, 2);
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Other recommendations
  const relatedGames = (allGames || []).filter((g) => g.id !== game.id).slice(0, 4);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-start p-2 sm:p-4 md:p-6"
    >
      <div
        className={`w-full transition-all duration-300 ${
          isTheater ? 'max-w-6xl' : 'max-w-4xl'
        } bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto`}
      >
        {/* Top Control Bar */}
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {game.title}
            </h2>
            <span className="hidden sm:inline-block text-xs text-slate-500 dark:text-slate-400">
              {game.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Panic Button */}
            <button
              onClick={onTriggerPanic}
              title="Emergency Disguise (Escape)"
              className="px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg flex items-center gap-1 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Panic</span>
            </button>

            {/* Favorite */}
            <button
              onClick={(e) => onToggleFavorite(game.id, e)}
              className="p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:text-amber-400 dark:hover:text-amber-400 transition-colors rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800"
              title="Add to Favorites"
            >
              <Star
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-amber-400 text-amber-400' : ''
                }`}
              />
            </button>

            {/* Theater Mode */}
            <button
              onClick={() => setIsTheater(!isTheater)}
              className={`p-1.5 sm:p-2 transition-colors rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 ${
                isTheater
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
              title="Theater Mode"
            >
              <Tv className="w-4 h-4" />
            </button>

            {/* Reload */}
            <button
              onClick={handleReload}
              className="p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800"
              title="Restart Game"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800"
              title="Fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 ml-1"
              title="Close Player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Iframe Viewport Container */}
        <div
          ref={containerRef}
          className="relative w-full bg-slate-950 flex items-center justify-center overflow-hidden"
          style={{
            height: isFullscreen
              ? '100vh'
              : isTheater
              ? '72vh'
              : '540px',
            maxHeight: isFullscreen ? 'none' : '82vh',
          }}
        >
          <iframe
            key={iframeKey}
            src={game.iframeSrc}
            title={game.title}
            className="w-full h-full border-0 select-none"
            allow="autoplay; fullscreen; keyboard; gamepad"
            sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock"
          />
        </div>

        {/* Bottom Details & Controls Info */}
        <div className="p-4 sm:p-6 bg-white dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span>{game.category}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">★ {Number(game.rating).toFixed(1)}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{game.plays.toLocaleString()} plays</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Unblocked</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {game.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowJsonSnippet(!showJsonSnippet)}
                className="px-3 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Code className="w-3.5 h-3.5 text-indigo-500" />
                <span>{showJsonSnippet ? 'Hide JSON' : 'Iframe JSON'}</span>
              </button>

              <button
                onClick={copyEmbedJson}
                className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied JSON!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* Controls legend */}
          <div className="pt-4 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
            <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">How to Play: </span>
              <span>{game.controls}</span>
            </div>
          </div>

          {/* Collapsible JSON Record Snippet */}
          {showJsonSnippet && (
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono overflow-x-auto">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800 text-slate-400">
                <span>Stored Record in games.json</span>
                <button
                  onClick={copyEmbedJson}
                  className="hover:text-white transition-colors"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="text-emerald-400">{JSON.stringify(game, null, 2)}</pre>
            </div>
          )}

          {/* Recommended Row */}
          {relatedGames.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-3">
                More Unblocked Games
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedGames.map((rg) => (
                  <button
                    key={rg.id}
                    onClick={() => onSelectGame(rg)}
                    className="p-3 text-left rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all text-xs"
                  >
                    <div className="font-bold text-slate-900 dark:text-white truncate">
                      {rg.title}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                      {rg.category} · ★ {rg.rating}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
