# 📋 WEEK 7 INSTRUCTOR PACKET
**Session 7: API Integration & AI Features**

## 🎯 LEARNING OBJECTIVES
By the end of this session, students will:
- ✅ Understand APIs and how applications communicate
- ✅ Implement asynchronous programming with async/await
- ✅ Create a working AI chat interface
- ✅ Handle API errors and loading states gracefully
- ✅ Integrate AI responses with data context

---

## ⏰ DETAILED SESSION TIMELINE

### 0:00 - 0:10: Welcome & Check-In (10 minutes)
**Your Role**: Bridge from algorithmic insights to APIs and AI intelligence

**Ice Breaker**: "If you could ask an AI any question about data, what would it be?"

"what do you know about using APIs?"

**Homework Review**:
- Students share insights from different datasets
- Highlight creative algorithm modifications
- Discuss: "How could AI make these insights even better?"

**AI Excitement Building**: Show examples of ChatGPT, Claude, or other AI analyzing data

---

### 0:10 - 0:30: Concept Overview (20 minutes)
**Your Role**: Demystify APIs and async programming

#### **What Are APIs? (5 minutes)**
**Real-World Analogy**: APIs are like restaurant waiters
- You (your app) sit at a table
- Waiter (API) takes your order to the kitchen
- Kitchen (AI service) prepares your food (response)
- Waiter brings back your food

**Technical Definition**:
- **A**pplication **P**rogramming **I**nterface
- A way for different software to talk to each other
- You send a request, get a response back

**Examples Students Know**:
- Weather apps get data from weather APIs
- Social media apps use login APIs
- Maps apps use location APIs

#### **Asynchronous Programming (8 minutes)**
**The Problem**: Some operations take time
```javascript
// ❌ This would freeze the browser
const response = waitForAIResponse(); // Takes 3 seconds
console.log('This runs after 3 seconds');
```

**The Solution**: Async/await
```javascript
// ✅ This doesn't freeze the browser
const getAIResponse = async () => {
  setLoading(true);
  const response = await fetch('/api/ai');
  const data = await response.json();
  setLoading(false);
  return data;
};
```

**Key Concepts**:
- `async` functions can wait for things
- `await` pauses execution until promise resolves
- Loading states keep users informed
- Error handling prevents crashes

#### **Mock AI Implementation (7 minutes)**
**Why Start with Mock?**
- Learn patterns without API complexity
- No API keys or costs needed
- Focus on UI and user experience
- Easy to test different scenarios

**Mock AI Pattern**:
```javascript
const mockAIResponse = (question) => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      if (question.includes('average')) {
        resolve('The average value in your dataset is 78.3, which indicates...');
      } else if (question.includes('trend')) {
        resolve('I can see a positive trend in your data, with growth of...');
      } else {
        resolve('That's an interesting question about your data...');
      }
    }, 1500); // 1.5 second delay
  });
};
```

### 1. HTTP Methods: The Basics
- **GET**: Retrieve data (e.g., get messages)
- **POST**: Send new data (e.g., send a chat message)
- **PUT/PATCH**: Update data
- **DELETE**: Remove data

### 2. Why Use Express and axios?
- **Express**: Used on the backend (Node.js) to create API endpoints.
- **axios**: Used on the frontend (React) to call those endpoints.
- **Where to put them:**
  - Express code goes in your server files (e.g., `server.js` or backend folder).
  - axios code goes in your React component (e.g., `ChatInterface`).

### 3. How to Call an API and Get a Response
```js
// In your React chat component
import axios from 'axios';

const sendMessage = async (text) => {
  const res = await axios.post('/api/messages', { text });
  // res.data contains the response from backend
};
```

### 4. How to Create an API Endpoint (Express Example)
```js
// In your Express backend
app.post('/api/messages', (req, res) => {
  const { text } = req.body;
  // Save message, then respond
  res.json({ message: text });
});
```

### 5. How to Test APIs with Postman
- Download and open Postman.
- Enter your API URL (e.g., `http://localhost:3000/api/messages`).
- Choose method (GET or POST).
- For POST, add JSON body: `{ "text": "Hello" }`
- Click Send and see the response.

### 6. Live Coding: Connect Chat UI to Backend (Step-by-Step)

**Goal:**
Send a chat message from your React UI to your Express backend and display the response.

- Make sure your Express server from last week is running and has a POST `/api/messages` endpoint.

#### Step 2: Update Your Chat Component
1. **Add the user's message to the chat history:**
   ```js
   setMessages(prev => [...prev, { type: 'user', content: input }]);
   ```

**What does this mean?**
- `setMessages` is a React state setter for your chat history (an array of messages).
- The `prev => [...prev, newMessage]` syntax is an arrow function that takes the previous state (`prev`) and returns a new array with all previous messages, plus the new one at the end.
- This ensures you always keep the full chat history, and React updates the UI with the new message.
2. **POST the message to your backend using axios:**
   ```js
   const res = await axios.post('/api/messages', { text: input });
   ```
3. **Add the backend's response to the chat:**
   ```js
   setMessages(prev => [...prev, { type: 'ai', content: res.data.text }]);
   ```
4. **Clear the input and loading state as needed.**

- Type a message in your chat UI and confirm you see both your message and the AI response from the backend.

If you get errors, check your backend is running and the endpoint matches.

---

### 0:30 - 1:15: Build Time (45 minutes)
**Your Role**: Guide AI chat interface creation step-by-step

#### **Phase 1: Create Basic Chat Interface (20 minutes)**

**Student Task**: Create `src/components/MockAIChat.tsx`

**Step 1** (5 minutes): Component setup and state
```tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Bot, User, Send } from 'lucide-react';

const MockAIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Data Assistant (Mock)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Chat interface will go here */}
      </CardContent>
    </Card>
  );
};

export default MockAIChat;
```

**Step 2** (10 minutes): Add mock AI response logic
```tsx
const MockAIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock AI that responds based on keywords
  const getMockResponse = async (question) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('average') || lowerQ.includes('mean')) {
      return "Based on your data, the average value appears to be in the mid-range. This suggests a balanced distribution with most values clustering around the center.";
    }
    
    if (lowerQ.includes('trend') || lowerQ.includes('pattern')) {
      return "I can see an interesting upward trend in your data! There appears to be consistent growth in the later periods, which could indicate improving performance or seasonal effects.";
    }
    
    if (lowerQ.includes('highest') || lowerQ.includes('maximum') || lowerQ.includes('peak')) {
      return "The highest value in your dataset represents a peak performance period. This could indicate optimal conditions or a particularly successful time period worth studying further.";
    }
    
    if (lowerQ.includes('lowest') || lowerQ.includes('minimum')) {
      return "The minimum value might represent a challenging period or starting point. Understanding what caused this low point could provide valuable insights for improvement.";
    }
    
    if (lowerQ.includes('why') || lowerQ.includes('reason')) {
      return "While I can see the patterns in your numbers, determining the 'why' requires domain knowledge. Consider external factors like seasonality, market conditions, or operational changes during those periods.";
    }
    
    return "That's an interesting question about your data! The patterns I see suggest there are meaningful insights to explore. Could you be more specific about what aspect interests you most?";
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    
    try {
      // Get AI response
      const aiResponse = await getMockResponse(currentInput);
      
      // Add AI message
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "Sorry, I'm having trouble processing your request right now. Please try again!",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Data Assistant (Mock)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Chat display and input will go here */}
      </CardContent>
    </Card>
  );
};
```

**Step 3** (5 minutes): Add chat display and input
```tsx
// Replace the CardContent with:
<CardContent className="space-y-4">
  {/* Chat Messages */}
  <div className="h-64 overflow-y-auto space-y-3 p-3 bg-gray-50 rounded">
    {messages.length === 0 ? (
      <div className="text-center text-gray-500 mt-8">
        <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>Ask me anything about your data!</p>
        <p className="text-sm mt-1">Try: "What's the average?" or "Do you see any trends?"</p>
      </div>
    ) : (
      messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
            msg.type === 'user' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white border shadow-sm'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              {msg.type === 'user' ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
              <span className="text-xs opacity-75">
                {msg.type === 'user' ? 'You' : 'AI Assistant'}
              </span>
            </div>
            <p className="text-sm">{msg.content}</p>
          </div>
        </div>
      ))
    )}
    
    {loading && (
      <div className="flex justify-start">
        <div className="bg-white border shadow-sm max-w-xs px-3 py-2 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Bot className="h-4 w-4" />
            <span className="text-xs opacity-75">AI Assistant</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-xs text-gray-500 ml-2">Thinking...</span>
          </div>
        </div>
      </div>
    )}
  </div>
  
  {/* Input Area */}
  <div className="flex gap-2">
    <Input
      placeholder="Ask about your data..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={handleKeyPress}
      disabled={loading}
      className="flex-1"
    />
    <Button onClick={handleSend} disabled={loading || !input.trim()}>
      <Send className="h-4 w-4" />
    </Button>
  </div>
  
  {/* Quick Suggestions */}
  <div className="flex flex-wrap gap-2">
    {['What trends do you see?', 'What\'s the average?', 'Any outliers?', 'Explain the data'].map(suggestion => (
      <Badge 
        key={suggestion}
        variant="outline" 
        className="cursor-pointer hover:bg-gray-100"
        onClick={() => setInput(suggestion)}
      >
        {suggestion}
      </Badge>
    ))}
  </div>
</CardContent>
```

**Your Role During This Phase**:
- Help with async/await syntax
- Explain promise handling and error catching
- Show how loading states improve user experience
- Point out chat UI patterns and best practices

#### **Phase 2: Add to Homepage (10 minutes)**

**Student Task**: Import and display MockAIChat

```tsx
// In src/pages/Index.tsx
import MockAIChat from '@/components/MockAIChat';

// Add after InsightGenerator component
<MockAIChat />
```

**Test the Interface**:
- Try different questions and see responses
- Observe loading animation
- Test suggestion badges
- Verify Enter key functionality

#### **Phase 3: Connect to Data Context (15 minutes)**

**Student Task**: Make AI aware of actual data

**Step 1** (10 minutes): Pass data to AI component
```tsx
// Update MockAIChat to accept data prop
const MockAIChat = ({ data = [] }) => {
  // ... existing code ...

  const getMockResponse = async (question) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerQ = question.toLowerCase();
    
    // Calculate actual statistics if data is available
    if (data.length > 0) {
      const values = data.map(item => 
        typeof item === 'object' ? Object.values(item).find(val => typeof val === 'number') : item
      ).filter(val => typeof val === 'number');
      
      if (values.length > 0) {
        const average = values.reduce((a, b) => a + b, 0) / values.length;
        const max = Math.max(...values);
        const min = Math.min(...values);
        
        if (lowerQ.includes('average') || lowerQ.includes('mean')) {
          return `Based on your actual data, the average value is ${average.toFixed(2)}. This represents the central tendency of your ${values.length} data points.`;
        }
        
        if (lowerQ.includes('highest') || lowerQ.includes('maximum')) {
          return `The highest value in your dataset is ${max}. This represents the peak performance in your data.`;
        }
        
        if (lowerQ.includes('lowest') || lowerQ.includes('minimum')) {
          return `The minimum value in your dataset is ${min}. Understanding this low point could provide insights for improvement.`;
        }
      }
    }
    
    // Fall back to generic responses...
    // ... rest of existing mock responses
  };

  // ... rest of component
};
```

**Step 2** (5 minutes): Update homepage to pass data
```tsx
// In src/pages/Index.tsx, pass the data
<MockAIChat data={data} />
```

---

### 1:15 - 1:45: Group Share/Troubleshooting (30 minutes)
**Your Role**: Facilitate AI interaction testing and learning

#### **AI Chat Testing Round (10 minutes)**
- Students test each other's AI interfaces
- Try various questions and compare responses
- Celebrate working async functionality
- Ask: "What makes AI responses feel intelligent?"

#### **Async Programming Deep Dive (15 minutes)**
**Common Issues & Solutions**:

1. **Promises and async confusion**
```javascript
// ❌ Common mistake
const response = fetch('/api'); // Returns Promise, not data
console.log(response); // [object Promise]

// ✅ Correct approach
const response = await fetch('/api');
const data = await response.json();
console.log(data); // Actual data
```

2. **Error handling**
```javascript
// ❌ No error handling
const response = await fetch('/api'); // Could fail!

// ✅ Proper error handling
try {
  const response = await fetch('/api');
  if (!response.ok) throw new Error('API failed');
  const data = await response.json();
} catch (error) {
  console.error('Something went wrong:', error);
}
```

3. **Loading state management**
```javascript
// ❌ Forgetting to clear loading
setLoading(true);
const response = await fetch('/api'); // If this fails, loading stays true!

// ✅ Always clear loading
setLoading(true);
try {
  const response = await fetch('/api');
  // Handle success
} catch (error) {
  // Handle error
} finally {
  setLoading(false); // Always runs
}
```

#### **Real API Preview (5 minutes)**
**Show Example**: (Don't implement yet, just demonstrate)
```javascript
// What real AI integration looks like
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'user', content: 'Analyze this data: [1,2,3,4,5]' }
    ]
  })
});
```

"Next week we'll replace our mock with real AI!"

---

### 1:45 - 2:00: Wrap Up & Next Steps (15 minutes)
**Your Role**: Celebrate async programming mastery

#### **Major Milestone Achievement (5 minutes)**
"You've built an AI interface!"
- You understand asynchronous programming
- You can handle loading states professionally
- You've created conversational interfaces
- You're ready for real AI integration!

#### **Homework Assignment (5 minutes)**
**Required**: Improve the mock AI responses
```javascript
// Add more sophisticated pattern matching
if (lowerQ.includes('compare') || lowerQ.includes('difference')) {
  return "To compare different parts of your data, I'd look at...";
}

if (lowerQ.includes('predict') || lowerQ.includes('future')) {
  return "Based on the trends I see, future values might...";
}
```

**Challenge Options**:
1. **Easy**: Add more question types and responses
2. **Medium**: Add conversation memory (AI remembers previous questions)
3. **Hard**: Add typing animation for AI responses

### Homework Assignment: Integrate AI Endpoint into Chat Homepage

**Goal:**
Add the backend AI integration to your existing chat homepage.

**Instructions:**
1. Use the chat homepage you already have (e.g., `src/pages/Index.tsx`).
2. When a user sends a message, POST it to the AI endpoint you built (`/api/messages`).
   
  **Note:**
  - In this session, you are building the `/api/messages` endpoint for your chat interface. This endpoint will handle chat messages and return AI responses in a conversational format.
  - Last week (Week 6), you built an `/insight` endpoint for single-shot AI insights for your dashboard.
  - The difference: `/insight` was for one-off data analysis, while `/api/messages` is for ongoing chat between user and AI.
  - For this assignment, POST each chat message to `/api/messages`. Your backend should process the message and return a reply, so the chat UI can display both sides of the conversation.
  - This transition helps you move from single-shot AI insights to a full conversational AI experience.
3. Display both the user's message and the AI response in the chat history.
4. Make sure your Express server is running and matches the endpoint.

**Example:**
```js
// In your chat homepage
const handleSend = async () => {
  if (!input.trim()) return;
  setMessages(prev => [...prev, { type: 'user', content: input }]);
  setInput('');
  setLoading(true);
  const res = await axios.post('/api/messages', { text: input });
  setMessages(prev => [...prev, { type: 'ai', content: res.data.text }]);
  setLoading(false);
};
```

**Test:**
- Try sending a message and confirm you see both your message and the AI reply.

**Extra Challenge:**
- Update your backend to keep track of conversation history or make the AI responses smarter.

#### **Next Week Preview (5 minutes)**
"Next week we add the final polish! You'll learn professional error handling, performance optimization, loading skeletons, and accessibility. We're making your app production-ready!"

---

## 🛠️ INSTRUCTOR PREP CHECKLIST

### Before Session:
- [ ] Review async/await thoroughly
- [ ] Prepare API examples and analogies
- [ ] Test mock AI responses for various inputs
- [ ] Have error scenarios ready to demonstrate

### Materials Needed:
- [ ] Examples of good AI chat interfaces (ChatGPT, Claude)
- [ ] List of test questions for AI interface
- [ ] Error message examples for teaching
- [ ] Real API documentation (for preview)

### Key Teaching Points:
- [ ] Emphasize async programming concepts
- [ ] Show importance of loading states and error handling
- [ ] Connect mock patterns to real AI integration
- [ ] Demonstrate conversational UI best practices

---

## 🆘 TROUBLESHOOTING GUIDE

### Critical Issues:

1. **Async function not awaited**
```javascript
// ❌ Missing await
const handleSend = async () => {
  const response = getMockResponse(input); // Returns Promise!
  setMessages([...messages, response]); // Wrong!
};

// ✅ Proper await
const handleSend = async () => {
  const response = await getMockResponse(input);
  setMessages([...messages, response]);
};
```

2. **State updates in async functions**
```javascript
// ❌ Stale closure issue
const handleSend = async () => {
  setMessages([...messages, userMessage]); // messages might be stale
  const response = await getMockResponse(input);
  setMessages([...messages, aiMessage]); // messages definitely stale!
};

// ✅ Functional updates
const handleSend = async () => {
  setMessages(prev => [...prev, userMessage]);
  const response = await getMockResponse(input);
  setMessages(prev => [...prev, aiMessage]);
};
```

3. **Memory leaks with async operations**
```javascript
// ❌ Component might unmount during async operation
const handleSend = async () => {
  const response = await getMockResponse(input);
  setMessages([...messages, response]); // Error if component unmounted!
};

// ✅ Check if component still mounted (advanced)
useEffect(() => {
  let isMounted = true;
  const handleSend = async () => {
    const response = await getMockResponse(input);
    if (isMounted) {
      setMessages([...messages, response]);
    }
  };
  return () => { isMounted = false; };
}, []);
```

### Learning Issues:

1. **"Promises are confusing"**
   - Use restaurant waiter analogy
   - Show step-by-step promise execution
   - Practice with simple setTimeout examples

2. **"When do I use async/await?"**
   - Any operation that takes time (API calls, file reading, timers)
   - When you see Promise or fetch
   - When you need to wait for something

3. **"Loading states seem unnecessary"**
   - Show examples of apps without loading states (bad UX)
   - Demonstrate with slow network simulation
   - Explain user experience principles

---

## 📝 COMPLETE WORKING SOLUTIONS

### Advanced Mock AI Chat:
```tsx
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Bot, User, Send, Trash2 } from 'lucide-react';

const AdvancedMockAIChat = ({ data = [] }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeData = () => {
    if (data.length === 0) return null;
    
    const values = data.map(item => 
      typeof item === 'object' ? Object.values(item).find(val => typeof val === 'number') : item
    ).filter(val => typeof val === 'number');
    
    if (values.length === 0) return null;
    
    const sum = values.reduce((a, b) => a + b, 0);
    const average = sum / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;
    
    return { values, sum, average, max, min, range, count: values.length };
  };

  const getMockResponse = async (question, context = []) => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const lowerQ = question.toLowerCase();
    const analysis = analyzeData();
    
    // Context-aware responses
    const recentTopics = context.slice(-3).map(q => q.toLowerCase());
    const hasDiscussedTrends = recentTopics.some(q => q.includes('trend'));
    
    if (analysis) {
      // Data-specific responses
      if (lowerQ.includes('average') || lowerQ.includes('mean')) {
        return `Your data has an average of ${analysis.average.toFixed(2)}. This is ${analysis.average > analysis.max * 0.7 ? 'relatively high' : analysis.average < analysis.min * 1.3 ? 'relatively low' : 'in the middle range'} compared to your maximum (${analysis.max}) and minimum (${analysis.min}) values.`;
      }
      
      if (lowerQ.includes('trend') || lowerQ.includes('pattern')) {
        const firstHalf = analysis.values.slice(0, Math.floor(analysis.values.length / 2));
        const secondHalf = analysis.values.slice(Math.floor(analysis.values.length / 2));
        const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        
        const trendDirection = secondAvg > firstAvg * 1.05 ? 'upward' : secondAvg < firstAvg * 0.95 ? 'downward' : 'stable';
        const trendStrength = Math.abs((secondAvg - firstAvg) / firstAvg * 100);
        
        return `I see a ${trendDirection} trend in your data. The second half averages ${secondAvg.toFixed(2)} compared to ${firstAvg.toFixed(2)} in the first half, representing a ${trendStrength.toFixed(1)}% ${trendDirection === 'upward' ? 'increase' : trendDirection === 'downward' ? 'decrease' : 'change'}.`;
      }
      
      if (lowerQ.includes('outlier') || lowerQ.includes('unusual')) {
        const outliers = analysis.values.filter(val => 
          Math.abs(val - analysis.average) > analysis.range * 0.3
        );
        
        if (outliers.length > 0) {
          return `I found ${outliers.length} potential outlier(s): ${outliers.join(', ')}. These values are significantly different from your average of ${analysis.average.toFixed(2)}.`;
        } else {
          return `Your data looks quite consistent! No significant outliers detected. All values fall within a reasonable range around your average of ${analysis.average.toFixed(2)}.`;
        }
      }
      
      if (lowerQ.includes('summary') || lowerQ.includes('overview')) {
        return `Here's your data summary: ${analysis.count} values ranging from ${analysis.min} to ${analysis.max}, with an average of ${analysis.average.toFixed(2)}. The total is ${analysis.sum} and the range is ${analysis.range}.`;
      }
    }
    
    // Contextual responses
    if (hasDiscussedTrends && (lowerQ.includes('why') || lowerQ.includes('cause'))) {
      return "Great question! While I can identify patterns in the numbers, understanding the 'why' requires domain knowledge. Consider external factors like seasonality, market conditions, operational changes, or other business drivers that might explain these trends.";
    }
    
    // Generic responses with personality
    const responses = [
      "That's a fascinating question! Could you tell me more about what specific aspect interests you?",
      "I love diving into data patterns! What particular insight are you hoping to uncover?",
      "Interesting! Are you looking at this from a trend perspective, or are you more interested in specific values?",
      "Great question! Would you like me to focus on the overall patterns or drill down into specific time periods?",
      "I see you're exploring the data thoughtfully. What's driving this particular question?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    
    try {
      const aiResponse = await getMockResponse(currentInput, conversationContext);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setConversationContext(prev => [...prev, currentInput]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I apologize, but I'm having trouble processing your request right now. Could you please try again?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setConversationContext([]);
  };

  const suggestions = [
    "What trends do you see?",
    "What's the average value?",
    "Are there any outliers?",
    "Give me a summary",
    "What's the highest value?",
    "How consistent is the data?"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Data Assistant
          </div>
          {messages.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearChat}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-80 overflow-y-auto space-y-3 p-3 bg-gray-50 rounded">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-12">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">Ask me about your data!</h3>
              <p className="text-sm">I can analyze trends, find outliers, calculate statistics, and more.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border shadow-sm'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.type === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-75">
                      {msg.type === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                    <span className="text-xs opacity-50">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border shadow-sm max-w-[80%] px-4 py-2 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-4 w-4" />
                  <span className="text-xs opacity-75">AI Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-xs text-gray-500">Analyzing your data...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Ask about your data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            disabled={loading}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map(suggestion => (
                <Badge 
                  key={suggestion}
                  variant="outline" 
                  className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  onClick={() => setInput(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedMockAIChat;
```

---

## 📊 ASSESSMENT RUBRIC

**Exceeds Expectations (A)**:
- Creates sophisticated AI chat interface independently
- Implements proper async/await patterns with error handling
- Adds advanced features (conversation memory, data integration)
- Explains asynchronous programming concepts clearly

**Meets Expectations (B)**:
- Creates working AI chat with some guidance
- Successfully implements basic async functionality
- Demonstrates understanding of loading states and user experience
- Connects AI responses to actual data context

**Approaching Expectations (C)**:
- Creates basic chat interface with significant guidance
- Has working async solution but needs help with error handling
- Shows effort with conversational UI concepts

**Needs Support (D)**:
- Unable to create working async interface
- Struggles with Promise and async/await concepts
- Requires additional one-on-one help

---

## 🔍 WHAT TO LOOK FOR

### Students are "getting it" when they:
- Ask about connecting to real AI APIs
- Want to improve AI response quality and intelligence
- Experiment with different conversation patterns
- Understand the connection between async programming and user experience

### Red flags that need attention:
- Confused about Promise vs async/await patterns
- Struggling with state management in async functions
- Not understanding importance of loading states
- Having trouble with error handling concepts

---

**💡 INSTRUCTOR TIP**: This is often the most exciting session for students - they're building something that feels truly intelligent! Emphasize that they're learning the exact patterns used in real AI applications. Many students will want to immediately connect to real APIs, so prepare them for next week's production polish before moving to real integrations.
