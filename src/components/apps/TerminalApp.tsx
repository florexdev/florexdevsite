import React, { useState, useRef, useEffect } from 'react';
import { executeTerminalCommand } from '../../data/terminalCommands';
import { soundManager } from '../../audio/soundManager';
import { Terminal as TermIcon } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/systemData';

interface TerminalAppProps {
  onOpenApp?: (appId: string) => void;
}

interface HistoryItem {
  command: string;
  output: string;
}

export const TerminalApp: React.FC<TerminalAppProps> = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'neofetch',
      output: `\x1b[34m
   /\\       \x1b[1;37m${PERSONAL_INFO.nickname}\x1b[0m@\x1b[34mburak-thinkpad\x1b[0m
  /  \\      ------------------------------
 /\\   \\     \x1b[36mİsim:\x1b[0m    ${PERSONAL_INFO.name}
/      \\    \x1b[36mUnvan:\x1b[0m   ${PERSONAL_INFO.title}
/   ,,   \\  \x1b[36mEğitim:\x1b[0m  Bilecik Şeyh Edebali Üni (Bilgisayar Prog.)
/   |  |  -\\ \x1b[36mKonum:\x1b[0m   ${PERSONAL_INFO.location}
/_-''    ''-_\\\x1b[36mOS:\x1b[0m      Arch Linux x86_64
            \x1b[36mShell:\x1b[0m   zsh 5.9
            \x1b[36mEditör:\x1b[0m  VS Code / Neovim
\x1b[0m
Komut listesi için '\x1b[34mhelp\x1b[0m' yazabilirsiniz.`
    }
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdText: string) => {
    soundManager.playKey();
    const result = executeTerminalCommand(cmdText);

    if (result.action === 'clear') {
      setHistory([]);
    } else {
      setHistory(prev => [...prev, { command: cmdText, output: result.output }]);
    }

    if (cmdText.trim()) {
      setCmdHistory(prev => [cmdText, ...prev]);
    }
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIndex = historyIndex - 1;
        setHistoryIndex(prevIndex);
        setInput(cmdHistory[prevIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else {
      soundManager.playKey();
    }
  };

  // ANSI color formatting
  const renderFormattedOutput = (text: string) => {
    const parts = text.split(/(\x1b\[[0-9;]*m)/g);
    let currentColor = '#cbd5e1';
    let isBold = false;

    return parts.map((part, index) => {
      if (part.startsWith('\x1b[')) {
        if (part === '\x1b[0m') {
          currentColor = '#cbd5e1';
          isBold = false;
        } else if (part.includes('31m')) {
          currentColor = '#f87171';
        } else if (part.includes('32m')) {
          currentColor = '#34d399';
        } else if (part.includes('34m')) {
          currentColor = '#60a5fa';
        } else if (part.includes('36m')) {
          currentColor = '#38bdf8';
        } else if (part.includes('37m')) {
          currentColor = '#f8fafc';
        }
        if (part.includes('1;')) {
          isBold = true;
        }
        return null;
      }
      return (
        <span key={index} style={{ color: currentColor, fontWeight: isBold ? 600 : 400 }}>
          {part}
        </span>
      );
    });
  };

  const quickCommands = ['help', 'skills', 'projects', 'experience', 'education', 'contact', 'clear'];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#090d15',
        fontFamily: 'var(--font-mono)',
        fontSize: '13px'
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Quick Command Bar */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          padding: '6px 12px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          backgroundColor: 'rgba(18, 24, 38, 0.6)',
          overflowX: 'auto',
          alignItems: 'center',
          flexShrink: 0
        }}
      >
        <span style={{ color: '#64748b', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
          <TermIcon size={12} /> Hızlı Komutlar:
        </span>
        {quickCommands.map(cmd => (
          <button
            key={cmd}
            onClick={(e) => {
              e.stopPropagation();
              handleCommand(cmd);
            }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#94a3b8',
              borderRadius: 4,
              padding: '2px 8px',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#38bdf8';
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#94a3b8';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Output */}
      <div
        className="terminal-screen"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 16
        }}
      >
        {history.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94a3b8', marginBottom: 4 }}>
              <span style={{ color: '#60a5fa', fontWeight: 600 }}>florexdev</span>
              <span style={{ color: '#64748b' }}>in</span>
              <span style={{ color: '#38bdf8' }}>~</span>
              <span style={{ color: '#64748b' }}>❯</span>
              <span style={{ color: '#f8fafc', fontWeight: 500 }}>{item.command}</span>
            </div>
            {item.output && (
              <pre
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  margin: 0,
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  lineHeight: 1.5
                }}
              >
                {renderFormattedOutput(item.output)}
              </pre>
            )}
          </div>
        ))}

        {/* Input prompt */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{ color: '#60a5fa', fontWeight: 600 }}>florexdev</span>
          <span style={{ color: '#64748b' }}>in</span>
          <span style={{ color: '#38bdf8' }}>~</span>
          <span style={{ color: '#64748b' }}>❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              padding: 0
            }}
            autoFocus
            spellCheck={false}
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
