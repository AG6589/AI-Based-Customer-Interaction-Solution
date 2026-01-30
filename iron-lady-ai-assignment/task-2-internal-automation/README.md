# Task 2: Internal Automation
## Follow-up AI Assistant

This component focuses on internal operations, specifically automating the re-engagement process for potential leads.

### Features
- **Automated Re-engagement**: Uses user interaction history to generate personalized follow-up messages.
- **Tone Consistency**: Ensures all communications align with Iron Lady's warm and empowering brand voice.
- **Conversion Focused**: Provides clear call-to-actions to move "stalled" leads further down the enrollment funnel.

### Structure
- `prompts/`: 
  - `followup_ai_prompt.txt`: The template used to generate re-engagement messages.
- `src/`: 
  - `followup_automation.js`: A demonstration script showing how the AI can process leads.

### Usage
This is designed to be integrated into a CRM or email automation system. You can run the demonstration script using Node:
```bash
node src/followup_automation.js
```
