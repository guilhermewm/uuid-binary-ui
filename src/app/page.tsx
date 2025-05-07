'use client';

import { useState } from 'react';
import './forms.css';

export default function Home() {
  // Subtype 3 states
  const [binaryInput3, setBinaryInput3] = useState('');
  const [uuidInput3, setUuidInput3] = useState('');
  const [binaryResult3, setBinaryResult3] = useState('');
  const [uuidResult3, setUuidResult3] = useState('');
  const [binaryError3, setBinaryError3] = useState('');
  const [uuidError3, setUuidError3] = useState('');
  const [loadingBinary3, setLoadingBinary3] = useState(false);
  const [loadingUuid3, setLoadingUuid3] = useState(false);
  const [copiedBinary3, setCopiedBinary3] = useState(false);
  const [copiedUuid3, setCopiedUuid3] = useState(false);

  // Subtype 4 states
  const [binaryInput4, setBinaryInput4] = useState('');
  const [uuidInput4, setUuidInput4] = useState('');
  const [binaryResult4, setBinaryResult4] = useState('');
  const [uuidResult4, setUuidResult4] = useState('');
  const [binaryError4, setBinaryError4] = useState('');
  const [uuidError4, setUuidError4] = useState('');
  const [loadingBinary4, setLoadingBinary4] = useState(false);
  const [loadingUuid4, setLoadingUuid4] = useState(false);
  const [copiedBinary4, setCopiedBinary4] = useState(false);
  const [copiedUuid4, setCopiedUuid4] = useState(false);

  const handleCopy = (text: string, type: 'binary' | 'uuid', subtype: '3' | '4') => {
    navigator.clipboard.writeText(text);
    if (type === 'binary') {
      if (subtype === '3') {
        setCopiedBinary3(true);
        setTimeout(() => setCopiedBinary3(false), 1200);
      } else {
        setCopiedBinary4(true);
        setTimeout(() => setCopiedBinary4(false), 1200);
      }
    } else {
      if (subtype === '3') {
        setCopiedUuid3(true);
        setTimeout(() => setCopiedUuid3(false), 1200);
      } else {
        setCopiedUuid4(true);
        setTimeout(() => setCopiedUuid4(false), 1200);
      }
    }
  };

  const handleBinarySubmit = async (e: React.FormEvent, subtype: '3' | '4') => {
    e.preventDefault();
    const setBinaryError = subtype === '3' ? setBinaryError3 : setBinaryError4;
    const setBinaryResult = subtype === '3' ? setBinaryResult3 : setBinaryResult4;
    const setLoadingBinary = subtype === '3' ? setLoadingBinary3 : setLoadingBinary4;
    const uuidInput = subtype === '3' ? uuidInput3 : uuidInput4;

    setBinaryError('');
    setBinaryResult('');
    setLoadingBinary(true);
    try {
      const response = await fetch(`/api/to-binary?input=${encodeURIComponent(uuidInput)}&subtype=${subtype}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to convert');
      }
      setBinaryResult(data.result);
    } catch (err) {
      setBinaryError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoadingBinary(false);
    }
  };

  const handleUuidSubmit = async (e: React.FormEvent, subtype: '3' | '4') => {
    e.preventDefault();
    const setUuidError = subtype === '3' ? setUuidError3 : setUuidError4;
    const setUuidResult = subtype === '3' ? setUuidResult3 : setUuidResult4;
    const setLoadingUuid = subtype === '3' ? setLoadingUuid3 : setLoadingUuid4;
    const binaryInput = subtype === '3' ? binaryInput3 : binaryInput4;

    setUuidError('');
    setUuidResult('');
    setLoadingUuid(true);
    try {
      const response = await fetch(`/api/to-uuid?input=${encodeURIComponent(binaryInput)}&subtype=${subtype}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to convert');
      }
      setUuidResult(data.result);
    } catch (err) {
      setUuidError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoadingUuid(false);
    }
  };

  return (
    <div style={{ display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 'calc(100% - 60px)',
          padding: '30px' }}>
      <div className="forms-header">UUID &lt;&gt; BinData</div>
      <div className="forms-container">
        {/* Subtype 3 Forms */}
        <div className="form-section">
          <h3 className="subtype-header">Subtype 3</h3>
          <div className="form-card">
            <h2>UUID to Binary</h2>
            <form onSubmit={(e) => handleBinarySubmit(e, '3')}>
              <label htmlFor="uuidInput3">Enter UUID</label>
              <input
                type="text"
                id="uuidInput3"
                value={uuidInput3}
                onChange={e => setUuidInput3(e.target.value)}
                placeholder="e.g., 00112233-4455-6677-8899-aabbccddeeff"
                required
              />
              <button type="submit" disabled={loadingBinary3}>{loadingBinary3 ? 'Loading…' : 'Convert to Binary'}</button>
            </form>
            {(binaryResult3 || binaryError3 || loadingBinary3) && (
              <>
                <div style={{marginTop: 16, fontWeight: 600, color: '#4a5568', fontSize: '1.01rem'}}>Result:</div>
                <div className={`result-box${loadingBinary3 ? ' loading' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {binaryError3 ? (
                      <span style={{ color: '#c53030' }}>{binaryError3}</span>
                    ) : (
                      <>
                        <span>{binaryResult3}</span>
                        {binaryResult3 && !loadingBinary3 && (
                          <span
                            className={`result-copy${copiedBinary3 ? ' copied' : ''}`}
                            onClick={() => handleCopy(binaryResult3, 'binary', '3')}
                            title="Copy to clipboard"
                            tabIndex={0}
                            role="button"
                            aria-label="Copy binary result"
                            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCopy(binaryResult3, 'binary', '3'); }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><rect x="3" y="3" width="13" height="13" rx="2" /></svg>
                            <span className="copy-tooltip">Copied!</span>
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="form-card">
            <h2>Binary to UUID</h2>
            <form onSubmit={(e) => handleUuidSubmit(e, '3')}>
              <label htmlFor="binaryInput3">Enter Binary Data</label>
              <input
                type="text"
                id="binaryInput3"
                value={binaryInput3}
                onChange={e => setBinaryInput3(e.target.value)}
                placeholder="e.g., BinData(3, 'AAAAAAAAAAAAAAAAAAAAAA==')"
                required
              />
              <button type="submit" disabled={loadingUuid3}>{loadingUuid3 ? 'Loading…' : 'Convert to UUID'}</button>
            </form>
            {(uuidResult3 || uuidError3 || loadingUuid3) && (
              <>
                <div style={{marginTop: 16, fontWeight: 600, color: '#4a5568', fontSize: '1.01rem'}}>Result:</div>
                <div className={`result-box${loadingUuid3 ? ' loading' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {uuidError3 ? (
                      <span style={{ color: '#c53030' }}>{uuidError3}</span>
                    ) : (
                      <>
                        <span>{uuidResult3}</span>
                        {uuidResult3 && !loadingUuid3 && (
                          <span
                            className={`result-copy${copiedUuid3 ? ' copied' : ''}`}
                            onClick={() => handleCopy(uuidResult3, 'uuid', '3')}
                            title="Copy to clipboard"
                            tabIndex={0}
                            role="button"
                            aria-label="Copy uuid result"
                            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCopy(uuidResult3, 'uuid', '3'); }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><rect x="3" y="3" width="13" height="13" rx="2" /></svg>
                            <span className="copy-tooltip">Copied!</span>
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Subtype 4 Forms */}
        <div className="form-section">
          <h3 className="subtype-header">Subtype 4</h3>
          <div className="form-card">
            <h2>UUID to Binary</h2>
            <form onSubmit={(e) => handleBinarySubmit(e, '4')}>
              <label htmlFor="uuidInput4">Enter UUID</label>
              <input
                type="text"
                id="uuidInput4"
                value={uuidInput4}
                onChange={e => setUuidInput4(e.target.value)}
                placeholder="e.g., 00112233-4455-6677-8899-aabbccddeeff"
                required
              />
              <button type="submit" disabled={loadingBinary4}>{loadingBinary4 ? 'Loading…' : 'Convert to Binary'}</button>
            </form>
            {(binaryResult4 || binaryError4 || loadingBinary4) && (
              <>
                <div style={{marginTop: 16, fontWeight: 600, color: '#4a5568', fontSize: '1.01rem'}}>Result:</div>
                <div className={`result-box${loadingBinary4 ? ' loading' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {binaryError4 ? (
                      <span style={{ color: '#c53030' }}>{binaryError4}</span>
                    ) : (
                      <>
                        <span>{binaryResult4}</span>
                        {binaryResult4 && !loadingBinary4 && (
                          <span
                            className={`result-copy${copiedBinary4 ? ' copied' : ''}`}
                            onClick={() => handleCopy(binaryResult4, 'binary', '4')}
                            title="Copy to clipboard"
                            tabIndex={0}
                            role="button"
                            aria-label="Copy binary result"
                            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCopy(binaryResult4, 'binary', '4'); }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><rect x="3" y="3" width="13" height="13" rx="2" /></svg>
                            <span className="copy-tooltip">Copied!</span>
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="form-card">
            <h2>Binary to UUID</h2>
            <form onSubmit={(e) => handleUuidSubmit(e, '4')}>
              <label htmlFor="binaryInput4">Enter Binary Data</label>
              <input
                type="text"
                id="binaryInput4"
                value={binaryInput4}
                onChange={e => setBinaryInput4(e.target.value)}
                placeholder="e.g., BinData(4, 'AAAAAAAAAAAAAAAAAAAAAA==')"
                required
              />
              <button type="submit" disabled={loadingUuid4}>{loadingUuid4 ? 'Loading…' : 'Convert to UUID'}</button>
            </form>
            {(uuidResult4 || uuidError4 || loadingUuid4) && (
              <>
                <div style={{marginTop: 16, fontWeight: 600, color: '#4a5568', fontSize: '1.01rem'}}>Result:</div>
                <div className={`result-box${loadingUuid4 ? ' loading' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {uuidError4 ? (
                      <span style={{ color: '#c53030' }}>{uuidError4}</span>
                    ) : (
                      <>
                        <span>{uuidResult4}</span>
                        {uuidResult4 && !loadingUuid4 && (
                          <span
                            className={`result-copy${copiedUuid4 ? ' copied' : ''}`}
                            onClick={() => handleCopy(uuidResult4, 'uuid', '4')}
                            title="Copy to clipboard"
                            tabIndex={0}
                            role="button"
                            aria-label="Copy uuid result"
                            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleCopy(uuidResult4, 'uuid', '4'); }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><rect x="3" y="3" width="13" height="13" rx="2" /></svg>
                            <span className="copy-tooltip">Copied!</span>
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
