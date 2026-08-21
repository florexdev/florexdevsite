import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Desktop } from './components/Desktop';
import { Window } from './components/Window';
import { ContextMenu } from './components/ContextMenu';
import { TerminalApp } from './components/apps/TerminalApp';
import { AboutApp } from './components/apps/AboutApp';
import { ProjectsApp } from './components/apps/ProjectsApp';
import { SkillsApp } from './components/apps/SkillsApp';
import { ContactApp } from './components/apps/ContactApp';

// Mobile Components
import { MobileStatusBar } from './components/mobile/MobileStatusBar';
import { MobileHomeScreen } from './components/mobile/MobileHomeScreen';
import { MobileAppView } from './components/mobile/MobileAppView';

import { soundManager } from './audio/soundManager';

interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

export const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(() => window.innerWidth < 768);
  const [activeMobileApp, setActiveMobileApp] = useState<string | null>(null);

  const [topZ, setTopZ] = useState(10);
  const [focusedId, setFocusedId] = useState<string>('about');

  // Context Menu State (Desktop)
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; x: number; y: number }>({
    visible: false,
    x: 0,
    y: 0
  });

  // Screen resize listener for responsive mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop Windows
  const [windows, setWindows] = useState<{ [id: string]: WindowState }>({
    about: {
      id: 'about',
      title: 'ozgecmis.md — Burak Özdemir',
      icon: '📄',
      isOpen: true,
      isMinimized: false,
      zIndex: 6,
      defaultPosition: { x: 50, y: 55 },
      defaultSize: { width: 660, height: 520 }
    },
    terminal: {
      id: 'terminal',
      title: 'florexdev@burak-thinkpad: ~ (zsh)',
      icon: '💻',
      isOpen: true,
      isMinimized: false,
      zIndex: 5,
      defaultPosition: { x: 440, y: 80 },
      defaultSize: { width: 620, height: 420 }
    },
    projects: {
      id: 'projects',
      title: 'projeler — Kod & Oyunlar',
      icon: '📁',
      isOpen: false,
      isMinimized: false,
      zIndex: 4,
      defaultPosition: { x: 140, y: 70 },
      defaultSize: { width: 700, height: 500 }
    },
    skills: {
      id: 'skills',
      title: 'yetenekler.txt — Yetenekler & Teknolojiler',
      icon: '⚡',
      isOpen: false,
      isMinimized: false,
      zIndex: 4,
      defaultPosition: { x: 180, y: 85 },
      defaultSize: { width: 640, height: 460 }
    },
    contact: {
      id: 'contact',
      title: 'iletisim.vcf — İletişim & Sosyal Medya',
      icon: '✉️',
      isOpen: false,
      isMinimized: false,
      zIndex: 8,
      defaultPosition: { x: 260, y: 90 },
      defaultSize: { width: 560, height: 440 }
    }
  });

  const bringToFront = (id: string) => {
    soundManager.playClick();
    const newZ = topZ + 1;
    setTopZ(newZ);
    setFocusedId(id);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: newZ, isMinimized: false, isOpen: true }
    }));
  };

  const openApp = (id: string) => {
    soundManager.playOpen();
    if (isMobile) {
      setActiveMobileApp(id);
      return;
    }
    const newZ = topZ + 1;
    setTopZ(newZ);
    setFocusedId(id);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: newZ }
    }));
  };

  const closeWindow = (id: string) => {
    soundManager.playClose();
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
  };

  const minimizeWindow = (id: string) => {
    soundManager.playClose();
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
  };

  const toggleWindowFromTray = (id: string) => {
    const w = windows[id];
    if (!w.isOpen) {
      openApp(id);
    } else if (w.isMinimized) {
      bringToFront(id);
    } else if (focusedId === id) {
      minimizeWindow(id);
    } else {
      bringToFront(id);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    soundManager.playClick();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  const renderAppComponent = (appId: string) => {
    switch (appId) {
      case 'about':
        return (
          <AboutApp
            onOpenProjects={() => openApp('projects')}
            onOpenContact={() => openApp('contact')}
          />
        );
      case 'terminal':
        return <TerminalApp onOpenApp={openApp} />;
      case 'projects':
        return <ProjectsApp />;
      case 'skills':
        return <SkillsApp />;
      case 'contact':
        return <ContactApp />;
      default:
        return <AboutApp onOpenProjects={() => openApp('projects')} onOpenContact={() => openApp('contact')} />;
    }
  };

  // ================= MOBILE PHONE VIEW =================
  if (isMobile) {
    return (
      <div
        className="app-container"
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Mobile Status Bar */}
        <MobileStatusBar />

        {/* Home Screen */}
        <MobileHomeScreen onOpenApp={openApp} />

        {/* Active Fullscreen Mobile App Overlay */}
        {activeMobileApp && (
          <MobileAppView
            title={windows[activeMobileApp]?.title || activeMobileApp}
            onClose={() => setActiveMobileApp(null)}
          >
            {renderAppComponent(activeMobileApp)}
          </MobileAppView>
        )}
      </div>
    );
  }

  // ================= DESKTOP PC VIEW =================
  return (
    <div
      className="app-container"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
      onClick={() => {
        if (contextMenu.visible) setContextMenu({ visible: false, x: 0, y: 0 });
      }}
    >
      {/* Top Status Bar */}
      <TopBar
        onChangeWallpaper={() => {}}
        openWindows={Object.values(windows)}
        onToggleWindow={toggleWindowFromTray}
        onOpenContact={() => openApp('contact')}
      />

      {/* Desktop Area */}
      <Desktop
        onOpenApp={openApp}
        onContextMenu={handleContextMenu}
      />

      {/* 1. About / Resume App */}
      <Window
        id="about"
        title={windows.about.title}
        icon={windows.about.icon}
        isOpen={windows.about.isOpen}
        isMinimized={windows.about.isMinimized}
        zIndex={windows.about.zIndex}
        isFocused={focusedId === 'about'}
        defaultPosition={windows.about.defaultPosition}
        defaultSize={windows.about.defaultSize}
        onClose={() => closeWindow('about')}
        onMinimize={() => minimizeWindow('about')}
        onFocus={() => bringToFront('about')}
      >
        <AboutApp
          onOpenProjects={() => openApp('projects')}
          onOpenContact={() => openApp('contact')}
        />
      </Window>

      {/* 2. Terminal App */}
      <Window
        id="terminal"
        title={windows.terminal.title}
        icon={windows.terminal.icon}
        isOpen={windows.terminal.isOpen}
        isMinimized={windows.terminal.isMinimized}
        zIndex={windows.terminal.zIndex}
        isFocused={focusedId === 'terminal'}
        defaultPosition={windows.terminal.defaultPosition}
        defaultSize={windows.terminal.defaultSize}
        onClose={() => closeWindow('terminal')}
        onMinimize={() => minimizeWindow('terminal')}
        onFocus={() => bringToFront('terminal')}
      >
        <TerminalApp onOpenApp={openApp} />
      </Window>

      {/* 3. Projects App */}
      <Window
        id="projects"
        title={windows.projects.title}
        icon={windows.projects.icon}
        isOpen={windows.projects.isOpen}
        isMinimized={windows.projects.isMinimized}
        zIndex={windows.projects.zIndex}
        isFocused={focusedId === 'projects'}
        defaultPosition={windows.projects.defaultPosition}
        defaultSize={windows.projects.defaultSize}
        onClose={() => closeWindow('projects')}
        onMinimize={() => minimizeWindow('projects')}
        onFocus={() => bringToFront('projects')}
      >
        <ProjectsApp />
      </Window>

      {/* 4. Skills App */}
      <Window
        id="skills"
        title={windows.skills.title}
        icon={windows.skills.icon}
        isOpen={windows.skills.isOpen}
        isMinimized={windows.skills.isMinimized}
        zIndex={windows.skills.zIndex}
        isFocused={focusedId === 'skills'}
        defaultPosition={windows.skills.defaultPosition}
        defaultSize={windows.skills.defaultSize}
        onClose={() => closeWindow('skills')}
        onMinimize={() => minimizeWindow('skills')}
        onFocus={() => bringToFront('skills')}
      >
        <SkillsApp />
      </Window>

      {/* 5. Contact App */}
      <Window
        id="contact"
        title={windows.contact.title}
        icon={windows.contact.icon}
        isOpen={windows.contact.isOpen}
        isMinimized={windows.contact.isMinimized}
        zIndex={windows.contact.zIndex}
        isFocused={focusedId === 'contact'}
        defaultPosition={windows.contact.defaultPosition}
        defaultSize={windows.contact.defaultSize}
        onClose={() => closeWindow('contact')}
        onMinimize={() => minimizeWindow('contact')}
        onFocus={() => bringToFront('contact')}
      >
        <ContactApp />
      </Window>

      {/* Custom Context Menu */}
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu({ visible: false, x: 0, y: 0 })}
          onOpenApp={openApp}
          onChangeWallpaper={() => {}}
        />
      )}
    </div>
  );
};

export default App;
