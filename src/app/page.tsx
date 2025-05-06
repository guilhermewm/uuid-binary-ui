'use client';

import { useState } from 'react';
import './forms.css';

export default function Home() {
  const [binaryInput, setBinaryInput] = useState('');
  const [uuidInput, setUuidInput] = useState('');
  const [binaryResult, setBinaryResult] = useState('');
  const [uuidResult, setUuidResult] = useState('');
  const [error, setError] = useState('');
  const [loadingBinary, setLoadingBinary] = useState(false);
  const [loadingUuid, setLoadingUuid] = useState(false);
  const [copiedBinary, setCopiedBinary] = useState(false);
  const [copiedUuid, setCopiedUuid] = useState(false);

  const handleCopy = (text: string, type: 'binary' | 'uuid') => {
    navigator.clipboard.writeText(text);
    if (type === 'binary') {
      setCopiedBinary(true);
      setTimeout(() => setCopiedBinary(false), 1200);
    } else {
      setCopiedUuid(true);
      setTimeout(() => setCopiedUuid(false), 1200);
    }
  };

  const handleBinarySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBinaryResult('');
    setLoadingBinary(true);
    try {
      const response = await fetch(`/api/to-binary?input=${encodeURIComponent(uuidInput)}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to convert');
      }
      setBinaryResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoadingBinary(false);
    }
  };

  const handleUuidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUuidResult('');
    setLoadingUuid(true);
    try {
      const response = await fetch(`/api/to-uuid?input=${encodeURIComponent(binaryInput)}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to convert');
      }
      setUuidResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoadingUuid(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh' }}>
      <div className="forms-header">UUID Converter</div>
      <div className="forms-container">
        <div className="form-card">
          <h2>UUID to Binary</h2>
          <form onSubmit={handleBinarySubmit}>
            <label htmlFor="uuidInput">Enter UUID</label>
            <input
              type="text"
              id="uuidInput"
              value={uuidInput}
              onChange={e => setUuidInput(e.target.value)}
              placeholder="e.g., 00112233-4455-6677-8899-aabbccddeeff"
              required
            />
            <button type="submit" disabled={loadingBinary}>{loadingBinary ? 'Loading…' : 'Convert to Binary'}</button>
          </form>
          {(binaryResult || loadingBinary) && (
            <>
              <div style={{marginTop: 16, fontWeight: 600, color: '#4a5568', fontSize: '1.01rem'}}>Result:</div>
              <div className={`result-box${loadingBinary ? ' loading' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>{binaryResult}</span>
                  {binaryResult && !loadingBinary && (
                    <>
                      <span
                        className={`result-copy${copiedBinary ? ' copied' : ''}`}
                        onClick={() => handleCopy(binaryResult, 'binary')}
                        title="Copy to clipboard"
                        tabIndex={0}
                        role="button"
                        aria-label="Copy binary result"
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCopy(binaryResult, 'binary'); }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><rect x="3" y="3" width="13" height="13" rx="2" /></svg>
                        <span className="copy-tooltip">Copied!</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="form-card">
          <h2>Binary to UUID</h2>
          <form onSubmit={handleUuidSubmit}>
            <label htmlFor="binaryInput">Enter Binary Data</label>
            <input
              type="text"
              id="binaryInput"
              value={binaryInput}
              onChange={e => setBinaryInput(e.target.value)}
              placeholder="e.g., BinData(3, 'AAAAAAAAAAAAAAAAAAAAAA==')"
              required
            />
            <button type="submit" disabled={loadingUuid}>{loadingUuid ? 'Loading…' : 'Convert to UUID'}</button>
          </form>
          {(uuidResult || loadingUuid) && (
            <>
              <div style={{marginTop: 16, fontWeight: 600, color: '#4a5568', fontSize: '1.01rem'}}>Result:</div>
              <div className={`result-box${loadingUuid ? ' loading' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span>{uuidResult}</span>
                  {uuidResult && !loadingUuid && (
                    <>
                      <span
                        className={`result-copy${copiedUuid ? ' copied' : ''}`}
                        onClick={() => handleCopy(uuidResult, 'uuid')}
                        title="Copy to clipboard"
                        tabIndex={0}
                        role="button"
                        aria-label="Copy uuid result"
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCopy(uuidResult, 'uuid'); }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><rect x="3" y="3" width="13" height="13" rx="2" /></svg>
                        <span className="copy-tooltip">Copied!</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        {error && (
          <div className="error-box">
            <div>{error}</div>
          </div>
        )}
      </div>
    </div>
  );
}
