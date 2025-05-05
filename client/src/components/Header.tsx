import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Bell, User, Leaf } from 'lucide-react';

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActivePath = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="flex items-center">
                  <Leaf className="h-8 w-8 text-primary" />
                  <span className="font-bold text-xl text-gray-800 ml-2">IngrediScan</span>
                </a>
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8" aria-label="Main Navigation">
              <Link href="/">
                <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActivePath('/') 
                    ? 'border-primary text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}>
                  Home
                </a>
              </Link>
              <Link href="/scan">
                <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActivePath('/scan') 
                    ? 'border-primary text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}>
                  Scan
                </a>
              </Link>
              <Link href="/results">
                <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActivePath('/results') 
                    ? 'border-primary text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}>
                  Results
                </a>
              </Link>
              <Link href="/about">
                <a className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActivePath('/about') 
                    ? 'border-primary text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}>
                  About
                </a>
              </Link>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button 
              type="button" 
              className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
            </button>
            <div className="ml-3 relative">
              <button
                type="button"
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                id="user-menu"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-primary-200 flex items-center justify-center text-primary-600">
                  <User className="h-5 w-5" />
                </div>
              </button>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/">
              <a
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActivePath('/') 
                    ? 'bg-primary-50 border-primary text-primary-700' 
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                Home
              </a>
            </Link>
            <Link href="/scan">
              <a
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActivePath('/scan') 
                    ? 'bg-primary-50 border-primary text-primary-700' 
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                Scan
              </a>
            </Link>
            <Link href="/results">
              <a
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActivePath('/results') 
                    ? 'bg-primary-50 border-primary text-primary-700' 
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                Results
              </a>
            </Link>
            <Link href="/about">
              <a
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActivePath('/about') 
                    ? 'bg-primary-50 border-primary text-primary-700' 
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                About
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
