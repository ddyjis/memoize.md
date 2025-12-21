import {ReviewSession} from "@/components/flashcard/review-session";

export default async function Home() {
  return (
    <div className="container flex h-full flex-col items-center justify-center gap-4 bg-zinc-50 p-4 dark:bg-zinc-950">
      <ReviewSession />
    </div>
  );
}
