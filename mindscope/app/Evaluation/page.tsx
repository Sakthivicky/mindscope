"use client";

import { useState } from "react";

export default function MentalHealthSurvey() {
  const [formData, setFormData] = useState({
    stressLevel: "",
    anxietyLevel: "",
    mood: "",
    sleepQuality: "",
    physicalActivity: "",
    socialInteractions: "",
    copingMechanisms: "",
    mentalHealthSupport: "",
    workLifeBalance: "",
    recentChanges: "",
  });

  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send the survey data to the backend for analysis
    try {
      const response = await fetch("/api/mental-health-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.analysis) {
        setAnalysis(data.analysis); // Show the analysis report
      } else {
        alert("Error: Unable to generate report");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting survey");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Mental Health Survey</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stress Level */}
          <div>
            <p className="text-lg font-semibold">How would you rate your stress level?</p>
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="stressLevel"
                  value="Low"
                  checked={formData.stressLevel === "Low"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Low
              </label>
              <label>
                <input
                  type="radio"
                  name="stressLevel"
                  value="Moderate"
                  checked={formData.stressLevel === "Moderate"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Moderate
              </label>
              <label>
                <input
                  type="radio"
                  name="stressLevel"
                  value="High"
                  checked={formData.stressLevel === "High"}
                  onChange={handleChange}
                  className="mr-2"
                />
                High
              </label>
            </div>
          </div>

          {/* Anxiety Level */}
          <div>
            <p className="text-lg font-semibold">How would you rate your anxiety level?</p>
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="anxietyLevel"
                  value="Low"
                  checked={formData.anxietyLevel === "Low"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Low
              </label>
              <label>
                <input
                  type="radio"
                  name="anxietyLevel"
                  value="Moderate"
                  checked={formData.anxietyLevel === "Moderate"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Moderate
              </label>
              <label>
                <input
                  type="radio"
                  name="anxietyLevel"
                  value="High"
                  checked={formData.anxietyLevel === "High"}
                  onChange={handleChange}
                  className="mr-2"
                />
                High
              </label>
            </div>
          </div>

          {/* Mood */}
          <div>
            <p className="text-lg font-semibold">How would you describe your current mood?</p>
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="mood"
                  value="Happy"
                  checked={formData.mood === "Happy"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Happy
              </label>
              <label>
                <input
                  type="radio"
                  name="mood"
                  value="Neutral"
                  checked={formData.mood === "Neutral"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Neutral
              </label>
              <label>
                <input
                  type="radio"
                  name="mood"
                  value="Sad"
                  checked={formData.mood === "Sad"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Sad
              </label>
            </div>
          </div>

          {/* Sleep Quality */}
          <div>
            <p className="text-lg font-semibold">How would you rate your sleep quality?</p>
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="sleepQuality"
                  value="Good"
                  checked={formData.sleepQuality === "Good"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Good
              </label>
              <label>
                <input
                  type="radio"
                  name="sleepQuality"
                  value="Average"
                  checked={formData.sleepQuality === "Average"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Average
              </label>
              <label>
                <input
                  type="radio"
                  name="sleepQuality"
                  value="Poor"
                  checked={formData.sleepQuality === "Poor"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Poor
              </label>
            </div>
          </div>

          {/* Physical Activity */}
          <div>
            <p className="text-lg font-semibold">How often do you engage in physical activity?</p>
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="physicalActivity"
                  value="Daily"
                  checked={formData.physicalActivity === "Daily"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Daily
              </label>
              <label>
                <input
                  type="radio"
                  name="physicalActivity"
                  value="Weekly"
                  checked={formData.physicalActivity === "Weekly"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Weekly
              </label>
              <label>
                <input
                  type="radio"
                  name="physicalActivity"
                  value="Rarely"
                  checked={formData.physicalActivity === "Rarely"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Rarely
              </label>
            </div>
          </div>

          {/* Social Interactions */}
          <div>
            <p className="text-lg font-semibold">How would you describe your social interactions?</p>
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="socialInteractions"
                  value="Very Social"
                  checked={formData.socialInteractions === "Very Social"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Very Social
              </label>
              <label>
                <input
                  type="radio"
                  name="socialInteractions"
                  value="Somewhat Social"
                  checked={formData.socialInteractions === "Somewhat Social"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Somewhat Social
              </label>
              <label>
                <input
                  type="radio"
                  name="socialInteractions"
                  value="Not Social"
                  checked={formData.socialInteractions === "Not Social"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Not Social
              </label>
            </div>
          </div>

          {/* Coping Mechanisms */}
          <div>
            <p className="text-lg font-semibold">Which coping mechanisms do you use?</p>
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="copingMechanisms"
                  value="Exercise"
                  checked={formData.copingMechanisms === "Exercise"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Exercise
              </label>
              <label>
                <input
                  type="radio"
                  name="copingMechanisms"
                  value="Meditation"
                  checked={formData.copingMechanisms === "Meditation"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Meditation
              </label>
              <label>
                <input
                  type="radio"
                  name="copingMechanisms"
                  value="Talking to Others"
                  checked={formData.copingMechanisms === "Talking to Others"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Talking to Others
              </label>
            </div>
          </div>

          {/* Mental Health Support */}
          <div>
            <p className="text-lg font-semibold">Do you have access to mental health support?</p>
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="mentalHealthSupport"
                  value="Yes"
                  checked={formData.mentalHealthSupport === "Yes"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="mentalHealthSupport"
                  value="No"
                  checked={formData.mentalHealthSupport === "No"}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Work-Life Balance */}
          <div>
            <p className="text-lg font-semibold">How would you rate your work-life balance?</p>
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="workLifeBalance"
                  value="Good"
                  checked={formData.workLifeBalance === "Good"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Good
              </label>
              <label>
                <input
                  type="radio"
                  name="workLifeBalance"
                  value="Average"
                  checked={formData.workLifeBalance === "Average"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Average
              </label>
              <label>
                <input
                  type="radio"
                  name="workLifeBalance"
                  value="Poor"
                  checked={formData.workLifeBalance === "Poor"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Poor
              </label>
            </div>
          </div>

          {/* Recent Life Changes */}
          <div>
            <p className="text-lg font-semibold">Have you experienced any recent life changes?</p>
            <div className="space-x-4">
              <label>
                <input
                  type="radio"
                  name="recentChanges"
                  value="Yes"
                  checked={formData.recentChanges === "Yes"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="recentChanges"
                  value="No"
                  checked={formData.recentChanges === "No"}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">
            Submit Survey
          </button>
        </form>

        {analysis && (
          <div className="mt-6 bg-blue-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold">Mental Health Analysis:</h3>
            <p>{analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
}
