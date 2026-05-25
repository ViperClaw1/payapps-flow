import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Paperclip, Sparkles, RefreshCw, Inbox, Filter, Send } from "lucide-react";
import { PageHeader, PageBody, SectionCard, StatCard } from "@/components/page";
import { Tone } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { emails, type EmailItem } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/email-intake")({
  component: EmailIntake,
});

function EmailIntake() {
  const [active, setActive] = useState<EmailItem>(emails[0]);
  const [draftOpen, setDraftOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Email Intake"
        description="Outlook payapps@lvconstruction.com · AI-classified attachments"
        actions={
          <>
            <Button variant="outline"><RefreshCw className="size-4" /> Sync now</Button>
            <Button variant="outline"><Filter className="size-4" /> Filter</Button>
            <Button><Sparkles className="size-4" /> Re-run matching</Button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Unread" value="7" tone="info" icon={<Inbox className="size-4" />} />
          <StatCard label="Auto-matched" value="42" tone="success" />
          <StatCard label="Needs review" value="8" tone="warning" />
          <StatCard label="Reply drafted" value="3" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
          <SectionCard title="Inbox" bodyClassName="max-h-[640px] overflow-y-auto">
            <ul className="divide-y">
              {emails.map((e) => (
                <li
                  key={e.id}
                  className={cn(
                    "cursor-pointer p-4 hover:bg-muted/50",
                    active.id === e.id && "bg-primary/5 border-l-2 border-l-primary",
                  )}
                  onClick={() => setActive(e)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{e.from}</span>
                    <span className="text-[11px] text-muted-foreground">{e.receivedAt}</span>
                  </div>
                  <div className="mt-0.5 truncate text-sm text-foreground">{e.subject}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Paperclip className="size-3" /> {e.attachments.length}
                    </div>
                    <Tone tone={e.status === "Filed" ? "success" : e.status === "Auto-Matched" ? "primary" : e.status === "Reply Drafted" ? "info" : "warning"}>
                      {e.status}
                    </Tone>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard
            title={active.subject}
            description={`From ${active.from} · ${active.receivedAt}`}
            actions={
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setDraftOpen(true)}><Sparkles className="size-3.5" /> Draft reply</Button>
                <Button size="sm"><Send className="size-3.5" /> File & match</Button>
              </div>
            }
          >
            <div className="space-y-5 p-5">
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-sm font-medium"><Sparkles className="size-4 text-primary" /> AI matching result</div>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">Vendor</div>
                    <div className="font-medium">{active.matchedVendor ?? <span className="text-warning-foreground">Unknown</span>}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Project / Month</div>
                    <div className="font-medium">{active.matchedProject ?? "—"} · Nov 2025</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Overall confidence</div>
                    <div className="font-medium tabular-nums">{Math.round(active.confidence * 100)}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Action</div>
                    <Tone tone={active.status === "Filed" ? "success" : active.status === "Needs Review" ? "warning" : "primary"}>{active.status}</Tone>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium">Attachments</div>
                <ul className="divide-y rounded-lg border bg-card">
                  {active.attachments.map((a, i) => (
                    <li key={i} className="flex items-center gap-3 p-3">
                      <div className="flex size-9 items-center justify-center rounded bg-muted text-muted-foreground"><Paperclip className="size-4" /></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{a.name}</div>
                        <div className="text-xs text-muted-foreground">Classified as <span className="font-medium text-foreground">{a.type}</span> · {Math.round(a.confidence * 100)}% confidence</div>
                      </div>
                      <Tone tone={a.confidence > 0.9 ? "success" : a.confidence > 0.7 ? "warning" : "danger"}>{Math.round(a.confidence * 100)}%</Tone>
                      <Button variant="ghost" size="sm">Preview</Button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
                <div className="text-xs font-medium uppercase text-muted-foreground">Email body</div>
                <p className="mt-2 text-foreground">Hi LV team,</p>
                <p className="mt-2">Please find attached our November pay application along with the conditional lien release for the period.</p>
                <p className="mt-2">Let me know if you need anything else for the draw.</p>
                <p className="mt-3">Thanks,<br />Accounts Receivable</p>
              </div>
            </div>
          </SectionCard>
        </div>
      </PageBody>

      <Dialog open={draftOpen} onOpenChange={setDraftOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /> AI-drafted vendor correction</DialogTitle>
            <DialogDescription>Reviewed before sending. Tone: professional, concise.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="text-xs text-muted-foreground">To: <span className="text-foreground">{active.from}</span> · Subject: <span className="text-foreground">RE: {active.subject}</span></div>
            <Textarea
              rows={10}
              defaultValue={`Hi team,

Thanks for sending over the November pay application. Before we can process this draw, we need the following:

  • Updated COI — current certificate expired 10/30/2025
  • Conditional lien release for the current billing period

Please reply with these documents at your earliest convenience so we can include your invoice in the Dec 5 owner submission.

Best,
Sarah Liu
LV Construction — Pay Applications`}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDraftOpen(false)}>Cancel</Button>
            <Button onClick={() => setDraftOpen(false)}><Send className="size-4" /> Send reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
