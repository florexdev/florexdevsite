import React, { useState, useEffect } from 'react';
import { soundManager } from '../audio/soundManager';
import {
  Volume2,
  VolumeX,
  Clock,
  Terminal,
  FileText,
  FolderGit2,
  Mail,
  Code2
} from 'lucide-react';
import yatayLogo from '../assets/yataylogom.png';

interface TopBarProps {
  onChangeWallpaper: () => void;
  openWindows: { id: string; title: string; isOpen: boolean; isMinimized: boolean }[];
  onToggleWindow: (id: string) => void;
  onOpenContact: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  openWindows,
  onToggleWindow,
  onOpenContact
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const day = now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
      setTimeStr(`${day} • ${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMuteToggle = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const getWindowIcon = (id: string) => {
    switch (id) {
      case 'about': return <FileText size={12} />;
      case 'projects': return <FolderGit2 size={12} />;
      case 'skills': return <Code2 size={12} />;
      case 'terminal': return <Terminal size={12} />;
      case 'contact': return <Mail size={12} />;
      default: return <FileText size={12} />;
    }
  };

  return (
    <header
      style={{
        height: 38,
        backgroundColor: 'rgba(14, 16, 23, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        color: '#e2e8f0',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        zIndex: 9999,
        userSelect: 'none',
        position: 'relative'
      }}
    >
      {/* Left: Brand Logo & Window Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Transparent Horizontal Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '2px 0',
          cursor: 'default'
        }}>
          <img
            src={yatayLogo}
            alt="florexdev logo"
            style={{
              height: 16,
              width: 'auto',
              display: 'block'
            }}
          />
        </div>

        {/* Window Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {openWindows.filter(w => w.isOpen).map(w => (
            <button
              key={w.id}
              onClick={() => {
                soundManager.playClick();
                onToggleWindow(w.id);
              }}
              style={{
                backgroundColor: w.isMinimized ? 'transparent' : 'rgba(255, 255, 255, 0.06)',
                border: `1px solid ${w.isMinimized ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.12)'}`,
                color: w.isMinimized ? '#64748b' : '#f1f5f9',
                borderRadius: 4,
                padding: '2px 8px',
                fontSize: 11,
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                transition: 'all 0.15s'
              }}
            >
              {getWindowIcon(w.id)}
              <span>{w.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Center: Clock */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        color: '#94a3b8',
        fontSize: 11
      }}>
        <Clock size={12} />
        <span>{timeStr}</span>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={onOpenContact}
          style={{
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#a5b4fc',
            borderRadius: 4,
            padding: '3px 9px',
            cursor: 'pointer',
            fontSize: 11,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            transition: 'all 0.15s'
          }}
        >
          <Mail size={12} />
          <span>İletişim</span>
        </button>

        <button
          onClick={handleMuteToggle}
          style={{
            background: 'none',
            border: 'none',
            color: isMuted ? '#f87171' : '#94a3b8',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            alignItems: 'center'
          }}
          title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>
    </header>
  );
};
