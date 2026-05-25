import { createFileRoute } from "@tanstack/react-router";
import { Calculator, RefreshCw, AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { PageHeader, PageBody, SectionCard, StatCard, formatCurrency } from "@/components/page";
import { Tone } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { yardiQueue } from "@/lib/sample-data";

export const Route = createFileRoute("/accounting")({
  component: Accounting,
});

function Accounting() {
  const synced = yardiQueue.filter((y) => y.status === "Synced").length;
  const errors = yardiQueue.filter((y) => y.status === "Error").length;

  return (
    <>
      <PageHeader
        title="Accounting / Yardi"
        description="Controller review · Cost code validation · One-click sync"
        actions={
          <>
            <Button variant="outline"><RefreshCw className="size-4" /> Re-sync errors</Button>
            <Button><Sparkles className="size-4" /> Push all to Yardi</Button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Ready for Yardi" value="14" tone="info" icon={<Calculator className="size-4" />} />
          <StatCard label="Synced today" value={String(synced)} tone="success" icon={<CheckCircle2 className="size-4" />} />
          <StatCard label="Sync errors" value={String(errors)} tone="danger" icon={<AlertTriangle className="size-4" />} />
          <StatCard label="Total to post" value={formatCurrency(yardiQueue.reduce((s, y) => s + y.amount, 0))} />
        </div>

        <SectionCard
          title="Yardi sync queue"
          description="All approved invoices ready to post to general ledger"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Cost code</TableHead>
                <TableHead>AI suggestion</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Detail</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {yardiQueue.map((y) => (
                <TableRow key={y.id}>
                  <TableCell className="font-medium">{y.vendor}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{y.project}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatCurrency(y.amount)}</TableCell>
                  <TableCell className="font-mono text-xs">{y.costCode}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Sparkles className="size-3 text-primary" /> 96% confidence
                    </span>
                  </TableCell>
                  <TableCell>
                    <Tone tone={y.status === "Synced" ? "success" : y.status === "Queued" ? "info" : "danger"}>{y.status}</Tone>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{y.error ?? "—"}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      {y.status === "Error" ? (
                        <Button size="sm" variant="outline">Map code</Button>
                      ) : null}
                      <Button size="sm" variant="ghost">View invoice</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard title="Anomaly detection" description="AI scans posting patterns for unusual changes">
          <ul className="divide-y">
            <li className="flex items-start gap-3 p-4">
              <div className="flex size-9 items-center justify-center rounded-full bg-warning/15 text-warning-foreground"><AlertTriangle className="size-4" /></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Granite Concrete invoice 38% above 6-month average</div>
                <div className="text-xs text-muted-foreground">Harborline Logistics Hub · Suggest reviewing SOV line 03-3000 before posting</div>
              </div>
              <Button size="sm" variant="outline">Review</Button>
            </li>
            <li className="flex items-start gap-3 p-4">
              <div className="flex size-9 items-center justify-center rounded-full bg-info/15 text-info"><Sparkles className="size-4" /></div>
              <div className="flex-1">
                <div className="text-sm font-medium">3 invoices missing cost-code mappings for job ESM-2025</div>
                <div className="text-xs text-muted-foreground">Bulk-map suggested codes (09-2500, 09-9000, 22-1000)</div>
              </div>
              <Button size="sm" variant="outline">Bulk map</Button>
            </li>
          </ul>
        </SectionCard>
      </PageBody>
    </>
  );
}
