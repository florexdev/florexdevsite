import React from 'react';
import { SKILL_CATEGORIES } from '../../data/systemData';
import { Code2, Layout, Server, Wrench } from 'lucide-react';

export const SkillsApp: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    if (category.includes('Frontend')) return <Layout size={16} color="#38bdf8" />;
    if (category.includes('Backend')) return <Server size={16} color="#34d399" />;
    return <Wrench size={16} color="#a78bfa" />;
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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: 16,
        marginBottom: 20
      }}>
        <Code2 size={22} color="#34d399" />
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
            Yetenekler & Teknolojiler
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Aktif olarak kullandığım ve geliştirmekte olduğum teknolojiler
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'rgba(26, 36, 54, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: 10,
              padding: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              {getCategoryIcon(cat.category)}
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f1f5f9' }}>
                {cat.category}
              </h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 10
            }}>
              {cat.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  style={{
                    backgroundColor: 'rgba(15, 20, 31, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 6,
                    padding: '8px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 500 }}>
                    {item.name}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                    {item.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
