"use client";

import {useCallback, useEffect, useRef, useState} from "react";

import {batchSubmitReviews} from "@/actions/review";
import type {ReviewSubmission} from "@/types/card";

export function useReviewQueue() {
  const [queue, setQueue] = useState<ReviewSubmission[]>(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("review_queue");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const queueRef = useRef(queue);

  useEffect(() => {
    queueRef.current = queue;
    localStorage.setItem("review_queue", JSON.stringify(queue));
  }, [queue]);

  const addReview = useCallback((review: ReviewSubmission) => {
    setQueue((prev) => [...prev, review]);
  }, []);

  const removeReview = useCallback((cardId: string) => {
    setQueue((prev) => prev.filter((r) => r.cardId !== cardId));
  }, []);

  const sync = useCallback(async () => {
    const currentQueue = queueRef.current;
    if (currentQueue.length === 0) return;

    try {
      // Optimistically clear the queue *from the point of view of the sync*, but we need to be
      // careful if we add new items while syncing. Simplest strategy: Sync everything currently in
      // queue, and remove successful ones. But for batching, we usually take a snapshot.

      const snapshot = [...currentQueue];

      // Perform sync
      const results = await batchSubmitReviews(snapshot);

      // Remove successfully synced items
      const successIds = new Set(
        results.filter((r) => r.status === "success").map((r) => r.cardId),
      );

      setQueue((prev) => prev.filter((r) => !successIds.has(r.cardId)));

      const errors = results.filter((r) => r.status === "error");
      if (errors.length > 0) {
        console.error("Some reviews failed to sync:", errors);
        // TODO: Optionally toast error: "Failed to sync X reviews"
      }
    } catch (err) {
      console.error("Sync failed:", err);
      // Keep items in queue to retry later
    }
  }, []);

  // Auto-sync every 30 seconds or if queue gets large
  useEffect(() => {
    const interval = setInterval(() => {
      if (queueRef.current.length > 0) {
        sync();
      }
    }, 30000); // 30s

    return () => clearInterval(interval);
  }, [sync]);

  // Sync when the page becomes hidden (tab switch, close, mobile home screen)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && queueRef.current.length > 0) {
        sync();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [sync]);

  return {queue, addReview, removeReview, sync};
}
