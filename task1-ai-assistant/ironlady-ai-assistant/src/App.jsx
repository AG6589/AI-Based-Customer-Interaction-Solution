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
  X,
  PlusCircle,
  HelpCircle
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
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    // Get Groq API Key
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;

    try {
      if (!groqKey) {
        throw new Error("Groq API Key missing. Please add VITE_GROQ_API_KEY to your .env file.");
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updatedMessages.map(msg => ({
              role: msg.role === "ai" ? "assistant" : "user",
              content: msg.content
            }))
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Groq API Error ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

      setMessages(prev => [...prev, { role: 'ai', content: responseText }]);

    } catch (error) {
      console.error("AI Assistant Error Detail:", error);
      let errorMessage = "Sorry, something went wrong. ";

      if (error.message.includes("API Key missing")) {
        errorMessage += "⚠️ Missing Groq API Key.";
      } else {
        errorMessage += `⚠️ ${error.message.split('\n')[0]}`;
      }

      setMessages(prev => [...prev, { role: 'ai', content: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Mobile Header */}
      <div className="mobile-nav">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} />
        </button>
        <h2>Iron Lady AI</h2>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar-container ${sidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <Sparkles className="logo-sparkle" size={24} />
          <h1>Iron Lady AI</h1>
        </div>

        <div className="status-badge">
          <span className="pulse-dot"></span>
          Assistant Online
        </div>

        <div className="sidebar-nav">
          <div className="nav-card">
            <GraduationCap className="card-icon" size={20} />
            <h4>For Students</h4>
            <p>Practical skills and job readiness programs designed for the next generation of women leaders.</p>
          </div>

          <div className="nav-card">
            <Briefcase className="card-icon" size={20} />
            <h4>For Professionals</h4>
            <p>Leadership and advanced technology tracks to accelerate your career growth.</p>
          </div>

          <div className="nav-card">
            <Rocket className="card-icon" size={20} />
            <h4>Our Mission</h4>
            <p>To empower 1 million women through technology and leadership development by 2030.</p>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="help-info">
            <HelpCircle size={16} />
            <span>Need immediate help? Contact our support line for 1-on-1 counseling.</span>
          </div>
          <button className="help-action">Help</button>
        </div>
      </aside>

      {/* Main Interface */}
      <main className="content-area">
        <header className="interface-header">
          <h2>Program Guide Assistant</h2>
          <p>Personalized guidance for your career journey</p>
        </header>

        <section className="chat-window">
          {messages.length === 0 ? (
            <div className="welcome-session">
              <div className="welcome-bubble">
                <div className="robot-avatar">🤖</div>
                <div className="bubble-text">
                  <p>Hello! 😊 Welcome to Iron Lady. I'm your Program Guide Assistant. Whether you're a student, professional, or looking for a career change, I'm here to help you find the perfect path to join our mission of empowering women.</p>
                  <p className="highlight">What can I help you with today?</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="messages-flow">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flow-row ${msg.role}`}>
                  <div className="flow-bubble">
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flow-row ai">
                  <div className="flow-bubble typing">
                    AI is preparing a response...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </section>

        <footer className="input-bar">
          <div className="field-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about programs, mentorship, or enrollment..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button className="submit-btn" onClick={handleSend} disabled={loading || !input.trim()}>
              <Send size={18} />
            </button>
          </div>
          <p className="legal-footer">
            Empowering women through AI and Technology. Next batch starts soon!
          </p>
        </footer>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
}

export default App;
