import { GoogleGenAI } from "@google/genai";
import { AIModuleType } from '../types';

const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Gemini API Key is missing.");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBeautyEdit = async (
  base64Image: string,
  moduleType: AIModuleType,
  promptDetails: string,
  useHighQuality: boolean = true
): Promise<string> => {
  const ai = getClient();
  // Using gemini-3-pro-image-preview for best editing results as requested, 
  // fallback to gemini-2.5-flash-image for speed if needed.
  const modelId = useHighQuality ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

  // Construct a specialized prompt for salon-quality results
  const systemContext = `
    You are an expert beauty AI editor for a premium salon "Queen Hair Beauty Center". 
    Your goal is to realistically edit the user's photo to show a potential beauty transformation.
    MAINTAIN IDENTITY: Do not change facial features or structure. Only apply the requested beauty effect.
    MAINTAIN REALISM: Keep skin texture natural, lighting consistent.
    NO DISTORTIONS: Ensure eyes, fingers, and hair strands look physically possible.
    OUTPUT: A single edited image.
  `;

  let specificInstruction = "";
  switch (moduleType) {
    case 'makeup':
      specificInstruction = "Apply professional makeup. Focus on eyes, lips, and contour as specified. Keep it blended and glam.";
      break;
    case 'nails':
      specificInstruction = "Focus on the hands/nails. Apply the nail art/color specified. Keep skin tone natural.";
      break;
    case 'hair_style':
      specificInstruction = "Change the hairstyle/cut only. Keep the face exactly the same. Ensure hair blends with the scalp naturally.";
      break;
    case 'hair_color':
      specificInstruction = "Change the hair color. Preserve highlights and shadows of the hair texture.";
      break;
    case 'bridal':
      specificInstruction = "Apply a full bridal look: glowing makeup, elegant updo or waves, possibly a veil if requested. Make it look expensive and royal.";
      break;
    default:
      specificInstruction = "Enhance the beauty features naturally.";
  }

  const fullPrompt = `${systemContext} ${specificInstruction} User Request details: ${promptDetails}`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          { text: fullPrompt }
        ]
      },
      config: {
        imageConfig: {
          // If using gemini-3-pro-image-preview, we can request size. 
          // However, for editing consistency, we let the model output same aspect ratio generally
          // by not forcing a different aspect ratio, or relying on the input.
          // Note: The new SDK supports generating images via generateContent for some models.
        }
      }
    });

    // Parse response for image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }
    throw new Error("No image generated.");
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};

export const consultationChat = async (message: string): Promise<string> => {
  const ai = getClient();
  const modelId = 'gemini-3-flash-preview'; // Fast text model

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: message,
      config: {
        systemInstruction: `
          You are 'Queen Bot', a helpful beauty consultant for Queen Hair Beauty Center in Amman.
          Tone: Friendly, professional, feminine, confident ("Queen vibes").
          Services available: Haircuts, Protein, Coloring, Makeup, Bridal, Nails, Lashes.
          Keep answers short (under 50 words) and encourage booking.
          If asked about prices, say "Prices depend on hair length and service, starting from 15 JOD. Please visit us for a consultation!"
        `
      }
    });
    return response.text || "I'd love to help you with that! Please visit our salon for a free consultation.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Our beauty queens are busy right now! Please try again later.";
  }
};
