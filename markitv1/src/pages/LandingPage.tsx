import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, FileAudio, Files, ArrowRight } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Convert Any File to Markdown
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Transform your documents, presentations, images, and more into clean, readable markdown format. Perfect for documentation, content management, and AI processing.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/convert"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Start Converting
              </Link>
              <Link
                to="/batch"
                className="text-sm font-semibold leading-6 text-gray-900 flex items-center"
              >
                Batch Convert <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1618609378039-b572f64c5b42?q=80&w=2000&auto=format&fit=crop"
                alt="App screenshot"
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Convert Faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to convert your files
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Support for a wide range of file formats, with advanced features for batch processing and AI-powered image descriptions.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <FileText className="h-5 w-5 flex-none text-blue-600" />
                Documents & Presentations
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Convert PDF, Word, PowerPoint, and Excel files while preserving formatting and structure.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Image className="h-5 w-5 flex-none text-blue-600" />
                Images & Audio
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Extract text from images with OCR and transcribe audio files with AI assistance.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Files className="h-5 w-5 flex-none text-blue-600" />
                Batch Processing
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Convert multiple files at once with our efficient batch processing system.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};