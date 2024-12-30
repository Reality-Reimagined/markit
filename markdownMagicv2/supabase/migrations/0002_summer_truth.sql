/*
  # Pricing and Usage Tracking Schema

  1. New Tables
    - `subscriptions`
      - Stores user subscription details
      - Tracks plan type, status, and period
    - `usage_logs`
      - Records API usage per user
      - Tracks conversion type and status
    - `pricing_plans`
      - Defines available pricing tiers
      - Stores plan limits and features

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
*/

-- Create enum for subscription status
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'past_due');

-- Create enum for pricing plan types
CREATE TYPE plan_type AS ENUM ('free', 'basic', 'pro', 'enterprise');

-- Create pricing plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type plan_type NOT NULL,
  price_monthly INTEGER NOT NULL,
  price_yearly INTEGER NOT NULL,
  api_calls_limit INTEGER NOT NULL,
  features JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  plan_id uuid REFERENCES pricing_plans NOT NULL,
  status subscription_status DEFAULT 'active',
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create usage logs table
CREATE TABLE IF NOT EXISTS usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  conversion_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Pricing plans are viewable by everyone"
  ON pricing_plans
  FOR SELECT
  USING (true);

CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own usage logs"
  ON usage_logs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage logs"
  ON usage_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Insert default pricing plans
INSERT INTO pricing_plans (name, type, price_monthly, price_yearly, api_calls_limit, features)
VALUES
  ('Free', 'free', 0, 0, 5, '{"features": ["5 API calls per month", "Basic file formats", "Standard conversion speed"]}'),
  ('Basic', 'basic', 1900, 19000, 1000, '{"features": ["1,000 API calls per month", "All file formats", "Priority conversion", "Email support"]}'),
  ('Pro', 'pro', 4900, 49000, 5000, '{"features": ["5,000 API calls per month", "All file formats", "Batch processing", "Priority conversion", "24/7 support", "Custom webhook"]}'),
  ('Enterprise', 'enterprise', 0, 0, 0, '{"features": ["Unlimited API calls", "All file formats", "Dedicated support", "Custom integration", "SLA guarantee", "On-premise deployment"]}');