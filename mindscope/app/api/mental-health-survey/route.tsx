import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

// OpenAI setup using environment variables
const openai = new OpenAI({
  apiKey: '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', // Use env variable for security
});

// Named export for the POST method
export async function POST(req: NextRequest) {
  const { stressLevel, anxietyLevel, mood, sleepQuality, physicalActivity, socialInteractions, copingMechanisms, mentalHealthSupport, workLifeBalance, recentChanges } = await req.json();

  const surveyAnswers = {
    stressLevel,
    anxietyLevel,
    mood,
    sleepQuality,
    physicalActivity,
    socialInteractions,
    copingMechanisms,
    mentalHealthSupport,
    workLifeBalance,
    recentChanges,
  };

  // Create a prompt for the OpenAI API based on the survey answers
  const prompt = `
    I am providing responses to a mental health survey. Please analyze the answers and generate a short report about the individual's mental health.

    Stress Level: ${stressLevel}
    Anxiety Level: ${anxietyLevel}
    Mood: ${mood}
    Sleep Quality: ${sleepQuality}
    Physical Activity: ${physicalActivity}
    Social Interactions: ${socialInteractions}
    Coping Mechanisms: ${copingMechanisms}
    Mental Health Support: ${mentalHealthSupport}
    Work-Life Balance: ${workLifeBalance}
    Recent Life Changes: ${recentChanges}

    Based on these responses, give an analysis of the individual's mental health.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Correct model name
      messages: [
        {
          role: "system",
          content: "You are a mental health assistant analyzing survey responses give shorter answer.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Get the generated analysis from OpenAI
    const analysis = response.choices[0].message.content;

    // Respond with the analysis report using NextResponse
    return NextResponse.json({
      message: "Survey successfully analyzed",
      analysis: analysis,
    });
  } catch (error) {
    console.error("Error analyzing survey:", error);
    // Respond with error using NextResponse
    return NextResponse.json({ message: "Error analyzing survey" }, { status: 500 });
  }
}
