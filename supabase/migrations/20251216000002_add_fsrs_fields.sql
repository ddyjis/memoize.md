-- Migration: Add FSRS v5 columns
-- Date: 2025-12-16
-- Run this in your Supabase SQL Editor

ALTER TABLE cards
  ADD COLUMN IF NOT EXISTS elapsed_days int default 0,
  ADD COLUMN IF NOT EXISTS scheduled_days int default 0,
  ADD COLUMN IF NOT EXISTS reps int default 0,
  ADD COLUMN IF NOT EXISTS lapses int default 0;

-- Optional: Comment on columns
COMMENT ON COLUMN cards.lapses IS 'Total lapse count (forgotten)';
