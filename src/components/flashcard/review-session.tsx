"use client";

import {Loader2} from "lucide-react";
import {useEffect, useState} from "react";

import {getDueCards} from "@/actions/cards";
import {Flashcard} from "@/components/flashcard/flashcard";
import {Button} from "@/components/ui/button";
import type {Card} from "@/types/card";

export function ReviewSession() {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCards() {
      try {
        setIsLoading(true);
        const dueCards = await getDueCards();
        setCards(dueCards);
      } catch (err) {
        setError("Failed to load cards. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCards();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <p className="text-zinc-500">Loading your cards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h2 className="font-semibold text-2xl text-zinc-900 dark:text-zinc-100">
          All caught up!
        </h2>
        <p className="text-zinc-500">No cards due for review right now.</p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  if (!currentCard) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h2 className="font-semibold text-2xl text-zinc-900 dark:text-zinc-100">
          Session Complete
        </h2>
        <p className="text-zinc-500">You've reached the end of this batch.</p>
        <Button onClick={() => window.location.reload()}>Check for more</Button>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 p-4">
      <div className="flex w-full max-w-[800px] justify-between px-4 text-xs text-zinc-500">
        <span>
          Card {currentIndex + 1} of {cards.length}
        </span>
        <span>{cards.length - currentIndex - 1} remaining</span>
      </div>
      <Flashcard
        key={currentCard.id}
        card={currentCard}
        onNext={() => setCurrentIndex((prev) => prev + 1)}
      />
    </div>
  );
}
