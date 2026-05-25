import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileStack, Sparkles, CheckCircle2, X, Eye, Download } from "lucide-react";
import { PageHeader, PageBody, SectionCard, StatCard, formatCurrency } from "@/components/page";
import { Tone } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { drawDocs, projects } from "@/lib/sample-data";

export const Route = createFileRoute("/draw-review")({
  component: DrawReview,
});

function DrawReview() {
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null);
  const project = projects[0];

  return (
    <>
      <PageHeader
        title="Draw Review — Grady Approval"
        description={`${project.name} · Draw #${project.drawNumber} · ${project.month}`}
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Download package</Button>
            <Button variant="outline" onClick={() => setDecision("reject")}><X className="size-4" /> Reject</Button>
            <Button onClick={() => setDecision("approve")}><CheckCircle2 className="size-4" /> Approve & route to owner</Button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Draw value" value={formatCurrency(project.drawAmount)} tone="info" icon={<FileStack className="size-4" />} />
          <StatCard label="Pages" value="189" />
          <StatCard label="Vendors included" value={`${project.vendorsComplete}/${project.vendorsTotal}`} />
          <StatCard label="Audit score" value="98 / 100" tone="success" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
          <SectionCard title="Generated documents" description="All draw docs ready for executive review">
            <ul className="divide-y">
              {drawDocs.map((d) => (
                <li key={d.id} className="flex items-center gap-3 p-4">
                  <div className="flex size-10 items-center justify-center rounded bg-muted text-muted-foreground"><FileStack className="size-5" /></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.type} · {d.pages} pages · {d.generatedAt}</div>
                  </div>
                  <Tone tone={d.status === "Approved" ? "success" : d.status === "Reviewed" ? "primary" : "info"}>{d.status}</Tone>
                  <Button variant="ghost" size="sm"><Eye className="size-3.5" /> Preview</Button>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="AI executive summary" description="What changed, what to watch">
            <div className="space-y-4 p-5 text-sm">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="size-4" />
                <span className="text-xs font-medium uppercase tracking-wide">Summary</span>
              </div>
              <p className="text-foreground">
                Draw #{project.drawNumber} totals <span className="font-semibold">{formatCurrency(project.drawAmount)}</span>,
                a 6% increase over October driven primarily by Northbridge Steel completing structural work on Levels 8–10.
              </p>
              <div>
                <div className="text-xs font-medium uppercase text-muted-foreground">Key risks</div>
                <ul className="mt-2 space-y-2">
                  <li className="flex gap-2 text-foreground"><span className="text-warning-foreground">▲</span> Granite Concrete 38% above trailing average — flagged for SOV review</li>
                  <li className="flex gap-2 text-foreground"><span className="text-success">✓</span> All conditional lien releases received for this period</li>
                  <li className="flex gap-2 text-foreground"><span className="text-success">✓</span> Yardi sync complete — GL postings match draw totals to the dollar</li>
                </ul>
              </div>
              <div>
                <div className="text-xs font-medium uppercase text-muted-foreground">Audit checks</div>
                <ul className="mt-2 space-y-1.5 text-xs">
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-success" /> G703 line totals balance to G702</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-success" /> All vendor sworn statements signed & notarized</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-success" /> Retainage calculated at 10% across all trades</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="size-3.5 text-success" /> No vendor billing over SOV cap</li>
                </ul>
              </div>
            </div>
          </SectionCard>
        </div>
      </PageBody>

      <Dialog open={decision !== null} onOpenChange={(o) => !o && setDecision(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{decision === "approve" ? "Approve draw package?" : "Reject and request revisions?"}</DialogTitle>
            <DialogDescription>
              {decision === "approve"
                ? "This routes Draw #14 to the owner package builder for Brookfield Capital submission."
                : "PM and Coordinator will be notified to address your comments before resubmission."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDecision(null)}>Cancel</Button>
            <Button variant={decision === "approve" ? "default" : "destructive"} onClick={() => setDecision(null)}>
              {decision === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
