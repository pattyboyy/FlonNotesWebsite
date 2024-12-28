import React, { useState } from 'react';
import {
  MessageSquare,
  RotateCcw,
  Save,
  HelpCircle,
} from 'lucide-react';

/**
 * Interfaces defining the state structure for each section of the form.
 */
interface MoodState {
  primary: string;
  intensity: number;
  hasSecondary: boolean;
  secondary: string;
  secondaryIntensity: number;
}

interface BehaviorsState {
  cooperative: boolean;
  followingRules: boolean;
  respectful: boolean;
  disruptive: boolean;
  withdrawn: boolean;
  aggressive: boolean;
  impulsive: boolean;
  other: boolean;
  otherDescription: string;
}

interface ActivityState {
  participated: boolean;
  engagement: number;
}

interface SocialState {
  peer: string;
  staff: string;
  overallInteraction: number;
}

interface HealthState {
  medicationsTaken: boolean;
  sleepIssues: boolean;
  appetiteIssues: boolean;
  physicalComplaints: boolean;
  hygieneIssues: boolean;
  safetyConcerns: boolean;
  healthDescription: string;
}

interface IncidentsState {
  occurred: boolean;
  description: string;
  copingSkillsUsed: {
    deepBreathing: boolean;
    mindfulness: boolean;
    distraction: boolean;
    journaling: boolean;
    physicalActivity: boolean;
    talkingToStaff: boolean;
    other: boolean;
  };
  otherCopingSkillDescription: string;
  effectiveness: number;
}

const Demo = () => {
  // -------------------------------
  // 1) State Hooks for Each Section
  // -------------------------------
  const [mood, setMood] = useState<MoodState>({
    primary: 'Stable',
    intensity: 5,
    hasSecondary: false,
    secondary: 'Anxious',
    secondaryIntensity: 5,
  });

  const [behaviors, setBehaviors] = useState<BehaviorsState>({
    cooperative: false,
    followingRules: false,
    respectful: false,
    disruptive: false,
    withdrawn: false,
    aggressive: false,
    impulsive: false,
    other: false,
    otherDescription: '',
  });

  const [activities, setActivities] = useState<Record<string, ActivityState>>({
    'Group Therapy': { participated: false, engagement: 5 },
    'Individual Therapy': { participated: false, engagement: 5 },
    'Recreational Activities': { participated: false, engagement: 5 },
    'Skill Building Groups': { participated: false, engagement: 5 },
  });

  const [social, setSocial] = useState<SocialState>({
    peer: 'Appropriate',
    staff: 'Appropriate',
    overallInteraction: 5,
  });

  const [health, setHealth] = useState<HealthState>({
    medicationsTaken: false,
    sleepIssues: false,
    appetiteIssues: false,
    physicalComplaints: false,
    hygieneIssues: false,
    safetyConcerns: false,
    healthDescription: '',
  });

  const [incidents, setIncidents] = useState<IncidentsState>({
    occurred: false,
    description: '',
    copingSkillsUsed: {
      deepBreathing: false,
      mindfulness: false,
      distraction: false,
      journaling: false,
      physicalActivity: false,
      talkingToStaff: false,
      other: false,
    },
    otherCopingSkillDescription: '',
    effectiveness: 5,
  });

  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // -------------------------------
  // 2) Generated Note and Status States
  // -------------------------------
  const [generatedNote, setGeneratedNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Save Modal State
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  // -------------------------------
  // 3) Utility Functions
  // -------------------------------
  const mapScoreToDescriptor = (score: number): string => {
    if (score >= 1 && score <= 3) return 'mild';
    if (score >= 4 && score <= 6) return 'moderate';
    if (score >= 7 && score <= 10) return 'severe';
    return 'unknown';
  };

  const transformData = (data: ReturnType<typeof collectFormData>) => {
    const transformed = {
      mood: {
        ...data.mood,
        intensityDescriptor: mapScoreToDescriptor(data.mood.intensity),
        secondaryIntensityDescriptor: data.mood.hasSecondary
          ? mapScoreToDescriptor(data.mood.secondaryIntensity)
          : null,
      },
      behaviors: { ...data.behaviors },
      activities: Object.fromEntries(
        Object.entries(data.activities).map(([key, val]) => [
          key,
          { ...val, engagementDescriptor: mapScoreToDescriptor(val.engagement) },
        ])
      ),
      social: {
        ...data.social,
        overallInteractionDescriptor: mapScoreToDescriptor(
          data.social.overallInteraction
        ),
      },
      health: { ...data.health },
      incidents: {
        ...data.incidents,
        effectivenessDescriptor: mapScoreToDescriptor(
          data.incidents.effectiveness
        ),
      },
      additionalNotes: data.additionalNotes,
    };

    return transformed;
  };

  // -------------------------------
  // 4) Collect Form Data
  // -------------------------------
  function collectFormData() {
    return {
      mood,
      behaviors,
      activities,
      social,
      health,
      incidents,
      additionalNotes,
    };
  }

  /**
   * Creates a prompt for the AI model.
   */
  function createAiPrompt(data: ReturnType<typeof transformData>) {
    const { mood, behaviors, activities, social, health, incidents, additionalNotes } = data;

    let prompt = `The following information was collected from a mental health session:\n\n`;

    // Mood
    prompt += `Mood: ${mood.primary} (Intensity: ${mood.intensityDescriptor}).`;
    if (mood.hasSecondary) {
      prompt += ` Also noted: ${mood.secondary} (Intensity: ${mood.secondaryIntensityDescriptor}).`;
    }
    prompt += `\n\n`;

    // Behaviors
    const checkedBehaviors = Object.entries(behaviors)
      .filter(([key, val]) => val && key !== 'other')
      .map(([key]) => key.replace(/([A-Z])/g, ' $1'));
    if (
      checkedBehaviors.length > 0 ||
      (behaviors.other && behaviors.otherDescription.trim() !== '')
    ) {
      prompt += `Observed Behaviors: ${checkedBehaviors.join(', ')}.`;
      if (behaviors.otherDescription.trim()) {
        prompt += ` Additional detail: ${behaviors.otherDescription}.`;
      }
      prompt += `\n\n`;
    }

    // Activities
    const participatedActivities = Object.entries(activities)
      .filter(([, val]) => val.participated)
      .map(([name, val]) => `${name} (${(val as any).engagementDescriptor})`);
    if (participatedActivities.length > 0) {
      prompt += `Activities & Engagement: ${participatedActivities.join('; ')}.\n\n`;
    }

    // Social
    prompt += `Social Interactions: Peer - ${social.peer}, Staff - ${social.staff}, Overall Interaction Level - ${social.overallInteractionDescriptor}.\n\n`;

    // Health
    const healthConcerns = [
      health.medicationsTaken && 'medications taken',
      health.sleepIssues && 'sleep issues',
      health.appetiteIssues && 'appetite issues',
      health.physicalComplaints && 'physical complaints',
      health.hygieneIssues && 'hygiene issues',
      health.safetyConcerns && 'safety concerns',
    ].filter(Boolean);
    if (healthConcerns.length > 0) {
      prompt += `Health & Safety Concerns: ${healthConcerns.join(', ')}.`;
      if (health.healthDescription.trim() !== '') {
        prompt += ` Details: ${health.healthDescription}.`;
      }
      prompt += `\n\n`;
    }

    // Incidents
    if (incidents.occurred) {
      prompt += `Incident: ${incidents.description}. Coping Skills Used: `;
      const usedSkills = Object.entries(incidents.copingSkillsUsed)
        .filter(([, val]) => val)
        .map(([key]) => key.replace(/([A-Z])/g, ' $1'));
      prompt += usedSkills.join(', ');
      if (
        incidents.copingSkillsUsed.other &&
        incidents.otherCopingSkillDescription.trim() !== ''
      ) {
        prompt += `, Other: ${incidents.otherCopingSkillDescription}`;
      }
      prompt += `. Effectiveness: ${incidents.effectivenessDescriptor}.\n\n`;
    }

    // Additional Notes
    if (additionalNotes.trim()) {
      prompt += `Additional Notes: ${additionalNotes}\n\n`;
    }

    // Final instruction
    prompt += `
Please synthesize the above information into a single, cohesive paragraph approximately 150-200 words. Focus on the most clinically significant observations and conclude with one key clinical insight or recommendation. Avoid using numerical scores; instead, use qualitative descriptors to describe intensity and engagement levels.
    `;

    return prompt;
  }

  // -------------------------------
  // 5) Generate Note Handler
  // -------------------------------
  const handleGenerateNote = async () => {
    setLoading(true);
    setErrorMsg(null);
    setGeneratedNote('');

    try {
      const rawData = collectFormData();
      const transformedData = transformData(rawData);
      const prompt = createAiPrompt(transformedData);

      const response = await fetch('/api/generateNote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate note.');
      }

      const { generatedNote } = await response.json();
      setGeneratedNote(generatedNote);
    } catch (error: unknown) {
      console.error('Note generation error:', error);
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // 6) Reset Handler
  // -------------------------------
  const handleReset = () => {
    setMood({
      primary: 'Stable',
      intensity: 5,
      hasSecondary: false,
      secondary: 'Anxious',
      secondaryIntensity: 5,
    });
    setBehaviors({
      cooperative: false,
      followingRules: false,
      respectful: false,
      disruptive: false,
      withdrawn: false,
      aggressive: false,
      impulsive: false,
      other: false,
      otherDescription: '',
    });
    setActivities({
      'Group Therapy': { participated: false, engagement: 5 },
      'Individual Therapy': { participated: false, engagement: 5 },
      'Recreational Activities': { participated: false, engagement: 5 },
      'Skill Building Groups': { participated: false, engagement: 5 },
    });
    setSocial({
      peer: 'Appropriate',
      staff: 'Appropriate',
      overallInteraction: 5,
    });
    setHealth({
      medicationsTaken: false,
      sleepIssues: false,
      appetiteIssues: false,
      physicalComplaints: false,
      hygieneIssues: false,
      safetyConcerns: false,
      healthDescription: '',
    });
    setIncidents({
      occurred: false,
      description: '',
      copingSkillsUsed: {
        deepBreathing: false,
        mindfulness: false,
        distraction: false,
        journaling: false,
        physicalActivity: false,
        talkingToStaff: false,
        other: false,
      },
      otherCopingSkillDescription: '',
      effectiveness: 5,
    });
    setAdditionalNotes('');
    setGeneratedNote('');
    setErrorMsg(null);
  };

  // -------------------------------
  // 7) Collapsible Sections States
  // -------------------------------
  const [showMood, setShowMood] = useState(true);
  const [showBehaviors, setShowBehaviors] = useState(true);
  const [showActivities, setShowActivities] = useState(true);
  const [showSocial, setShowSocial] = useState(true);
  const [showHealth, setShowHealth] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [showAdditional, setShowAdditional] = useState(true);

  // -------------------------------
  // 8) Render the Component
  // -------------------------------
  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-white to-indigo-50">
      {/* Hero Section (no illustration, no dark mode) */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Try FloNotes In Action
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg md:text-xl">
            Experience how FloNotes can transform your clinical documentation process with our
            intuitive, interactive demo.
          </p>
        </div>
      </div>

      {/* Main Demo Interface */}
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: The Form */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Progress Note Inputs</h2>

            {/* Error Message */}
            {errorMsg && (
              <p className="text-sm text-red-600 mb-2">Error: {errorMsg}</p>
            )}

            {/* Collapsible: Mood Section */}
            <div className="mb-5">
              <button
                onClick={() => setShowMood(!showMood)}
                className="w-full flex items-center justify-between px-3 py-2 bg-indigo-50 text-indigo-900 font-semibold rounded-lg focus:outline-none"
              >
                <span>Mood</span>
                <span>{showMood ? '–' : '+'}</span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showMood ? 'max-h-[1000px] mt-3' : 'max-h-0'
                }`}
              >
                {/* Primary Mood (Floating Label) */}
                <div className="relative mb-4">
                  <select
                    className="block w-full appearance-none bg-transparent border-b border-gray-300 py-2 text-gray-700 focus:outline-none focus:border-indigo-500"
                    value={mood.primary}
                    onChange={(e) => setMood({ ...mood, primary: e.target.value })}
                  >
                    <option>Stable</option>
                    <option>Depressed</option>
                    <option>Anxious</option>
                    <option>Irritable</option>
                    <option>Withdrawn</option>
                    <option>Agitated</option>
                    <option>Happy</option>
                    <option>Sad</option>
                    <option>Joyful</option>
                    <option>Content</option>
                    <option>Optimistic</option>
                    <option>Energetic</option>
                    <option>Grateful</option>
                  </select>
                  <label className="absolute left-0 top-0 text-xs text-gray-500 pointer-events-none">
                    Primary Mood
                  </label>
                </div>

                <label className="block text-sm font-medium text-gray-700">
                  Mood Intensity (1-10)
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  className="w-full mb-1 accent-indigo-600"
                  value={mood.intensity}
                  onChange={(e) => setMood({ ...mood, intensity: Number(e.target.value) })}
                />
                <p className="text-sm text-gray-500 mb-2">
                  Current Intensity: {mood.intensity}/10
                </p>

                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    checked={mood.hasSecondary}
                    onChange={(e) => setMood({ ...mood, hasSecondary: e.target.checked })}
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Add Secondary Mood
                  </label>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mood.hasSecondary ? 'max-h-[400px] mb-2' : 'max-h-0'
                  }`}
                >
                  <div className="relative mb-3">
                    <select
                      className="block w-full appearance-none bg-transparent border-b border-gray-300 py-2 text-gray-700 focus:outline-none focus:border-indigo-500"
                      value={mood.secondary}
                      onChange={(e) => setMood({ ...mood, secondary: e.target.value })}
                    >
                      <option>Stable</option>
                      <option>Depressed</option>
                      <option>Anxious</option>
                      <option>Irritable</option>
                      <option>Withdrawn</option>
                      <option>Agitated</option>
                      <option>Happy</option>
                      <option>Sad</option>
                      <option>Joyful</option>
                      <option>Content</option>
                      <option>Optimistic</option>
                      <option>Energetic</option>
                      <option>Grateful</option>
                    </select>
                    <label className="absolute left-0 top-0 text-xs text-gray-500 pointer-events-none">
                      Secondary Mood
                    </label>
                  </div>

                  <label className="block text-sm font-medium text-gray-700">
                    Secondary Intensity (1-10)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    className="w-full mb-1 accent-indigo-600"
                    value={mood.secondaryIntensity}
                    onChange={(e) =>
                      setMood({ ...mood, secondaryIntensity: Number(e.target.value) })
                    }
                  />
                  <p className="text-sm text-gray-500">
                    Current: {mood.secondaryIntensity}/10
                  </p>
                </div>
              </div>
            </div>

            {/* Collapsible: Behaviors Section */}
            <div className="mb-5">
              <button
                onClick={() => setShowBehaviors(!showBehaviors)}
                className="w-full flex items-center justify-between px-3 py-2 bg-indigo-50 text-indigo-900 font-semibold rounded-lg focus:outline-none"
              >
                <span>Behaviors</span>
                <span>{showBehaviors ? '–' : '+'}</span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showBehaviors ? 'max-h-[800px] mt-3' : 'max-h-0'
                }`}
              >
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(behaviors)
                    .filter(([key]) => !['otherDescription'].includes(key))
                    .map(([key, val]) => {
                      if (key === 'other') {
                        return (
                          <div key={key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              checked={val as boolean}
                              onChange={(e) =>
                                setBehaviors({ ...behaviors, [key]: e.target.checked })
                              }
                            />
                            <label className="text-sm capitalize text-gray-700">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </label>
                          </div>
                        );
                      }
                      if (typeof val === 'boolean') {
                        return (
                          <div key={key} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              checked={val}
                              onChange={(e) =>
                                setBehaviors({ ...behaviors, [key]: e.target.checked })
                              }
                            />
                            <label className="text-sm capitalize text-gray-700">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </label>
                          </div>
                        );
                      }
                      return null;
                    })}
                </div>

                {/* 'Other' Behavior Description */}
                {behaviors.other && (
                  <textarea
                    className="mt-3 w-full border border-gray-300 rounded-md p-2 bg-transparent text-gray-900 focus:outline-none focus:border-indigo-500"
                    rows={2}
                    placeholder="Describe other behavior..."
                    value={behaviors.otherDescription}
                    onChange={(e) =>
                      setBehaviors({ ...behaviors, otherDescription: e.target.value })
                    }
                  />
                )}
              </div>
            </div>

            {/* Collapsible: Activities Section */}
            <div className="mb-5">
              <button
                onClick={() => setShowActivities(!showActivities)}
                className="w-full flex items-center justify-between px-3 py-2 bg-indigo-50 text-indigo-900 font-semibold rounded-lg focus:outline-none"
              >
                <span>Activities & Engagement</span>
                <span>{showActivities ? '–' : '+'}</span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showActivities ? 'max-h-[1500px] mt-3' : 'max-h-0'
                }`}
              >
                {Object.entries(activities).map(([activityName, data]) => (
                  <div key={activityName} className="mb-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        checked={data.participated}
                        onChange={(e) =>
                          setActivities({
                            ...activities,
                            [activityName]: {
                              ...data,
                              participated: e.target.checked,
                            },
                          })
                        }
                      />
                      <label className="text-sm font-medium text-gray-700">
                        {activityName}
                      </label>
                    </div>

                    {data.participated && (
                      <div className="ml-6 mt-1">
                        <label className="block text-xs font-medium text-gray-700">
                          Engagement (1-10)
                        </label>
                        <input
                          type="range"
                          min={1}
                          max={10}
                          className="w-full accent-indigo-600"
                          value={data.engagement}
                          onChange={(e) =>
                            setActivities({
                              ...activities,
                              [activityName]: {
                                ...data,
                                engagement: Number(e.target.value),
                              },
                            })
                          }
                        />
                        <p className="text-xs text-gray-500">
                          Current: {data.engagement}/10
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Collapsible: Social Interactions Section */}
            <div className="mb-5">
              <button
                onClick={() => setShowSocial(!showSocial)}
                className="w-full flex items-center justify-between px-3 py-2 bg-indigo-50 text-indigo-900 font-semibold rounded-lg focus:outline-none"
              >
                <span>Social Interactions</span>
                <span>{showSocial ? '–' : '+'}</span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showSocial ? 'max-h-[500px] mt-3' : 'max-h-0'
                }`}
              >
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                      Peer Interactions
                      <HelpCircle className="ml-1 h-4 w-4 text-gray-400 cursor-pointer">
                        <title>How the client interacts with other peers in the session or environment.</title>
                      </HelpCircle>
                    </label>
                    <select
                      className="w-full border-b border-gray-300 bg-transparent py-1 text-gray-700 focus:outline-none focus:border-indigo-500"
                      value={social.peer}
                      onChange={(e) => setSocial({ ...social, peer: e.target.value })}
                    >
                      <option>Appropriate</option>
                      <option>Inappropriate</option>
                      <option>Mixed</option>
                      <option>Isolated</option>
                      <option>Boundaries Issues</option>
                      <option>No Peer Contact</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                      Staff Interactions
                      <HelpCircle className="ml-1 h-4 w-4 text-gray-400 cursor-pointer">
                        <title>How the client engages with staff or authority figures.</title>
                      </HelpCircle>
                    </label>
                    <select
                      className="w-full border-b border-gray-300 bg-transparent py-1 text-gray-700 focus:outline-none focus:border-indigo-500"
                      value={social.staff}
                      onChange={(e) => setSocial({ ...social, staff: e.target.value })}
                    >
                      <option>Appropriate</option>
                      <option>Inappropriate</option>
                      <option>Mixed</option>
                      <option>Avoidant</option>
                      <option>Oppositional</option>
                      <option>Seeking</option>
                    </select>
                  </div>
                </div>

                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Overall Social Interaction Level (1-10)
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  className="w-full accent-indigo-600"
                  value={social.overallInteraction}
                  onChange={(e) =>
                    setSocial({ ...social, overallInteraction: Number(e.target.value) })
                  }
                />
                <p className="text-xs text-gray-500">
                  Current: {social.overallInteraction}/10
                </p>
              </div>
            </div>

            {/* Collapsible: Health & Safety Section */}
            <div className="mb-5">
              <button
                onClick={() => setShowHealth(!showHealth)}
                className="w-full flex items-center justify-between px-3 py-2 bg-indigo-50 text-indigo-900 font-semibold rounded-lg focus:outline-none"
              >
                <span>Health & Safety</span>
                <span>{showHealth ? '–' : '+'}</span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showHealth ? 'max-h-[600px] mt-3' : 'max-h-0'
                }`}
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      checked={health.medicationsTaken}
                      onChange={(e) =>
                        setHealth({ ...health, medicationsTaken: e.target.checked })
                      }
                    />
                    <label className="text-sm text-gray-700">Medications Taken</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      checked={health.sleepIssues}
                      onChange={(e) =>
                        setHealth({ ...health, sleepIssues: e.target.checked })
                      }
                    />
                    <label className="text-sm text-gray-700">Sleep Issues</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      checked={health.appetiteIssues}
                      onChange={(e) =>
                        setHealth({ ...health, appetiteIssues: e.target.checked })
                      }
                    />
                    <label className="text-sm text-gray-700">Appetite Issues</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      checked={health.physicalComplaints}
                      onChange={(e) =>
                        setHealth({ ...health, physicalComplaints: e.target.checked })
                      }
                    />
                    <label className="text-sm text-gray-700">Physical Complaints</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      checked={health.hygieneIssues}
                      onChange={(e) =>
                        setHealth({ ...health, hygieneIssues: e.target.checked })
                      }
                    />
                    <label className="text-sm text-gray-700">Hygiene Issues</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      checked={health.safetyConcerns}
                      onChange={(e) =>
                        setHealth({ ...health, safetyConcerns: e.target.checked })
                      }
                    />
                    <label className="text-sm text-gray-700">Safety Concerns</label>
                  </div>
                </div>

                {(health.medicationsTaken ||
                  health.sleepIssues ||
                  health.appetiteIssues ||
                  health.physicalComplaints ||
                  health.hygieneIssues ||
                  health.safetyConcerns) && (
                  <textarea
                    className="mt-3 w-full border border-gray-300 rounded-md p-2 bg-transparent text-gray-900 focus:outline-none focus:border-indigo-500"
                    rows={3}
                    placeholder="Describe the health and safety issues..."
                    value={health.healthDescription}
                    onChange={(e) => setHealth({ ...health, healthDescription: e.target.value })}
                  />
                )}
              </div>
            </div>

            {/* Collapsible: Incidents Section */}
            <div className="mb-5">
              <button
                onClick={() => setShowIncidents(!showIncidents)}
                className="w-full flex items-center justify-between px-3 py-2 bg-indigo-50 text-indigo-900 font-semibold rounded-lg focus:outline-none"
              >
                <span>Incidents</span>
                <span>{showIncidents ? '–' : '+'}</span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showIncidents ? 'max-h-[700px] mt-3' : 'max-h-0'
                }`}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    checked={incidents.occurred}
                    onChange={(e) =>
                      setIncidents({ ...incidents, occurred: e.target.checked })
                    }
                  />
                  <label className="block text-sm font-medium text-gray-700">
                    Incident Occurred
                  </label>
                </div>

                {incidents.occurred && (
                  <>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2 bg-transparent text-gray-900 mb-3 focus:outline-none focus:border-indigo-500"
                      rows={3}
                      placeholder="Describe the incident..."
                      value={incidents.description}
                      onChange={(e) =>
                        setIncidents({ ...incidents, description: e.target.value })
                      }
                    />

                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Coping Skills Used
                    </label>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {Object.entries(incidents.copingSkillsUsed).map(([skill, val]) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            checked={val}
                            onChange={(e) =>
                              setIncidents({
                                ...incidents,
                                copingSkillsUsed: {
                                  ...incidents.copingSkillsUsed,
                                  [skill]: e.target.checked,
                                },
                              })
                            }
                          />
                          <label className="text-sm capitalize text-gray-700">
                            {skill.replace(/([A-Z])/g, ' $1')}
                          </label>
                        </div>
                      ))}
                    </div>

                    {incidents.copingSkillsUsed.other && (
                      <textarea
                        className="w-full border border-gray-300 rounded-md p-2 bg-transparent text-gray-900 mb-3 focus:outline-none focus:border-indigo-500"
                        rows={2}
                        placeholder="Describe other coping skill..."
                        value={incidents.otherCopingSkillDescription}
                        onChange={(e) =>
                          setIncidents({
                            ...incidents,
                            otherCopingSkillDescription: e.target.value,
                          })
                        }
                      />
                    )}

                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Effectiveness of Coping Skills (1-10)
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      className="w-full mb-1 accent-indigo-600"
                      value={incidents.effectiveness}
                      onChange={(e) =>
                        setIncidents({
                          ...incidents,
                          effectiveness: Number(e.target.value),
                        })
                      }
                    />
                    <p className="text-xs text-gray-500">
                      Current: {incidents.effectiveness}/10
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Collapsible: Additional Notes Section */}
            <div className="mb-5">
              <button
                onClick={() => setShowAdditional(!showAdditional)}
                className="w-full flex items-center justify-between px-3 py-2 bg-indigo-50 text-indigo-900 font-semibold rounded-lg focus:outline-none"
              >
                <span>Additional Notes</span>
                <span>{showAdditional ? '–' : '+'}</span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  showAdditional ? 'max-h-[400px] mt-3' : 'max-h-0'
                }`}
              >
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 bg-transparent text-gray-900 focus:outline-none focus:border-indigo-500"
                  rows={3}
                  placeholder="Enter any additional observations, incidents, or important information..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Generate & Reset Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleGenerateNote}
                className={`inline-flex items-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-white ${
                  loading
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
                disabled={loading}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                {loading ? 'Generating...' : 'Generate Note'}
              </button>
              <button
                onClick={handleReset}
                className={`inline-flex items-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-gray-700 border border-gray-300 ${
                  loading
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-white hover:bg-gray-50'
                }`}
                disabled={loading}
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset
              </button>
            </div>
          </div>

          {/* Right Column: Generated Note Preview */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Generated Note</h3>
              <button
                onClick={() => setSaveModalOpen(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                <Save className="mr-1.5 h-4 w-4" />
                Save
              </button>
            </div>
            <div className="prose prose-sm max-w-none flex-1 overflow-auto border border-gray-100 rounded-md p-4 bg-gray-50">
              {generatedNote ? (
                <p className="text-gray-700 whitespace-pre-wrap">
                  {generatedNote}
                </p>
              ) : (
                <p className="text-gray-500 italic">
                  Fill in the form on the left and click “Generate Note” to see an AI-powered
                  progress note.
                </p>
              )}
            </div>

            {/* Promotional Box */}
            <div className="mt-6 bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-md shadow-sm">
              <h4 className="text-lg font-semibold text-indigo-900 mb-2">
                All note inputs can be customized for YOUR needs!
              </h4>
              <p className="text-indigo-800 text-sm leading-relaxed">
                FloNotes is designed to adapt to your practice’s unique workflows and clinical
                documentation requirements. Whether you need custom fields, specialized sections, or 
                AI-driven insights tailored to your specific treatments, we can build a note generator 
                that fits your business perfectly. By partnering with us, you’ll get an efficient, 
                user-friendly tool to streamline your notes—so you can focus on delivering the best care possible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {saveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Save Note</h2>
            <p className="text-gray-700">
              This is a demo. The save functionality isn’t implemented yet, but imagine we’re saving
              your generated note securely here!
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setSaveModalOpen(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demo;
