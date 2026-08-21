import React, { useState } from 'react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATIONS, CERTIFICATES, LANGUAGES } from '../../data/systemData';
import { soundManager } from '../../audio/soundManager';
import { Briefcase, GraduationCap, Award, Globe, Mail, MapPin } from 'lucide-react';
import kareLogo from '../../assets/karelogo.png';

interface AboutAppProps {
  onOpenProjects: () => void;
  onOpenContact: () => void;
}

export const AboutApp: React.FC<AboutAppProps> = ({ onOpenProjects, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'education' | 'extra'>('all');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'rgba(15, 18, 26, 0.96)',
      color: '#e2e8f0',
      overflowY: 'auto'
    }}>
      {/* Profile Header */}
      <div style={{
        padding: '24px 24px 16px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backgroundColor: 'rgba(20, 24, 36, 0.6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <img
                src={kareLogo}
                alt="florexdev logo"
                style={{ width: '85%', height: '85%', objectFit: 'contain' }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.3px' }}>
                  {PERSONAL_INFO.name}
                </h1>
                <span style={{ fontSize: '0.8rem', color: '#a5b4fc', fontFamily: 'var(--font-mono)' }}>
                  @{PERSONAL_INFO.nickname}
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: 2 }}>
                {PERSONAL_INFO.title}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, fontSize: '0.8rem', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={13} color="#94a3b8" /> {PERSONAL_INFO.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Mail size={13} color="#94a3b8" /> {PERSONAL_INFO.email}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenContact();
              }}
              style={{
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#a5b4fc',
                padding: '6px 12px',
                borderRadius: 6,
                fontSize: '0.82rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              İletişime Geç
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenProjects();
              }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                padding: '6px 12px',
                borderRadius: 6,
                fontSize: '0.82rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              Projeleri Gör
            </button>
          </div>
        </div>

        {/* Summary note */}
        <p style={{
          marginTop: 16,
          fontSize: '0.88rem',
          lineHeight: 1.6,
          color: '#cbd5e1',
          backgroundColor: 'rgba(10, 12, 18, 0.5)',
          padding: '12px 14px',
          borderRadius: 8,
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          {PERSONAL_INFO.summary}
        </p>

        {/* Tab Filters */}
        <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
          {[
            { id: 'all', label: 'Tüm Bilgiler' },
            { id: 'experience', label: 'İş Deneyimi' },
            { id: 'education', label: 'Eğitim' },
            { id: 'extra', label: 'Diller & Sertifikalar' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              style={{
                backgroundColor: activeTab === tab.id ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                border: activeTab === tab.id ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                color: activeTab === tab.id ? '#a5b4fc' : '#64748b',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* İş Deneyimi */}
        {(activeTab === 'all' || activeTab === 'experience') && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Briefcase size={16} color="#818cf8" />
              <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                İş Deneyimi
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {EXPERIENCES.map((exp, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(26, 30, 44, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 10,
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 4 }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f1f5f9' }}>
                      {exp.role} <span style={{ color: '#818cf8', fontWeight: 400 }}>@ {exp.company}</span>
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                      {exp.period} • {exp.location}
                    </span>
                  </div>

                  <ul style={{ paddingLeft: 18, marginTop: 8, color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {exp.tasks.map((task, tIdx) => (
                      <li key={tIdx} style={{ marginBottom: 4 }}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Eğitim */}
        {(activeTab === 'all' || activeTab === 'education') && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <GraduationCap size={16} color="#34d399" />
              <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Eğitim Bilgisi
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {EDUCATIONS.map((edu, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(26, 30, 44, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 10,
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 4 }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f1f5f9' }}>
                      {edu.school}
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                      {edu.period}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#34d399', marginBottom: 8, fontWeight: 500 }}>
                    {edu.degree}
                  </div>

                  <ul style={{ paddingLeft: 18, color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {edu.details.map((detail, dIdx) => (
                      <li key={dIdx} style={{ marginBottom: 4 }}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Diller & Sertifikalar */}
        {(activeTab === 'all' || activeTab === 'extra') && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {/* Diller */}
            <section style={{
              backgroundColor: 'rgba(26, 30, 44, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 10,
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Globe size={16} color="#a78bfa" />
                <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc' }}>
                  Yabancı Diller
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {LANGUAGES.map((lang, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#cbd5e1' }}>{lang.language}</span>
                    <span style={{ color: '#a78bfa', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Sertifikalar */}
            <section style={{
              backgroundColor: 'rgba(26, 30, 44, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 10,
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Award size={16} color="#f59e0b" />
                <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc' }}>
                  Sertifikalar
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CERTIFICATES.map((cert, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                    <div>
                      <div style={{ color: '#cbd5e1' }}>{cert.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{cert.issuer}</div>
                    </div>
                    <span style={{ color: '#f59e0b', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>{cert.date}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
