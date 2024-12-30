import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
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
    ],
    cta: 'Get Started',
    mostPopular: false,
  },
  {
    name: 'Basic',
    id: 'basic',
    price: { monthly: 19 },
    description: 'For individuals and small teams.',
    features: [
      '1,000 API calls per month',
      'All file formats',
      'Priority conversion',
      'Email support',
    ],
    cta: 'Subscribe',
    mostPopular: true,
  },
  {
    name: 'Pro',
    id: 'pro',
    price: { monthly: 49 },
    description: 'For growing businesses.',
    features: [
      '5,000 API calls per month',
      'All file formats',
      'Batch processing',
      'Priority conversion',
      '24/7 support',
      'Custom webhook',
    ],
    cta: 'Subscribe',
    mostPopular: false,
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    price: { monthly: null },
    description: 'For large organizations.',
    features: [
      'Unlimited API calls',
      'All file formats',
      'Dedicated support',
      'Custom integration',
      'SLA guarantee',
      'On-premise deployment',
    ],
    cta: 'Contact Sales',
    mostPopular: false,
  },
];

export const PricingPage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-blue-600">Pricing</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for&nbsp;you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Simple, transparent pricing that grows with you. Try any plan free for 14 days.
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : ''
              } ${tierIdx === 0 ? 'lg:rounded-r-none' : ''} ${
                tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : ''
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
                  {tier.price.monthly === null ? (
                    <span className="text-4xl font-bold tracking-tight text-gray-900">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold tracking-tight text-gray-900">
                        ${tier.price.monthly}
                      </span>
                      <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                    </>
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
      </div>
    </div>
  );
};