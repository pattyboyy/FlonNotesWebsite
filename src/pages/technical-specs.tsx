// src/pages/technical-specs.tsx
import React, { useState } from 'react';
import { Shield, Laptop, Network, Settings, Download, Server, Search, Activity } from 'lucide-react';

interface Specification {
  title: string;
  details: string[];
}

interface SpecificationSection {
  icon: React.ReactNode;
  title: string;
  description: string;
  specs: Specification[];
}

interface Specifications {
  [key: string]: SpecificationSection;
}

export default function TechnicalSpecs() {
  const [searchQuery, setSearchQuery] = useState('');

  const specifications: Specifications = {
    system: {
      icon: <Laptop className="h-6 w-6" />,
      title: 'System Requirements',
      description: 'Minimum technical requirements for optimal performance',
      specs: [
        {
          title: 'Supported Platforms',
          details: [
            'Chrome 80+ (recommended for best performance)',
            'Firefox 75+ with latest security updates',
            'Safari 13+ on macOS and iOS',
            'Edge 80+ with Chromium engine',
            'PWA support for mobile devices'
          ]
        },
        {
          title: 'Hardware Requirements',
          details: [
            'CPU: Modern dual-core processor (2.0 GHz+)',
            'RAM: 4GB minimum, 8GB recommended',
            'Display: 1280x720 minimum, 1920x1080 recommended',
            'Storage: 500MB free space for caching',
            'Network: 5+ Mbps stable connection'
          ]
        },
        {
          title: 'Mobile Requirements',
          details: [
            'iOS 13+ or Android 8+',
            'Minimum 2GB RAM',
            'Stable 4G/5G or WiFi connection',
            'Biometric authentication support recommended'
          ]
        }
      ]
    },
    security: {
      icon: <Shield className="h-6 w-6" />,
      title: 'Security Features',
      description: 'Enterprise-grade security measures and compliance standards',
      specs: [
        {
          title: 'Data Protection',
          details: [
            'AES-256 encryption at rest',
            'TLS 1.3 encryption in transit',
            'End-to-end encryption for sensitive data',
            'Regular security audits and penetration testing',
            'Multi-factor authentication (MFA)'
          ]
        },
        {
          title: 'Access Control',
          details: [
            'Role-based access control (RBAC)',
            'Single Sign-On (SSO) support',
            'IP whitelisting capabilities',
            'Session management and timeout controls',
            'Audit logging and monitoring'
          ]
        },
        {
          title: 'Compliance',
          details: [
            'HIPAA compliance with BAA',
            'HITECH Act compliance',
            'SOC 2 Type II certified',
            'GDPR compliant',
            'Regular compliance audits'
          ]
        }
      ]
    },
    integration: {
      icon: <Network className="h-6 w-6" />,
      title: 'Integration Capabilities',
      description: 'Standards support and integration features',
      specs: [
        {
          title: 'Healthcare Standards',
          details: [
            'HL7 FHIR R4 compatible with full support',
            'SMART on FHIR enabled for app integration',
            'CDA document support and generation',
            'ICD-10 coding system integration',
            'SNOMED CT terminology support'
          ]
        },
        {
          title: 'API Features',
          details: [
            'RESTful API with comprehensive documentation',
            'GraphQL API for flexible queries',
            'OAuth 2.0 and JWT authentication',
            'Webhook support for real-time updates',
            'Rate limiting and usage monitoring'
          ]
        }
      ]
    },
    performance: {
      icon: <Activity className="h-6 w-6" />,
      title: 'Performance Specifications',
      description: 'System performance metrics and capabilities',
      specs: [
        {
          title: 'Response Times',
          details: [
            'Note generation: < 2 seconds average',
            'Page load time: < 1.5 seconds',
            'API response time: < 200ms',
            'Search queries: < 500ms',
            '99.9% uptime SLA guaranteed'
          ]
        },
        {
          title: 'Scalability',
          details: [
            'Support for 10,000+ concurrent users',
            'Automatic horizontal scaling',
            'Load balancing across regions',
            'CDN integration for static assets',
            'Elastic resource allocation'
          ]
        }
      ]
    },
    infrastructure: {
      icon: <Server className="h-6 w-6" />,
      title: 'Infrastructure',
      description: 'Cloud infrastructure and hosting details',
      specs: [
        {
          title: 'Cloud Platform',
          details: [
            'AWS primary infrastructure',
            'Multi-region deployment',
            'Auto-scaling configuration',
            'Containerized microservices',
            'Kubernetes orchestration'
          ]
        },
        {
          title: 'Backup & Recovery',
          details: [
            'Real-time data replication',
            'Daily automated backups',
            'Point-in-time recovery',
            '15-minute RPO (Recovery Point Objective)',
            '1-hour RTO (Recovery Time Objective)'
          ]
        }
      ]
    }
  };

  const filteredSpecs = Object.entries(specifications).reduce<Specifications>((acc, [key, section]) => {
    if (!searchQuery) return { ...acc, [key]: section };
    
    const matchingSpecs = section.specs.filter(spec => 
      spec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.details.some(detail => detail.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    if (matchingSpecs.length > 0) {
      return { ...acc, [key]: { ...section, specs: matchingSpecs } };
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Technical Specifications
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-primary-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Comprehensive technical details about FloNotes&apos; infrastructure, security, and capabilities
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="relative flex-1 max-w-lg mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search specifications..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Specs Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {Object.entries(filteredSpecs).map(([key, section]) => (
            <div
              key={key}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
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
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  {section.specs.map((spec: Specification, index: number) => (
                    <div key={index} className="border-t pt-6 first:border-t-0 first:pt-0">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        {spec.title}
                      </h4>
                      <ul className="space-y-3">
                        {spec.details.map((detail: string, i: number) => (
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
              </div>
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
                    Download comprehensive technical specifications and integration guides
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