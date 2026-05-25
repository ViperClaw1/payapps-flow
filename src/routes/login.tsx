import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("sarah.liu@lvconstruction.com");
  const [password, setPassword] = useState("••••••••••");

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <HardHat className="size-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">LV Construction</div>
              <div className="text-xs text-muted-foreground">Mission Control</div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Sign in to PayApps</h1>
            <p className="mt-1 text-sm text-muted-foreground">Internal operations dashboard for monthly draws.</p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/" });
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a className="text-xs text-primary hover:underline" href="#">Forgot?</a>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">Sign in</Button>
            <Button type="button" variant="outline" className="w-full">Continue with Microsoft 365</Button>
          </form>
          <p className="text-center text-xs text-muted-foreground">
            By signing in you agree to LV Construction's internal use policy.{" "}
            <Link to="/" className="text-primary hover:underline">Skip to demo →</Link>
          </p>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-sidebar lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.45_0.15_230/.5),transparent_60%),radial-gradient(circle_at_80%_80%,oklch(0.55_0.15_280/.4),transparent_50%)]" />
        <div className="relative z-10 m-auto max-w-md space-y-6 px-10 text-sidebar-foreground">
          <div className="inline-flex items-center gap-2 rounded-full border border-sidebar-border bg-sidebar-accent/50 px-3 py-1 text-xs">
            <span className="size-1.5 rounded-full bg-sidebar-primary" />
            November 2025 draw cycle in progress
          </div>
          <h2 className="text-3xl font-semibold leading-tight">One workspace from invoice intake to owner submission.</h2>
          <ul className="space-y-3 text-sm text-sidebar-foreground/80">
            <li className="flex gap-2"><span className="text-sidebar-primary">✓</span> AI-assisted invoice OCR, classification & matching</li>
            <li className="flex gap-2"><span className="text-sidebar-primary">✓</span> Compliance + lien release verification</li>
            <li className="flex gap-2"><span className="text-sidebar-primary">✓</span> One-click Yardi sync and draw package assembly</li>
            <li className="flex gap-2"><span className="text-sidebar-primary">✓</span> Executive approval and owner submission tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
