'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  age: number;
  gender: string;
  stressLevel: string;
  anxietyLevel: string;
  mood: string;
  copingMechanisms: string;
  sleepQuality: string;
}

export default function MentalHealthSurvey() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 0,
    gender: 'other',
    stressLevel: '',
    anxietyLevel: '',
    mood: 'neutral',
    copingMechanisms: '',
    sleepQuality: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for personal details
    if (!formData.name || formData.age <= 0) {
      alert('Please fill out all personal details.');
      return;
    }

    // Validation for mental health questions
    if (
      !formData.stressLevel ||
      !formData.anxietyLevel ||
      !formData.mood ||
      !formData.copingMechanisms ||
      !formData.sleepQuality
    ) {
      alert('Please answer all questions.');
      return;
    }

    try {
      const response = await fetch('api/mental-health-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.id) {
        router.push(`/report?id=${result.id}`);
        alert
      } else {
        alert('Error generating report');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('Failed to generate report');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Mental Health Survey</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-lg font-medium">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your age"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-lg font-medium">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="other">Other</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Mental Health Questions */}
        <div>
          <label htmlFor="stressLevel" className="block text-lg font-medium">Stress Level:</label>
          <select
            id="stressLevel"
            name="stressLevel"
            value={formData.stressLevel}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Stress Level</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="anxietyLevel" className="block text-lg font-medium">Anxiety Level:</label>
          <select
            id="anxietyLevel"
            name="anxietyLevel"
            value={formData.anxietyLevel}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Anxiety Level</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label htmlFor="mood" className="block text-lg font-medium">Mood:</label>
          <select
            id="mood"
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="neutral">Neutral</option>
            <option value="good">Good</option>
            <option value="sad">Sad</option>
          </select>
        </div>

        <div>
          <label htmlFor="copingMechanisms" className="block text-lg font-medium">Coping Mechanisms:</label>
          <input
            type="text"
            id="copingMechanisms"
            name="copingMechanisms"
            value={formData.copingMechanisms}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
            placeholder="Describe your coping mechanisms"
          />
        </div>

        <div>
          <label htmlFor="sleepQuality" className="block text-lg font-medium">Sleep Quality:</label>
          <input
            type="text"
            id="sleepQuality"
            name="sleepQuality"
            value={formData.sleepQuality}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
            placeholder="Describe your sleep quality"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600"
          >
            Generate Report
          </button>
        </div>
      </form>
    </div>
  );
}
