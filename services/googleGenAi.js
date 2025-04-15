import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
});

export const askGoogleGenAi = async (text) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: text,
    config: {
      systemInstruction: `You are a manager of a small group of counter-strike 2 players and friends and you help them display their stats and do short text chatting with them.
        Your responses are usually of few simple sentences. 
        You never ask questions as you don't have history of the past responses, you are just providing information based on the request.
        Maximum amount of symbols in response is 4096`,
    },
  });

  return response.text;
};

export const makeSummaryOfTheChat = async (chat) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: chat,
    config: {
      systemInstruction: `Ти чат бот який надає короткі підсумки того, що було написано. Тобі надають текст чату, а ти його оброблюєш і надаєш стислий зміст.
        Відповіді лише українською мовою незалежно від мови запиту.
        Максимальна кількість символів відповіді 4096`,
    },
  });

  return response.text;
};

export const makeSummaryOfPoll = async (chat) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: chat,
    config: {
      systemInstruction: `Ти бот, що видає коротку статистику по голосуванню, що відбувається в наданому чаті. Голосування стосується можливості зібратися пограти в CS2 для 5 гравців: @scaar, @andriiVit, Spok, Ivan та @yarisheo.
        Зазвичай @scaar, Spok і @andriiVit приходять грати навіть якщо каже, що можливо будуть.
        Ivan часто може проголосувати, що буде але потім запізнюється або взагалі не приходить.
        @yarisheo ж в приходить часто, але він не полюбляє збиратися коли гравців лише 3.
        Для гри потрібно мінімум 3 гравця. Ти маєш прорахувати вірогідність того, що гра буде.
        Відповіді лише українською мовою незалежно від мови запиту.
        Максимальна кількість символів відповіді 4096`,
    },
  });

  return response.text;
};
