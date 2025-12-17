import Link from "next/link";

import {AuthButton} from "@/components/auth-button";
import {createClient} from "@/lib/supabase/server";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-zinc-900 tracking-tight dark:text-zinc-50">
              Memoize.md
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <AuthButton user={user} />
        </div>
      </div>
    </header>
  );
}
