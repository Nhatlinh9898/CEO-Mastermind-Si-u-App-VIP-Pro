import { GoogleGenAI, Modality } from "@google/genai";
import { FormData, BusinessCategory, VoiceGender } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key chưa được cấu hình. Vui lòng kiểm tra biến môi trường.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBusinessContent = async (
  category: BusinessCategory,
  data: FormData
): Promise<string> => {
  const ai = getClient();

  const systemInstruction = `
    Bạn là Thien Master AI - Một chiến lược gia kinh doanh đại tài, cố vấn cho các CEO tập đoàn hàng đầu.
    Nhiệm vụ: Viết nội dung chuyên sâu về chủ đề "${category.name}".
    ${category.systemPromptAddon}
    
    Yêu cầu định dạng:
    - Sử dụng Markdown chuyên nghiệp.
    - Cấu trúc rõ ràng: Tiêu đề lớn, Các mục chính, Bullet points.
    - Ngôn ngữ: Tiếng Việt 100%, văn phong doanh nhân đẳng cấp, gãy gọn, sắc bén.
    - Nội dung phải có tính thực chiến cao, không lý thuyết suông.
    - Bắt buộc phải có phần "HÀNH ĐỘNG NGAY" (Action Plan) ở cuối.
  `;

  const prompt = `
    Thông tin đầu vào từ CEO:
    - Ngành nghề: ${data.industry}
    - Quy mô: ${data.scale}
    - Đối tượng người đọc/nghe: ${data.targetAudience}
    - Vấn đề cốt lõi/Bối cảnh: ${data.coreProblem}
    - Mục tiêu mong muốn: ${data.goal}
    - Tone giọng: ${data.tone}

    Hãy soạn thảo một tài liệu chi tiết giải quyết vấn đề trên.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Không thể tạo nội dung. Vui lòng thử lại.";
  } catch (error) {
    console.error("Gemini Content Generation Error:", error);
    throw new Error("Lỗi khi kết nối với siêu trí tuệ. Vui lòng thử lại sau.");
  }
};

export const generateSpeech = async (
  text: string,
  gender: VoiceGender
): Promise<ArrayBuffer> => {
  const ai = getClient();
  
  // Truncate text if too long for TTS input optimization, or take key parts.
  // Gemini TTS handles moderate length, but let's ensure we don't send massive blocks if not needed.
  // For this demo, we send the first 4000 characters to be safe and fast.
  const cleanText = text.replace(/[#*`]/g, '').substring(0, 4000); 

  const voiceName = gender === VoiceGender.MALE ? 'Fenrir' : 'Kore'; // Fenrir (Deep), Kore (Soothing)

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: cleanText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (!base64Audio) {
      throw new Error("Không nhận được dữ liệu âm thanh từ AI.");
    }

    // Convert Base64 to ArrayBuffer (PCM data usually, but the guide implies we treat it as raw bytes to be decoded)
    // However, the example shows raw PCM decoding. 
    // For simplicity in React without a complex AudioWorklet, we will use the standard decoding approach.
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes.buffer;
  } catch (error) {
    console.error("Gemini TTS Error:", error);
    throw new Error("Lỗi khi tạo giọng đọc AI.");
  }
};

// Helper to decode PCM and play it (Browser side)
export const playAudioBuffer = async (arrayBuffer: ArrayBuffer, audioContext: AudioContext) => {
    // The Gemini API returns raw PCM 24kHz usually.
    // We need to decode it manually or use decodeAudioData if it had a header (which it doesn't).
    // Following the provided guidance to decode raw PCM.
    
    const dataInt16 = new Int16Array(arrayBuffer);
    const sampleRate = 24000;
    const numChannels = 1;
    
    const frameCount = dataInt16.length / numChannels;
    const buffer = audioContext.createBuffer(numChannels, frameCount, sampleRate);
  
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        // Convert Int16 to Float32 [-1.0, 1.0]
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
  
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
    return source;
};
