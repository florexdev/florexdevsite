import React from 'react';
import { soundManager } from '../../audio/soundManager';
import { DESKTOP_SHORTCUTS, PERSONAL_INFO } from '../../data/systemData';
import {
  FileText,
  Terminal,
  FolderGit2,
  Code2,
  Mail
} from 'lucide-react';
import yatayLogo from '../../assets/yataylogom.png';

interface MobileHomeScreenProps {
  onOpenApp: (appId: string) => void;
}

export const MobileHomeScreen: React.FC<MobileHomeScreenProps> = ({ onOpenApp }) => {
  const getAppIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText size={28} color="#ffffff" />;
      case 'FolderGit2': return <FolderGit2 size={28} color="#ffffff" />;
      case 'Code2': return <Code2 size={28} color="#ffffff" />;
      case 'Terminal': return <Terminal size={28} color="#ffffff" />;
      case 'Mail': return <Mail size={28} color="#ffffff" />;
      default: return <FileText size={28} color="#ffffff" />;
    }
  };

  const getGradientBg = (id: string) => {
    switch (id) {
      case 'about': return 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)';
      case 'projects': return 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)';
      case 'skills': return 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
      case 'terminal': return 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)';
      case 'contact': return 'linear-gradient(135deg, #db2777 0%, #f472b6 100%)';
      default: return 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)';
    }
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 20px 20px 20px',
      position: 'relative',
      userSelect: 'none'
    }}>
      {/* Top Header Widget */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 16,
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '0.85rem',
          color: '#cbd5e1',
          fontWeight: 500,
          letterSpacing: '0.5px'
        }}>
          {dateStr}
        </div>
        <div style={{
          marginTop: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <img
            src={yatayLogo}
            alt="florexdev"
            style={{ height: 22, width: 'auto' }}
          />
        </div>
        <div style={{
          fontSize: '0.78rem',
          color: '#94a3b8',
          marginTop: 4,
          fontFamily: 'var(--font-mono)'
        }}>
          {PERSONAL_INFO.title}
        </div>
      </div>

      {/* Main Apps Grid (Mobile Squircle Icons) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px 12px',
        margin: 'auto 0',
        padding: '0 8px'
      }}>
        {DESKTOP_SHORTCUTS.map(app => (
          <button
            key={app.id}
            onClick={() => {
              soundManager.playOpen();
              onOpenApp(app.app);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              padding: 0,
              gap: 8,
              transition: 'transform 0.15s ease'
            }}
            onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.92)')}
            onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {/* Squircle Icon */}
            <div style={{
              width: 58,
              height: 58,
              borderRadius: 15,
              background: getGradientBg(app.id),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 18px rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.18)'
            }}>
              {getAppIcon(app.icon)}
            </div>

            <span style={{
              fontSize: '11.5px',
              color: '#f1f5f9',
              fontWeight: 500,
              textAlign: 'center',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)',
              maxWidth: 70,
              lineHeight: 1.2
            }}>
              {app.name.replace('.md', '').replace('.txt', '').replace('.vcf', '')}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Floating Glass Dock */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14
      }}>
        <div style={{
          backgroundColor: 'rgba(18, 22, 34, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 24,
          padding: '10px 18px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          gap: 16,
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)'
        }}>
          {['about', 'projects', 'terminal', 'contact'].map(appId => {
            const app = DESKTOP_SHORTCUTS.find(s => s.id === appId) || DESKTOP_SHORTCUTS[0];
            return (
              <button
                key={appId}
                onClick={() => {
                  soundManager.playOpen();
                  onOpenApp(app.app);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'transform 0.15s ease'
                }}
                onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.92)')}
                onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{
                  width: 50,
                  height: 50,
                  borderRadius: 13,
                  background: getGradientBg(app.id),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 14px rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.18)'
                }}>
                  {getAppIcon(app.icon)}
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile Home Gesture Indicator Bar */}
        <div style={{
          width: 130,
          height: 5,
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          borderRadius: 999
        }} />
      </div>
    </div>
  );
};
