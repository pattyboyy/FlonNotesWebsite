import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, AlertCircle, Check } from 'lucide-react';
import { FormEvent, ChangeEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      name: 'Email Us',
      description: 'We aim to respond within 24 hours',
      contact: 'support@flonotes.com',
      href: 'mailto:support@flonotes.com',
    },
    {
      icon: <Phone className="h-6 w-6" />,
      name: 'Call Us',
      description: 'Mon-Fri from 8am to 5pm',
      contact: '(555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      name: 'Office',
      description: 'Come say hello',
      contact: '123 Health Tech Drive, Boston, MA 02110',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      name: 'Business Hours',
      description: 'Working hours',
      contact: 'Monday to Friday, 9AM to 5PM EST',
    },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, isSubmitting: true });
    
    // Simulated form submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormStatus({
      isSubmitting: false,
      isSubmitted: true,
      error: null,
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-primary-800 py-16 sm:py-24">
        <div className="max-w-md mx-auto text-center px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-primary-100">
            Have questions about FloNotes? We&apos;re here to help.
          </p>
        </div>
      </div>

      {/* Contact Methods Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-12 lg:-mt-24">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method) => (
              <div
                key={method.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-200"
              >
                <div className="px-6 py-8">
                  <div className="text-primary-600 mb-4">{method.icon}</div>
                  <h3 className="text-xl font-medium text-gray-900">{method.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{method.description}</p>
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
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-16 mb-16">
          <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden lg:max-w-none lg:grid lg:grid-cols-2">
            <div className="px-6 py-12 lg:p-12 bg-primary-700">
              <h3 className="text-2xl font-extrabold text-white">
                Send us a message
              </h3>
              <p className="mt-4 text-lg text-primary-100">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div className="mt-8">
                <dl className="space-y-6">
                  {contactMethods.map((method) => (
                    <div key={method.name} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="text-primary-200">{method.icon}</div>
                      </div>
                      <div className="ml-4">
                        <dt className="text-sm font-medium text-primary-200">
                          {method.description}
                        </dt>
                        <dd className="mt-1 text-base text-white">
                          {method.contact}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="px-6 py-12 lg:p-12">
              {formStatus.isSubmitted ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Thanks for reaching out!</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      We&apos;ll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setFormStatus(prev => ({ ...prev, isSubmitted: false }))}
                      className="mt-6 text-primary-600 hover:text-primary-500"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-blue-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          All fields are required. We typically respond within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-1">
                        Full Name
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1">
                        Email Address
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-200"
                        />
                        <div className="mt-1 text-xs text-gray-500">
                          We&apos;ll never share your email with anyone else.
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-1">
                        Subject
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        name="subject"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-200"
                      >
                        <option value="">Select a subject</option>
                        <option value="Sales Inquiry">Sales Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-1">
                        Message
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-200"
                        />
                        <div className="mt-1 text-xs text-gray-500">
                          Please provide as much detail as possible.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={formStatus.isSubmitting}
                      className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 ${
                        formStatus.isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {formStatus.isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {[
              {
                question: "What are your support hours?",
                answer: "Our support team is available Monday through Friday, 9AM to 5PM EST. For urgent issues, we provide 24/7 emergency support for our enterprise customers."
              },
              {
                question: "How quickly can I expect a response?",
                answer: "We aim to respond to all inquiries within 24 hours during business days. Enterprise customers receive priority support with guaranteed response times."
              },
              {
                question: "Do you offer on-site training?",
                answer: "Yes, we offer on-site training and implementation services for enterprise customers. Contact our sales team to learn more about our training programs."
              },
              {
                question: "How can I request a demo?",
                answer: "You can request a demo by filling out the contact form above or emailing us directly at demo@flonotes.com. We’ll schedule a personalized demonstration of our platform."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-base text-gray-500">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
