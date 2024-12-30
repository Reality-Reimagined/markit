import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, Shield, Clock, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const tiers = [
  {
    name: 'Free',
    id: 'free',
    price: { monthly: 0 },
    description: 'Perfect for trying out our service.',
    features: [
      '5 API calls per month',
      'Basic file formats',
      'Standard conversion speed',
      'Community support',
    ],
    cta: 'Get Started',
    mostPopular: false,
  },
  {
    name: '.MD Mage',
    id: 'basic',
    price: { monthly: 29 },
    description: 'For individuals and small teams.',
    features: [
      '1,000 API calls per month',
      'All file formats',
      'Priority conversion',
      'Email support',
      'API access',
      'Advanced formatting options',
    ],
    cta: 'Subscribe',
    mostPopular: true,
  },
  {
    name: 'Credits',
    id: 'credits',
    price: { monthly: 10 },
    description: 'Pay once, use anytime.',
    features: [
      '300 API calls',
      'All file formats',
      'Never expires',
      'Priority conversion',
      'Email support',
      'Flexible usage',
    ],
    cta: 'Buy Credits',
    mostPopular: false,
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Technical Writer',
    company: 'TechDocs Inc',
    content: 'MarkDown Magic has revolutionized our documentation workflow. What used to take hours now takes minutes.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'AI Researcher',
    company: 'AI Labs',
    content: 'The markdown output is consistently clean and perfect for our LLM training data pipeline.',
    rating: 5,
  },
  {
    name: 'Emily Thompson',
    role: 'Content Manager',
    company: 'ContentFirst',
    content: 'The batch processing feature alone has saved us countless hours of manual work.',
    rating: 5,
  },
];

export const PricingPage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-base font-semibold leading-7 text-blue-600">Pricing</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            The right plan for your needs
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Choose a plan that works best for you. All plans include our core features.
          </p>
        </div>

        {/* Value Props */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-gray-600">100% Secure</span>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-gray-600">Cancel Anytime</span>
          </div>
          <div className="flex items-center space-x-3">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-gray-600">Instant Access</span>
          </div>
          <div className="flex items-center space-x-3">
            <Star className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-gray-600">5-Star Support</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                tier.mostPopular ? 'ring-2 ring-blue-600 shadow-lg' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h2 className="text-lg font-semibold leading-8 text-gray-900">
                    {tier.name}
                  </h2>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    ${tier.price.monthly}
                  </span>
                  {tier.id !== 'credits' && (
                    <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                  )}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={user ? `/subscribe/${tier.id}` : '/signup'}
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.mostPopular
                    ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline-blue-600'
                    : 'bg-white text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Loved by developers and content creators
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Join thousands of satisfied users who trust MarkDown Magic for their conversion needs.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-sm leading-6 text-gray-600 sm:mt-20 sm:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="space-y-8 rounded-2xl p-6 shadow-sm ring-1 ring-gray-900/5">
                <div className="space-y-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-900">{testimonial.content}</p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                  <div className="text-gray-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-32 max-w-2xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            <div className="pt-6">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                How do tokens work?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Each conversion uses 1 token. Batch conversions are more efficient, using 1 token for every 2 files. Tokens refresh monthly on paid plans, while credit pack tokens never expire.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                Can I upgrade or downgrade anytime?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Yes! You can change your plan at any time. When upgrading, you'll be prorated for the remainder of the billing period.
              </dd>
            </div>
          </dl>
        </div>

        {/* Bottom CTA */}
        <div className="mt-32">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start Converting Today
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join thousands of satisfied users who trust MarkDown Magic for their document conversion needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/signup"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get Started Free
              </Link>
              <Link
                to="/convert"
                className="text-sm font-semibold leading-6 text-white hover:text-gray-300"
              >
                Try Demo <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};