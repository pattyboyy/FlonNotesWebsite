// src/pages/pricing.tsx
import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface PriceTier {
  name: string;
  id: string;
  href: string;
  price: {
    monthly: number | string;
    annual: number | string;
  };
  description: string;
  features: string[];
  mostPopular: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const tiers: PriceTier[] = [
    {
      name: 'Starter',
      id: 'tier-starter',
      href: '#',
      price: { monthly: 49, annual: 39 },
      description: 'Perfect for individual practitioners',
      features: [
        'Up to 50 notes per month',
        'Basic note templates',
        'Standard security features',
        'Email support',
        'Basic analytics',
      ],
      mostPopular: false,
    },
    {
      name: 'Professional',
      id: 'tier-professional',
      href: '#',
      price: { monthly: 79, annual: 69 },
      description: 'Ideal for growing practices',
      features: [
        'Unlimited notes',
        'Custom templates',
        'Advanced security features',
        'Priority support',
        'Advanced analytics',
        'Team collaboration',
        'API access',
      ],
      mostPopular: true,
    },
    {
      name: 'Enterprise',
      id: 'tier-enterprise',
      href: '#',
      price: { monthly: 'Custom', annual: 'Custom' },
      description: 'For large healthcare organizations',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated support',
        'Custom security controls',
        'SLA guarantees',
        'Custom training',
        'On-premise deployment option',
      ],
      mostPopular: false,
    },
  ];

  const faqs: FAQ[] = [
    {
      question: 'How does billing work?',
      answer: 'You will be billed monthly or annually depending on your preference. All plans come with a 14-day free trial.'
    },
    {
      question: 'Can I switch plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle.'
    },
    {
      question: 'What happens if I exceed my note limit?',
      answer: 'On the Starter plan, you will be notified when approaching your limit. You can upgrade to Professional for unlimited notes.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee if you are not satisfied with our service.'
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'All plans include email support. Professional and Enterprise plans include priority support with faster response times.'
    },
    {
      question: 'Is there a contract or commitment?',
      answer: 'No long-term contracts required. You can cancel your subscription at any time.'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-primary-900">
        <div className="pt-12 sm:pt-16 lg:pt-24">
          <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
              <h1 className="text-lg leading-6 font-semibold text-gray-300">
                Pricing
              </h1>
              <p className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                The right price for your practice
              </p>
              <p className="text-xl text-gray-300">
                Choose the plan that best fits your needs
              </p>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="relative self-center bg-gray-800 rounded-lg p-0.5 flex sm:mt-8">
              <button
                type="button"
                className={`relative w-32 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 sm:w-40 sm:px-8 ${
                  billingPeriod === 'monthly'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly billing
              </button>
              <button
                type="button"
                className={`relative w-32 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 sm:w-40 sm:px-8 ${
                  billingPeriod === 'annual'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setBillingPeriod('annual')}
              >
                Annual billing
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pb-12 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
          <div className="relative">
            <div className="absolute inset-0 h-3/4 bg-primary-900" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-md mx-auto grid gap-8 lg:max-w-5xl lg:grid-cols-3">
                {tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`flex flex-col rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 ${
                      tier.mostPopular
                        ? 'ring-2 ring-primary-500 scale-105'
                        : 'ring-1 ring-gray-200 hover:scale-105'
                    }`}
                  >
                    <div className="px-6 py-8 bg-white">
                      <div>
                        <h3
                          className="text-2xl font-semibold text-gray-900 text-center"
                          id={tier.id}
                        >
                          {tier.name}
                        </h3>
                        <div className="mt-4 flex justify-center">
                          <span className="px-4 py-1 rounded-full text-sm font-semibold bg-primary-100 text-primary-800">
                            {tier.description}
                          </span>
                        </div>
                        <p className="mt-8 text-center">
                          <span className="text-4xl font-bold text-gray-900">
                            ${typeof tier.price[billingPeriod] === 'number' ? tier.price[billingPeriod] : ''}
                          </span>
                          {typeof tier.price[billingPeriod] === 'number' && (
                            <span className="text-base font-medium text-gray-500">
                              /{billingPeriod === 'monthly' ? 'month' : 'mo annually'}
                            </span>
                          )}
                          {typeof tier.price[billingPeriod] === 'string' && (
                            <span className="text-xl font-medium text-gray-500">
                              {tier.price[billingPeriod]}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10">
                      <ul className="space-y-4">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0">
                              <Check className="h-6 w-6 text-green-500" />
                            </div>
                            <p className="ml-3 text-base text-gray-700">{feature}</p>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={tier.href}
                        className={`block w-full text-center rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                          tier.mostPopular
                            ? 'bg-primary-500 text-white hover:bg-primary-600'
                            : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                        }`}
                      >
                        Get started
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Frequently asked questions</h2>
          <p className="mt-4 text-lg text-gray-500">
            Can&apos;t find the answer you&apos;re looking for? Contact our support team.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow duration-200">
              <div className="text-lg leading-6 font-medium text-gray-900">
                {faq.question}
              </div>
              <div className="mt-2 text-base text-gray-500">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-200">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 transition-colors duration-200"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
