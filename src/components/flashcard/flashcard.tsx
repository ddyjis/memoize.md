"use client";

import {createContext, useContext, useEffect, useState} from "react";
import type {Options} from "rehype-react";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {processMarkdown} from "@/lib/unified";
import {cn} from "@/lib/utils";
import type {Card as CardType, Rating} from "@/types/card";

interface FlashcardProps {
  card: CardType;
  onNext: () => void;
}

const FlashcardContext = createContext<{isFlipped: boolean}>({isFlipped: false});

export function Flashcard({card, onNext}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const isCloze = card.card_type === "cloze";
  const content = isFlipped ? (isCloze ? card.front : card.back) : card.front;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFlipped) return;
      if (e.key === " ") {
        setIsFlipped(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped]);

  const rateHandler = (rating: Rating) => {
    toast.success(`Rated ${rating}`);
    setTimeout(() => {
      setIsFlipped(false);
      onNext();
    }, 500);
  };

  return (
    <div className="min-h-0 w-full flex-1">
      <Card
        onClick={() => !isFlipped && setIsFlipped(true)}
        className="mx-auto flex h-full max-w-[800px] flex-col overflow-hidden py-2"
      >
        <CardHeader className="flex-none pt-4">
          <CardTitle>
            {isFlipped ? "Answer" : isCloze ? "Cloze Deletion" : "Question"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <FlashcardContext.Provider value={{isFlipped}}>
            <Markdown content={content} />
          </FlashcardContext.Provider>
        </CardContent>
        <CardFooter className="flex-none px-2">
          {isFlipped && <ReviewControls onRate={rateHandler} isFlipped={isFlipped} />}
        </CardFooter>
      </Card>
    </div>
  );
}

interface MarkdownProps {
  content: string;
}

function Markdown({content}: MarkdownProps) {
  const [Content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    async function render() {
      const result = await processMarkdown(content, components);
      setContent(result);
    }

    render();
  }, [content]);

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none prose-pre:bg-zinc-100 prose-code:text-zinc-900 prose-p:leading-relaxed dark:prose-pre:bg-zinc-900 dark:prose-code:text-zinc-100">
      {Content}
    </div>
  );
}

const components: Options["components"] = {
  cloze: ({children}: React.PropsWithChildren<{dataIndex: number}>) => {
    const {isFlipped} = useContext(FlashcardContext);
    return (
      <span className="inline p-1 text-blue-500">{isFlipped ? children : "[...]"}</span>
    );
  },
};

interface ReviewControlsProps {
  onRate: (rating: Rating) => void;
  isFlipped: boolean;
}

function ReviewControls({onRate, isFlipped}: ReviewControlsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFlipped) return;
      const rating = RATINGS.find((r) => r.key === e.key);
      if (rating) {
        onRate(rating.value);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRate, isFlipped]);

  return (
    <div className="grid w-full grid-cols-4 gap-1">
      {RATINGS.map((rating) => (
        <Button
          key={rating.value}
          variant="ghost"
          className={cn(rating.color, "text-zinc-50 hover:text-zinc-50")}
          onClick={() => onRate(rating.value)}
        >
          {rating.label}
          <span className="font-mono text-[10px] opacity-80">[{rating.key}]</span>
        </Button>
      ))}
    </div>
  );
}

const RATINGS: {value: Rating; label: string; color: string; key: string}[] = [
  {value: 1, label: "Again", color: "bg-red-500 hover:bg-red-600", key: "1"},
  {value: 2, label: "Hard", color: "bg-orange-500 hover:bg-orange-600", key: "2"},
  {value: 3, label: "Good", color: "bg-blue-500 hover:bg-blue-600", key: "3"},
  {value: 4, label: "Easy", color: "bg-green-500 hover:bg-green-600", key: "4"},
];
