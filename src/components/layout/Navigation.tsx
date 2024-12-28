// src/components/layout/Navigation.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


interface NavigationProps {
  mobile?: boolean;
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ mobile, className }) => {
  const router = useRouter();
  
  const navItems = [
    { name: 'Features', href: '/features' },
    { name: 'Demo', href: '/demo' },
    { name: 'Technical Specs', href: '/technical-specs' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  const baseStyles = mobile
    ? 'space-y-1 px-2 pb-3 pt-2'
    : 'ml-10 flex items-center space-x-4';

  return (
    <nav className={`${baseStyles} ${className || ''}`}>
      {navItems.map((item) => {
        const isActive = router.pathname === item.href;
        const linkStyles = mobile
          ? `block px-3 py-2 rounded-md text-base font-medium ${
              isActive
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
            }`
          : `px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? 'text-primary-600'
                : 'text-gray-700 hover:text-primary-600'
            }`;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={linkStyles}
          >
            {item.name}
          </Link>
        );
      })}
      
      <Link
        href="#"
        className={`${
          mobile
            ? 'block px-3 py-2 rounded-md text-base font-medium'
            : 'ml-8 inline-flex items-center'
        } px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700`}
      >
        Sign In
      </Link>
    </nav>
  );
};

export default Navigation;