import React from "react";
import { useState } from 'react';

const mockAIResponse = (question) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (question.toLowerCase().includes('average')) {
        resolve('The average value in your dataset is 78.3.');
      } else if (question.toLowerCase().includes('trend')) {
        resolve('There is a positive trend in your data.');
      } else {
        resolve("That's an interesting question about your data.");
      }
    }, 1500);
  });
};

const MockAIChatSolution = () => {

  // messages: an array of chat messages (user and AI)
  // setMessages: function to update the messages array
  const [messages, setMessages] = useState([]);

  // input: the current value of the input box
  // setInput: function to update the input value
  const [input, setInput] = useState('');

  // loading: whether the AI is "thinking" (waiting for a response)
  // setLoading: function to update loading state
  const [loading, setLoading] = useState(false);

  // handleSend will be defined in the next step


  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setMessages((prev) => [...prev, { type: 'user', content: input }]);
    setLoading(true);
    setInput('');
    try {
      const aiReply = await mockAIResponse(input);
      setMessages((prev) => [...prev, { type: 'ai', content: aiReply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { type: 'ai', content: 'Error getting AI response.' }]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    // The main container for the chat UI, centered and with a max width
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      {/* Chat history area */}
      <div style={{ minHeight: 200, border: '1px solid #ccc', padding: 16, marginBottom: 8 }}>
        {/* If there are no messages, show a prompt to the user */}
        {messages.length === 0 && <div>Ask me about your data!</div>}

        {/* Map over the messages array and display each message */}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{ textAlign: msg.type === 'user' ? 'right' : 'left' }} // User messages on the right, AI on the left
          >
            <b>{msg.type === 'user' ? 'You' : 'AI'}:</b> {msg.content}
          </div>
        ))}

        {/* If loading, show a message that the AI is thinking */}
        {loading && <div>AI is thinking...</div>}
      </div>

      {/* Input box for typing a question */}
      <input
        value={input} // The value of the input box is controlled by the input state
        onChange={e => setInput(e.target.value)} // Update input state as the user types
        onKeyDown={e => { if (e.key === 'Enter') handleSend(); }} // Send message on Enter key
        placeholder="Type your question..."
        style={{ width: '70%', marginRight: 8 }} // Style the input box
        disabled={loading} // Disable input while waiting for AI
      />

      {/* Send button */}
      <button
        onClick={handleSend} // Call handleSend when clicked
        disabled={loading || !input.trim()} // Disable if loading or input is empty
      >
        Send
      </button>
    </div>
  );
};

export default MockAIChatSolution;