'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  age: number;
  gender: string;
  lifeSatisfaction: string;
  stressLevel: string;
  copingMechanisms: string;
  emotionalHealth: string;
  selfCare: string;
  mentalImpactOnDailyLife: string;
  physicalHealthImpact: string;
}

export default function MentalHealthSurvey() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 0,
    gender: 'other',
    lifeSatisfaction: '',
    stressLevel: '',
    copingMechanisms: '',
    emotionalHealth: '',
    selfCare: '',
    mentalImpactOnDailyLife: '',
    physicalHealthImpact: '',
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
      !formData.lifeSatisfaction ||
      !formData.stressLevel ||
      !formData.copingMechanisms ||
      !formData.emotionalHealth ||
      !formData.selfCare ||
      !formData.mentalImpactOnDailyLife ||
      !formData.physicalHealthImpact
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
          <label htmlFor="lifeSatisfaction" className="block text-lg font-medium">Overall Life Satisfaction (Past Month):</label>
          <select
            id="lifeSatisfaction"
            name="lifeSatisfaction"
            value={formData.lifeSatisfaction}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Life Satisfaction</option>
            <option value="very_dissatisfied">Very Dissatisfied</option>
            <option value="dissatisfied">Dissatisfied</option>
            <option value="neutral">Neutral</option>
            <option value="satisfied">Satisfied</option>
            <option value="very_satisfied">Very Satisfied</option>
          </select>
        </div>

        <div>
          <label htmlFor="stressLevel" className="block text-lg font-medium">How often have you felt overwhelmed in the past week?</label>
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
  <label htmlFor="copingMechanisms" className="block text-lg font-medium">How do you typically manage emotional distress?</label>
  <select
    id="copingMechanisms"
    name="copingMechanisms"
    value={formData.copingMechanisms}
    onChange={handleChange}
    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
  >
    <option value="">Select your coping mechanism</option>
    <option value="exercise">Exercise</option>
    <option value="meditation">Meditation</option>
    <option value="talking_to_friends">Talking to friends/family</option>
    <option value="hobbies">Engaging in hobbies</option>
    <option value="journaling">Journaling</option>
    <option value="therapy">Therapy or counseling</option>
    <option value="relaxation_techniques">Relaxation techniques (e.g., deep breathing)</option>
    <option value="avoidance">Avoidance (e.g., distracting activities)</option>
    <option value="other">Other</option>
  </select>
</div>


        <div>
          <label htmlFor="emotionalHealth" className="block text-lg font-medium">In the past month, how would you rate your emotional well-being?</label>
          <select
            id="emotionalHealth"
            name="emotionalHealth"
            value={formData.emotionalHealth}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Emotional Health</option>
            <option value="poor">Poor</option>
            <option value="fair">Fair</option>
            <option value="good">Good</option>
            <option value="excellent">Excellent</option>
          </select>
        </div>

        <div>
          <label htmlFor="selfCare" className="block text-lg font-medium">How often do you practice self-care (e.g., relaxation techniques, mindfulness)?</label>
          <select
            id="selfCare"
            name="selfCare"
            value={formData.selfCare}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Frequency</option>
            <option value="never">Never</option>
            <option value="rarely">Rarely</option>
            <option value="occasionally">Occasionally</option>
            <option value="often">Often</option>
            <option value="always">Always</option>
          </select>
        </div>

        <div>
          <label htmlFor="mentalImpactOnDailyLife" className="block text-lg font-medium">How much has your mental health impacted your daily life in the past month?</label>
          <select
            id="mentalImpactOnDailyLife"
            name="mentalImpactOnDailyLife"
            value={formData.mentalImpactOnDailyLife}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Impact Level</option>
            <option value="none">No Impact</option>
            <option value="minor">Minor Impact</option>
            <option value="moderate">Moderate Impact</option>
            <option value="major">Major Impact</option>
            <option value="severe">Severe Impact</option>
          </select>
        </div>

        <div>
          <label htmlFor="physicalHealthImpact" className="block text-lg font-medium">Have you noticed any physical health changes related to your mental health in the past month?</label>
          <select
            id="physicalHealthImpact"
            name="physicalHealthImpact"
            value={formData.physicalHealthImpact}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Select Impact</option>
            <option value="none">No Impact</option>
            <option value="minor">Minor Impact</option>
            <option value="moderate">Moderate Impact</option>
            <option value="major">Major Impact</option>
            <option value="severe">Severe Impact</option>
          </select>
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
