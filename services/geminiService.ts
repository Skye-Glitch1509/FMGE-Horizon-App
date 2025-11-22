import { GoogleGenAI, Type } from "@google/genai";
import { Question, StudyPlan } from "../types";

// Initialize Gemini Client
// Note: process.env.API_KEY is injected by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuestions = async (count: number, subjects: string[] = [], mode: 'mixed' | 'focused' = 'mixed'): Promise<Question[]> => {
  const modelId = "gemini-2.5-flash";
  
  let prompt = "";
  if (mode === 'mixed') {
    prompt = `Generate ${count} multiple-choice questions for the FMGE (Foreign Medical Graduates Examination). 
    Cover a variety of high-yield subjects such as Anatomy, Physiology, Pathology, PSM, Surgery, OBG, and Medicine.
    Ensure the questions are clinical vignette-based where possible, matching the difficulty of the actual exam.`;
  } else {
    prompt = `Generate ${count} multiple-choice questions for FMGE focused specifically on: ${subjects.join(', ')}.`;
  }

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            text: { type: Type.STRING, description: "The question text, preferably a clinical scenario." },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "A list of 4 possible answers."
            },
            correctAnswerIndex: { type: Type.INTEGER, description: "The index (0-3) of the correct answer." },
            explanation: { type: Type.STRING, description: "Detailed explanation of why the answer is correct and why others are wrong." },
            subject: { type: Type.STRING, description: "The medical subject this question belongs to (e.g., Anatomy, Surgery)." }
          },
          required: ["id", "text", "options", "correctAnswerIndex", "explanation", "subject"]
        }
      }
    }
  });

  const text = response.text;
  if (!text) return [];
  
  try {
    return JSON.parse(text) as Question[];
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return [];
  }
};

export const generateStudyPlan = async (weakSubjects: string[], durationDays: number = 7): Promise<StudyPlan> => {
  const modelId = "gemini-2.5-flash";
  
  const prompt = `Create a ${durationDays}-day intensive study plan for an FMGE student.
  The student has identified the following weak subjects: ${weakSubjects.length > 0 ? weakSubjects.join(', ') : "General Review"}.
  Focus heavily on these weak areas while balancing high-yield revision of other subjects.
  Provide specific tasks for each day.`;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          schedule: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.INTEGER },
                focus: { type: Type.STRING, description: "Main subject or theme for the day" },
                tasks: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "List of actionable study tasks (e.g., 'Read Guyton Ch 5', 'Solve 50 MCQs')" 
                }
              },
              required: ["day", "focus", "tasks"]
            }
          }
        },
        required: ["title", "description", "schedule"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No plan generated");

  try {
    return JSON.parse(text) as StudyPlan;
  } catch (e) {
    console.error("Failed to parse study plan", e);
    throw e;
  }
};

export const getSubjectTopics = async (subjectName: string): Promise<string[]> => {
   const modelId = "gemini-2.5-flash";
   const prompt = `List the top 8 high-yield topics for ${subjectName} specifically for the FMGE exam. Return a simple JSON array of strings.`;
   
   const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
   });

   return JSON.parse(response.text || "[]");
}
