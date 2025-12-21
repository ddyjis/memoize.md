"use client";

import {SiGithub} from "@icons-pack/react-simple-icons";
import {Loader2} from "lucide-react";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {toast} from "sonner";

import {getDueCards} from "@/actions/cards";
import {Flashcard} from "@/components/flashcard/flashcard";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/features/auth-context";
import {useReviewQueue} from "@/hooks/use-review-queue";
import {createClient} from "@/lib/supabase/client";
import type {Card, Rating} from "@/types/card";

export function ReviewSession() {
  const {user} = useAuth();
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {addReview, removeReview} = useReviewQueue();
  const lastReviewRef = useRef<{cardId: string; rating: number} | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    if (!user) return;

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
  }, [user]);

  const handleUndo = useCallback(() => {
    const lastReview = lastReviewRef.current;
    if (!lastReview) return;

    removeReview(lastReview.cardId);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    lastReviewRef.current = null;
    toast.dismiss();
    toast.info("Review undone");
  }, [removeReview]);

  const handleLogin = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {redirectTo: `${location.origin}/auth/callback`},
    });
  }, [supabase.auth]);

  const handleRate = useCallback(
    (rating: Rating) => {
      const currentCard = cards[currentIndex];
      if (!currentCard) return;

      const review = {
        cardId: currentCard.id,
        rating,
        reviewedAt: new Date().toISOString(),
      };
      addReview(review);
      lastReviewRef.current = {cardId: currentCard.id, rating};
      setCurrentIndex((prev) => prev + 1);
      const ratingLabel = ["Again", "Hard", "Good", "Easy"][rating - 1];
      toast.success(`Rated ${ratingLabel}`, {
        action: {label: "Undo", onClick: handleUndo},
        duration: 5000,
      });
    },
    [cards, currentIndex, addReview, handleUndo],
  );

  if (!user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <h2 className="font-semibold text-2xl text-zinc-900 dark:text-zinc-100">
          Please log in to review cards
        </h2>
        <p className="text-zinc-500">
          You need to be logged in to access your flashcard reviews.
        </p>
        <Button onClick={handleLogin} variant="default" size="lg">
          <SiGithub className="mr-2 h-4 w-4" />
          Login with GitHub
        </Button>
      </div>
    );
  }

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
      <Flashcard key={currentCard.id} card={currentCard} onRate={handleRate} />
    </div>
  );
}
