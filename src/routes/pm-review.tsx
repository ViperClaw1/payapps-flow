import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, Sparkles, Flag, CheckCircle2 } from "lucide-react";
import { PageHeader, PageBody, SectionCard, StatCard, formatCurrency } from "@/components/page";
import { Tone } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pmReviewItems } from "@/lib/sample-data";

export const Route = createFileRoute("/pm-review")({
  component: PMReview,
});

function PMReview() {
  return (
    <>
      <PageHeader
        title="PM Review Queue"
        description="Project managers verify % complete and approve invoices for accounting"
        actions={
          <>
            <Button variant="outline">Bulk approve matched</Button>
            <Button><Sparkles className="size-4" /> Compare to field log</Button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Pending review" value="9" icon={<ClipboardCheck className="size-4" />} />
          <StatCard label="AI matches PM" value="6" tone="success" />
          <StatCard label="Delta > 2%" value="3" tone="warning" />
          <StatCard label="Approved this cycle" value="48" tone="success" />
        </div>

        <Tabs defaultValue="mine">
          <TabsList className="bg-card border h-auto p-1">
            <TabsTrigger value="mine">My queue · 4</TabsTrigger>
            <TabsTrigger value="all">All projects · 9</TabsTrigger>
            <TabsTrigger value="flagged">Flagged · 1</TabsTrigger>
          </TabsList>
        </Tabs>

        <SectionCard title="Awaiting your approval" description="Marcus Chen · Rivermark + Elm Medical">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Trade</TableHead>
                <TableHead className="text-right">This period</TableHead>
                <TableHead>Vendor %</TableHead>
                <TableHead>AI Suggested</TableHead>
                <TableHead>Δ</TableHead>
                <TableHead>Field notes</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pmReviewItems.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.vendor}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.project}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.trade}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatCurrency(p.thisPeriod)}</TableCell>
                  <TableCell className="tabular-nums">{p.percentComplete}%</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/5 px-2 py-0.5 text-xs tabular-nums text-primary">
                      <Sparkles className="size-3" /> {p.aiSuggestion}%
                    </span>
                  </TableCell>
                  <TableCell><Tone tone={Math.abs(p.delta) > 2 ? "warning" : "success"}>{p.delta > 0 ? "+" : ""}{p.delta}</Tone></TableCell>
                  <TableCell className="max-w-[280px] text-xs text-muted-foreground">{p.notes}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button size="sm" variant="ghost"><Flag className="size-3.5" /> Flag</Button>
                      <Button size="sm"><CheckCircle2 className="size-3.5" /> Approve</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </PageBody>
    </>
  );
}
