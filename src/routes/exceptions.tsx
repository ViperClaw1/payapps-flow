import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Sparkles, Mail, CheckCircle2, Filter } from "lucide-react";
import { PageHeader, PageBody, SectionCard, StatCard } from "@/components/page";
import { Tone } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { exceptions, type ExceptionItem } from "@/lib/sample-data";

export const Route = createFileRoute("/exceptions")({
  component: ExceptionQueue,
});

function ExceptionQueue() {
  const [draft, setDraft] = useState<ExceptionItem | null>(null);
  return (
    <>
      <PageHeader
        title="Exception Queue"
        description="Blocked or low-confidence items needing resolution"
        actions={
          <>
            <Button variant="outline"><Filter className="size-4" /> Filter</Button>
            <Button><Sparkles className="size-4" /> Bulk draft fixes</Button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Open exceptions" value="12" tone="danger" />
          <StatCard label="High severity" value="5" tone="danger" />
          <StatCard label="Auto-resolvable" value="4" tone="info" />
          <StatCard label="Resolved this week" value="29" tone="success" />
        </div>

        <Tabs defaultValue="open">
          <TabsList className="bg-card border h-auto p-1">
            <TabsTrigger value="open">Open · 12</TabsTrigger>
            <TabsTrigger value="recommended">AI Recommended · 8</TabsTrigger>
            <TabsTrigger value="resolved">Resolved · 29</TabsTrigger>
          </TabsList>
        </Tabs>

        <SectionCard>
          <ul className="divide-y">
            {exceptions.map((x) => (
              <li key={x.id} className="grid grid-cols-[auto_1fr_auto] items-start gap-4 p-5">
                <div className={`flex size-10 items-center justify-center rounded-full ${x.severity === "High" ? "bg-destructive/10 text-destructive" : x.severity === "Medium" ? "bg-warning/15 text-warning-foreground" : "bg-muted text-muted-foreground"}`}>
                  <AlertTriangle className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{x.type}</span>
                    <Tone tone={x.severity === "High" ? "danger" : x.severity === "Medium" ? "warning" : "neutral"}>{x.severity}</Tone>
                    <span className="text-xs text-muted-foreground">· {x.detectedAt}</span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{x.vendor}</span> · {x.project}
                  </div>
                  <div className="mt-3 flex items-start gap-2 rounded-md border bg-muted/30 p-3 text-sm">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                    <div>
                      <div className="text-xs font-medium uppercase text-muted-foreground">Recommended action</div>
                      <div className="mt-0.5 text-foreground">{x.recommendation}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" onClick={() => setDraft(x)}><Mail className="size-3.5" /> Draft email</Button>
                  <Button size="sm" variant="outline"><CheckCircle2 className="size-3.5" /> Mark resolved</Button>
                  <Button size="sm" variant="ghost">Snooze</Button>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </PageBody>

      <Dialog open={!!draft} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /> AI-drafted correction email</DialogTitle>
            <DialogDescription>{draft?.vendor} · {draft?.project}</DialogDescription>
          </DialogHeader>
          <Textarea rows={10} defaultValue={`Hi team,\n\n${draft?.recommendation ?? ""}\n\nPlease reply at your earliest convenience so we can include this in the upcoming draw.\n\nThanks,\nSarah Liu\nLV Construction`} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDraft(null)}>Cancel</Button>
            <Button onClick={() => setDraft(null)}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
