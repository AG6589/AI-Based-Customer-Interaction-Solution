# Task 2: Internal Automation (CRM AI)

## 🎯 Iron Lady Follow-up AI Assistant

This tool automates the re-engagement process for women who have shown interest in Iron Lady programs but haven't enrolled. It uses a **"Strong Persona"** AI to generate warm, professional, and conversion-focused messages suitable for WhatsApp or Email.

### ✨ Key Features
- **Strong Persona Rule**: The AI never badgers; it asks *once* and offers *one* clear next step.
- **Context-Aware**: Uses the prospect's background and history to personalize the message.
- **Empowerment Focused**: Tone is always encouraging ("Antigravity" style).

### 📂 Structure
- `prompts/followup_ai_prompt.txt`: The **System Prompt** defining the Iron Lady persona and strict rules.
- `src/followup_automation.js`: Node.js script simulating how a CRM would use this prompt to generate messages for a list of leads.

### 🚀 How to Run the Demo
1. Open this folder in your terminal.
2. Run the automation script:
   ```bash
   node src/followup_automation.js
   ```

### 🧠 Logic Explanation
The script reads user data and constructs a context block:
```javascript
const promptData = `
Previous interest: AI Career Transition Program
Last step taken: Viewed program details but did not enroll
Background: Non-technical professional with 3 years experience
`;
```
This context is sent along with the robust System Prompt to the AI, ensuring high-quality, non-repetitive outputs.
