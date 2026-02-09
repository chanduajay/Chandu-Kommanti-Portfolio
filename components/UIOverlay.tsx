
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { AppState } from '../types';
import { Globe, Hammer, ChevronUp, Play, Pause, Info, Activity, Zap } from 'lucide-react';

interface UIOverlayProps {
  appState: AppState;
  currentBaseModel: string;
  isAutoRotate: boolean;
  isInfoVisible: boolean;
  onDismantle: () => void;
  onRebuild: (type: string) => void;
  onNewScene: (type: string) => void;
  onShowContact: () => void;
  onToggleRotation: () => void;
  onToggleInfo: () => void;
}

export const UIOverlay: React.FC<UIOverlayProps> = ({
  appState,
  currentBaseModel,
  isAutoRotate,
  isInfoVisible,
  onDismantle,
  onRebuild,
  onNewScene,
  onShowContact,
  onToggleRotation,
  onToggleInfo
}) => {
  const isStable = appState === AppState.STABLE;
  const isDismantling = appState === AppState.DISMANTLING;
  const isRebuilding = appState === AppState.REBUILDING;

  const sectionNameMap: Record<string, string> = {
    'Avatar': 'Home',
    'About': 'About Me',
    'Skills': 'Technical Skills',
    'Education': 'Education',
    'Projects': 'Projects',
    'Certifications': 'Certifications',
    'Achievements': 'Achievements',
    'Contact': 'Contact'
  };
  
  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-[100] transition-all duration-500 ${isInfoVisible ? 'opacity-0 invisible' : 'opacity-100'}`}>
      
      {/* Top Left: Navigation */}
      <div className="absolute top-6 left-6 pointer-events-auto z-10">
        <PortalMenu onSelect={onNewScene} current={currentBaseModel} map={sectionNameMap} />
      </div>

      {/* Top Right: System Controls */}
      <div className="absolute top-6 right-6 pointer-events-auto flex gap-3 z-10">
         <TacticalButton 
            onClick={onToggleInfo} 
            active={isInfoVisible} 
            icon={<Info size={20} />} 
            label="ME" 
            glow="indigo"
         />
         <TacticalButton 
            onClick={onToggleRotation} 
            active={isAutoRotate} 
            icon={isAutoRotate ? <Pause size={20} /> : <Play size={20} />} 
            label="CAMERA" 
            glow="cyan"
         />
      </div>

      {/* Bottom Command Area */}
      <div className="absolute bottom-10 left-0 w-full flex flex-col items-center pointer-events-none px-6 z-20">
        <div className="pointer-events-auto flex flex-col items-center gap-6 w-full max-w-lg">
            
            {/* Minimal Status Readout */}
            <div className="px-5 py-2 bg-slate-900/95 border border-white/10 rounded-full flex items-center gap-3 shadow-xl">
               <Activity size={14} className={!isStable ? "animate-pulse text-cyan-400" : "text-emerald-400"} />
               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                 {appState} <span className="text-cyan-500 mx-1">/</span> {sectionNameMap[currentBaseModel]}
               </span>
            </div>

            {isStable && (
                 <div className="animate-in slide-in-from-bottom-8 duration-500 cubic-bezier-bounce">
                     <IndustrialButton onClick={(e: any) => { e.stopPropagation(); onDismantle(); }} icon={<Hammer size={24} />} label="DECONSTRUCT" />
                 </div>
            )}

            {isDismantling && (
                <div className="animate-in slide-in-from-bottom-8 zoom-in-95 duration-500 w-full">
                     <HolographicMorph onSelect={onRebuild} map={sectionNameMap} />
                </div>
            )}
            
            {isRebuilding && (
                <div className="flex flex-col items-center gap-2">
                    <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-cyan-500 animate-progress" style={{ width: '100%' }}></div>
                    </div>
                    <span className="text-[9px] font-black text-cyan-600 uppercase tracking-[0.4em] animate-pulse">Syncing...</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

const PortalMenu: React.FC<any> = ({ onSelect, current, map }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                className={`
                    group flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all border shadow-lg backdrop-blur-md cursor-pointer
                    ${isOpen ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900/90 border-white/10 text-slate-300 hover:text-white'}
                `}
            >
                <Globe size={18} className={isOpen ? "animate-spin-slow" : ""} />
                <span className="text-[10px] font-black uppercase tracking-widest">PORTALS</span>
                <ChevronUp size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 mt-3 w-64 bg-slate-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                    {Object.keys(map).map(id => (
                        <button 
                            key={id} 
                            onClick={(e) => { e.stopPropagation(); onSelect(id); setIsOpen(false); }} 
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all text-left group mb-1 cursor-pointer ${current === id ? 'bg-white/10 text-cyan-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                        >
                           <Zap size={12} className={current === id ? "opacity-100" : "opacity-20"} />
                           <span className="text-[10px] font-black uppercase tracking-widest">{map[id]}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const TacticalButton: React.FC<any> = ({ onClick, active, icon, label, glow }) => (
    <button onClick={(e) => { e.stopPropagation(); onClick(); }} className={`
        flex flex-col items-center justify-center w-14 h-14 rounded-2xl border transition-all active:scale-90 shadow-md cursor-pointer
        ${active ? `bg-${glow}-500 text-white border-${glow}-400` : 'bg-slate-900/90 border-white/10 text-slate-400 hover:text-white'}
    `}>
        {icon}
        <span className="text-[8px] font-black mt-1 opacity-60 tracking-widest uppercase">{label}</span>
    </button>
);

const IndustrialButton: React.FC<any> = ({ onClick, icon, label }) => (
    <button onClick={onClick} className="group relative flex items-center gap-6 px-10 py-5 bg-rose-600 rounded-[2rem] text-white shadow-xl hover:bg-rose-500 active:translate-y-1 transition-all overflow-hidden cursor-pointer">
        <div className="relative z-10 flex items-center gap-4">
           <div className="p-3 bg-rose-700/50 rounded-xl transition-transform group-hover:rotate-12">{icon}</div>
           <div className="text-sm font-black tracking-widest uppercase">{label}</div>
        </div>
    </button>
);

const HolographicMorph: React.FC<any> = ({ onSelect, map }) => (
    <div className="relative p-5 bg-slate-950/95 border border-cyan-500/30 rounded-[2.5rem] grid grid-cols-2 sm:grid-cols-4 gap-2 w-full shadow-2xl overflow-hidden pointer-events-auto z-30">
        <div className="col-span-full text-center pb-3 border-b border-white/5 mb-1">
            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.5em] animate-pulse">Select Blueprint</span>
        </div>
        {Object.keys(map).map(id => (
            <button 
                key={id} 
                onClick={(e) => { 
                    e.stopPropagation(); 
                    onSelect(id); 
                }} 
                className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all active:scale-95 text-center group touch-manipulation cursor-pointer"
                style={{ touchAction: 'manipulation' }}
            >
                <span className="text-[9px] font-black text-slate-400 group-hover:text-white uppercase tracking-tight">{map[id]}</span>
            </button>
        ))}
    </div>
);
