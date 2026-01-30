import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css';

// ------------------------------------------------------------------
// 🔧 CHANGE 2: Add a STRONG RULE in System Prompt
// ------------------------------------------------------------------
const SYSTEM_PROMPT = `You are Iron Lady AI Program Guide Assistant.

Iron Lady is a women-focused career and leadership platform.
It offers AI, technology, mentorship, and career development programs
for students, working professionals, and career switchers.

Your role:
- Understand the user's background and career goals
- Recommend the most suitable Iron Lady program
- Explain benefits in simple, non-technical language
- Guide the user toward counselling and enrollment

Conversation Rules (VERY IMPORTANT):
1. Ask about the user's background ONLY ONCE.
2. If the user has already shared their role, experience, or goals,
   DO NOT ask for the same information again.
3. After receiving background details, IMMEDIATELY:
   - Recommend a suitable program
   - Explain why it fits the user
   - Clearly explain the next step (counselling or enrollment)

Tone Rules:
- Friendly, supportive, and confident
- Simple English
- No repetition
- No technical jargon

Always end your response by guiding the user to the next step.`;

function App() {
  // 🔧 CHANGE 1: Maintain messages array
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Access environment variable for API Key
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to UI immediately
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      if (!apiKey) {
        // Fallback for demo purposes if no key is provided
        // But we warn the user
        throw new Error("API Key missing. Please add VITE_GEMINI_API_KEY to your .env file.");
      }

      // Initialize Gemini
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_PROMPT
      });

      // Prepare history for Gemini
      // Mapping "role" to Gemini's expected "user" or "model"
      // Note: We pass 'messages' (previous history) to startChat
      // The current 'input' is sent via sendMessage
      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({
        history: history,
      });

      const result = await chat.sendMessage(input);
      const responseText = result.response.text();

      setMessages(prev => [...prev, { role: 'ai', content: responseText }]);

    } catch (error) {
      console.error("Error:", error);
      let errorMessage = "Sorry, something went wrong. Please check your connection.";

      if (error.message.includes("API Key missing")) {
        errorMessage = "⚠️ Missing API Key. Please create a .env file with VITE_GEMINI_API_KEY=your_key_here";
      }

      setMessages(prev => [...prev, { role: 'ai', content: errorMessage }]);
    } finally {
      setLoading(false);
    }
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
        <button onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
}

export default App;
