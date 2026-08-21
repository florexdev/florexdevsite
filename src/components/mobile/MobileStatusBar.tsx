import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export const MobileStatusBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      height: 38,
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#f8fafc',
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      fontWeight: 600,
      zIndex: 9999,
      position: 'relative',
      flexShrink: 0
    }}>
      {/* Left: Time */}
      <div style={{ width: 60 }}>
        <span>{timeStr}</span>
      </div>

      {/* Center: Dynamic Pill / Notch */}
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        borderRadius: 999,
        padding: '3px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        fontSize: '11px',
        color: '#a5b4fc',
        fontFamily: 'var(--font-mono)'
      }}>
        <span>florexOS</span>
      </div>

      {/* Right: Network & Battery */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: 60, justifyContent: 'flex-end' }}>
        <Signal size={13} />
        <span style={{ fontSize: '10px', fontWeight: 700 }}>5G</span>
        <Wifi size={13} />
        <Battery size={15} />
      </div>
    </div>
  );
};
