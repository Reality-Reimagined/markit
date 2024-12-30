import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Zap, 
  CheckCircle, 
  Globe, 
  ArrowRight, 
  Upload, 
  Table, 
  Code,
  Settings,
  FileSpreadsheet,
  FileImage,
  FileAudio,
  Bot
} from 'lucide-react';

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}</span>;
};

export const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10">
                  What's new
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                  <span>Just shipped v1.0</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <TypewriterText text="Transform Any File into Perfect Markdown in Seconds" />
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Feed your LLMs clean, structured data. Our intelligent converter transforms any document into the format AI models love - pure Markdown.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/convert"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Convert Your First File Free
              </Link>
              <Link
                to="#how-it-works"
                className="text-sm font-semibold leading-6 text-gray-900 flex items-center hover:text-blue-600 transition-colors"
              >
                See How It Works <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1618609378039-b572f64c5b42?q=80&w=2000&auto=format&fit=crop"
                  alt="App screenshot"
                  className="w-[76rem] rounded-xl shadow-xl ring-1 ring-gray-400/10"
                />
                <div className="absolute -top-8 -left-8 animate-bounce">
                  <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-2">
                    <Bot className="h-6 w-6 text-blue-600" />
                    <span className="text-sm font-medium">LLM-Ready Format</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Key Benefits</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for perfect conversions
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-white p-2 ring-1 ring-gray-200">
                  <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">LLM-Optimized Output</dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  Generate clean, structured Markdown that's perfect for AI model consumption and analysis.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-white p-2 ring-1 ring-gray-200">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">Unmatched Accuracy</dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  AI-powered formatting preservation ensures clean, standardized output every time you convert.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-white p-2 ring-1 ring-gray-200">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">Universal Compatibility</dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  Support for 20+ file formats and export to any Markdown flavor of your choice.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <div className="flex justify-center items-center space-x-2 text-2xl font-bold text-gray-900">
              <span>Over</span>
              <span className="text-blue-600">1M+</span>
              <span>files converted</span>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="col-span-1 flex flex-col items-center space-y-2">
                <FileText className="h-8 w-8 text-blue-600 animate-pulse" />
                <span className="text-sm font-medium">PDFs</span>
              </div>
              <div className="col-span-1 flex flex-col items-center space-y-2">
                <FileSpreadsheet className="h-8 w-8 text-green-600 animate-pulse" />
                <span className="text-sm font-medium">Excel</span>
              </div>
              <div className="col-span-1 flex flex-col items-center space-y-2">
                <FileImage className="h-8 w-8 text-purple-600 animate-pulse" />
                <span className="text-sm font-medium">Images</span>
              </div>
              <div className="col-span-1 flex flex-col items-center space-y-2">
                <FileAudio className="h-8 w-8 text-red-600 animate-pulse" />
                <span className="text-sm font-medium">Audio</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Powerful tools for seamless conversion
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-white p-2 ring-1 ring-gray-200">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">Drag-and-Drop Interface</dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  Simply drag your files into the converter and watch the magic happen.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-white p-2 ring-1 ring-gray-200">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">Custom Formatting</dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  Customize your output with advanced formatting options.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-white p-2 ring-1 ring-gray-200">
                  <Table className="h-6 w-6 text-blue-600" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">Table Formatting</dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  Automatically convert complex tables while maintaining structure.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-lg bg-white p-2 ring-1 ring-gray-200">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900">Code Preservation</dt>
                <dd className="mt-2 leading-7 text-gray-600">
                  Keep your code blocks intact with proper syntax highlighting.
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start Converting for Free
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              No credit card required. Try our powerful conversion tools today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/signup"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/pricing"
                className="text-sm font-semibold leading-6 text-white hover:text-gray-300 transition-colors"
              >
                View pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-8 flex justify-center space-x-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="ml-2 text-white">100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="ml-2 text-white">Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};