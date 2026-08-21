import React, { useEffect } from 'react';
import { soundManager } from '../audio/soundManager';
import { Terminal, FileText, FolderGit2, Code2, Mail } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
  onChangeWallpaper?: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onClose,
  onOpenApp
}) => {
  useEffect(() => {
    const handleClickOutside = () => onClose();
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  const adjustedX = Math.min(x, window.innerWidth - 200);
  const adjustedY = Math.min(y, window.innerHeight - 220);

  const menuItems = [
    {
      label: 'Terminal Aç',
      icon: <Terminal size={14} color="#a78bfa" />,
      action: () => onOpenApp('terminal')
    },
    {
      label: 'Özgeçmiş (ozgecmis.md)',
      icon: <FileText size={14} color="#60a5fa" />,
      action: () => onOpenApp('about')
    },
    {
      label: 'Projeler',
      icon: <FolderGit2 size={14} color="#38bdf8" />,
      action: () => onOpenApp('projects')
    },
    {
      label: 'Yetenekler & Teknolojiler',
      icon: <Code2 size={14} color="#34d399" />,
      action: () => onOpenApp('skills')
    },
    {
      label: 'İletişim Bilgileri',
      icon: <Mail size={14} color="#f472b6" />,
      action: () => onOpenApp('contact')
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: adjustedY,
        left: adjustedX,
        width: 200,
        backgroundColor: 'rgba(18, 24, 38, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: '5px',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
        zIndex: 99999,
        fontFamily: 'var(--font-mono)',
        fontSize: '12px'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item, idx) => (
        <button
          key={idx}
          onClick={() => {
            soundManager.playClick();
            item.action?.();
            onClose();
          }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 8px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: 4,
            color: '#cbd5e1',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            transition: 'all 0.12s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
            e.currentTarget.style.color = '#60a5fa';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#cbd5e1';
          }}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};
