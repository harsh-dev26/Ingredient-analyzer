import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { AlertCircle, FileSearch, Shield, Database, Camera, ChevronRight } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About IngrediScan</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Helping you make informed choices about the products you use every day by identifying potentially harmful ingredients.
        </p>
      </div>
      
      {/* Our Mission Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8" id="mission">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <p className="text-gray-600 mb-4">
              IngrediScan was created with a simple mission: to empower consumers with knowledge about what's in their everyday products.
            </p>
            <p className="text-gray-600 mb-4">
              Many products contain ingredients that may cause health issues, from skin irritation and allergies to more serious long-term concerns. 
              Unfortunately, these ingredients are often hidden behind complex chemical names that most people don't recognize.
            </p>
            <p className="text-gray-600">
              We believe that everyone deserves easy access to information about potential toxins and harmful substances in the products they use, 
              so they can make informed decisions about what's best for their health and their family's wellbeing.
            </p>
          </div>
          <div className="md:w-1/3 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center">
              <Shield className="h-16 w-16 text-primary-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8" id="how-it-works">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold mb-2">Capture</h3>
            <p className="text-gray-600">
              Take a photo of a product's ingredient list using your device's camera or upload an existing image.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
              <FileSearch className="h-8 w-8 text-secondary-600" />
            </div>
            <h3 className="text-lg font-bold mb-2">Analyze</h3>
            <p className="text-gray-600">
              Our advanced OCR technology extracts the text and identifies individual ingredients from the list.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-accent-500" />
            </div>
            <h3 className="text-lg font-bold mb-2">Evaluate</h3>
            <p className="text-gray-600">
              We check each ingredient against our database and provide you with detailed information about any potential concerns.
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">The Technology Behind IngrediScan</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Optical Character Recognition (OCR)</h4>
                <p className="text-sm text-gray-600 mb-4">
                  We use advanced OCR technology to convert images of text into machine-readable text data. 
                  This allows us to extract ingredient lists from product labels with high accuracy.
                </p>
                <h4 className="font-semibold text-gray-800 mb-2">Ingredient Database</h4>
                <p className="text-sm text-gray-600">
                  Our comprehensive database contains information on thousands of ingredients, their alternative names, 
                  and scientific research about their potential health impacts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ingredient Database Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8" id="database">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Ingredient Database</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <p className="text-gray-600 mb-4">
              Our database is compiled from peer-reviewed scientific research, regulatory data, and trusted toxicology resources. 
              We continually update it as new research becomes available.
            </p>
            <p className="text-gray-600 mb-4">
              For each ingredient, we assess:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
              <li>Potential health concerns and the strength of scientific evidence</li>
              <li>Common uses in consumer products</li>
              <li>Alternative names and chemical identifiers</li>
              <li>Regulatory status in different countries</li>
              <li>Safer alternatives when available</li>
            </ul>
            <p className="text-gray-600">
              Our goal is to provide factual, science-based information without alarmism, 
              allowing you to make your own informed decisions.
            </p>
          </div>
          <div className="md:w-1/3 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
              <Database className="h-16 w-16 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Get Started CTA */}
      <div className="bg-primary-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-primary-800 mb-4">Ready to Scan Your Products?</h2>
        <p className="text-primary-700 mb-6 max-w-lg mx-auto">
          Start using IngrediScan today to discover what's really in the products you use every day.
        </p>
        <Link href="/scan">
          <Button size="lg" className="inline-flex items-center">
            Start Scanning Now <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
