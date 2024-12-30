/*
  # Update Pricing Plans

  1. Changes
    - Remove enterprise plan
    - Add credits plan
    - Update existing plans

  2. Security
    - Maintain existing RLS policies
*/

-- First, delete the enterprise plan
DELETE FROM pricing_plans WHERE type = 'enterprise';

-- Update existing plans
UPDATE pricing_plans
SET 
  price_monthly = 1900,
  price_yearly = 19000,
  api_calls_limit = 1000,
  features = '{"features": ["1,000 API calls per month", "All file formats", "Priority conversion", "Email support"]}'
WHERE type = 'basic';

UPDATE pricing_plans
SET 
  price_monthly = 4900,
  price_yearly = 49000,
  api_calls_limit = 5000,
  features = '{"features": ["5,000 API calls per month", "All file formats", "Batch processing", "Priority conversion", "24/7 support", "Custom webhook"]}'
WHERE type = 'pro';

-- Add credits plan
INSERT INTO pricing_plans (name, type, price_monthly, price_yearly, api_calls_limit, features)
VALUES (
  'Credits',
  'credits',
  1000,
  1000,
  300,
  '{"features": ["300 API calls", "All file formats", "Never expires", "Priority conversion"]}'
);