import React from 'react';
import { FileText, Share2, Printer, Undo, Redo, ZoomIn } from 'lucide-react';

export const PanicDisguise = ({ onDismiss }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#f8f9fa] text-[#202124] overflow-y-auto font-sans flex flex-col">
      {/* Google Docs Style Header */}
      <header className="border-b border-[#dadce0] bg-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-[#1a73e8]">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-[#202124]">
                Unit 4: European Industrial Revolution - Primary Source Analysis
              </span>
              <span className="text-xs text-slate-400">Saved to Drive</span>
            </div>
            <div className="flex gap-4 text-xs text-[#5f6368] mt-1">
              <span className="cursor-pointer hover:text-black">File</span>
              <span className="cursor-pointer hover:text-black">Edit</span>
              <span className="cursor-pointer hover:text-black">View</span>
              <span className="cursor-pointer hover:text-black">Insert</span>
              <span className="cursor-pointer hover:text-black">Format</span>
              <span className="cursor-pointer hover:text-black">Tools</span>
              <span className="cursor-pointer hover:text-black">Extensions</span>
              <span className="cursor-pointer hover:text-black">Help</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onDismiss}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c2e7ff] text-[#001d35] rounded-full text-xs font-semibold hover:bg-[#b3d7ef] transition-colors"
            title="Click to resume gaming"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          <div
            onClick={onDismiss}
            className="w-8 h-8 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-xs cursor-pointer hover:opacity-90"
            title="Exit Disguise (or press Escape)"
          >
            A
          </div>
        </div>
      </header>

      {/* Ribbon toolbar */}
      <div className="bg-[#edf2fa] border-b border-[#dadce0] px-4 py-1.5 flex items-center gap-3 text-[#444746] text-xs">
        <Undo className="w-3.5 h-3.5 cursor-pointer" />
        <Redo className="w-3.5 h-3.5 cursor-pointer" />
        <Printer className="w-3.5 h-3.5 cursor-pointer" />
        <div className="h-4 w-px bg-slate-300" />
        <span>100%</span>
        <ZoomIn className="w-3.5 h-3.5" />
        <div className="h-4 w-px bg-slate-300" />
        <span className="font-serif">Times New Roman</span>
        <div className="h-4 w-px bg-slate-300" />
        <span>12</span>
        <div className="h-4 w-px bg-slate-300" />
        <span className="font-bold cursor-pointer">B</span>
        <span className="italic cursor-pointer">I</span>
        <span className="underline cursor-pointer">U</span>
      </div>

      {/* Document Paper Sheet */}
      <main className="flex-1 p-6 md:p-12 flex justify-center bg-[#f8f9fa]">
        <article className="w-full max-w-[800px] bg-white shadow-sm border border-[#e0e0e0] p-12 md:p-16 text-[#1f1f1f] text-sm leading-relaxed font-serif min-h-[900px]">
          <h1 className="text-xl font-bold mb-4 text-center font-sans tracking-tight">
            The Socio-Economic Ramifications of Steam Mechanization (1780–1850)
          </h1>
          <p className="text-xs text-[#5f6368] text-center font-sans mb-8">
            Advanced Placement European History · Research Dossier · Fall Term
          </p>

          <h2 className="text-base font-bold mt-6 mb-2 font-sans text-slate-800">
            Section 1: Demographic Shift and Urban Agglomeration
          </h2>
          <p className="mb-4 text-justify">
            The introduction of James Watt’s rotary condenser steam engine fundamentally detached manufacturing facilities from fluvial geographic constraints. Previous cotton spinning mills relied strictly on fast-moving water currents along riparian channels in Derbyshire and Lanarkshire. By 1810, the coalfields of Lancashire, South Wales, and the Ruhr Basin emerged as dominant industrial epicenters, inducing rapid migrations of agrarian laborers into densely populated manufacturing hubs such as Manchester and Birmingham.
          </p>

          <h2 className="text-base font-bold mt-6 mb-2 font-sans text-slate-800">
            Section 2: Labor Organization and the Division of Tasks
          </h2>
          <p className="mb-4 text-justify">
            Adam Smith’s observations regarding specialization within pin manufacture epitomize the procedural transformations documented across late eighteenth-century workshops. Craft guilds, which had long preserved artisanal autonomy, experienced structural displacement by centralized factory regimens governed by standardized bell schedules and strict overseer quotas.
          </p>

          <p className="mb-4 text-justify">
            Statistical surveys compiled by Parliamentary inquiries demonstrate how steam-powered looms multiplied per-capita output manifold, reducing production costs while accelerating global trade volumes through Liverpool docks.
          </p>

          <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-500 font-sans flex justify-between">
            <span>Page 1 of 4</span>
            <span onClick={onDismiss} className="text-slate-400 hover:text-slate-600 cursor-pointer">
              Press Escape or click here to resume session
            </span>
          </div>
        </article>
      </main>
    </div>
  );
};
