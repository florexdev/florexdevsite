import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/systemData';
import { soundManager } from '../../audio/soundManager';
import { Mail, MessageCircle, MapPin, Globe, Copy, Check, ExternalLink } from 'lucide-react';

export const ContactApp: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'rgba(15, 20, 31, 0.95)',
      color: '#e2e8f0',
      overflowY: 'auto',
      padding: '24px'
    }}>
      <div style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: 16,
        marginBottom: 20
      }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
          İletişim & Bağlantılar
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: 2 }}>
          Benimle doğrudan iletişime geçebilir veya sosyal hesaplarımı inceleyebilirsiniz.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14 }}>
        {/* Email */}
        <div style={{
          backgroundColor: 'rgba(26, 36, 54, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 10,
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Mail size={18} color="#38bdf8" />
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>E-Posta</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9' }}>{PERSONAL_INFO.email}</div>
            </div>
          </div>
          <button
            onClick={() => handleCopy('email', PERSONAL_INFO.email)}
            style={{
              backgroundColor: copiedKey === 'email' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${copiedKey === 'email' ? '#34d399' : 'rgba(255, 255, 255, 0.1)'}`,
              color: copiedKey === 'email' ? '#34d399' : '#cbd5e1',
              padding: '6px 8px',
              borderRadius: 6,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: '0.75rem'
            }}
          >
            {copiedKey === 'email' ? <Check size={13} /> : <Copy size={13} />}
          </button>
        </div>

        {/* WhatsApp */}
        <div style={{
          backgroundColor: 'rgba(26, 36, 54, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 10,
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <MessageCircle size={18} color="#22c55e" />
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>WhatsApp</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9' }}>Doğrudan Mesaj Gönder</div>
            </div>
          </div>
          <a
            href={PERSONAL_INFO.whatsapp}
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              color: '#4ade80',
              padding: '6px 10px',
              borderRadius: 6,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: '0.75rem',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            <span>Sohbeti Başlat</span>
            <ExternalLink size={13} />
          </a>
        </div>

        {/* Location */}
        <div style={{
          backgroundColor: 'rgba(26, 36, 54, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 10,
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <MapPin size={18} color="#f472b6" />
          <div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Konum</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9' }}>{PERSONAL_INFO.location}</div>
          </div>
        </div>

        {/* Website */}
        <div style={{
          backgroundColor: 'rgba(26, 36, 54, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 10,
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Globe size={18} color="#a78bfa" />
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Web Sitesi</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f1f5f9' }}>{PERSONAL_INFO.website}</div>
            </div>
          </div>
          <a
            href={`https://${PERSONAL_INFO.website}`}
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#a78bfa',
              padding: '6px 8px',
              borderRadius: 6,
              border: '1px solid rgba(167, 139, 250, 0.3)',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Social Profiles */}
      <div style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8', marginBottom: 12 }}>
          Sosyal & Geliştirici Profilleri
        </h3>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.85rem',
              textDecoration: 'none'
            }}
          >
            <span>GitHub (@florexdev)</span>
            <ExternalLink size={13} color="#94a3b8" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#60a5fa',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.85rem',
              textDecoration: 'none'
            }}
          >
            <span>LinkedIn (@florexdev)</span>
            <ExternalLink size={13} />
          </a>

          <a
            href={PERSONAL_INFO.itchio}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'rgba(244, 114, 182, 0.12)',
              border: '1px solid rgba(244, 114, 182, 0.3)',
              color: '#f472b6',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.85rem',
              textDecoration: 'none'
            }}
          >
            <span>itch.io (@florexdev)</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};
