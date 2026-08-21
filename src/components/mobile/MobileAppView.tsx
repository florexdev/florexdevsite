import React from 'react';
import { soundManager } from '../../audio/soundManager';
import { ChevronLeft, X } from 'lucide-react';

interface MobileAppViewProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const MobileAppView: React.FC<MobileAppViewProps> = ({
  title,
  onClose,
  children
}) => {
  const handleBack = () => {
    soundManager.playClose();
    onClose();
  };

  return (
    <div
      className="mobile-app-enter"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0c0e14',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 99999,
        overflow: 'hidden'
      }}
    >
      {/* Mobile App Header */}
      <div style={{
        height: 50,
        backgroundColor: 'rgba(18, 20, 29, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        flexShrink: 0,
        zIndex: 10
      }}>
        <button
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#6366f1',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            padding: '6px 8px'
          }}
        >
          <ChevronLeft size={20} />
          <span>Geri</span>
        </button>

        <span style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#f8fafc',
          fontFamily: 'var(--font-mono)',
          maxWidth: 180,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {title.split('—')[0].trim()}
        </span>

        <button
          onClick={handleBack}
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            color: '#94a3b8',
            borderRadius: '50%',
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* App Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>

      {/* Bottom Home Indicator */}
      <div
        onClick={handleBack}
        style={{
          height: 24,
          backgroundColor: '#0c0e14',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0
        }}
      >
        <div style={{
          width: 120,
          height: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 999
        }} />
      </div>
    </div>
  );
};
