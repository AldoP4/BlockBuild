import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a 3D blueprint based on a user's text prompt.
 * Uses Gemini 3 Pro Preview for high-quality spatial reasoning and detail.
 */
export const generateBlueprint = async (userPrompt: string) => {
  try {
    // Using gemini-3-pro-preview for complex spatial tasks and larger structures
    const modelId = 'gemini-3-pro-preview';
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `Generate a highly detailed and complex 3D voxel blueprint for: "${userPrompt}". 
      
      Requirements:
      1. Scale: The structure should be substantial and detailed (aim for 100 to 500 blocks).
      2. Geometry: Use the blocks creatively to approximate shapes. Ensure the structure is recognizable.
      3. Color: Use specific hex codes to add detail, texture, and shading.
      4. Position: Coordinates (x, y, z) must be integers. y must be >= 0 (ground). Center the model around x=0, z=0.
      5. Physics: Ensure the structure is connected and grounded (no impossible floating islands unless specified).`,
      config: {
        // Enable thinking to allow the model to plan the 3D structure
        thinkingConfig: { thinkingBudget: 4096 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "A creative name for the structure" },
            blocks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  x: { type: Type.NUMBER },
                  y: { type: Type.NUMBER },
                  z: { type: Type.NUMBER },
                  color: { type: Type.STRING }
                },
                required: ["x", "y", "z", "color"]
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text response from Gemini");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini Blueprint Generation Error:", error);
    throw error;
  }
};

/**
 * Generates a random building challenge text.
 */
export const generateChallenge = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a creative, challenging, and fun 1-sentence prompt for a LEGO master builder. (e.g. 'Build a dragon perched on a skyscraper'). Respond in Spanish.",
    });
    return response.text || "Construye una ciudad flotante.";
  } catch (error) {
    console.error("Gemini Challenge Error:", error);
    return "Construye un castillo espacial gigante.";
  }
};
