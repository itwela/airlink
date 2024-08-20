'use server'
import { GoogleGenerativeAI, FunctionDeclaration, SchemaType } from "@google/generative-ai";

// async function template

// export async function FunctionAsync() {
//   return {
//   };
// }


// function template

// export function Function() {
//   return {
//   };
// }

const apiKey = process.env.API_KEY || "not found"; 
// if api key is not found ❌
if (apiKey == "not found") {
    console.log("API key not found");
}

// if api key is found ✅
const genAI = new GoogleGenerativeAI(apiKey);


// Setting function for AI model here here -----------------------------------------------------------------------

export async function setLightValues(brightness: any, colorTemp: any) {
  // This mock API returns the requested lighting values
  return {
    brightness: brightness,
    colorTemperature: colorTemp
  };
}

const controlLightFunctionDeclaration: FunctionDeclaration = {
    name: "controlLight",
    description: "Set the brightness and color temperature of a room light.",
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        brightness: {
          type: SchemaType.NUMBER,
          description: "Light level from 0 to 100. Zero is off and 100 is full brightness.",
        },
        colorTemperature: {
          type: SchemaType.STRING,
          description: "Color temperature of the light fixture which can be `daylight`, `cool` or `warm`.",
        },
      },
      required: ["brightness", "colorTemperature"],
    },
};

// Executable function code. Put it in a map keyed by the function name
// so that you can call it once you get the name string from the model.
const functions = {
controlLight: ({ brightness, colorTemperature }: any) => {
    return setLightValues( brightness, colorTemperature)
}
};

const generativeModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    tools: [{
      functionDeclarations: [
          controlLightFunctionDeclaration,
          // Add other function declarations here
        ]
    }]
});

// 🪦 Setting function stuff here -----------------------------------------------------------------------



const chat = generativeModel.startChat();
const prompt = "Dim the lights so the room feels cozy and warm.";

export async function run() {
    // Send the message to the model.
    const result = await chat.sendMessage(prompt);
  
    // For simplicity, this uses the first function call found.
    const call = result.response.functionCalls()?.[0];
  
    if (call) {
      // Call the executable function named in the function call
      // with the arguments specified in the function call and
      // let it call the hypothetical API.
      const apiResponse = await functions[call.name as keyof typeof functions](call.args);
  
      // Send the API response back to the model so it can generate
      // a text response that can be displayed to the user.
      const result2 = await chat.sendMessage([{ functionResponse: {
        name: 'controlLight',
        response: apiResponse
      }}]);
  
      // Log the text response.
      console.log(result2.response.text());
    }
}

// 🪦 Setting function stuff here -----------------------------------------------------------------------
