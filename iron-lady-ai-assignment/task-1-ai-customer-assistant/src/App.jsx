import { useState, useRef, useEffect } from 'react'
import { Send, User, Bot, Sparkles, GraduationCap, Briefcase, Rocket, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: "Hello! 😊 Welcome to Iron Lady. I'm your Program Guide Assistant. Whether you're a student, professional, or looking for a career change, I'm here to help you find the perfect path to join our mission of empowering women. \n\nWhat can I help you with today?"
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { id: Date.now(), role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateAIResponse(input)
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', content: response }])
      setIsTyping(false)
    }, 1500)
  }

  // Simulated AI Logic based on the USER FLOW PROMPT and FALLBACK PROMPT
  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase()

    // Check for Student + AI (from Example Chat)
    if (input.includes('student') && (input.includes('ai') || input.includes('learn'))) {
      return "That’s great! 😊 \nIron Lady offers beginner-friendly AI and technology programs designed for students like you. You will learn practical skills, get mentorship, and career guidance. \n\nThis program helps you move from learning to job readiness. \n\nWould you like to know the program duration or how enrollment works?"
    }

    // Check for Working Professional
    if (input.includes('working') || input.includes('professional') || input.includes('leadership')) {
      return "Excellent! For working professionals, we recommend our 'Leadership & Professional Growth' track. It's designed to help you break through the glass ceiling with advanced tech and mentorship. \n\nWould you like to speak with a counselor to see how this fits into your current career?"
    }

    // Check for Career Switch
    if (input.includes('switch') || input.includes('restart') || input.includes('new career')) {
      return "Starting fresh is a bold move, and Iron Lady is here to support you! Our 'Career Re-Launch' programs focus on both technical skills and confidence building. \n\nAre you looking to switch specifically into AI or a different tech role?"
    }

    // Fallback logic
    return "To guide you better, I need to understand a little more about you. Are you currently a student, a working professional, or looking to restart your career? 😊"
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <Sparkles className="text-purple-400" size={28} />
          <span className="logo-text">Iron Lady AI</span>
        </div>

        <div className="status-indicator">
          <div className="dot"></div>
          <span>Assistant Online</span>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <GraduationCap size={18} color="#818cf8" />
              <h3>For Students</h3>
            </div>
            <p>Practical skills and job readiness programs designed for the next generation of women leaders.</p>
          </div>

          <div className="sidebar-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Briefcase size={18} color="#818cf8" />
              <h3>For Professionals</h3>
            </div>
            <p>Leadership and advanced technology tracks to accelerate your career growth.</p>
          </div>

          <div className="sidebar-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Rocket size={18} color="#818cf8" />
              <h3>Our Mission</h3>
            </div>
            <p>To empower 1 million women through technology and leadership development by 2030.</p>
          </div>
        </nav>

        <div style={{ marginTop: 'auto' }} className="sidebar-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={16} />
            <p style={{ fontSize: '0.75rem' }}>Need immediate help? Contact our support line for 1-on-1 counseling.</p>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-main">
        <header className="chat-header">
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Program Guide Assistant</h2>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>Personalized guidance for your career journey</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="send-btn" style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem' }}>Help</button>
          </div>
        </header>

        <div className="chat-messages">
          <AnimatePresence>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`message ${m.role}`}
              >
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  {m.role === 'bot' ? <Bot size={20} style={{ marginTop: '2px' }} /> : <User size={20} style={{ marginTop: '2px' }} />}
                  <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="message bot"
                style={{ padding: '0.75rem 1.25rem' }}
              >
                <div style={{ display: 'flex', gap: '4px' }}>
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8' }} />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8' }} />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-container" onSubmit={handleSend}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Ask about programs, mentorship, or enrollment..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="send-btn">
              <Send size={20} />
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', marginTop: '0.75rem' }}>
            Empowering women through AI and Technology. Next batch starts soon!
          </p>
        </form>
      </main>
    </div>
  )
}

export default App
