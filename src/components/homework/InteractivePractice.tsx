// src/components/homework/InteractivePractice.tsx
import { useState } from 'react';

const InteractivePractice = () => {
  // Week 2 Review States
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('white');
  const [isVisible, setIsVisible] = useState(true);
  
  // Week 3 Prep States (Optional Challenge)
  const [isHovering, setIsHovering] = useState(false);
  const [showSaveHint, setShowSaveHint] = useState(false);
  const [savedName, setSavedName] = useState('');

  const resetAll = () => {
    setCount(0);
    setName('');
    setBgColor('white');
    setIsVisible(true);
    setSavedName('');
    setShowSaveHint(false);
  };

  // Week 3 Prep: Smart Counter Messages
  const getCounterMessage = (clickCount) => {
    if (clickCount >= 8) return "React state master! 🏆";
    if (clickCount >= 4) return "You're getting the hang of it! 👍";
    if (clickCount >= 1) return "Just getting started...";
    return "Click the button to begin!";
  };

  // Week 3 Prep: Keyboard Event Handling
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSavedName(name);
      setShowSaveHint(false);
      alert(`Saved: ${name}`);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setShowSaveHint(e.target.value.length > 0);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md" style={{ backgroundColor: bgColor }}>
      <h2 className="text-2xl font-bold mb-6">🎮 Interactive Practice</h2>
      
      {/* Week 2 Review Sections */}
      <div className="space-y-4">
        {/* Smart Counter with Messages */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Smart Counter: {count}</h3>
          <p className="text-sm text-gray-600 mb-2">{getCounterMessage(count)}</p>
          <button 
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            +1
          </button>
        </div>

        {/* Keyboard-Aware Name Input */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Keyboard-Aware Input</h3>
          <input 
            type="text"
            value={name}
            onChange={handleNameChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your name and press Enter"
            className="border p-2 rounded mr-2 w-full mb-2"
          />
          <div className="text-sm space-y-1">
            <p>Characters: {name.length}</p>
            {showSaveHint && <p className="text-blue-600">💡 Press Enter to save!</p>}
            {savedName && <p className="text-green-600">✅ Last saved: {savedName}</p>}
          </div>
        </div>

        {/* Hover-Aware Color Picker */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Hover-Aware Color Picker</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setBgColor('lightblue')}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`px-3 py-2 rounded transition-all duration-200 ${
                isHovering ? 'bg-blue-300 scale-105' : 'bg-blue-200'
              }`}
            >
              Blue {isHovering && '✨'}
            </button>
            <button 
              onClick={() => setBgColor('lightgreen')} 
              className="px-3 py-2 bg-green-200 hover:bg-green-300 hover:scale-105 transition-all duration-200 rounded"
            >
              Green
            </button>
            <button 
              onClick={() => setBgColor('lightcoral')} 
              className="px-3 py-2 bg-red-200 hover:bg-red-300 hover:scale-105 transition-all duration-200 rounded"
            >
              Red
            </button>
            <button 
              onClick={() => setBgColor('white')} 
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 transition-all duration-200 rounded"
            >
              Default
            </button>
          </div>
          {isHovering && (
            <p className="text-sm text-gray-600 mt-2">👆 Hover detected! This is how you'll make interactive table headers.</p>
          )}
        </div>

        {/* Toggle with Enhanced Feedback */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Toggle with Feedback</h3>
          <button 
            onClick={() => setIsVisible(!isVisible)}
            className={`px-4 py-2 text-white rounded transition-all duration-200 ${
              isVisible 
                ? 'bg-purple-500 hover:bg-purple-600' 
                : 'bg-gray-500 hover:bg-gray-600'
            }`}
          >
            {isVisible ? 'Hide Message' : 'Show Message'}
          </button>
          {isVisible && (
            <div className="mt-2 p-3 bg-purple-100 rounded border-l-4 border-purple-500">
              <p className="text-purple-700">🎉 This message uses conditional rendering!</p>
              <p className="text-sm text-purple-600">Perfect for showing/hiding search results next week!</p>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <button 
          onClick={resetAll}
          className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
        >
          🔄 Reset Everything
        </button>
      </div>

      {/* Week 3 Skills Preview */}
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <h4 className="font-semibold text-yellow-800 mb-2">🟡 Week 3 Skills Preview</h4>
        <p className="text-sm text-yellow-700 mb-2">
          The event patterns you just practiced will be used for:
        </p>
        <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
          <li><strong>onClick</strong> → Sort table columns by clicking headers</li>
          <li><strong>onKeyPress</strong> → Search-as-you-type in data tables</li>
          <li><strong>onMouseEnter/Leave</strong> → Interactive hover states for buttons</li>
          <li><strong>Conditional rendering</strong> → Show/hide search results and filters</li>
        </ul>
      </div>
    </div>
  );
};

export default InteractivePractice;