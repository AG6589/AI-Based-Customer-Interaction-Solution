import { useState } from 'react';
import './App.css';

// Simple Mock API for Demo Purposes (since we don't have a live API key handy in this env)
// In a real scenario, this would call OpenAI/Gemini
const mockAIResponse = (input) => {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes('working professional') && lowerInput.includes('switch to ai')) {
    return "That's a great decision! As a working professional, you can leverage your experience while learning AI. \n\nI recommend our 'AI for Leadership & Career Switch' program. It is designed for professionals like you who want to transition into tech without starting from scratch.\n\nWould you like to book a free counselling session to discuss the curriculum?";
  }

  if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
    return "Hi, how can I help you?";
  }

  return "I understand. Iron Lady offers various programs for students, professionals, and career switchers. Could you tell me a bit more about your current role so I can guide you better?";
};

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const aiResponseText = mockAIResponse(input);
      setMessages(prev => [...prev, { role: 'ai', content: aiResponseText }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Iron Lady AI Assistant</h1>
      </header>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <strong>{msg.role === 'user' ? 'User' : 'AI'}: </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</span>
          </div>
        ))}
        {loading && <div className="message ai">AI is typing...</div>}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
