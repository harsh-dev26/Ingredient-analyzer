import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'wouter';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  
  // Add page-specific classes based on route
  const getPageClass = () => {
    if (location === '/') return 'home-page';
    if (location === '/scan') return 'scan-page';
    if (location === '/processing') return 'processing-page';
    if (location === '/results') return 'results-page';
    if (location === '/about') return 'about-page';
    return '';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow ${getPageClass()}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
