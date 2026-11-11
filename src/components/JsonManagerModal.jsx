import React, { useState } from 'react';
import {
  X,
  Plus,
  Download,
  Upload,
  RotateCcw,
  Copy,
  Check,
  FileCode,
  Trash2,
} from 'lucide-react';

export const JsonManagerModal = ({
  games,
  onClose,
  onAddGame,
  onDeleteGame,
  onImportJson,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState('view');
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  // Add game form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Arcade');
  const [newEmbedInput, setNewEmbedInput] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newControls, setNewControls] = useState('');
  const [newColor, setNewColor] = useState('#6366f1');
  const [formError, setFormError] = useState('');

  const jsonString = JSON.stringify(games, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (Array.isArray(parsed)) {
          onImportJson(parsed);
          setActiveTab('view');
          setImportError('');
        } else {
          setImportError('JSON must be an array of game objects.');
        }
      } catch (err) {
        setImportError('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleManualImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (Array.isArray(parsed)) {
        onImportJson(parsed);
        setActiveTab('view');
        setImportError('');
        setImportText('');
      } else {
        setImportError('Input must be a JSON array of games.');
      }
    } catch (err) {
      setImportError('Failed to parse JSON. Please check syntax.');
    }
  };

  const handleCreateGame = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setFormError('Please enter a game title');
      return;
    }
    if (!newEmbedInput.trim()) {
      setFormError('Please provide an Iframe snippet or URL');
      return;
    }

    // Extract src from iframe tag or bare URL
    let iframeSrc = newEmbedInput.trim();
    let iframeHtml = newEmbedInput.trim();

    if (newEmbedInput.includes('<iframe')) {
      const srcMatch = newEmbedInput.match(/src=["']([^"']+)["']/i);
      if (srcMatch && srcMatch[1]) {
        iframeSrc = srcMatch[1];
      }
    } else {
      // It's a bare URL, format full iframe
      iframeHtml = `<iframe src="${iframeSrc}" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard"></iframe>`;
    }

    const id = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-') + '-' + Math.floor(Math.random() * 1000);

    const created = {
      id,
      title: newTitle.trim(),
      description: newDescription.trim() || 'Custom game loaded via iframe.',
      category: newCategory,
      iframeSrc,
      iframeHtml,
      controls: newControls.trim() || 'Standard keyboard and mouse controls.',
      rating: 5.0,
      plays: 1,
      aspectRatio: '16:9',
      tags: ['Custom', newCategory],
      color: newColor,
      custom: true,
    };

    onAddGame(created);
    // Reset form
    setNewTitle('');
    setNewEmbedInput('');
    setNewDescription('');
    setNewControls('');
    setFormError('');
    setActiveTab('view');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                games.json Repository Manager
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Storing every unblocked game as an iframe in JSON
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 pt-3 pb-0 border-b border-slate-200 dark:border-slate-800 flex gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('view')}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === 'view'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            View & Export JSON ({games.length} games)
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Iframe Game</span>
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'import'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import JSON</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === 'view' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Raw JSON content currently powering the arcade interface:
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                  </button>

                  <button
                    onClick={handleDownloadJson}
                    className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download games.json</span>
                  </button>

                  <button
                    onClick={onResetToDefault}
                    className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors flex items-center gap-1"
                    title="Restore original built-in games list"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Code viewer */}
              <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto max-h-[460px]">
                <pre>{jsonString}</pre>
              </div>

              {/* Game list quick manager */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Registered JSON Entries
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {games.map((g) => (
                    <div
                      key={g.id}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-xs"
                    >
                      <div className="truncate mr-2">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {g.title}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 ml-1.5">
                          ({g.category})
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {g.custom && (
                          <button
                            onClick={() => onDeleteGame(g.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                            title="Remove custom game"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <form onSubmit={handleCreateGame} className="space-y-4 max-w-xl mx-auto">
              {formError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs rounded-lg">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Game Title *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Retro Space Blaster"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Arcade">Arcade</option>
                    <option value="Action">Action</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Retro">Retro</option>
                    <option value="Casual">Casual</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="h-8 w-12 rounded cursor-pointer border border-slate-300 dark:border-slate-700"
                    />
                    <span className="text-xs font-mono text-slate-500">{newColor}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Iframe Embed Code or URL *
                </label>
                <textarea
                  rows={3}
                  value={newEmbedInput}
                  onChange={(e) => setNewEmbedInput(e.target.value)}
                  placeholder='Paste full <iframe src="..."></iframe> tag or direct URL like https://...'
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Accepts standard HTML &lt;iframe&gt; code or raw HTTPS web game links.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Short summary of gameplay..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Controls / How to Play
                </label>
                <input
                  type="text"
                  value={newControls}
                  onChange={(e) => setNewControls(e.target.value)}
                  placeholder="e.g. Arrow keys to steer, Space to fire"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('view')}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-sm transition-colors"
                >
                  Save to games.json
                </button>
              </div>
            </form>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4 max-w-xl mx-auto">
              {importError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs rounded-lg">
                  {importError}
                </div>
              )}

              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Upload a games.json file
                </p>
                <p className="text-[11px] text-slate-500 mb-4">
                  Select a valid JSON array exported from another portal
                </p>
                <label className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg cursor-pointer inline-block transition-colors">
                  Choose JSON File
                  <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileImport}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Or Paste JSON Text directly:
                </label>
                <textarea
                  rows={8}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste JSON array here..."
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={handleManualImport}
                    className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-sm transition-colors"
                  >
                    Parse & Import JSON
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
