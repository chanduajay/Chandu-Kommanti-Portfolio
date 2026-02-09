
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';
import { VoxelEngine } from './services/VoxelEngine';
import { UIOverlay } from './components/UIOverlay';
import { WelcomeScreen } from './components/WelcomeScreen';
import { InformationCard } from './components/InformationCard';
import { Generators } from './utils/voxelGenerators';
import { AppState } from './types';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<VoxelEngine | null>(null);
  
  const [appState, setAppState] = useState<AppState>(AppState.STABLE);
  const [voxelCount, setVoxelCount] = useState<number>(0);
  
  const [showWelcome, setShowWelcome] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  const [currentBaseModel, setCurrentBaseModel] = useState<string>('Avatar');

  useEffect(() => {
    if (!containerRef.current) return;

    const engine = new VoxelEngine(
      containerRef.current,
      (newState) => setAppState(newState),
      (count) => setVoxelCount(count)
    );

    engineRef.current = engine;
    engine.loadInitialModel(Generators.Avatar());

    const handleResize = () => engine.handleResize();
    window.addEventListener('resize', handleResize);
    const timer = setTimeout(() => setShowWelcome(false), 8000); // Extended slightly to allow user to read

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
      engine.cleanup();
    };
  }, []);

  const handleGlobalClick = () => {
    if (showWelcome) {
      setShowWelcome(false);
    }
  };

  const handleDismantle = () => {
    setShowDetails(false);
    engineRef.current?.dismantle();
  };

  const handleNewScene = (type: string) => {
    const generator = (Generators as any)[type];
    if (generator && engineRef.current) {
      engineRef.current.loadInitialModel(generator());
      setCurrentBaseModel(type);
      setShowDetails(false);
    }
  };

  const handleRebuild = (type: string) => {
    const generator = (Generators as any)[type];
    if (generator && engineRef.current) {
      engineRef.current.rebuild(generator());
      setCurrentBaseModel(type);
      setShowDetails(false);
    }
  };

  const handleShowContact = () => {
      if (currentBaseModel !== 'Contact') {
          handleNewScene('Contact');
      }
      setShowDetails(true);
  };

  useEffect(() => {
    if (appState === AppState.STABLE && currentBaseModel !== 'Avatar' && !showWelcome) {
        const timer = setTimeout(() => {
            setShowDetails(true);
        }, 500);
        return () => clearTimeout(timer);
    }
  }, [appState, currentBaseModel, showWelcome]);

  return (
    <div 
      className="relative w-full h-screen bg-[#f8fafc] overflow-hidden cursor-pointer"
      onClick={handleGlobalClick}
    >
      <div ref={containerRef} className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <UIOverlay 
        appState={appState}
        currentBaseModel={currentBaseModel}
        isAutoRotate={isAutoRotate}
        isInfoVisible={showWelcome}
        onDismantle={handleDismantle}
        onRebuild={handleRebuild}
        onNewScene={handleNewScene}
        onShowContact={handleShowContact}
        onToggleRotation={() => { setIsAutoRotate(!isAutoRotate); engineRef.current?.setAutoRotate(!isAutoRotate); }}
        onToggleInfo={() => setShowWelcome(!showWelcome)}
      />
      <WelcomeScreen visible={showWelcome} />
      
      <InformationCard 
        section={currentBaseModel} 
        isVisible={showDetails} 
        onClose={() => setShowDetails(false)} 
      />
    </div>
  );
};

export default App;
