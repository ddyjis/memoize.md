"use server";

import {createClient} from "@/lib/supabase/server";
import type {Card} from "@/types/card";

export async function getDueCards(): Promise<Card[]> {
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const {data, error} = await supabase
    .from("cards")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_suspended", false)
    .lte("due_date", new Date().toISOString())
    .order("due_date", {ascending: true});

  if (error) {
    console.error("Error fetching due cards:", error);
    throw new Error("Failed to fetch due cards");
  }

  return (data as Card[]) || [];
}
