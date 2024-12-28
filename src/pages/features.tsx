// src/pages/features.tsx
import React from 'react';
import { Brain, Shield, Database, Layout, FileText, Users, BarChart, Settings } from 'lucide-react';

export default function Features() {
  const mainFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Note Generation",
      description: "Our advanced AI understands clinical context and generates comprehensive progress notes that maintain professional standards while saving valuable time."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "HIPAA Compliant Security",
      description: "Enterprise-grade encryption and security measures ensure all patient data is protected according to healthcare compliance standards."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Customizable Templates",
      description: "Create and customize note templates that match your specific clinical workflow and documentation requirements."
    }
  ];

  const additionalFeatures = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Intuitive Interface",
      description: "Clean, modern interface designed specifically for healthcare professionals."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Secure Storage",
      description: "Encrypted cloud storage with automatic backups and easy retrieval."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Share notes and collaborate with your healthcare team securely."
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Progress Tracking",
      description: "Monitor patient progress with comprehensive analytics and reporting."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Integration Ready",
      description: "Seamlessly integrate with existing EHR systems and healthcare platforms."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-primary-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Powerful Features for Mental Health Professionals
            </h1>
            <p className="mt-4 text-xl text-primary-100">
              Everything you need to streamline your clinical documentation workflow.
            </p>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="relative">
                <div className="absolute h-16 w-16 flex items-center justify-center rounded-xl bg-primary-600 text-white">
                  {feature.icon}
                </div>
                <div className="ml-20">
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Features Grid */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Additional Features</h2>
            <p className="mt-4 text-lg text-gray-500">
              Comprehensive tools to support your clinical practice
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-primary-600">{feature.icon}</div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-200">Try FloNotes today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Get Started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}