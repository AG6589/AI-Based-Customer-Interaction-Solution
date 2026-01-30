# Iron Lady AI Assignment

## 📌 Project Overview
This repository delivers the AI-Based Customer Interaction Solution and Internal Automation tools designed for the **Iron Lady** platform.

**Goal:** empower women in their career journeys through intelligent, personalized guidance and automated engagement.

---

## 📂 Project Structure

```text
iron-lady-ai-assignment/
│
├── task1-ai-assistant/             # 🤖 CUSTOMER-FACING CHATBOT
│   └── ironlady-ai-assistant/      # React Application (Premium UI)
│       ├── src/
│       ├── .env                    # API Key configuration
│       └── README.md
│
├── task-2-internal-automation/      # ⚙️ FOLLOW-UP AUTOMATION
│   ├── src/                        # Automation Scripts
│   ├── prompts/                    # Re-engagement Templates
│   │   └── followup_ai_prompt.txt  # Retention Strategy
│   └── README.md                   # Instructions for Task 2
│
└── main-README.md                  # You are here
```

---

## 🚀 Quick Start Guide

### 🟢 Task 1: AI Program Guide Assistant
*A premium chat interface for guiding users to the right program.*

1.  **Navigate:** `cd task1-ai-assistant/ironlady-ai-assistant`
2.  **Install:** `npm install`
3.  **Setup Keys:** Create a `.env` file and add `VITE_GROQ_API_KEY=your_key_here`
4.  **Run:** `npm run dev`
5.  **View:** Open `http://localhost:5173`

> **Note:** The AI Assistant is powered by **Groq (Llama 3)** for ultra-fast responses. Ensure your API key is correct in the `.env` file.

> **Demo Interaction:**
> *   **User:** "I am a working professional and want to learn AI"
> *   **AI:** Recognizes the persona, recommends the Leadership track, and offers counseling.

### 🟡 Task 2: Internal Automation
*An automated script to re-engage potential leads.*

1.  **Navigate:** `cd task-2-internal-automation`
2.  **Run Script:** `node src/followup_automation.js`
3.  **View Output:** Console logs showing personalized follow-up messages.

---

## ✨ Key Features
*   **Persona Recognition:** Detects Students vs. Professionals.
*   **Empathetic Tone:** Aligns with Iron Lady's supportive mission.
*   **Responsive Design:** Works seamlessly on Desktop and Mobile.
*   **Conversion Focus:** Always guides users to the next step (Counseling/Enrollment).

---
*Developed for the Iron Lady AI Assignment.*
