/**
 * Task 2: Internal Automation - Follow-up AI
 * This script demonstrates how the followup_ai_prompt.txt can be used
 * to automate re-engagement with potential candidates.
 */

const generateFollowUpMessage = (userData) => {
    const { name, previousInterest, lastStep, daysSinceLastContact } = userData;

    // Simulate prompt injection
    const prompt = `
    You are the Iron Lady Follow-up AI.
    User: ${name}
    Interested in: ${previousInterest}
    Last Step: ${lastStep}
    Days since: ${daysSinceLastContact}
    
    Task: Write a warm, professional follow-up message encouraging them to take the next step.
  `;

    console.log("--- Generating Follow-up for", name, "---");

    // Simulated AI Output
    if (lastStep === 'visited website') {
        return `Hi ${name}, we noticed you explored our ${previousInterest} page! Many women in your position find our mentorship sessions life-changing. Would you like a 10-minute discovery call?`;
    } else if (lastStep === 'spoke to counselor') {
        return `Hi ${name}, it was great having you speak with our counselor! We're ready to help you start your journey in ${previousInterest}. The next cohort starts soon—would you like to see the enrollment details?`;
    }

    return `Hi ${name}, we're still here to support your career growth with ${previousInterest}. Let us know if you have any questions!`;
};

// Example Usage
const leads = [
    { name: 'Priya', previousInterest: 'AI for Beginners', lastStep: 'visited website', daysSinceLastContact: 3 },
    { name: 'Ananya', previousInterest: 'Leadership Track', lastStep: 'spoke to counselor', daysSinceLastContact: 5 }
];

leads.forEach(lead => {
    console.log(generateFollowUpMessage(lead));
    console.log('-----------------------------------');
});
