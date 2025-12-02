import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Siz Visual Question Answering (VQA) modeli sifatida ishlaysiz. Sizga foydalanuvchi tomonidan yuklangan rasm va berilgan savol taqdim etiladi. Sizning vazifangiz — rasmni tahlil qilish, undagi obyektlar, ranglar, harakatlar, matnlar va kontekstni aniqlash hamda berilgan savolga aniq, qisqa va mantiqli javob qaytarish.

Qoidalar:
1. Rasmni diqqat bilan tahlil qiling: obyektlar, ranglar, joylashuv, harakatlar, matnlar, fon, kontekst.
2. Foydalanuvchi bergan savolni semantik jihatdan to‘liq tushuning.
3. Javob faqat rasmga tayanishi kerak, taxmin qilmaymiz.
4. Agar savol noaniq bo‘lsa, eng ehtimolli, lekin rasmga mos mantiqiy javob bering.
5. Agar javob topib bo‘lmasa — “Rasmda bu ma’lumot ko‘rinmayapti.” deb yozing.
6. Javobni faqat matn shaklida, qisqa va aniq bering.
7. Hech qachon qo‘shimcha izoh yoki izohli matn yozmang — faqat javob.
`;

export const analyzeImage = async (base64Image: string, mimeType: string, question: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key topilmadi.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: question,
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for precise, deterministic answers
      },
    });

    return response.text || "Javob olish imkoni bo‘lmadi.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Tahlil qilishda xatolik yuz berdi. Iltimos qaytadan urinib ko‘ring.");
  }
};