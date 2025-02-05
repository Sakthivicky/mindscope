import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, age, gender, contact, medicalHistory } = await req.json();

    // Dummy data, you can add a database call here
    const patient = { name, age, gender, contact, medicalHistory };

    return NextResponse.json(
      { message: "Patient record submitted successfully", data: patient },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
