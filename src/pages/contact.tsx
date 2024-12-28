// src/pages/contact.tsx
import React from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export default function Contact() {
  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      name: 'Sales',
      description: 'Talk to our sales team',
      contact: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: <Mail className="h-6 w-6" />,
      name: 'Support',
      description: 'Get technical help',
      contact: 'support@flonotes.com',
      href: 'mailto:support@flonotes.com',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      name: 'Hours',
      description: 'Mon-Fri',
      contact: '9:00 AM - 5:00 PM EST',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      name: 'Office',
      description: 'Visit our office',
      contact: '123 Health Tech Drive, Boston, MA 02110',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-xl text-primary-100">
              We&apos;re here to help with any questions about FloNotes
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
          {contactMethods.map((method) => (
            <div
              key={method.name}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-primary-600">{method.icon}</div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{method.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{method.description}</p>
              {method.href ? (
                <a
                  href={method.href}
                  className="mt-3 block text-base text-primary-600 hover:text-primary-500"
                >
                  {method.contact}
                </a>
              ) : (
                <p className="mt-3 text-base text-gray-900">{method.contact}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 shadow-lg rounded-lg">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Send us a message</h2>
              <p className="mt-4 text-gray-500">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
              <form className="mt-8 grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Your message..."
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map or Additional Info Section */}
      <div className="bg-white mt-16">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  <span className="block">Ready to get started?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-primary-200">
                  Sign up for a free trial today and experience how FloNotes can transform your clinical documentation process.
                </p>
                <a
                  href="#"
                  className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-primary-50 sm:px-8"
                >
                  Start Free Trial
                </a>
              </div>
            </div>
            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <div className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20">
                {/* This is where you could add an image or illustration */}
                <div className="w-full h-full bg-primary-800 opacity-25 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
