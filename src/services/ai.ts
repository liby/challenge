import { generateText } from "ai";
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  throw new Error('Google API key is not set. Please set VITE_GOOGLE_API_KEY for the Google Generative AI.');
}

const google = createGoogleGenerativeAI({
  apiKey: GOOGLE_API_KEY,
});

export async function generateCommitMessage(prompt: string): Promise<string> {
  try {

    const { text } = await generateText({
      model: google("models/gemini-2.0-flash-exp"),
      prompt,
    });
    return text;
  } catch (error) {
    console.error('Failed to generate commit message:', error);
    throw new Error('Failed to generate commit message. Please try again.');
  }
}