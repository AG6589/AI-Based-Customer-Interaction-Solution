# Task 1: AI-Based Customer Interaction Solution
## Iron Lady AI Program Guide Assistant

This project is an AI-powered chat assistant designed to guide potential students and professionals seeking career growth through Iron Lady's programs.

### Features
- **Intelligent Routing**: Identifies user background (student, professional, career switcher) to provide personalized recommendations.
- **Friendly Interface**: A premium, responsive chat UI built with React, Vite, and Framer Motion.
- **Clear Guidance**: Always leads the user toward the next step in their journey (counseling or enrollment).

### Structure
- `prompts/`: Contains the core logic defining the AI's behavior.
  - `system_prompt.txt`: Defines the persona and mission.
  - `user_flow_prompt.txt`: Dynamic chat structure.
  - `fallback_prompt.txt`: Handles unclear requirements.
- `src/`: React source code implementation.

### How to Run
1. Navigate to this directory: `cd task-1-ai-customer-assistant`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

### Demo Script
> “This AI assistant improves Iron Lady’s customer experience by guiding users clearly, reducing confusion, and supporting counsellors.”
