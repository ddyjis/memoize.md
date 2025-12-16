import {createClient} from "@supabase/supabase-js";
import dotenv from "dotenv";

import type {Card, UpsertCard} from "@/types/card";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

export const db = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {autoRefreshToken: false, persistSession: false},
});

export async function fetchActiveCards(userId: string): Promise<Card[]> {
  const {data, error} = await db
    .from("cards")
    .select("*")
    .eq("user_id", userId)
    .eq("is_suspended", false);

  if (error) {
    throw new Error(`Failed to fetch cards: ${error.message}`);
  }

  return data as Card[];
}

export async function upsertCards(cards: UpsertCard[]) {
  // Use RPC for atomic batch upsert
  const {error} = await db.rpc("sync_cards", {cards_data: cards});

  if (error) {
    throw new Error(`Failed to upsert cards: ${error.message}`);
  }
}

export async function suspendCards(cardIds: string[]) {
  if (cardIds.length === 0) return;

  const {error} = await db.from("cards").update({is_suspended: true}).in("id", cardIds);

  if (error) {
    throw new Error(`Failed to suspend cards: ${error.message}`);
  }
}
