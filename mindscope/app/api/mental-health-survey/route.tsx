import { NextRequest, NextResponse } from 'next/server'; // Import NextRequest and NextResponse
import connectToDatabase from '../lib/mongodb'; // MongoDB connection file
import Report from '../models/reports'; // MongoDB model for reports

// Named export for POST method
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { name, age, gender, stressLevel,  lifeSatisfaction,emotionalHealth, copingMechanisms, selfCare, mentalImpactOnDailyLife, physicalHealthImpact } = await req.json();

    // Connect to MongoDB
    const db = await connectToDatabase();

    // Save data to the database
    const newReport = new Report({
      name,
      age,
      gender,
      lifeSatisfaction,
      stressLevel,
      copingMechanisms,
      emotionalHealth,
      selfCare,
      mentalImpactOnDailyLife,
      physicalHealthImpact,
    });

    // Save the new report and return the saved report ID
    const savedReport = await newReport.save();

    // Return response with the saved report ID
    return new NextResponse(JSON.stringify({ id: savedReport._id }), { status: 200 });
  } catch (error) {
    // Handle error and send an error response
    return new NextResponse(
      JSON.stringify({ message: 'Error generating report', error: error }),
      { status: 500 }
    );
  }
}
