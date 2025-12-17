"use client";

import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {Suspense} from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorCode = searchParams.get("error_code");
  const errorDescription = searchParams.get("error_description");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-4 font-bold text-2xl text-red-600">Authentication Error</h1>

        <div className="mb-6 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          {error && (
            <div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                Error:{" "}
              </span>
              {error}
            </div>
          )}
          {errorCode && (
            <div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                Code:{" "}
              </span>
              {errorCode}
            </div>
          )}
          {errorDescription && (
            <div className="rounded bg-red-50 p-3 font-mono text-red-800 text-xs dark:bg-red-900/20 dark:text-red-200">
              {errorDescription.replace(/\+/g, " ")}
            </div>
          )}
        </div>

        <div className="mb-6 rounded bg-zinc-100 p-4 text-xs text-zinc-500 dark:bg-zinc-800">
          <p className="mb-1 font-semibold">Common Fixes:</p>
          <ul className="list-disc space-y-1 pl-4">
            <li>
              Check that your <strong>Client Secret</strong> in Supabase matches GitHub.
            </li>
            <li>
              Ensure the <strong>Redirect URL</strong> in GitHub is exactly correct.
            </li>
            <li>Try generating a new Client Secret in GitHub and updating Supabase.</li>
          </ul>
        </div>

        <Link
          href="/"
          className="block w-full rounded-md bg-zinc-900 px-4 py-2 text-center font-medium text-sm text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
