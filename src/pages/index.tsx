// src/pages/index.tsx
import React from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Shield, 
  Clock, 
  ChartBar, 
  Check,
  BarChart,
  Settings
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Note Generation",
      description: "Generate comprehensive clinical notes in seconds with our advanced AI technology."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security ensuring your patient data remains protected and compliant."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Save Time",
      description: "Reduce documentation time by up to 70% while maintaining clinical accuracy."
    },
    {
      icon: <ChartBar className="h-6 w-6" />,
      title: "Detailed Analytics",
      description: "Track patient progress and treatment outcomes with comprehensive analytics."
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your Clinical</span>
                  <span className="block text-primary-600">Documentation Process</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  FloNotes helps mental health professionals create comprehensive, accurate clinical documentation in less time.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/demo"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/features"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              A Better Way to Document Patient Care
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Designed specifically for mental health professionals, FloNotes combines clinical expertise with cutting-edge technology.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    {feature.title}
                  </p>
                  <p className="mt-2 ml-16 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why FloNotes Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose FloNotes?
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              More than just note-taking software - a complete solution for modern mental health practices
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* AI-Powered Intelligence */}
            <div className="relative bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">
                  AI-Powered Intelligence
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Our advanced AI assistant revolutionizes clinical documentation by generating context-aware notes that incorporate patient history, previous treatments, and patterns of progress, ensuring comprehensive and meaningful documentation.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Context-aware note generation using historical patient data</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Intelligent pattern recognition across treatment history</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Automated risk factor identification and alerts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Natural language queries for instant information access</span>
                </li>
              </ul>
            </div>

            {/* Advanced Analytics */}
            <div className="relative bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <BarChart className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">
                  Advanced Analytics & Progress Tracking
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Transform patient data into actionable insights with our comprehensive analytics suite. 
                Track progress, identify patterns, and make data-driven decisions to improve outcomes.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Daily progress tracking and visualization</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Customizable outcome measures and metrics</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Trend analysis and predictive insights</span>
                </li>
              </ul>
            </div>

            {/* Streamlined Workflow */}
            <div className="relative bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Settings className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">
                  Effortless Implementation
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Designed for immediate adoption with minimal training required. Our intuitive interface 
                and customizable workflows ensure your team can start using FloNotes effectively from day one.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Intuitive interface requiring minimal training</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Customizable templates and workflows</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Seamless integration with existing systems</span>
                </li>
              </ul>
            </div>

            {/* Security & Compliance */}
            <div className="relative bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">
                  Enterprise-Grade Security
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Built with security and compliance at its core. FloNotes exceeds HIPAA requirements 
                and implements the latest security measures to protect sensitive patient data.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">HIPAA compliant infrastructure</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">End-to-end encryption for all data</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Regular security audits and updates</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Additional Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Practice Customization</h4>
                  <p className="mt-1 text-gray-600">Tailored to your specific practice needs and workflows</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Automated Documentation</h4>
                  <p className="mt-1 text-gray-600">Context-aware note generation using historical patient data</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Treatment Continuity</h4>
                  <p className="mt-1 text-gray-600">AI-powered insights from previous sessions and treatment history</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Risk Management</h4>
                  <p className="mt-1 text-gray-600">Proactive identification of potential concerns and treatment gaps</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Regulatory Compliance</h4>
                  <p className="mt-1 text-gray-600">Ensures documentation meets all regulatory requirements</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Quality Assurance</h4>
                  <p className="mt-1 text-gray-600">Automated checks for completeness and clinical best practices</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Smart Scheduling</h4>
                  <p className="mt-1 text-gray-600">AI-optimized appointment scheduling and reminders</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Research Insights</h4>
                  <p className="mt-1 text-gray-600">Aggregate anonymized data for treatment efficacy research</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Multi-Provider Support</h4>
                  <p className="mt-1 text-gray-600">Seamless collaboration across your entire care team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform your practice?</span>
            <span className="block text-primary-200">Start your journey with FloNotes today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50"
              >
                Try Demo
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}