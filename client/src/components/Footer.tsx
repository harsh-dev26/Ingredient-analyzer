import React from 'react';
import { Link } from 'wouter';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <Link href="/">
              <a className="flex items-center">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg text-gray-800 ml-2">IngrediScan</span>
              </a>
            </Link>
          </div>
          <div className="mt-8 md:mt-0">
            <p className="text-center text-sm text-gray-500 md:text-right">
              &copy; {new Date().getFullYear()} IngrediScan. All rights reserved.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">About</h3>
              <ul role="list" className="mt-4 space-y-2">
                <li>
                  <Link href="/about">
                    <a className="text-sm text-gray-500 hover:text-gray-700">Our Mission</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about#how-it-works">
                    <a className="text-sm text-gray-500 hover:text-gray-700">How It Works</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about#database">
                    <a className="text-sm text-gray-500 hover:text-gray-700">Ingredient Database</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Support</h3>
              <ul role="list" className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Help Center</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Contact Us</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Resources</h3>
              <ul role="list" className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Blog</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Guides</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Research</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Connect</h3>
              <ul role="list" className="mt-4 space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Twitter</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Instagram</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Facebook</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
