import {ReviewSession} from "@/components/flashcard/review-session";

export default async function Home() {
  return (
    <div className="h-full bg-zinc-50 dark:bg-zinc-950">
      <ReviewSession />
    </div>
  );
}
