import React, { useState } from 'react';
import { DESKTOP_SHORTCUTS, PERSONAL_INFO } from '../data/systemData';
import { soundManager } from '../audio/soundManager';
import {
  FileText,
  Terminal,
  FolderGit2,
  Code2,
  Mail
} from 'lucide-react';
import yatayLogo from '../assets/yataylogom.png';

interface DesktopProps {
  onOpenApp: (appId: string) => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export const Desktop: React.FC<DesktopProps> = ({ onOpenApp, onContextMenu }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText size={28} color={color} />;
      case 'FolderGit2':
        return <FolderGit2 size={28} color={color} />;
      case 'Code2':
        return <Code2 size={28} color={color} />;
      case 'Terminal':
        return <Terminal size={28} color={color} />;
      case 'Mail':
        return <Mail size={28} color={color} />;
      default:
        return <FileText size={28} color={color} />;
    }
  };

  const handleShortcutClick = (id: string) => {
    soundManager.playClick();
    setSelectedId(id);
  };

  const handleShortcutDoubleClick = (app: string) => {
    soundManager.playOpen();
    onOpenApp(app);
  };

  return (
    <div
      style={{
        flex: 1,
        position: 'relative',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        userSelect: 'none'
      }}
      onContextMenu={onContextMenu}
      onClick={() => setSelectedId(null)}
    >
      {/* Desktop Icons Column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          zIndex: 1,
          width: 86
        }}
      >
        {DESKTOP_SHORTCUTS.map(sc => {
          const isSelected = selectedId === sc.id;
          return (
            <div
              key={sc.id}
              onClick={(e) => {
                e.stopPropagation();
                handleShortcutClick(sc.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                handleShortcutDoubleClick(sc.app);
              }}
              onTouchStart={(e) => {
                // Mobile friendly tap
                e.stopPropagation();
                handleShortcutDoubleClick(sc.app);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 82,
                height: 82,
                borderRadius: 8,
                padding: '8px 4px',
                cursor: 'pointer',
                backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                border: isSelected
                  ? '1px solid rgba(99, 102, 241, 0.35)'
                  : '1px solid transparent',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ marginBottom: 6, opacity: 0.9 }}>
                {getIcon(sc.icon, sc.color)}
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: isSelected ? '#a5b4fc' : '#cbd5e1',
                  fontWeight: 500,
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  lineHeight: 1.2
                }}
              >
                {sc.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Desktop Minimal Watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          right: 28,
          textAlign: 'right',
          pointerEvents: 'none',
          opacity: 0.7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 4
        }}
      >
        <img
          src={yatayLogo}
          alt="florexdev"
          style={{ height: 22, width: 'auto', display: 'block' }}
        />
        <div style={{
          fontSize: '0.78rem',
          color: '#64748b',
          fontFamily: 'var(--font-mono)',
          marginTop: 2
        }}>
          {PERSONAL_INFO.title} • {PERSONAL_INFO.location}
        </div>
      </div>
    </div>
  );
};
