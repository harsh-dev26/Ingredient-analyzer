import React from 'react';
import { Link } from 'wouter';
import { Camera, FileSearch, AlertCircle, Star, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="my-6">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-1 p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Scan Product Labels for Harmful Ingredients
            </h1>
            <p className="text-gray-600 mb-6">
              Upload a photo of any product's ingredients list and we'll instantly identify potentially harmful 
              substances and explain their health impacts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/scan">
                <Button className="inline-flex justify-center items-center">
                  <Camera className="mr-2 h-5 w-5" />
                  Start Scanning
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="inline-flex justify-center items-center">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:flex-1 bg-gray-100 flex items-center justify-center p-6">
            <img 
              src="https://images.unsplash.com/photo-1607006344380-b6775a0824ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Person scanning product label" 
              className="rounded-lg shadow-lg max-h-80 object-cover" 
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Camera className="h-5 w-5 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold mb-2">1. Scan or Upload</h3>
            <p className="text-gray-600">
              Take a photo of an ingredients list or upload an existing image from your device.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
              <FileSearch className="h-5 w-5 text-secondary-600" />
            </div>
            <h3 className="text-lg font-bold mb-2">2. Analyze</h3>
            <p className="text-gray-600">
              Our OCR technology extracts and processes the text to identify all ingredients.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-5 w-5 text-accent-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">3. Get Results</h3>
            <p className="text-gray-600">
              Review detailed information about any harmful ingredients and their potential health impacts.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold">Sarah L.</h4>
                <div className="flex text-yellow-400 mb-2">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <p className="text-gray-600">
                  "IngrediScan helped me identify ingredients that were triggering my allergies. 
                  Now I know exactly what to avoid when shopping."
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-gray-500" />
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-semibold">Michael T.</h4>
                <div className="flex text-yellow-400 mb-2">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <HalfStar className="h-4 w-4" />
                </div>
                <p className="text-gray-600">
                  "As a parent, I'm always worried about what's in my children's products. 
                  This app makes it so easy to check ingredients quickly."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom half star icon
function HalfStar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className="text-yellow-400"
      {...props}
    >
      <path
        d="M12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77V2Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      />
    </svg>
  );
}
