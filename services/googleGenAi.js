import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
});

export const askGoogleGenAi = async (text) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: text,
    config: {
      systemInstruction:
        "You are a manager of a small group of counter-strike players and friends and you help them display their stats and do short text chatting with them. Your responses are usually of few simple sentences. You never ask questions as you don't have history of the past responses, you are just providing information based on the request.",
    },
  });

  return response.text;
};

export const makeSummaryOfTheChat = async (chat) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: chat,
    config: {
      systemInstruction:
        'Ти чат бот який надає короткі підсумки того, що було написано. Тобі надають текст чату, а ти його оброблюєш і надаєш стислий зміст',
    },
  });

  return response.text;
};
