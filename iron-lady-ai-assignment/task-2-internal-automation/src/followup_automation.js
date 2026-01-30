/**
 * Task 2: Internal Automation - Follow-up AI
 * 
 * This script demonstrates the "Antigravity" prompt structure for generating
 * high-quality, re-engagement messages for leads.
 * 
 * In a real-world scenario, this functions as the logic layer that:
 * 1. Fetches "stalled" leads from a CRM/Database.
 * 2. Formats the user context.
 * 3. Sends the prompt + context to an AI (like Google Gemini).
 */

const fs = require('fs');
const path = require('path');

// 🔧 FUNCTION: Load the System Prompt from file
const getSystemPrompt = () => {
    const promptPath = path.join(__dirname, '../prompts/followup_ai_prompt.txt');
    return fs.readFileSync(promptPath, 'utf8');
};

// 🔧 FUNCTION: Simulate AI Generation (with Mock Output for Demo)
const generateFollowUpMessage = (lead, systemPrompt) => {

    // 1️⃣ Construct the Context Block as requested by the prompt engineering rules
    const contextBlock = `
Previous interest: ${lead.previousInterest}
Last step taken: ${lead.lastStep}
Background: ${lead.background || 'Not specified'}
  `;

    console.log("---------------------------------------------------------");
    console.log(`🟢 GENERATING MESSAGE FOR: ${lead.name}`);
    console.log("📝 Context Sent to AI:");
    console.log(contextBlock.trim());
    console.log("---------------------------------------------------------");

    // In a real app, you would do:
    // const response = await gemini.generateContent(systemPrompt + "\n\n" + contextBlock);

    // Here, we simulate the "expected output" based on the prompt's strong examples

    if (lead.previousInterest.includes('Career')) {
        return `Hi ${lead.name}, 

We noticed you were exploring our ${lead.previousInterest}. 
It is designed specifically for professionals like you who are looking to move into tech roles but might be worried about the learning curve.
Many of our alumni felt the same way initially, but our structured mentorship ensures you succeed.
A short 10-minute counseling call can help you visualize your personal roadmap.
Would you like us to schedule a quick chat this week?`;
    }

    return `Hi ${lead.name}, 

We noticed you showed interest in the ${lead.previousInterest}.
We understand that committing to a new path can feel daunting, especially with a busy schedule.
However, our program is built to fit into the lives of working women, offering flexible support.
A quick 10-minute conversation with a mentor could clarify how this fits into your career goals.
Are you open to a brief call to discuss this further?`;
};

// 🔧 DEMO DATA: Stalled Leads
const leads = [
    {
        name: 'Priya',
        previousInterest: 'AI Career Transition Program',
        lastStep: 'Viewed program details but did not enroll',
        background: 'Non-technical professional with 3 years experience'
    },
    {
        name: 'Ananya',
        previousInterest: 'Iron Lady Leadership Track',
        lastStep: 'Spoke to counselor but stopped replying',
        background: 'Mid-level manager looking for promotion'
    }
];

// MAIN EXECUTION
const systemPrompt = getSystemPrompt();

console.log("\n🔹 SYSTEM PROMPT LOADED");

leads.forEach(lead => {
    const message = generateFollowUpMessage(lead, systemPrompt);
    console.log("🤖 AI RESPONSE (Simulated):");
    console.log(message);
    console.log("\n");
});
