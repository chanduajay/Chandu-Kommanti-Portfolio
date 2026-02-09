
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface WelcomeScreenProps {
  visible: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ visible }) => {
  return (
    <div className={`
        absolute inset-0 pointer-events-none flex items-center justify-center z-[40] select-none px-6
        transition-all duration-1000 ease-in-out
        ${visible ? 'opacity-100 backdrop-blur-md bg-slate-950/20 pointer-events-auto' : 'opacity-0 scale-125 pointer-events-none invisible'}
    `}>
      <div className="max-w-4xl w-full text-center flex flex-col items-center gap-6 sm:gap-10 bg-white/95 backdrop-blur-3xl p-10 sm:p-20 rounded-[4rem] sm:rounded-[6rem] border border-white shadow-[0_30px_100px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in duration-700 relative overflow-hidden">
        
        {/* Subtle background glow for the card itself */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl"></div>

        {/* Name Header */}
        <div className="space-y-1 relative z-10">
            <h1 className="text-4xl sm:text-7xl font-bold text-slate-900 uppercase tracking-tighter leading-none font-heading">
                CHANDU AJAY
            </h1>
            <h1 className="text-4xl sm:text-7xl font-bold text-cyan-600 uppercase tracking-tighter leading-none font-heading">
                KOMMANTI
            </h1>
        </div>

        {/* Separator Divider */}
        <div className="w-full max-w-lg flex items-center justify-center gap-6 relative z-10">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-[0.5em] whitespace-nowrap">
                Tech Professional Portfolio
            </span>
            <div className="flex-1 h-px bg-slate-200"></div>
        </div>
        
        {/* Title & Motto */}
        <div className="space-y-4 relative z-10">
            <p className="text-lg sm:text-2xl font-semibold text-slate-600 tracking-tight">
                Aspiring Software Developer | AI & Full Stack Enthusiast
            </p>
            <p className="text-[10px] sm:text-xs text-indigo-600 uppercase font-bold tracking-[0.4em] italic">
                Building Smart, Scalable & Reliable Applications
            </p>
        </div>

        {/* New Objective Block - Refined Typography */}
        <div className="max-w-2xl px-4 py-6 bg-slate-50/50 rounded-3xl border border-slate-100/50 shadow-inner relative z-10 group transition-all hover:bg-white hover:shadow-md">
            <p className="text-sm sm:text-lg font-medium text-slate-500 italic leading-relaxed tracking-tight font-heading">
                "Seeking an entry-level opportunity to apply my skills, learn continuously, and grow as a software professional."
            </p>
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap justify-center gap-3 pointer-events-auto max-w-2xl relative z-10">
            {['Python', ' Java', 'AI & ML', 'Full Stack', 'SQL', 'Cloud'].map(tag => (
                <span key={tag} className="px-6 py-3 bg-white rounded-2xl text-[10px] sm:text-[11px] font-bold text-slate-500 border border-slate-100 uppercase tracking-widest shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-cyan-200 hover:text-cyan-600 transition-all cursor-default">
                    {tag}
                </span>
            ))}
        </div>

        {/* Bouncing Line Decor */}
        <div className="mt-2 relative z-10">
            <div className="w-1.5 h-16 bg-gradient-to-b from-cyan-400 via-indigo-400 to-transparent mx-auto rounded-full opacity-60 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};
