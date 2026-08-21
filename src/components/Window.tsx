import React, { useState, useRef, useEffect } from 'react';
import { soundManager } from '../audio/soundManager';
import { Minus, Square, X, Minimize2 } from 'lucide-react';

export interface WindowProps {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  isFocused: boolean;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  title,
  icon,
  isOpen,
  isMinimized,
  zIndex,
  isFocused,
  defaultPosition = { x: 80, y: 60 },
  defaultSize = { width: 700, height: 500 },
  onClose,
  onMinimize,
  onFocus,
  children
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Update default position on mount depending on screen size
  useEffect(() => {
    if (window.innerWidth < 768) {
      setPosition({ x: 10, y: 45 });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMaximized) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;
      const newX = Math.max(10, Math.min(window.innerWidth - 100, e.clientX - dragStartRef.current.x));
      const newY = Math.max(40, Math.min(window.innerHeight - 80, e.clientY - dragStartRef.current.y));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isMaximized]);

  if (!isOpen || isMinimized) return null;

  const currentStyle: React.CSSProperties = isMaximized
    ? {
        position: 'fixed',
        top: 38,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 38px)',
        zIndex,
        borderRadius: 0,
        border: 'none'
      }
    : {
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        maxWidth: '96vw',
        maxHeight: '88vh',
        zIndex
      };

  return (
    <div
      className={`glass-window ${isFocused ? 'focused' : ''}`}
      style={{
        ...currentStyle,
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease, border-color 0.2s ease'
      }}
      onClick={onFocus}
    >
      {/* Header / Titlebar */}
      <div
        className="window-header"
        onMouseDown={handleMouseDown}
        onDoubleClick={() => {
          soundManager.playClick();
          setIsMaximized(!isMaximized);
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 15 }}>{icon}</span>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            fontFamily: 'var(--font-mono)',
            color: isFocused ? '#f8fafc' : '#94a3b8',
            letterSpacing: '0.2px'
          }}>
            {title}
          </span>
        </div>

        {/* Linux / Mac window controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClose();
              onMinimize();
            }}
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: 'rgba(251, 191, 36, 0.2)',
              border: '1px solid rgba(251, 191, 36, 0.4)',
              color: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Küçült (Minimize)"
          >
            <Minus size={12} />
          </button>

          {/* Maximize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              setIsMaximized(!isMaximized);
            }}
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: 'rgba(74, 222, 128, 0.2)',
              border: '1px solid rgba(74, 222, 128, 0.4)',
              color: '#4ade80',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title={isMaximized ? "Eski Boyut" : "Ekranı Kapla"}
          >
            {isMaximized ? <Minimize2 size={12} /> : <Square size={10} />}
          </button>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClose();
              onClose();
            }}
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: 'rgba(244, 63, 94, 0.2)',
              border: '1px solid rgba(244, 63, 94, 0.5)',
              color: '#f87171',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Kapat"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};
