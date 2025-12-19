-- Migration: Set default due_date to now()
-- Date: 2025-12-19

-- 1. Update the table schema to set a default for new rows
ALTER TABLE cards 
ALTER COLUMN due_date SET DEFAULT now();

-- 2. Fix existing cards that have a NULL due_date
UPDATE cards 
SET due_date = now() 
WHERE due_date IS NULL;
