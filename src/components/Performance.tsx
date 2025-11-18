import React, { useState, useRef } from "react";

function ExpensiveComponent({ value }: { value: number }) {
  const renderCount = useRef(0);
  renderCount.current++;
  return (
    <div style={{ border: '1px solid #aaa', margin: 8, padding: 8 }}>
      <strong>ExpensiveComponent (no memo)</strong><br />
      Value: {value}<br />
      Render count: {renderCount.current}
    </div>
  );
}

const MemoExpensiveComponent = React.memo(function MemoExpensiveComponent({ value }: { value: number }) {
  const renderCount = useRef(0);
  renderCount.current++;
  return (
    <div style={{ border: '1px solid #4caf50', margin: 8, padding: 8 }}>
      <strong>ExpensiveComponent (memo)</strong><br />
      Value: {value}<br />
      Render count: {renderCount.current}
    </div>
  );
});

const Performance = () => {
  const [count, setCount] = useState(0);
  const [unrelated, setUnrelated] = useState(0);

  return (
    <div>
      <h1>Performance Demo: React.memo</h1>
      <p>
        <b>Goal:</b> See how <code>React.memo</code> prevents unnecessary re-renders.<br />
        <b>Try both buttons and watch the render counts below!</b>
      </p>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setCount(c => c + 1)} style={{ marginRight: 8 }}>
          Update <b>value</b> prop (re-renders <u>both</u> components)
        </button>
        <span style={{ fontSize: '0.95em', color: '#555' }}>
          <em>Both components receive the new value and re-render.</em>
        </span>
      </div>
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setUnrelated(u => u + 1)}>
          Update <b>unrelated</b> state (should only re-render <u>non-memo</u>)
        </button>
        <span style={{ fontSize: '0.95em', color: '#555', marginLeft: 8 }}>
          <em>Only the non-memoized component re-renders.</em>
        </span>
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
        <ExpensiveComponent value={count} />
        <MemoExpensiveComponent value={count} />
      </div>
      <div style={{ marginTop: 16 }}>
        <strong>Unrelated state:</strong> {unrelated}
      </div>
      <p style={{ marginTop: 16 }}>
        <em>
          <b>Summary:</b> <br />
          <b>Update value prop</b>: Both components re-render.<br />
          <b>Update unrelated state</b>: Only the non-memoized component re-renders.<br />
          <br />
          <b>React.memo</b> helps avoid unnecessary re-renders when props don't change!
        </em>
      </p>
    </div>
  );
}

export default Performance;