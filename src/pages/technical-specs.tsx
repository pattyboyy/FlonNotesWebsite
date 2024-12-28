// src/pages/technical-specs.tsx
import React, { useState } from 'react';
import { Server, Shield, Database, Laptop, Network, Settings, Download } from 'lucide-react';

interface Specification {
  title: string;
  details: string[];
}

interface SpecificationSection {
  icon: React.ReactNode;
  title: string;
  specs: Specification[];
}

interface Specifications {
  [key: string]: SpecificationSection;
}

export default function TechnicalSpecs() {
  const [expandedSection, setExpandedSection] = useState<string | null>('system');

  const specifications: Specifications = {
    system: {
      icon: <Laptop className="h-6 w-6" />,
      title: 'System Requirements',
      specs: [
        {
          title: 'Supported Platforms',
          details: [
            'Web-based application compatible with modern browsers',
            'Chrome 80+',
            'Firefox 75+',
            'Safari 13+',
            'Edge 80+',
          ]
        },
        {
          title: 'Hardware Requirements',
          details: [
            'Minimum 4GB RAM',
            'Stable internet connection (5+ Mbps)',
            'Display resolution: 1280x720 or higher',
          ]
        },
      ]
    },
    security: {
      icon: <Shield className="h-6 w-6" />,
      title: 'Security Features',
      specs: [
        {
          title: 'Data Protection',
          details: [
            'AES-256 encryption at rest',
            'TLS 1.3 encryption in transit',
            'Multi-factor authentication',
            'Role-based access control',
          ]
        },
        {
          title: 'Compliance',
          details: [
            'HIPAA compliance',
            'HITECH Act compliance',
            'SOC 2 Type II certified',
            'Regular security audits',
          ]
        },
      ]
    },
    integration: {
      icon: <Network className="h-6 w-6" />,
      title: 'Integration Capabilities',
      specs: [
        {
          title: 'Healthcare Standards',
          details: [
            'HL7 FHIR R4 compatible',
            'SMART on FHIR enabled',
            'CDA document support',
            'ICD-10 coding system',
          ]
        },
        {
          title: 'API Features',
          details: [
            'RESTful API architecture',
            'OAuth 2.0 authentication',
            'Webhook support',
            'Rate limiting and monitoring',
          ]
        },
      ]
    },
    performance: {
      icon: <Settings className="h-6 w-6" />,
      title: 'Performance Specifications',
      specs: [
        {
          title: 'Response Times',
          details: [
            'Note generation: < 2 seconds',
            'Search queries: < 500ms',
            'Document loading: < 1 second',
            '99.9% uptime SLA',
          ]
        },
        {
          title: 'Scalability',
          details: [
            'Concurrent users: 10,000+',
            'Automatic horizontal scaling',
            'Load balancing enabled',
            'CDN integration',
          ]
        },
      ]
    },
  };

  const handleSectionToggle = (sectionKey: string) => {
    setExpandedSection(expandedSection === sectionKey ? null : sectionKey);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Technical Specifications
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Detailed information about FloNotes' technical capabilities and requirements
            </p>
          </div>
        </div>
      </div>

      {/* Specs Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {Object.entries(specifications).map(([key, section]) => (
            <div
              key={key}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                onClick={() => handleSectionToggle(key)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-primary-50 rounded-md flex items-center justify-center text-primary-600">
                        {section.icon}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-200 ${
                    expandedSection === key ? 'rotate-180' : ''
                  }`}>
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {expandedSection === key && (
                <div className="px-6 pb-6 space-y-6">
                  {section.specs.map((spec, index) => (
                    <div key={index} className="border-t pt-6 first:border-t-0 first:pt-0">
                      <h4 className="text-sm font-medium text-gray-900">
                        {spec.title}
                      </h4>
                      <ul className="mt-3 space-y-3">
                        {spec.details.map((detail, i) => (
                          <li key={i} className="text-sm text-gray-500 flex items-start">
                            <svg
                              className="h-5 w-5 text-green-400 mr-2 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Download Section */}
        <div className="mt-16">
          <div className="bg-primary-50 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-primary-900">
                    Technical Documentation
                  </h3>
                  <p className="mt-2 text-sm text-primary-700">
                    Download detailed technical specifications and integration guides
                  </p>
                </div>
                <div className="ml-4">
                  <button 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150"
                    onClick={() => window.open('/docs/technical-specs.pdf', '_blank')}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Specs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}