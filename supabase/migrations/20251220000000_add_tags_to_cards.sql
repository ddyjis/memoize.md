-- Migration: Add tags column and GIN index
-- Date: 2025-12-20

-- Add tags column
ALTER TABLE cards
ADD COLUMN IF NOT EXISTS tags text[];

-- Add GIN index for efficient tag filtering
CREATE INDEX IF NOT EXISTS cards_tags_idx ON cards USING GIN (tags);

COMMENT ON COLUMN cards.tags IS 'Array of tags associated with the card';
