const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_APIKEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
export const GenerateTopicsAIModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "As your are coaching teacher \nUser want to learn about the topic \nGenerate 5-7 Course title for study (Short) \nMake sure it is releated to description \nOutput will be ARRAY of String in JSON FORMAT only \nDo not add any plain text in output,"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  \"Effective Questioning Techniques\",\n  \"Classroom Management Strategies\",\n  \"Differentiated Instruction in Practice\",\n  \"Assessment for Learning: A Practical Guide\",\n  \"Engaging Students Through Active Learning\"\n]\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Learn Python::As your are coaching teacher \nUser want to learn about the topic \nGenerate 5-7 Course title for study (Short) \nMake sure it is releated to description \nOutput will be ARRAY of String in JSON FORMAT only \nDo not add any plain text in output,\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  \"Python Basics: A Beginner's Guide\",\n  \"Intermediate Python: Data Structures\",\n  \"Object-Oriented Programming with Python\",\n  \"Python for Data Science: Introduction\",\n  \"Web Development with Python (Flask)\",\n  \"Automating Tasks with Python Scripting\"\n]\n```"},
          ],
        },
      ],
    });

    export const GenerateCourseAIModel = model.startChat({
      generationConfig,
      history: [
        
      ],
    });
  
//     const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//     console.log(result.response.text());