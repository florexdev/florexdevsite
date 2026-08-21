import React, { useState } from 'react';
import { PROJECTS } from '../../data/systemData';
import { soundManager } from '../../audio/soundManager';
import { FolderGit2, ExternalLink, Globe, Gamepad2, GitPullRequest } from 'lucide-react';

export const ProjectsApp: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'Web' | 'Game' | 'Open Source'>('ALL');

  const filteredProjects = filter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(p => p.type === filter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Web':
        return <Globe size={15} color="#38bdf8" />;
      case 'Game':
        return <Gamepad2 size={15} color="#f472b6" />;
      case 'Open Source':
        return <GitPullRequest size={15} color="#34d399" />;
      default:
        return <Globe size={15} color="#38bdf8" />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'rgba(15, 20, 31, 0.95)',
      color: '#e2e8f0',
      overflowY: 'auto',
      padding: '20px 24px'
    }}>
      {/* Header & Filter Pills */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: 16,
        marginBottom: 20,
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <FolderGit2 size={20} color="#38bdf8" />
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
              Projeler
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Geliştirdiğim web uygulamaları, oyun ve açık kaynak katkıları
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {(['ALL', 'Web', 'Game', 'Open Source'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => {
                soundManager.playClick();
                setFilter(tab);
              }}
              style={{
                backgroundColor: filter === tab ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: filter === tab ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                color: filter === tab ? '#38bdf8' : '#94a3b8',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {tab === 'ALL' ? 'Tümü' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16
      }}>
        {filteredProjects.map(project => (
          <div
            key={project.id}
            style={{
              backgroundColor: 'rgba(26, 36, 54, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: 10,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
              e.currentTarget.style.backgroundColor = 'rgba(26, 36, 54, 0.65)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
              e.currentTarget.style.backgroundColor = 'rgba(26, 36, 54, 0.45)';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#94a3b8',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  padding: '2px 8px',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  {getTypeIcon(project.type)}
                  <span>{project.type}</span>
                </span>

                {project.badge && (
                  <span style={{
                    fontSize: '0.72rem',
                    color: '#34d399',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {project.badge}
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f8fafc', marginBottom: 6 }}>
                {project.title}
              </h3>

              <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: 14 }}>
                {project.description}
              </p>
            </div>

            <div>
              {/* Tech stack */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#cbd5e1',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      padding: '2px 6px',
                      borderRadius: 4
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#38bdf8',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <span>{project.linkText || 'Projeyi İncele'}</span>
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
