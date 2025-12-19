"use client";

import type {User} from "@supabase/supabase-js";
import Link from "next/link";

import {AuthButton} from "@/components/auth-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar({user}: {user: User | null}) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4 dark:border-zinc-800">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-zinc-900 tracking-tight dark:text-zinc-50">
            Memoize.md
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter className="border-t p-4 dark:border-zinc-800">
        <AuthButton user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
