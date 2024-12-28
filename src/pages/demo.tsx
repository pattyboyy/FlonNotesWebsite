// src/pages/demo.tsx

import React, { useState } from 'react';
import { MessageSquare, RotateCcw, Save } from 'lucide-react';

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
  
  // Mood Section State
  const [mood, setMood] = useState<MoodState>({
    primary: 'Stable',
    intensity: 5,
    hasSecondary: false,
    secondary: 'Anxious',
    secondaryIntensity: 5,
  });

  // Behaviors Section State
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

  // Activities Section State
  const [activities, setActivities] = useState<Record<string, ActivityState>>({
    'Group Therapy': { participated: false, engagement: 5 },
    'Individual Therapy': { participated: false, engagement: 5 },
    'Recreational Activities': { participated: false, engagement: 5 },
    'Skill Building Groups': { participated: false, engagement: 5 },
  });

  // Social Interactions Section State
  const [social, setSocial] = useState<SocialState>({
    peer: 'Appropriate',
    staff: 'Appropriate',
    overallInteraction: 5,
  });

  // Health & Safety Section State
  const [health, setHealth] = useState<HealthState>({
    medicationsTaken: false,
    sleepIssues: false,
    appetiteIssues: false,
    physicalComplaints: false,
    hygieneIssues: false,
    safetyConcerns: false,
    healthDescription: '',
  });

  // Incidents Section State
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

  // Additional Notes State
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // -------------------------------
  // 2) Generated Note and Status States
  // -------------------------------
  
  const [generatedNote, setGeneratedNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // -------------------------------
  // 3) Utility Functions
  // -------------------------------
  
  /**
   * Maps a numerical score to a qualitative descriptor.
   * @param score - The numerical score (1-10)
   * @returns A qualitative descriptor string.
   */
  const mapScoreToDescriptor = (score: number): string => {
    if (score >= 1 && score <= 3) return 'mild';
    if (score >= 4 && score <= 6) return 'moderate';
    if (score >= 7 && score <= 10) return 'severe';
    return 'unknown';
  };

  /**
   * Converts the numerical data into qualitative descriptors.
   * This function returns a new object without mutating the original state.
   * @param data - The collected form data.
   * @returns The transformed data with qualitative descriptors.
   */
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
        overallInteractionDescriptor: mapScoreToDescriptor(data.social.overallInteraction),
      },
      health: { ...data.health },
      incidents: {
        ...data.incidents,
        effectivenessDescriptor: mapScoreToDescriptor(data.incidents.effectiveness),
      },
      additionalNotes: data.additionalNotes,
    };

    return transformed;
  };

  // -------------------------------
  // 4) Collect Form Data
  // -------------------------------
  
  /**
   * Collects all form data into a single object.
   * @returns An object containing all form data.
   */
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
   * Constructs a detailed prompt based on user input for generating a narrative progress note.
   * This version uses qualitative descriptors instead of numerical scores.
   * @param data - The collected and transformed form data.
   * @returns A string prompt to be sent to the AI.
   */
  function createAiPrompt(data: ReturnType<typeof transformData>) {
    const { mood, behaviors, activities, social, health, incidents, additionalNotes } = data;

    let prompt = `The following information was collected from a mental health session:\n\n`;

    // Mood description
    prompt += `Mood: ${mood.primary} (Intensity: ${mood.intensityDescriptor}).`;
    if (mood.hasSecondary) {
      prompt += ` Also noted: ${mood.secondary} (Intensity: ${mood.secondaryIntensityDescriptor}).`;
    }
    prompt += `\n\n`;

    // Behaviors
    const checkedBehaviors = Object.entries(behaviors)
      .filter(([key, val]) => val && key !== 'other')
      .map(([key]) => key.replace(/([A-Z])/g, ' $1'));
    if (checkedBehaviors.length > 0 || (behaviors.other && behaviors.otherDescription.trim() !== '')) {
      prompt += `Observed Behaviors: ${checkedBehaviors.join(', ')}.`;
      if (behaviors.otherDescription.trim()) {
        prompt += ` Additional detail: ${behaviors.otherDescription}.`;
      }
      prompt += `\n\n`;
    }

    // Activities
    const participatedActivities = Object.entries(activities)
      .filter(([_, val]) => val.participated)
      .map(([name, val]) => `${name} (${val.engagementDescriptor})`);
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
        .filter(([_, val]) => val)
        .map(([key]) => key.replace(/([A-Z])/g, ' $1'));
      prompt += usedSkills.join(', ');
      if (incidents.copingSkillsUsed.other && incidents.otherCopingSkillDescription.trim() !== '') {
        prompt += `, Other: ${incidents.otherCopingSkillDescription}`;
      }
      prompt += `. Effectiveness: ${incidents.effectivenessDescriptor}.\n\n`;
    }

    // Additional Notes
    if (additionalNotes.trim()) {
      prompt += `Additional Notes: ${additionalNotes}\n\n`;
    }

    // Final instruction: single paragraph, short narrative without numerical scores
    prompt += `
Please synthesize the above information into a single, cohesive paragraph approximately 150-200 words. Focus on the most clinically significant observations and conclude with one key clinical insight or recommendation. Avoid using numerical scores; instead, use qualitative descriptors to describe intensity and engagement levels.
    `;

    return prompt;
  }

  // -------------------------------
  // 5) Generate the Note via OpenAI
  // -------------------------------
  
  /**
   * Handles the generation of the progress note by sending the prompt to the API.
   */
  const handleGenerateNote = async () => {
    setLoading(true);
    setErrorMsg(null);
    setGeneratedNote('');

    try {
      const rawData = collectFormData();
      const transformedData = transformData(rawData);
      const prompt = createAiPrompt(transformedData);

      // Optional: Log the prompt for debugging
      console.log('Generated Prompt:', prompt);

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
    } catch (error: any) {
      console.error('Note generation error:', error);
      setErrorMsg(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // 6) Reset/Clear All
  // -------------------------------
  
  /**
   * Resets all form fields to their initial states.
   */
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
  // 7) Render the Demo
  // -------------------------------
  
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

      {/* Main Demo Interface */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Left Column: The Form */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Progress Note Inputs</h2>

                {/* Mood Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Primary Mood</label>
                  <select
                    className="w-full border-gray-300 rounded-md"
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

                  <label className="block text-sm font-medium text-gray-700">Mood Intensity (1-10)</label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    className="w-full"
                    value={mood.intensity}
                    onChange={(e) =>
                      setMood({ ...mood, intensity: Number(e.target.value) })
                    }
                  />
                  <p className="text-sm text-gray-500">Current: {mood.intensity}/10</p>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={mood.hasSecondary}
                      onChange={(e) => setMood({ ...mood, hasSecondary: e.target.checked })}
                    />
                    <label className="text-sm font-medium text-gray-700">Add Secondary Mood</label>
                  </div>

                  {mood.hasSecondary && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Secondary Mood</label>
                      <select
                        className="w-full border-gray-300 rounded-md"
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

                      <label className="block text-sm font-medium text-gray-700">
                        Secondary Intensity (1-10)
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        className="w-full"
                        value={mood.secondaryIntensity}
                        onChange={(e) =>
                          setMood({ ...mood, secondaryIntensity: Number(e.target.value) })
                        }
                      />
                      <p className="text-sm text-gray-500">Current: {mood.secondaryIntensity}/10</p>
                    </div>
                  )}
                </div>

                {/* Behaviors Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Behaviors</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(behaviors)
                      .filter(([key]) => !['otherDescription'].includes(key))
                      .map(([key, val]) => {
                        if (key === 'other') {
                          return (
                            <div key={key} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={val as boolean}
                                onChange={(e) =>
                                  setBehaviors({ ...behaviors, [key]: e.target.checked })
                                }
                              />
                              <label className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                            </div>
                          );
                        }
                        if (typeof val === 'boolean') {
                          return (
                            <div key={key} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={val}
                                onChange={(e) =>
                                  setBehaviors({ ...behaviors, [key]: e.target.checked })
                                }
                              />
                              <label className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>

                  {/* 'Other' Behavior Description */}
                  {behaviors.other && (
                    <textarea
                      className="mt-2 w-full border-gray-300 rounded-md"
                      rows={2}
                      placeholder="Describe other behavior..."
                      value={behaviors.otherDescription}
                      onChange={(e) =>
                        setBehaviors({ ...behaviors, otherDescription: e.target.value })
                      }
                    />
                  )}
                </div>

                {/* Activities Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Activities and Engagement</label>
                  {Object.entries(activities).map(([activityName, data]) => (
                    <div key={activityName} className="mb-2 space-y-1">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
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
                        <label className="text-sm">{activityName}</label>
                      </div>

                      {data.participated && (
                        <>
                          <label className="block text-xs font-medium text-gray-700">
                            Engagement (1-10)
                          </label>
                          <input
                            type="range"
                            min={1}
                            max={10}
                            className="w-full"
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
                          <p className="text-xs text-gray-500">Current: {data.engagement}/10</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Social Interactions Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Social Interactions</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700">Peer Interactions</label>
                      <select
                        className="w-full border-gray-300 rounded-md"
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
                      <label className="block text-xs font-medium text-gray-700">Staff Interactions</label>
                      <select
                        className="w-full border-gray-300 rounded-md"
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

                  <label className="block text-xs font-medium text-gray-700 mt-2">
                    Overall Social Interaction Level (1-10)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    className="w-full"
                    value={social.overallInteraction}
                    onChange={(e) =>
                      setSocial({ ...social, overallInteraction: Number(e.target.value) })
                    }
                  />
                  <p className="text-xs text-gray-500">Current: {social.overallInteraction}/10</p>
                </div>

                {/* Health and Safety Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Health & Safety</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={health.medicationsTaken}
                        onChange={(e) =>
                          setHealth({ ...health, medicationsTaken: e.target.checked })
                        }
                      />
                      <label className="text-sm">Medications Taken</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={health.sleepIssues}
                        onChange={(e) =>
                          setHealth({ ...health, sleepIssues: e.target.checked })
                        }
                      />
                      <label className="text-sm">Sleep Issues</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={health.appetiteIssues}
                        onChange={(e) =>
                          setHealth({ ...health, appetiteIssues: e.target.checked })
                        }
                      />
                      <label className="text-sm">Appetite Issues</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={health.physicalComplaints}
                        onChange={(e) =>
                          setHealth({ ...health, physicalComplaints: e.target.checked })
                        }
                      />
                      <label className="text-sm">Physical Complaints</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={health.hygieneIssues}
                        onChange={(e) =>
                          setHealth({ ...health, hygieneIssues: e.target.checked })
                        }
                      />
                      <label className="text-sm">Hygiene Issues</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={health.safetyConcerns}
                        onChange={(e) =>
                          setHealth({ ...health, safetyConcerns: e.target.checked })
                        }
                      />
                      <label className="text-sm">Safety Concerns</label>
                    </div>
                  </div>

                  {/* Health Description */}
                  {(health.medicationsTaken ||
                    health.sleepIssues ||
                    health.appetiteIssues ||
                    health.physicalComplaints ||
                    health.hygieneIssues ||
                    health.safetyConcerns) && (
                    <textarea
                      className="mt-2 w-full border-gray-300 rounded-md"
                      rows={3}
                      placeholder="Describe the health and safety issues..."
                      value={health.healthDescription}
                      onChange={(e) =>
                        setHealth({ ...health, healthDescription: e.target.value })
                      }
                    />
                  )}
                </div>

                {/* Incidents Section */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={incidents.occurred}
                      onChange={(e) =>
                        setIncidents({ ...incidents, occurred: e.target.checked })
                      }
                    />
                    <label className="block text-sm font-medium text-gray-700">Incident Occurred</label>
                  </div>

                  {incidents.occurred && (
                    <>
                      <textarea
                        className="mt-2 w-full border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Describe the incident..."
                        value={incidents.description}
                        onChange={(e) =>
                          setIncidents({ ...incidents, description: e.target.value })
                        }
                      />

                      <label className="block text-xs font-medium text-gray-700 mt-2">
                        Coping Skills Used
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(incidents.copingSkillsUsed).map(([skill, val]) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
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
                            <label className="text-sm capitalize">
                              {skill.replace(/([A-Z])/g, ' $1')}
                            </label>
                          </div>
                        ))}
                      </div>

                      {/* 'Other' Coping Skill Description */}
                      {incidents.copingSkillsUsed.other && (
                        <textarea
                          className="mt-2 w-full border-gray-300 rounded-md"
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

                      {/* Effectiveness Slider */}
                      <label className="block text-xs font-medium text-gray-700 mt-2">
                        Effectiveness of Coping Skills (1-10)
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={10}
                        className="w-full"
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

                {/* Additional Notes Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                  <textarea
                    className="w-full border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Enter any additional observations, incidents, or important information..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                  />
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

                {/* Error Message */}
                {errorMsg && (
                  <p className="text-sm text-red-600 mt-2">Error: {errorMsg}</p>
                )}
              </div>

              {/* Right Column: Generated Note Preview */}
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900">Generated Note</h3>
                  <button
                    onClick={() => alert('Save functionality is not implemented in this demo.')}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    <Save className="mr-1.5 h-4 w-4" />
                    Save
                  </button>
                </div>
                <div className="prose max-w-none flex-1 overflow-auto">
                  {generatedNote ? (
                    <p className="text-gray-700 whitespace-pre-wrap">{generatedNote}</p>
                  ) : (
                    <p className="text-gray-500 italic">
                      Fill in the form on the left and click “Generate Note” to see an AI-powered
                      progress note.
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
};

export default Demo;
