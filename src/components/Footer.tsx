import React from 'react';
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'Courses', href: '#' },
    { label: 'Internship Programs', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  const resources = [
    { label: 'Blog', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'FAQs', href: '#' },
    { label: 'Support', href: '#' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      href: '#',
      color: 'hover:text-blue-400',
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      href: '#',
      color: 'hover:text-gray-300',
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      href: '#',
      color: 'hover:text-blue-300',
    },
    {
      name: 'YouTube',
      icon: FaYoutube,
      href: '#',
      color: 'hover:text-red-500',
    },
  ];

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'hello@glaexam.academy',
      href: 'mailto:hello@glaexam.academy',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#',
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                GLA Exam
              </h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Master modern quiz-taking and test preparation. Unlock your potential through interactive learning and real-time feedback.
            </p>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
              Empowering Learners
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 relative pb-3">
              Quick Links
              <div className="absolute left-0 bottom-0 h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 relative pb-3">
              Resources
              <div className="absolute left-0 bottom-0 h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </h4>
            <nav className="space-y-3">
              {resources.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center group"
                >
                  <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-2 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 relative pb-3">
              Get in Touch
              <div className="absolute left-0 bottom-0 h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </h4>
            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start space-x-3 group hover:text-white transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5 text-purple-400 group-hover:text-pink-400 transition-colors duration-300 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                        {item.value}
                      </span>
                    </div>
                  </a>
                );
              })}

              {/* Social Media Icons */}
              <div className="pt-4 flex items-center space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      className={`relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 text-gray-400 transition-all duration-300 hover:border-purple-400 ${social.color} hover:shadow-lg hover:shadow-purple-500/50 hover:scale-110`}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 hover:opacity-20 transition-opacity duration-300 blur-md"></div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800">
        {/* Copyright Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-center sm:text-left text-sm text-gray-500">
              © {currentYear} GLA Exam Academy. All rights reserved.
            </p>

            {/* Footer Links */}
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-purple-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-purple-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-purple-400 transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-1 -left-1/4 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1 -right-1/4 w-1/2 h-1/2 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};
