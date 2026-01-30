import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Send,
  Sparkles,
  GraduationCap,
  Briefcase,
  Rocket,
  MessageSquare,
  Menu,
  X
} from 'lucide-react';
import './App.css';

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
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      if (!apiKey) {
        throw new Error("API Key missing. Please add VITE_GEMINI_API_KEY to your .env file.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_PROMPT
      });

      const history = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(input);
      const responseText = result.response.text();

      setMessages(prev => [...prev, { role: 'ai', content: responseText }]);

    } catch (error) {
      console.error("Error:", error);
      let errorMessage = "Sorry, something went wrong. Please check your connection.";
      if (error.message.includes("API Key missing")) {
        errorMessage = "⚠️ Missing API Key. Please create a .env file locally.";
      }
      setMessages(prev => [...prev, { role: 'ai', content: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Sparkles className="logo-icon" size={28} />
          <h1>Iron Lady AI</h1>
        </div>

        <div className="status-indicator">
          <span className="dot"></span>
          Assistant Online
        </div>

        <div className="sidebar-cards">
          <div className="info-card">
            <div className="card-icon"><GraduationCap size={20} /></div>
            <h3>For Students</h3>
            <p>Practical skills and job readiness programs designed for the next generation of women leaders.</p>
          </div>

          <div className="info-card">
            <div className="card-icon"><Briefcase size={20} /></div>
            <h3>For Professionals</h3>
            <p>Leadership and advanced technology tracks to accelerate your career growth.</p>
          </div>

          <div className="info-card">
            <div className="card-icon"><Rocket size={20} /></div>
            <h3>Our Mission</h3>
            <p>To empower 1 million women through technology and leadership development by 2030.</p>
          </div>
        </div>

        <div className="sidebar-footer">
          <p>ℹ️ Need immediate help? Contact our support line for 1-on-1 counseling.</p>
          <button className="help-btn">Help</button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-interface">
        <header className="main-header">
          <h2>Program Guide Assistant</h2>
          <p>Personalized guidance for your career journey</p>
        </header>

        <div className="chat-messages-area">
          {messages.length === 0 ? (
            <div className="welcome-card">
              <div className="welcome-header">
                <MessageSquare className="welcome-icon" size={24} />
                <h3>Hello! 👋</h3>
              </div>
              <p>
                Welcome to Iron Lady. I'm your Program Guide Assistant. Whether you're a student,
                professional, or looking for a career change, I'm here to help you find the
                perfect path to join our mission of empowering women.
              </p>
              <p className="prompt-text">What can I help you with today?</p>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message-row ${msg.role}`}>
                  <div className="message-bubble">
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="message-row ai">
                  <div className="message-bubble loading">
                    <span className="dot-anim">.</span>
                    <span className="dot-anim">.</span>
                    <span className="dot-anim">.</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about programs, mentorship, or enrollment..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()} className="send-btn">
              <Send size={20} />
            </button>
          </div>
          <p className="footer-copyright">
            Empowering women through AI and Technology. Next batch starts soon!
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
