'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const ReportPage = () => {
  const [reportData, setReportData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      // Fetch the report data by ID from the database
      const fetchReport = async () => {
        try {
          const response = await fetch(`/api/get-report?id=${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch report');
          }
          const data = await response.json();
          setReportData(data);
        } catch (error) {
          setError('Error fetching report data');
        }
      };

      fetchReport();
    }
  }, [id]);

  const analyzeData = (data: any) => {
    let analysis = '';

    // Example of detailed analysis based on the fetched data
    // Life Satisfaction
    analysis += `**Life Satisfaction**: ${data.lifeSatisfaction}\n`;
    if (data.lifeSatisfaction === 'very_dissatisfied' || data.lifeSatisfaction === 'dissatisfied') {
      analysis += 'You may not be satisfied with your life at the moment. Consider reaching out for support.\n';
    } else if (data.lifeSatisfaction === 'neutral') {
      analysis += 'You feel neutral about your life. Focus on finding things that bring you joy.\n';
    } else {
      analysis += 'You seem to be satisfied with your life. Keep nurturing your positive aspects!\n';
    }

    // Stress Level
    analysis += `**Stress Level**: ${data.stressLevel}\n`;
    if (data.stressLevel === 'high') {
      analysis += 'You have high stress. Consider stress management techniques.\n';
    } else if (data.stressLevel === 'moderate') {
      analysis += 'Your stress level is moderate. Relaxation techniques may help.\n';
    } else {
      analysis += 'Your stress level is low. Keep up the good work!\n';
    }

    // Coping Mechanisms
    analysis += `**Coping Mechanisms**: ${data.copingMechanisms}\n`;
    if (data.copingMechanisms === 'none') {
      analysis += 'You have not mentioned any coping mechanisms. Consider finding healthy coping strategies.\n';
    } else {
      analysis += `Your coping mechanisms: ${data.copingMechanisms}. Great! Keep using them.\n`;
    }

    // Emotional Health
    analysis += `**Emotional Health**: ${data.emotionalHealth}\n`;
    if (data.emotionalHealth === 'poor') {
      analysis += 'Your emotional health seems to be struggling. It might be helpful to seek professional support.\n';
    } else if (data.emotionalHealth === 'fair') {
      analysis += 'Your emotional health is fair. It could be helpful to focus on activities that boost your mood.\n';
    } else if (data.emotionalHealth === 'good') {
      analysis += 'Your emotional health is good. Keep taking care of yourself.\n';
    } else {
      analysis += 'Your emotional health is excellent. Keep maintaining your well-being!\n';
    }

    return analysis;
  };

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!reportData) {
    return <div className="text-center text-gray-500">Loading report...</div>;
  }

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Mental Health Report</h1>

        {/* Report Information */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-600"><strong>Name:</strong> {reportData.name}</p>
            <p className="font-medium text-gray-600"><strong>Age:</strong> {reportData.age}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-600"><strong>Gender:</strong> {reportData.gender}</p>
            <p className="font-medium text-gray-600"><strong>Date:</strong> {currentDate}</p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Assessment Summary */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Assessment Summary</h2>
        <pre className="bg-gray-100 p-4 rounded-md text-sm text-gray-800">{analyzeData(reportData)}</pre>

        <hr className="my-6 border-gray-300" />

        {/* Suggested Solutions */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Suggested Solutions</h2>
        <p className="text-gray-600 mb-4">
          It is recommended to explore the following actions for improvement:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Consider stress management and relaxation techniques if stress levels are high.</li>
          <li>Explore coping mechanisms like mindfulness or talking to a professional if anxiety levels are moderate or high.</li>
          <li>Maintain a healthy routine for self-care and emotional well-being.</li>
          <li>If physical health impacts are noted, consult with healthcare professionals for a balanced approach.</li>
        </ul>

        <hr className="my-6 border-gray-300" />

        {/* Severity Level */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Severity Level</h2>
        <p className="text-gray-600 mb-4">
          The severity of the individual's condition varies from minor to moderate impact on daily life and physical health. Immediate focus on improving coping strategies and self-care can help reduce stress and anxiety levels.
        </p>

        <hr className="my-6 border-gray-300" />

        {/* Free Resources */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Free Mind and Free Resources</h2>
          <p className="text-gray-600 mb-4">
            We encourage you to explore the following free resources for mental health support:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li><a href="https://www.mentalhealth.gov/get-help/immediate-help" target="_blank" className="text-blue-600 hover:underline">Immediate Help for Mental Health</a></li>
            <li><a href="https://www.headspace.com/meditation" target="_blank" className="text-blue-600 hover:underline">Mindfulness and Meditation Resources</a></li>
            <li><a href="https://www.samaritans.org" target="_blank" className="text-blue-600 hover:underline">Free Support and Listening Services</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
