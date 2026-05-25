import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Search, Bell, ChevronRight } from "lucide-react";

import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
          <Button variant="outline" asChild><a href="/">Go home</a></Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LV Construction — Mission Control" },
      { name: "description", content: "Internal Pay Applications workflow automation for LV Construction." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const CRUMBS: Record<string, string> = {
  "/": "Dashboard",
  "/vendors": "Vendor Status Board",
  "/email-intake": "Email Intake",
  "/documents": "Document Center",
  "/exceptions": "Exception Queue",
  "/pm-review": "PM Review",
  "/accounting": "Accounting / Yardi",
  "/draw-review": "Draw Review",
  "/owner-package": "Owner Package",
  "/settings": "Settings / Data Readiness",
  "/login": "Sign in",
};

function TopBar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const label = path.startsWith("/projects/") ? "Project Workspace" : CRUMBS[path] ?? "PayApps";
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-card/80 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <span>PayApps</span>
        <ChevronRight className="size-3.5" />
        <span className="font-medium text-foreground">{label}</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search projects, vendors, invoices…" className="h-9 w-72 pl-8" />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
        </Button>
        <div className="flex h-9 items-center gap-2 rounded-md border bg-background px-2 text-xs">
          <span className="size-2 rounded-full bg-success" />
          <span className="text-muted-foreground">Outlook</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">Box</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">Yardi</span>
        </div>
      </div>
    </header>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isAuthPage = path === "/login";

  return (
    <QueryClientProvider client={queryClient}>
      {isAuthPage ? (
        <Outlet />
      ) : (
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset className="flex flex-1 flex-col bg-background">
              <TopBar />
              <main className="flex-1">
                <Outlet />
              </main>
            </SidebarInset>
          </div>
        </SidebarProvider>
      )}
      <Toaster />
    </QueryClientProvider>
  );
}
