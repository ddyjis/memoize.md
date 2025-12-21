export type CardType = "basic" | "reverse" | "cloze";

export interface Card {
  id: string; // UUID
  user_id: string; // UUID
  source_filepath: string;
  card_anchor: string;
  card_type: CardType;
  front: string;
  back: string;
  state: number; // 0=New, 1=Learning, 2=Review, 3=Relearning
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  learning_steps: number;
  tags?: string[];
  due_date: string; // ISO Date string
  last_review: string | null; // ISO Date string
  is_suspended: boolean;
  created_at: string;
  updated_at: string;
}

export type Rating = 1 | 2 | 3 | 4; // Again, Hard, Good, Easy

// For cards generated from files before they match DB
export interface DerivedCard {
  source_filepath: string;
  card_anchor: string;
  card_type: CardType;
  front: string;
  back: string;
  tags?: string[];
}

export type UpsertCard = DerivedCard & {user_id: string; is_suspended: boolean};

export interface FrontMatter {
  tags?: string[];
  reverse?: boolean; // Default: false
  list?: boolean; // Default: false
}

export interface ReviewSubmission {
  cardId: string;
  rating: Rating;
  reviewedAt: string; // ISO Date string
}
