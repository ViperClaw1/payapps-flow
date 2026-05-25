import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ClipboardCheck,
  FileStack,
  Mail,
  ArrowRight,
  Activity,
  Sparkles,
  DollarSign,
  Building2,
} from "lucide-react";
import { PageHeader, PageBody, StatCard, SectionCard, formatCurrency } from "@/components/page";
import { StatusChip, Tone } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { projects, stats, exceptions, auditTrail } from "@/lib/sample-data";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <PageHeader
        title="PayApps Mission Control"
        description="November 2025 draw cycle · 4 active draws · cutoff Friday Dec 5"
        actions={
          <>
            <Button variant="outline">Export status report</Button>
            <Button>
              <Sparkles className="size-4" /> Run AI sweep
            </Button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Active draws" value={String(stats.draws.active)} delta="2 at risk · 1 submitted" icon={<FileStack className="size-4" />} />
          <StatCard label="Total draw value" value={formatCurrency(stats.totalDrawValue)} delta="Nov 2025 cycle" tone="info" icon={<DollarSign className="size-4" />} />
          <StatCard label="Awaiting invoice" value={String(stats.awaitingInvoice)} delta="3 reminders queued" tone="warning" icon={<Mail className="size-4" />} />
          <StatCard label="In exception" value={String(stats.inException)} delta="5 high severity" tone="danger" icon={<AlertTriangle className="size-4" />} />
          <StatCard label="Pending PM review" value={String(stats.pendingPM)} delta="Marcus, Priya, Jordan" icon={<ClipboardCheck className="size-4" />} />
          <StatCard label="Pending Grady" value={String(stats.pendingGrady)} delta="$7.2M awaiting sign-off" tone="warning" icon={<Activity className="size-4" />} />
        </div>

        <SectionCard
          title="Project & month status"
          description="Click a project to enter its workspace"
          actions={
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-success" /> On track</span>
              <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-warning" /> At risk</span>
              <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-destructive" /> Blocked</span>
            </div>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Draw</TableHead>
                <TableHead>Vendor completion</TableHead>
                <TableHead className="text-right">Draw value</TableHead>
                <TableHead>Exceptions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => {
                const pct = Math.round((p.vendorsComplete / p.vendorsTotal) * 100);
                return (
                  <TableRow key={p.id} className="cursor-pointer">
                    <TableCell>
                      <Link to="/projects/$projectId" params={{ projectId: p.id }} className="flex items-center gap-2.5">
                        <span className="flex size-8 items-center justify-center rounded bg-muted text-muted-foreground">
                          <Building2 className="size-4" />
                        </span>
                        <span>
                          <div className="font-medium leading-tight">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.code} · PM {p.pm}</div>
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.owner}</TableCell>
                    <TableCell className="font-medium tabular-nums">#{p.drawNumber}</TableCell>
                    <TableCell className="min-w-[180px]">
                      <div className="flex items-center gap-2">
                        <Progress value={pct} className="h-1.5 w-28" />
                        <span className="text-xs tabular-nums text-muted-foreground">{p.vendorsComplete}/{p.vendorsTotal}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums font-medium">{formatCurrency(p.drawAmount)}</TableCell>
                    <TableCell>
                      {p.exceptions > 0 ? (
                        <Tone tone="danger">{p.exceptions} open</Tone>
                      ) : (
                        <Tone tone="success">Clear</Tone>
                      )}
                    </TableCell>
                    <TableCell>
                      <Tone
                        tone={
                          p.status === "On Track" ? "success" :
                          p.status === "At Risk" ? "warning" :
                          p.status === "Blocked" ? "danger" :
                          p.status === "Submitted" ? "primary" : "success"
                        }
                      >{p.status}</Tone>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.dueDate}</TableCell>
                    <TableCell>
                      <Button asChild variant="ghost" size="sm">
                        <Link to="/projects/$projectId" params={{ projectId: p.id }}>Open <ArrowRight className="size-3.5" /></Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </SectionCard>

        <div className="grid gap-6 lg:grid-cols-3">
          <SectionCard
            className="lg:col-span-2"
            title="High-priority exceptions"
            description="Blocking issues across active draws"
            actions={<Button asChild variant="outline" size="sm"><Link to="/exceptions">Open queue</Link></Button>}
          >
            <ul className="divide-y">
              {exceptions.slice(0, 4).map((x) => (
                <li key={x.id} className="flex items-start gap-3 p-4">
                  <div className={`mt-0.5 flex size-8 items-center justify-center rounded-full ${x.severity === "High" ? "bg-destructive/10 text-destructive" : x.severity === "Medium" ? "bg-warning/15 text-warning-foreground" : "bg-muted text-muted-foreground"}`}>
                    <AlertTriangle className="size-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      {x.type}
                      <Tone tone={x.severity === "High" ? "danger" : x.severity === "Medium" ? "warning" : "neutral"}>{x.severity}</Tone>
                    </div>
                    <div className="text-xs text-muted-foreground">{x.vendor} · {x.project}</div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                      <Sparkles className="size-3 text-primary" />
                      <span className="text-foreground">{x.recommendation}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">Resolve</Button>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Activity" description="System + user events">
            <ol className="relative space-y-4 p-4">
              {auditTrail.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="size-2 rounded-full bg-primary" />
                    <div className="mt-1 w-px flex-1 bg-border" />
                  </div>
                  <div className="pb-1">
                    <div className="text-sm font-medium leading-tight">{a.action}</div>
                    <div className="text-xs text-muted-foreground">{a.detail}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{a.at} · {a.actor}</div>
                  </div>
                </li>
              ))}
            </ol>
          </SectionCard>
        </div>
      </PageBody>
    </>
  );
}
