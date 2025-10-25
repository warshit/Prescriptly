
import { GoogleGenAI, Type } from "@google/genai";
import { Medicine, SymptomAnalysisResult } from '../types';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const extractMedicinesFromImage = async (imageFile: File): Promise<Medicine[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const imagePart = await fileToGenerativePart(imageFile);

  const prompt = `
    You are an advanced medical Optical Character Recognition (OCR) and Natural Language Processing (NLP) system.
    Analyze the provided image of a medical prescription or medicine label.
    Extract all medications listed. For each medication, identify its name, dosage strength (e.g., '500mg'), total quantity (e.g., '30 tablets'), and frequency of use (e.g., 'twice a day').
    Return the information as a structured JSON array. If a specific piece of information (dosage, quantity, or frequency) is not clearly present for a medicine, return null for that field. The medicine name is required.
  `;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        imagePart,
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "The brand or generic name of the medicine.",
            },
            dosage: {
              type: Type.STRING,
              description: "The dosage strength of the medicine, e.g., '500mg', '10ml'.",
            },
            quantity: {
              type: Type.STRING,
              description: "The total quantity prescribed, e.g., '30 tablets', '1 bottle'.",
            },
            frequency: {
              type: Type.STRING,
              description: "How often the medicine should be taken, e.g., 'once daily', '2 times a day'.",
            },
          },
          required: ["name"],
        },
      },
    },
  });

  try {
    const parsedJson = JSON.parse(response.text);
    return parsedJson as Medicine[];
  } catch (e) {
    console.error("Failed to parse Gemini response:", e);
    throw new Error("The AI returned an invalid format. Please try another image.");
  }
};

export const analyzeSymptoms = async (symptoms: string): Promise<SymptomAnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an AI medical assistant. A user has provided the following symptoms: "${symptoms}".
    Analyze these symptoms and provide a list of potential conditions, their likelihood (e.g., 'High', 'Medium', 'Low'), and a brief explanation for each.
    Also, provide general advice for managing the symptoms and a clear disclaimer that this is not a medical diagnosis and they should consult a healthcare professional for any health concerns.
    Respond in a structured JSON format.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [{ text: prompt }] },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          conditions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                likelihood: { type: Type.STRING },
                explanation: { type: Type.STRING },
              },
              required: ["name", "likelihood", "explanation"],
            },
          },
          advice: { type: Type.STRING },
          disclaimer: { type: Type.STRING },
        },
        required: ["conditions", "advice", "disclaimer"],
      },
    },
  });

  try {
    const parsedJson = JSON.parse(response.text);
    return parsedJson as SymptomAnalysisResult;
  } catch (e) {
    console.error("Failed to parse Gemini response for symptom analysis:", e);
    throw new Error("The AI returned an invalid format. Please try again.");
  }
};
