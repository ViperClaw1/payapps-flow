import { createFileRoute } from "@tanstack/react-router";
import { Filter, Download, Sparkles } from "lucide-react";
import { PageHeader, PageBody, SectionCard, formatCurrency, StatCard } from "@/components/page";
import { StatusChip, Tone } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { vendors, projects } from "@/lib/sample-data";

export const Route = createFileRoute("/vendors")({
  component: VendorBoard,
});

const columns = [
  { key: "Not Received", tone: "neutral" as const },
  { key: "Email Received", tone: "info" as const },
  { key: "Compliance Blocked", tone: "danger" as const },
  { key: "PM Review Pending", tone: "warning" as const },
  { key: "Yardi Synced", tone: "success" as const },
];

function VendorBoard() {
  return (
    <>
      <PageHeader
        title="Vendor Status Board"
        description="Track every vendor on every active draw through the workflow"
        actions={
          <>
            <Button variant="outline"><Filter className="size-4" /> Filters</Button>
            <Button variant="outline"><Download className="size-4" /> Export</Button>
            <Button><Sparkles className="size-4" /> Send AI reminders</Button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <StatCard label="Total vendors" value="133" />
          <StatCard label="Awaiting invoice" value="18" tone="warning" />
          <StatCard label="In compliance review" value="22" tone="info" />
          <StatCard label="Pending PM" value="9" />
          <StatCard label="Synced to Yardi" value="58" tone="success" />
        </div>

        <SectionCard title="Workflow board" description="Drag vendors across stages (demo: visual only)">
          <div className="grid gap-3 p-4 lg:grid-cols-5">
            {columns.map((col) => {
              const items = vendors.filter((v) => v.status === col.key).concat(
                col.key === "Yardi Synced" ? vendors.slice(0, 2) : []
              );
              return (
                <div key={col.key} className="rounded-lg border bg-muted/30">
                  <div className="flex items-center justify-between border-b bg-card px-3 py-2">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{col.key}</div>
                    <Tone tone={col.tone}>{items.length}</Tone>
                  </div>
                  <div className="space-y-2 p-2">
                    {items.length === 0 && <div className="px-2 py-6 text-center text-xs text-muted-foreground">No vendors</div>}
                    {items.slice(0, 4).map((v, idx) => (
                      <div key={v.id + idx} className="cursor-pointer rounded-md border bg-card p-3 hover:border-primary/50">
                        <div className="text-sm font-medium">{v.name}</div>
                        <div className="text-xs text-muted-foreground">{v.trade}</div>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <span className="tabular-nums">{v.invoiceAmount ? formatCurrency(v.invoiceAmount) : "—"}</span>
                          <span className="text-muted-foreground">{v.lastActivity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard
          title="All vendors"
          description="Across all active projects"
          actions={<Input placeholder="Search vendors…" className="h-8 w-64" />}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Trade</TableHead>
                <TableHead className="text-right">This period</TableHead>
                <TableHead>% Complete</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.flatMap((v, i) => projects.slice(0, 3).map((p, j) => ({ ...v, id: `${v.id}-${j}`, project: p.name, key: `${i}-${j}` }))).slice(0, 18).map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{v.project}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{v.trade}</TableCell>
                  <TableCell className="text-right tabular-nums">{v.invoiceAmount ? formatCurrency(v.invoiceAmount) : "—"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={v.percentComplete} className="h-1.5 w-20" />
                      <span className="text-xs tabular-nums text-muted-foreground">{v.percentComplete}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Tone tone={v.hasLienRelease ? "success" : "danger"}>Lien</Tone>
                      <Tone tone={v.hasCOI ? "success" : "danger"}>COI</Tone>
                    </div>
                  </TableCell>
                  <TableCell><StatusChip status={v.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </PageBody>
    </>
  );
}
