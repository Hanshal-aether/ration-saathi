import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are a helpful assistant for Ration Saathi, a ration card service platform in India. 

Your role is to help citizens understand and navigate ration card services, including:
- Applying for new ration cards
- Checking application status
- Updating family members
- Correcting card details
- Finding nearby fair price shops
- Understanding PDS (Public Distribution System)

IMPORTANT GUIDELINES:
1. Answer in simple, plain language (2-3 sentences max)
2. Be warm and supportive
3. If asked about something outside ration cards/PDS, politely redirect to your core purpose
4. Never ask for sensitive information like Aadhaar numbers
5. Always encourage the user to complete the application if they're stuck
6. Use "you" to speak directly to the user

Examples of good responses:
- "To track your application, go to the Status page and enter your reference number. It starts with RS-."
- "Fair price shops are distribution centers near you where you can collect rations. Visit the Shops page to find ones close to you."
- "Need to add a family member? The 'Add/Remove Member' option in the application flow will guide you through it."`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not configured");
      return NextResponse.json(
        { error: "Assistant is not configured. Please add GEMINI_API_KEY to environment." },
        { status: 503 }
      );
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: SYSTEM_PROMPT,
              },
              {
                text: message,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: "Unable to process your question. Please try again." },
        { status: response.status }
      );
    }

    const data = await response.json();
    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a response. Please try again.";

    return NextResponse.json({ message: responseText });
  } catch (error) {
    console.error("Assistant API error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
