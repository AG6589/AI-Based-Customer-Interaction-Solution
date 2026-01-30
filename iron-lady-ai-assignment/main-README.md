# Iron Lady AI Assignment

## 🌐 Live Demo
**[Launch AI Assistant →](https://ag6589.github.io/AI-Based-Customer-Interaction-Solution/)**

---

## 📌 Project Overview
This repository delivers the AI-Based Customer Interaction Solution and Internal Automation tools designed for the **Iron Lady** platform.

**Goal:** Empower women in their career journeys through intelligent, personalized guidance and automated engagement.

---

## 📂 Project Structure

```text
AI-Based-Customer-Interaction-Solution/
│
├── task1-ai-assistant/             # 🤖 CUSTOMER-FACING CHATBOT
│   └── ironlady-ai-assistant/      # React Application (Premium UI)
│       ├── src/                    # App logic & UI components
│       ├── .env                    # API configuration
│       └── README.md               # Task 1 Documentation
│
└── iron-lady-ai-assignment/
    ├── task-2-internal-automation/ # ⚙️ FOLLOW-UP AUTOMATION
    │   ├── src/                    # Node.js automation script
    │   ├── prompts/                # AI Persona & Rules
    │   └── README.md               # Task 2 Documentation
    └── main-README.md              # Global Project Overview
```

---

## 🚀 Quick Start Guide

### 🟢 Task 1: AI Program Guide Assistant
*A premium chat interface powered by **Groq (Llama 3.3)** for lightning-fast career guidance.*

1.  **Navigate:** `cd task1-ai-assistant/ironlady-ai-assistant`
2.  **Install:** `npm install`
3.  **Setup Keys:** Create a `.env` file and add `VITE_GROQ_API_KEY=your_key_here`
4.  **Run:** `npm run dev`
5.  **View:** Open `http://localhost:5173`

> **Demo Interaction:**
> *   **User:** "I am a working professional and want to learn AI"
> *   **AI:** Detects the "Professional" persona, recommends the Leadership/Tech track, and offers a counseling session.

### 🟡 Task 2: Internal Automation
*An automated re-engagement script for stalled leads using "Strong Persona" logic.*

1.  **Navigate:** `cd iron-lady-ai-assignment/task-2-internal-automation`
2.  **Run Script:** `node src/followup_automation.js`
3.  **View Output:** Console logs showing personalized, non-intrusive re-engagement messages.

---

## ✨ Key Features
*   **Persona Recognition:** Dynamically adapts responses for Students, Professionals, and Switchers.
*   **Empathetic Tone:** Aligns with Iron Lady's mission of supportive empowerment.
*   **Responsive UX:** Premium Glassmorphism design that works on mobile and desktop.
*   **Conversion Optimization:** Always guides the user to a concrete next step (Counseling/Enrollment).
*   **High Performance:** Integrated with Groq's Llama 3.3 for sub-second response times.

---
*Developed for the Iron Lady AI Assignment.*
