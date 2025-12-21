"use server";

import {FSRS, type Card as FSRSCard, type Grade, generatorParameters} from "ts-fsrs";

import {createClient} from "@/lib/supabase/server";
import type {Card, ReviewSubmission} from "@/types/card";

export async function batchSubmitReviews(reviews: ReviewSubmission[]) {
  const supabase = await createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const cardIds = reviews.map((r) => r.cardId);
  const {data: cardsData, error: fetchError} = await supabase
    .from("cards")
    .select("*")
    .in("id", cardIds)
    .eq("user_id", user.id);

  if (fetchError || !cardsData) {
    console.error("Failed to fetch cards batch:", fetchError);
    return reviews.map((r) => ({
      cardId: r.cardId,
      status: "error",
      error: fetchError?.message || "Failed to fetch cards",
    }));
  }

  const cardMap = new Map(cardsData.map((c) => [c.id, c as Card]));

  const results = [];
  const fsrs = new FSRS(generatorParameters({enable_fuzz: true}));

  for (const review of reviews) {
    const currentCard = cardMap.get(review.cardId);

    if (!currentCard) {
      console.error(`Card not found in user's deck: ${review.cardId}`);
      results.push({cardId: review.cardId, status: "error", error: "Card not found"});
      continue;
    }

    const fsrsCard: FSRSCard = {
      due: new Date(currentCard.due_date),
      stability: currentCard.stability,
      difficulty: currentCard.difficulty,
      elapsed_days: currentCard.elapsed_days,
      scheduled_days: currentCard.scheduled_days,
      reps: currentCard.reps,
      lapses: currentCard.lapses,
      state: currentCard.state,
      last_review: currentCard.last_review
        ? new Date(currentCard.last_review)
        : undefined,
      learning_steps: currentCard.learning_steps,
    };

    const reviewTime = new Date(review.reviewedAt);
    const schedulingCards = fsrs.repeat(fsrsCard, reviewTime);

    const ratingKey = review.rating as Grade;
    const schedulingCard = schedulingCards[ratingKey];
    const newCard = schedulingCard.card;

    const {error: updateError} = await supabase
      .from("cards")
      .update({
        state: newCard.state,
        stability: newCard.stability,
        difficulty: newCard.difficulty,
        elapsed_days: newCard.elapsed_days,
        scheduled_days: newCard.scheduled_days,
        reps: newCard.reps,
        lapses: newCard.lapses,
        learning_steps: newCard.learning_steps || 0,
        due_date: newCard.due.toISOString(),
        last_review: newCard.last_review?.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", review.cardId);

    if (updateError) {
      console.error(`Failed to update card ${review.cardId}:`, updateError);
      results.push({
        cardId: review.cardId,
        status: "error",
        error: updateError.message,
      });
      continue;
    }

    const {error: logError} = await supabase
      .from("review_logs")
      .insert({
        user_id: user.id,
        card_id: review.cardId,
        rating: review.rating,
        state: newCard.state,
        due_date: newCard.due.toISOString(),
        stability: newCard.stability,
        difficulty: newCard.difficulty,
        elapsed_days: newCard.elapsed_days,
        scheduled_days: newCard.scheduled_days,
        learning_steps: newCard.learning_steps || 0,
        review_timeline: review.reviewedAt,
      });

    if (logError) {
      console.error(`Failed to insert log for card ${review.cardId}:`, logError);
    }

    results.push({cardId: review.cardId, status: "success"});
  }

  return results;
}
