// src/pages/demo.tsx
import React, { useState } from 'react';
import { MessageSquare, Save, RotateCcw } from 'lucide-react';

export default function Demo() {
  const [demoNote, setDemoNote] = useState({
    patientMood: 'stable',
    anxietyLevel: 'moderate',
    sleepQuality: 'improved',
    medication: 'compliant',
    goals: 'progressing',
  });

  const [generatedNote, setGeneratedNote] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setDemoNote(prev => ({ ...prev, [field]: value }));
  };

  const generateNote = () => {
    // In a real application, this would call the AI service
    const note = `Patient presents with ${demoNote.patientMood} mood and ${demoNote.anxietyLevel} anxiety levels. 
    Sleep quality has ${demoNote.sleepQuality}. Patient is ${demoNote.medication} with prescribed medications. 
    Treatment goals are ${demoNote.goals}.`;
    setGeneratedNote(note);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Try FloNotes In Action
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Experience how FloNotes can transform your clinical documentation process with our interactive demo.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Interface */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Input Form */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Session Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient Mood</label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                    value={demoNote.patientMood}
                    onChange={(e) => handleInputChange('patientMood', e.target.value)}
                  >
                    <option value="stable">Stable</option>
                    <option value="improved">Improved</option>
                    <option value="deteriorated">Deteriorated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Anxiety Level</label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                    value={demoNote.anxietyLevel}
                    onChange={(e) => handleInputChange('anxietyLevel', e.target.value)}
                  >
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Sleep Quality</label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                    value={demoNote.sleepQuality}
                    onChange={(e) => handleInputChange('sleepQuality', e.target.value)}
                  >
                    <option value="improved">Improved</option>
                    <option value="unchanged">Unchanged</option>
                    <option value="deteriorated">Deteriorated</option>
                  </select>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={generateNote}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Generate Note
                  </button>
                  <button
                    onClick={() => setGeneratedNote('')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Generated Note Preview */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Generated Note</h3>
                  <button
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
                  >
                    <Save className="mr-1.5 h-4 w-4" />
                    Save
                  </button>
                </div>
                <div className="prose max-w-none">
                  {generatedNote ? (
                    <p className="text-gray-700">{generatedNote}</p>
                  ) : (
                    <p className="text-gray-500 italic">
                      Fill in the session details and click "Generate Note" to see AI-powered note generation in action.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}