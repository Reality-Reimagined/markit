/*
  # Add Token System and Conversion History

  1. New Tables
    - `user_tokens`
      - Tracks available tokens per user
      - Records token refresh date
    - `conversion_history`
      - Stores all conversion records
      - Links to users and tracks token usage

  2. Changes
    - Add signup_date to profiles table
    - Add token-related fields

  3. Security
    - Enable RLS on new tables
    - Add policies for user access
*/

-- Add signup_date to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS signup_date TIMESTAMPTZ DEFAULT now();

-- Create user_tokens table
CREATE TABLE IF NOT EXISTS user_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  tokens_remaining INTEGER DEFAULT 4,
  last_refresh_date TIMESTAMPTZ DEFAULT now(),
  next_refresh_date TIMESTAMPTZ DEFAULT now() + INTERVAL '1 month',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT positive_tokens CHECK (tokens_remaining >= 0)
);

-- Create conversion_history table
CREATE TABLE IF NOT EXISTS conversion_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  conversion_type TEXT NOT NULL,
  tokens_used DECIMAL NOT NULL,
  markdown_content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own tokens"
  ON user_tokens
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their conversion history"
  ON conversion_history
  FOR SELECT
  USING (auth.uid() = user_id);

-- Function to create user tokens on signup
CREATE OR REPLACE FUNCTION handle_new_user_tokens()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_tokens (user_id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created_tokens
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user_tokens();