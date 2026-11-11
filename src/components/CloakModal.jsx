import React, { useState } from 'react';
import { X, Shield, Keyboard, Check } from 'lucide-react';
import { CLOAK_PRESETS } from '../utils/cloak';

export const CloakModal = ({
  config,
  onClose,
  onSaveConfig,
}) => {
  const [preset, setPreset] = useState(config.preset);
  const [customTitle, setCustomTitle] = useState(config.customTitle);
  const [customFavicon, setCustomFavicon] = useState(config.customFavicon);
  const [panicKey, setPanicKey] = useState(config.panicKey);
  const [panicAction, setPanicAction] = useState(config.panicAction);
  const [panicRedirectUrl, setPanicRedirectUrl] = useState(config.panicRedirectUrl);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = () => {
    const newConf = {
      preset,
      customTitle,
      customFavicon,
      panicKey,
      panicAction,
      panicRedirectUrl,
    };
    onSaveConfig(newConf);
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      onClose();
    }, 600);
  };

  const presetList = [
    { id: 'none', name: 'Original (Nova Arcade)' },
    { id: 'google-docs', name: 'Google Docs' },
    { id: 'google-classroom', name: 'Google Classroom' },
    { id: 'canvas', name: 'Canvas LMS' },
    { id: 'wikipedia', name: 'Wikipedia' },
    { id: 'desmos', name: 'Desmos Calculator' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Tab Cloaking & Panic Config
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Disguise your browser tab & trigger instantaneous classroom emergency cloak
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

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Live Preview Tab Mockup */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Live Tab Appearance Preview
            </label>
            <div className="bg-slate-100 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <div className="bg-white dark:bg-slate-900 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs max-w-xs shadow-xs">
                <img
                  src={
                    customFavicon.trim() ||
                    (preset !== 'none' ? CLOAK_PRESETS[preset]?.favicon : CLOAK_PRESETS['none'].favicon)
                  }
                  alt="Favicon"
                  className="w-3.5 h-3.5 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                  {customTitle.trim() ||
                    (preset !== 'none' ? CLOAK_PRESETS[preset]?.title : CLOAK_PRESETS['none'].title)}
                </span>
                <span className="text-slate-400 dark:text-slate-500 text-[10px]">×</span>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Select Preset Disguise
            </label>
            <div className="grid grid-cols-2 gap-2">
              {presetList.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setPreset(p.id);
                    setCustomTitle('');
                    setCustomFavicon('');
                  }}
                  className={`px-3 py-2 text-xs rounded-lg border text-left flex items-center justify-between transition-colors ${
                    preset === p.id
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  {preset === p.id && <Check className="w-3.5 h-3.5 shrink-0 ml-1 text-indigo-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Overrides */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Custom Tab Title (Optional)
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. AP Calculus Assignment 3"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Custom Favicon URL (Optional)
              </label>
              <input
                type="text"
                value={customFavicon}
                onChange={(e) => setCustomFavicon(e.target.value)}
                placeholder="https://.../favicon.ico"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Panic Action Configuration */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Emergency Panic Key & Action
            </label>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <input
                  type="radio"
                  name="panicAction"
                  checked={panicAction === 'disguise'}
                  onChange={() => setPanicAction('disguise')}
                  className="text-indigo-600"
                />
                <span className="text-slate-700 dark:text-slate-300">Instant Docs Screen</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <input
                  type="radio"
                  name="panicAction"
                  checked={panicAction === 'redirect'}
                  onChange={() => setPanicAction('redirect')}
                  className="text-indigo-600"
                />
                <span className="text-slate-700 dark:text-slate-300">Redirect Webpage</span>
              </label>
            </div>

            {panicAction === 'redirect' && (
              <div>
                <input
                  type="url"
                  value={panicRedirectUrl}
                  onChange={(e) => setPanicRedirectUrl(e.target.value)}
                  placeholder="https://classroom.google.com"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg">
              <span className="flex items-center gap-1.5">
                <Keyboard className="w-4 h-4 text-slate-400" />
                <span>Panic Hotkey Trigger:</span>
              </span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded">
                Escape
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            {savedAlert ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{savedAlert ? 'Saved & Cloaked!' : 'Save & Apply Cloak'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
