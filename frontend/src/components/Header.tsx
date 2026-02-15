import { useState, useEffect } from 'react';
import './Header.css';

export function Header() {
  const [time, setTime] = useState(new Date());
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 300);
  };

  return (
    <header className="header">
      <div className="header-scanline" />
      <div className="container header-content">
        <div className="header-left">
          <div className="header-brand" onClick={triggerGlitch}>
            <span className={`header-logo ${glitchActive ? 'glitch' : ''}`}>BM-77</span>
            <span className="header-separator">//</span>
            <span className="header-title">BOOKMARK_MANAGER</span>
          </div>
          <div className="header-status">
            <span className="status-indicator pulse" />
            <span className="status-text">SYSTEM ONLINE</span>
          </div>
        </div>
        <div className="header-right">
          <div className="header-meta">
            <span className="meta-item">
              <span className="meta-label">TIME</span>
              <span className="meta-value">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
            </span>
            <span className="meta-separator">|</span>
            <span className="meta-item">
              <span className="meta-label">TZ</span>
              <span className="meta-value">UTC{time.getTimezoneOffset() / -60 >= 0 ? '+' : ''}{time.getTimezoneOffset() / -60}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="header-border" />
    </header>
  );
}
