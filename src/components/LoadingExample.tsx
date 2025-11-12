import React, { useEffect, useState } from 'react';

function LoadingExample() {
  const [data, setData] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setData('Here is your loaded data!');
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
        <div className="spinner" style={{ width: 40, height: 40, border: '4px solid #ccc', borderTop: '4px solid #333', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p>Loading...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>Data Loaded!</h2>
      <p>{data}</p>
    </div>
  );
}

export default LoadingExample;
