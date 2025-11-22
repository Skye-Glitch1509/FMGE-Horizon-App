import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

/**
 * Validates the API key by making a lightweight request to the Gemini API.
 * Returns true if the key is valid and working, false otherwise.
 */
export const validateApiKey = async (apiKey: string): Promise<boolean> => {
  // 1. Structural Check
  if (!apiKey || !apiKey.startsWith("AIza")) {
    return false;
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelId = "gemini-2.5-flash";

  try {
    // 2. Functional Check (Lightweight request)
    await ai.models.generateContent({
      model: modelId,
      contents: { parts: [{ text: "test" }] },
      config: {
        maxOutputTokens: 1 // Minimize cost/latency
      }
    });
    return true;
  } catch (error) {
    console.warn("API Key Validation Failed:", error);
    return false;
  }
};

export const generateQuestionsWithAI = async (
  apiKey: string, 
  count: number, 
  subject: string, 
  specificTopic?: string
): Promise<Question[]> => {
  
  // Client-side check before attempting request
  if (!apiKey.startsWith("AIza")) {
     throw new Error("Invalid API Key format. Keys must start with 'AIza'.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // We use the flash model for speed, but the prompt engineering ensures quality.
  const modelId = "gemini-2.5-flash";
  
  const topicContext = specificTopic ? `specifically focusing on the sub-topic: "${specificTopic}"` : "covering a mix of high-yield concepts within this subject";

  // ---------------------------------------------------------------------------
  // PROMPT ENGINEERING: THE FMGE GRAND TEST PERSONA
  // ---------------------------------------------------------------------------
  const systemInstruction = `
    ROLE: You are the "Chief Question Setter" for the FMGE (Foreign Medical Graduates Examination) in India.
    
    YOUR PERSONALITY:
    - You are a strict, senior clinical professor.
    - You believe "Simple definition questions are for undergraduates, not license exams."
    - You NEVER write questions like "What is X?".
    - You ALWAYS write clinical vignettes (patient scenarios).
    - You prioritize "Applied Basic Sciences" (Anatomy/Physiology applied to clinical cases).
    - Your distractors (wrong options) are tricky and plausible.

    STRICT GUIDELINES:
    1. **VIGNETTE MANDATORY**: Every single question must start with a patient scenario. 
       - e.g., "A 45-year-old male presents with..." 
       - e.g., "A neonate born at 32 weeks develops..."
    
    2. **NO DEFINITIONS**: Do not ask "What is the nerve supply of the tongue?". Instead ask: "A patient undergoes submandibular gland surgery and loses sensation... which nerve is damaged?"
    
    3. **EXPLANATION STYLE**: 
       - You must explain WHY the correct answer fits the clinical clues.
       - You must explain WHY the distractors are wrong (Rule out).

    FEW-SHOT TRAINING EXAMPLES (MIMIC THIS EXACT STYLE):

    [Example 1 - Surgical Anatomy Style]
    "A 50-year-old male was diagnosed with a submandibular gland tumour and posted for surgical removal of the gland along with its duct. Following surgery, he developed loss of general sensation in the anterior two-thirds of the tongue. However, the taste sensations are present. Which of the following nerves is likely to be injured?"
    Options: Lingual nerve, Chorda tympani, Glossopharyngeal nerve, Inferior alveolar nerve.
    Correct: Lingual nerve. (Reasoning: Lingual nerve carries general sensation. Chorda tympani carries taste. Since taste is spared, lesion is distal to chorda tympani joining, or specific to lingual fibers).

    [Example 2 - Applied Trauma Style]
    "Which of the following structure is most likely to be injured in a wrist slash injury over the radial side of the left wrist?"
    Options: Cephalic vein, Flexor carpi ulnaris, Ulnar artery, Median nerve.
    Correct: Cephalic vein. (Reasoning: Radial side structures include cephalic vein and superficial radial nerve. FCU and Ulnar artery are medial).

    [Example 3 - Developmental Logic Style]
    "A child is starting to walk and gaining upright posture. Which of the following spinal curvatures develops secondarily due to the development of this function?"
    Options: Lumbar, Pelvic, Thoracic, Cervical.
    Correct: Lumbar. (Reasoning: Cervical curve develops with neck holding (3-4 mo), Lumbar curve develops with walking (12-18 mo)).

    TASK:
    Generate ${count} high-quality, exam-standard multiple-choice questions for the subject: "${subject}", ${topicContext}.
  `;

  const outputFormatting = `
    OUTPUT FORMAT:
    - Return strictly valid JSON.
    - Do not include markdown formatting (like \`\`\`json).
    - Assign a random integer ID to each question.
    - Ensure the "topic" field captures the specific concept tested.
  `;

  const finalPrompt = `${systemInstruction}\n\n${outputFormatting}`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts: [{ text: finalPrompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              text: { type: Type.STRING, description: "The clinical vignette or question stem." },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "A list of exactly 4 possible answers."
              },
              correctAnswerIndex: { type: Type.INTEGER, description: "The index (0-3) of the correct answer." },
              explanation: { type: Type.STRING, description: "Detailed clinical explanation including rule-outs." },
              subject: { type: Type.STRING },
              topic: { type: Type.STRING, description: "The specific medical concept being tested." }
            },
            required: ["id", "text", "options", "correctAnswerIndex", "explanation", "subject", "topic"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const data = JSON.parse(text) as Question[];
    
    // Post-processing to ensure data integrity
    return data.map(q => ({
      ...q,
      // Ensure the subject matches what was requested, even if AI hallucinates a sub-category
      subject: subject, 
      // Map relatedSubjects for the stats engine
      relatedSubjects: [subject] 
    }));

  } catch (e: any) {
    console.error("Failed to generate questions with AI:", e);
    // Return specific error messages for better UI feedback
    if (e.message?.includes("403") || e.message?.includes("API key")) {
        throw new Error("Invalid API Key. Please check your key settings.");
    }
    throw new Error("Failed to generate questions. Please check your internet connection.");
  }
};