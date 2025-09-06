// import Groq from "groq-sdk";

// const groq = new Groq({
//   apiKey: "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", // Your API key
//   dangerouslyAllowBrowser: true,
// });

// export const aiService = {
//   // Extract text content from uploaded file
//   async extractTextFromFile(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const text = e.target.result;
//         resolve(text);
//       };
//       reader.onerror = reject;
//       reader.readAsText(file);
//     });
//   },

//   // Generate short-form content
//   async generateShortForm(content) {
//     try {
//       const completion = await groq.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are an expert content summarizer. Create concise, engaging short-form content that captures the key points of the original material. Focus on the most important concepts and make it easily digestible.",
//           },
//           {
//             role: "user",
//             content: `Convert this content into short-form format (3-5 key bullet points):\n\n${content}`,
//           },
//         ],
//         model: "llama3-8b-8192",
//         temperature: 0.7,
//         max_tokens: 500,
//       });

//       return completion.choices[0]?.message?.content;
//     } catch (error) {
//       console.error("Error generating short-form content:", error);
//       throw error;
//     }
//   },

//   // Generate interactive quiz
//   async generateQuiz(content) {
//     try {
//       const completion = await groq.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are an expert quiz creator. Generate engaging multiple-choice questions based on the provided content. Include 4 options (A, B, C, D) for each question and indicate the correct answer.",
//           },
//           {
//             role: "user",
//             content: `Create a quiz with 5 multiple-choice questions based on this content:\n\n${content}`,
//           },
//         ],
//         model: "llama3-8b-8192",
//         temperature: 0.6,
//         max_tokens: 1000,
//       });

//       return completion.choices[0]?.message?.content;
//     } catch (error) {
//       console.error("Error generating quiz:", error);
//       throw error;
//     }
//   },

//   // Generate video script
//   async generateVideoScript(content) {
//     try {
//       const completion = await groq.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are an expert scriptwriter for educational videos. Convert the given content into an engaging video script with clear narration, scene descriptions, and timing cues.",
//           },
//           {
//             role: "user",
//             content: `Convert this content into a structured video script:\n\n${content}`,
//           },
//         ],
//         model: "llama3-8b-8192",
//         temperature: 0.7,
//         max_tokens: 1000,
//       });

//       return completion.choices[0]?.message?.content;
//     } catch (error) {
//       console.error("Error generating video script:", error);
//       throw error;
//     }
//   },

//   // Generate infographic text structure
//   async generateInfographicText(content) {
//     try {
//       const completion = await groq.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are an expert in visual content design. Convert the given content into a structured format suitable for infographics, with clear headings, key statistics, and visual elements.",
//           },
//           {
//             role: "user",
//             content: `Structure this content for an infographic format:\n\n${content}`,
//           },
//         ],
//         model: "llama3-8b-8192",
//         temperature: 0.6,
//         max_tokens: 800,
//       });

//       return completion.choices[0]?.message?.content;
//     } catch (error) {
//       console.error("Error generating infographic text:", error);
//       throw error;
//     }
//   },

//   // Generate flashcards
//   async generateFlashcards(content) {
//     try {
//       const completion = await groq.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are an expert educator. Create flashcards with questions on one side and answers on the other based on the provided content. Format as 'Q: [question] | A: [answer]'",
//           },
//           {
//             role: "user",
//             content: `Create 8-10 flashcards based on this content:\n\n${content}`,
//           },
//         ],
//         model: "llama3-8b-8192",
//         temperature: 0.5,
//         max_tokens: 800,
//       });

//       return completion.choices[0]?.message?.content;
//     } catch (error) {
//       console.error("Error generating flashcards:", error);
//       throw error;
//     }
//   },

//   // Translate content to different languages
//   async translateContent(content, targetLanguage) {
//     try {
//       const languageMap = {
//         hi: "Hindi",
//         bn: "Bengali",
//         ta: "Tamil",
//         te: "Telugu",
//         mr: "Marathi",
//         gu: "Gujarati",
//         kn: "Kannada",
//         ml: "Malayalam",
//         pa: "Punjabi",
//         or: "Odia",
//       };

//       const completion = await groq.chat.completions.create({
//         messages: [
//           {
//             role: "system",
//             content: `You are an expert translator. Translate the given content accurately into ${languageMap[targetLanguage]} while maintaining the original meaning, context, and educational value.`,
//           },
//           {
//             role: "user",
//             content: `Translate this content to ${languageMap[targetLanguage]}:\n\n${content}`,
//           },
//         ],
//         model: "llama3-8b-8192",
//         temperature: 0.3,
//         max_tokens: 1500,
//       });

//       return completion.choices[0]?.message?.content;
//     } catch (error) {
//       console.error("Error translating content:", error);
//       throw error;
//     }
//   },

//   // Main processing function
//   async processContent(file, selectedFormats, selectedLanguages) {
//     try {
//       // Extract text from file
//       const textContent = await this.extractTextFromFile(file);
//       const results = [];

//       // Generate content for each selected format
//       for (const formatId of selectedFormats) {
//         let generatedContent;

//         switch (formatId) {
//           case "short-form":
//             generatedContent = await this.generateShortForm(textContent);
//             break;
//           case "quiz":
//             generatedContent = await this.generateQuiz(textContent);
//             break;
//           case "video-script":
//             generatedContent = await this.generateVideoScript(textContent);
//             break;
//           case "infographic":
//             generatedContent = await this.generateInfographicText(textContent);
//             break;
//           case "flashcards":
//             generatedContent = await this.generateFlashcards(textContent);
//             break;
//           default:
//             generatedContent = textContent;
//         }

//         // If languages are selected, translate the content
//         const contentVersions = {};

//         if (selectedLanguages.length > 0) {
//           // Keep English version
//           contentVersions["en"] = generatedContent;

//           // Translate to selected languages
//           for (const langCode of selectedLanguages) {
//             try {
//               contentVersions[langCode] = await this.translateContent(
//                 generatedContent,
//                 langCode
//               );
//             } catch (error) {
//               console.error(`Translation error for ${langCode}:`, error);
//               contentVersions[langCode] = generatedContent; // Fallback to original
//             }
//           }
//         } else {
//           contentVersions["en"] = generatedContent;
//         }

//         results.push({
//           formatId,
//           contentVersions,
//         });
//       }

//       return results;
//     } catch (error) {
//       console.error("Error processing content:", error);
//       throw error;
//     }
//   },
// };

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ai-repurposer-backend.onrender.com", // Replace with your API's base URL
  timeout: 5000, // Optional: Set a timeout for requests in milliseconds
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers here, e.g., Authorization
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
});

export const getSummary = async (id) => {
  const response = await axiosInstance.get(`/summary/${id}`);
  return response;
};

export const getPodcast = async (id) => {
  const response = await axiosInstance.get(`/podcast/${id}`);
  return response;
};
