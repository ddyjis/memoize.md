import type {Metadata} from "next";
import {IBM_Plex_Mono} from "next/font/google";
import "./globals.css";

const mono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Memoize.md",
  description: "Headless Space Repetition System",
};

import {AppSidebar} from "@/components/app-sidebar";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Toaster} from "@/components/ui/sonner";
import {AuthProvider} from "@/features/auth-context";
import {createClient} from "@/lib/supabase/server";
import {cn} from "@/lib/utils";

export default async function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  const supabase = await createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className="h-full">
      <body className={cn(mono.variable, "h-full overflow-hidden antialiased")}>
        <AuthProvider initialUser={user}>
          <SidebarProvider defaultOpen={false} className="h-svh min-h-0">
            <AppSidebar />
            <main className="relative flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden">
              <SidebarTrigger className="fixed top-6 right-6 z-50" />
              <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
            </main>
          </SidebarProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
