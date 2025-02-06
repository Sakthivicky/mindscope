
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '..//lib/mongodb';
import Report from '../models/reports';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reportId = searchParams.get('id');

  if (!reportId) {
    return new NextResponse('Report ID is required', { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const report = await Report.findById(reportId);

    if (!report) {
      return new NextResponse('Report not found', { status: 404 });
    }

    return new NextResponse(JSON.stringify(report), { status: 200 });
  } catch (error) {
    return new NextResponse('Error fetching report', { status: 500 });
  }
}
