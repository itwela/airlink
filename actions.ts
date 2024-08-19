'use server'
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.API_KEY || "not found"; 
if (apiKey == "not found") {
    console.log("API key not found");
}

if (apiKey != "not found" || undefined){
    const genAI = new GoogleGenerativeAI(apiKey);
}


export async function setLightValues() {
}