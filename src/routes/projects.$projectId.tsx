import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  ChevronLeft,
  Calendar,
  FileStack,
  Sparkles,
  Mail,
  Phone,
  Paperclip,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { PageHeader, PageBody, StatCard, SectionCard, formatCurrency } from "@/components/page";
import { StatusChip, Tone } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { projects, vendors, pmReviewItems, yardiQueue, drawDocs, auditTrail, exceptions, type Vendor } from "@/lib/sample-data";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectWorkspace,
  notFoundComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Project not found. <Link to="/" className="text-primary underline">Back to dashboard</Link></div>
  ),
});

function ProjectWorkspace() {
  const { project } = Route.useLoaderData();
  const [openVendor, setOpenVendor] = useState<Vendor | null>(null);
  const pct = Math.round((project.vendorsComplete / project.vendorsTotal) * 100);

  return (
    <>
      <PageHeader
        title={project.name}
        description={`${project.code} · Owner ${project.owner} · PM ${project.pm} · Draw #${project.drawNumber} · ${project.month}`}
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/"><ChevronLeft className="size-4" /> All projects</Link>
            </Button>
            <Button variant="outline"><Calendar className="size-4" /> Switch month</Button>
            <Button><Sparkles className="size-4" /> Re-run AI audit</Button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <StatCard label="Draw value" value={formatCurrency(project.drawAmount)} tone="info" />
          <StatCard label="Vendor completion" value={`${pct}%`} delta={`${project.vendorsComplete}/${project.vendorsTotal} vendors`} />
          <StatCard label="Exceptions" value={String(project.exceptions)} tone={project.exceptions > 0 ? "danger" : "success"} delta={project.exceptions > 0 ? "Requires action" : "All clear"} />
          <StatCard label="Owner due" value={project.dueDate} tone="warning" />
          <StatCard label="Workflow status" value={project.status} tone={project.status === "Blocked" ? "danger" : project.status === "At Risk" ? "warning" : "success"} />
        </div>

        <Tabs defaultValue="vendors">
          <TabsList className="bg-card border h-auto p-1 flex-wrap">
            <TabsTrigger value="vendors">Vendors & Invoices</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="pm">PM Review</TabsTrigger>
            <TabsTrigger value="yardi">Yardi</TabsTrigger>
            <TabsTrigger value="draw">Draw Docs</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          <TabsContent value="vendors" className="mt-4">
            <SectionCard>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Trade</TableHead>
                    <TableHead className="text-right">Contract</TableHead>
                    <TableHead className="text-right">This period</TableHead>
                    <TableHead>% Complete</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>AI Conf.</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map((v) => (
                    <TableRow key={v.id} className="cursor-pointer" onClick={() => setOpenVendor(v)}>
                      <TableCell className="font-medium">{v.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{v.trade}</TableCell>
                      <TableCell className="text-right tabular-nums">{formatCurrency(v.contractValue)}</TableCell>
                      <TableCell className="text-right tabular-nums">{v.invoiceAmount ? formatCurrency(v.invoiceAmount) : <span className="text-muted-foreground">—</span>}</TableCell>
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
                      <TableCell className="tabular-nums text-xs">
                        {v.confidence ? `${Math.round(v.confidence * 100)}%` : "—"}
                      </TableCell>
                      <TableCell><StatusChip status={v.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </SectionCard>
          </TabsContent>

          <TabsContent value="compliance" className="mt-4">
            <SectionCard title="Compliance review" description="AI-read lien releases and COIs for the current period">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Conditional Lien Release</TableHead>
                    <TableHead>Unconditional Lien Release</TableHead>
                    <TableHead>COI</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.slice(0, 8).map((v) => (
                    <TableRow key={v.id}>
                      <TableCell className="font-medium">{v.name}</TableCell>
                      <TableCell>{v.hasLienRelease ? <Tone tone="success"><CheckCircle2 className="size-3" /> Received</Tone> : <Tone tone="danger">Missing</Tone>}</TableCell>
                      <TableCell><Tone tone="neutral">Pending payment</Tone></TableCell>
                      <TableCell>{v.hasCOI ? <Tone tone="success"><CheckCircle2 className="size-3" /> Valid thru 06/2026</Tone> : <Tone tone="danger">Expired</Tone>}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{v.notes ?? "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </SectionCard>
          </TabsContent>

          <TabsContent value="pm" className="mt-4">
            <SectionCard title="PM review" description="Approve, adjust, or flag % complete for this period">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Trade</TableHead>
                    <TableHead className="text-right">This period</TableHead>
                    <TableHead>Vendor %</TableHead>
                    <TableHead>AI Suggested %</TableHead>
                    <TableHead>Δ</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pmReviewItems.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.vendor}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.trade}</TableCell>
                      <TableCell className="text-right tabular-nums">{formatCurrency(p.thisPeriod)}</TableCell>
                      <TableCell className="tabular-nums">{p.percentComplete}%</TableCell>
                      <TableCell className="tabular-nums"><span className="inline-flex items-center gap-1"><Sparkles className="size-3 text-primary" />{p.aiSuggestion}%</span></TableCell>
                      <TableCell><Tone tone={Math.abs(p.delta) > 2 ? "warning" : "success"}>{p.delta > 0 ? "+" : ""}{p.delta}</Tone></TableCell>
                      <TableCell className="max-w-[260px] text-xs text-muted-foreground">{p.notes}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button size="sm" variant="ghost">Flag</Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </SectionCard>
          </TabsContent>

          <TabsContent value="yardi" className="mt-4">
            <SectionCard title="Yardi sync" description="Approved invoices, cost codes & sync status">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Cost code</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Detail</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yardiQueue.map((y) => (
                    <TableRow key={y.id}>
                      <TableCell className="font-medium">{y.vendor}</TableCell>
                      <TableCell className="text-right tabular-nums">{formatCurrency(y.amount)}</TableCell>
                      <TableCell className="font-mono text-xs">{y.costCode}</TableCell>
                      <TableCell><Tone tone={y.status === "Synced" ? "success" : y.status === "Queued" ? "info" : "danger"}>{y.status}</Tone></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{y.error ?? "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </SectionCard>
          </TabsContent>

          <TabsContent value="draw" className="mt-4">
            <SectionCard title="Generated draw documents" description="Auto-assembled when all vendors are Yardi-synced">
              <ul className="divide-y">
                {drawDocs.map((d) => (
                  <li key={d.id} className="flex items-center gap-3 p-4">
                    <div className="flex size-10 items-center justify-center rounded bg-muted text-muted-foreground">
                      <FileStack className="size-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{d.name}</div>
                      <div className="text-xs text-muted-foreground">{d.type} · {d.pages} pages · {d.generatedAt}</div>
                    </div>
                    <Tone tone={d.status === "Approved" ? "success" : d.status === "Reviewed" ? "primary" : "info"}>{d.status}</Tone>
                    <Button variant="ghost" size="sm">Preview</Button>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </TabsContent>

          <TabsContent value="audit" className="mt-4">
            <SectionCard title="Audit trail" description="Immutable log of every action on this draw">
              <ol className="space-y-4 p-4">
                {[...auditTrail, ...auditTrail].slice(0, 8).map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Clock className="size-3" />
                      </div>
                      <div className="mt-1 w-px flex-1 bg-border" />
                    </div>
                    <div className="pb-1">
                      <div className="text-sm font-medium leading-tight">{a.action}</div>
                      <div className="text-xs text-muted-foreground">{a.detail}</div>
                      <div className="text-[11px] text-muted-foreground">{a.at} · {a.actor}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </PageBody>

      <Sheet open={!!openVendor} onOpenChange={(o) => !o && setOpenVendor(null)}>
        <SheetContent className="w-full sm:max-w-xl p-0 flex flex-col">
          {openVendor ? (
            <>
              <SheetHeader className="border-b p-6">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded bg-muted"><Building2 className="size-5" /></div>
                  <div className="flex-1">
                    <SheetTitle>{openVendor.name}</SheetTitle>
                    <SheetDescription>{openVendor.trade} · Last activity {openVendor.lastActivity}</SheetDescription>
                  </div>
                  <StatusChip status={openVendor.status} />
                </div>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <StatCard label="Contract" value={formatCurrency(openVendor.contractValue)} />
                  <StatCard label="This period" value={openVendor.invoiceAmount ? formatCurrency(openVendor.invoiceAmount) : "—"} />
                  <StatCard label="% Complete" value={`${openVendor.percentComplete}%`} />
                </div>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium"><Sparkles className="size-4 text-primary" /> AI extraction</div>
                  <div className="mt-1 text-xs text-muted-foreground">OCR confidence {openVendor.confidence ? `${Math.round(openVendor.confidence * 100)}%` : "—"} · Vendor & project auto-matched</div>
                </div>
                {openVendor.notes && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">
                    <div className="font-medium text-destructive">Exception flagged</div>
                    <div className="mt-1 text-foreground">{openVendor.notes}</div>
                  </div>
                )}
                <div>
                  <div className="mb-2 text-sm font-medium">Documents</div>
                  <ul className="divide-y rounded-lg border bg-card">
                    {["Invoice (Pay App)", "Conditional Lien Release", "COI"].map((d) => (
                      <li key={d} className="flex items-center gap-2 p-3 text-sm">
                        <Paperclip className="size-4 text-muted-foreground" />
                        <span className="flex-1">{d}</span>
                        <Button size="sm" variant="ghost">Preview</Button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium">Contact</div>
                  <div className="space-y-1.5 rounded-lg border bg-card p-3 text-sm">
                    <div className="flex items-center gap-2"><Mail className="size-4 text-muted-foreground" /> {openVendor.contact}</div>
                    <div className="flex items-center gap-2"><Phone className="size-4 text-muted-foreground" /> (312) 555-0142</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-t p-4">
                <Button variant="outline">Draft correction email</Button>
                <div className="flex gap-2">
                  <Button variant="outline">Flag</Button>
                  <Button>Approve for PM</Button>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}
