import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles, FileStack, ExternalLink, History } from "lucide-react";
import { PageHeader, PageBody, SectionCard, StatCard, formatCurrency } from "@/components/page";
import { Tone } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ownerPackages, type OwnerPackage } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/owner-package")({
  component: OwnerPackagePage,
});

function OwnerPackagePage() {
  const [active, setActive] = useState<OwnerPackage>(ownerPackages[0]);

  return (
    <>
      <PageHeader
        title="Owner Package"
        description="Final assembly · Owner submission · Revision tracking"
        actions={
          <>
            <Button variant="outline"><History className="size-4" /> Submission history</Button>
            <Button><Send className="size-4" /> Send to owner</Button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Drafting" value="1" />
          <StatCard label="Pending Grady" value="1" tone="warning" />
          <StatCard label="Submitted" value="1" tone="info" />
          <StatCard label="Awaiting owner" value="2" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <SectionCard title="Owner packages" description="All projects · this cycle">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Draw</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ownerPackages.map((o) => (
                  <TableRow key={o.id} className={cn("cursor-pointer", active.id === o.id && "bg-primary/5")} onClick={() => setActive(o)}>
                    <TableCell className="font-medium">{o.project}</TableCell>
                    <TableCell className="tabular-nums">#{o.draw}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatCurrency(o.amount)}</TableCell>
                    <TableCell>
                      <Tone
                        tone={
                          o.status === "Approved" ? "success" :
                          o.status === "Submitted" ? "primary" :
                          o.status === "Pending Grady" ? "warning" :
                          o.status === "Revision Required" ? "danger" : "info"
                        }
                      >{o.status}</Tone>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SectionCard>

          <SectionCard
            title={`${active.project} — Draw #${active.draw}`}
            description={`${formatCurrency(active.amount)} · Recipient ${active.recipient}`}
            actions={<Button variant="outline" size="sm"><ExternalLink className="size-3.5" /> Open in Box</Button>}
          >
            <div className="space-y-6 p-5">
              <div>
                <div className="mb-2 text-xs font-medium uppercase text-muted-foreground">Package contents</div>
                <ul className="divide-y rounded-lg border bg-card">
                  {["G702 / G703 Application", "Sworn Statement", "Lien Waiver Package", "Backup Invoices", "Cover Letter"].map((d) => (
                    <li key={d} className="flex items-center gap-3 p-3 text-sm">
                      <FileStack className="size-4 text-muted-foreground" />
                      <span className="flex-1">{d}</span>
                      <Tone tone="success">Included</Tone>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-muted-foreground">
                  <Sparkles className="size-3.5 text-primary" /> AI-drafted owner submission email
                </div>
                <div className="space-y-3 rounded-lg border bg-card p-4">
                  <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
                    <Label htmlFor="to" className="self-center">To</Label>
                    <Input id="to" defaultValue={active.recipient} className="h-8" />
                    <Label htmlFor="cc" className="self-center">CC</Label>
                    <Input id="cc" defaultValue="grady@lvconstruction.com, marcus.chen@lvconstruction.com" className="h-8" />
                    <Label htmlFor="subj" className="self-center">Subject</Label>
                    <Input id="subj" defaultValue={`${active.project} — Draw #${active.draw} — ${formatCurrency(active.amount)}`} className="h-8" />
                  </div>
                  <Textarea
                    rows={9}
                    defaultValue={`Dear Brookfield team,\n\nPlease find attached LV Construction's pay application for ${active.project}, Draw #${active.draw}, totaling ${formatCurrency(active.amount)} for the November 2025 billing period.\n\nThis package includes the AIA G702/G703, sworn statement, lien waiver package, and all supporting backup invoices. All conditional lien releases for the current period have been received and reviewed.\n\nPlease let us know if you need any additional documentation.\n\nBest regards,\nSarah Liu\non behalf of Grady Voss, EVP of Operations\nLV Construction`}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-medium uppercase text-muted-foreground">Submission timeline</div>
                <ol className="space-y-3 rounded-lg border bg-card p-4">
                  <li className="flex gap-3 text-sm">
                    <div className="flex flex-col items-center"><div className="size-2 rounded-full bg-success" /><div className="mt-1 w-px flex-1 bg-border" /></div>
                    <div><div className="font-medium">Draw package generated</div><div className="text-xs text-muted-foreground">Today 10:24 AM · System</div></div>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <div className="flex flex-col items-center"><div className="size-2 rounded-full bg-success" /><div className="mt-1 w-px flex-1 bg-border" /></div>
                    <div><div className="font-medium">Audit passed (98 / 100)</div><div className="text-xs text-muted-foreground">Today 10:25 AM · System</div></div>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <div className="flex flex-col items-center"><div className="size-2 rounded-full bg-warning" /><div className="mt-1 w-px flex-1 bg-border" /></div>
                    <div><div className="font-medium">Awaiting Grady approval</div><div className="text-xs text-muted-foreground">Sent today 10:30 AM</div></div>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <div className="flex flex-col items-center"><div className="size-2 rounded-full border border-border bg-card" /></div>
                    <div><div className="font-medium text-muted-foreground">Submit to owner</div><div className="text-xs text-muted-foreground">Pending</div></div>
                  </li>
                </ol>
              </div>
            </div>
          </SectionCard>
        </div>
      </PageBody>
    </>
  );
}
