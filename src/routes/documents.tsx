import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, FolderOpen, Search, ExternalLink, Filter } from "lucide-react";
import { PageHeader, PageBody, SectionCard, StatCard } from "@/components/page";
import { Tone } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { vendors, projects } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/documents")({
  component: DocumentCenter,
});

const docs = [
  { name: "ApexMech_PayApp_11.pdf", type: "Invoice", vendor: "Apex Mechanical", project: "Rivermark Residences", size: "1.2 MB", at: "Today" },
  { name: "Conditional_LR_ApexMech_Nov.pdf", type: "Lien Release", vendor: "Apex Mechanical", project: "Rivermark Residences", size: "240 KB", at: "Today" },
  { name: "NB_Steel_COI_2026.pdf", type: "COI", vendor: "Northbridge Steel", project: "Harborline Logistics Hub", size: "380 KB", at: "Yesterday" },
  { name: "Rivermark_Draw14_G702.pdf", type: "Draw Doc", vendor: "—", project: "Rivermark Residences", size: "2.4 MB", at: "Today" },
  { name: "Summit_Tower_Draw6_OwnerPackage.pdf", type: "Owner Package", vendor: "—", project: "Summit Tower", size: "14.2 MB", at: "Nov 28" },
  { name: "Crestwood_Signed_Contract.pdf", type: "Signed Doc", vendor: "Crestwood Electric", project: "Summit Tower", size: "920 KB", at: "Nov 14" },
];

function DocumentCenter() {
  const [active, setActive] = useState(docs[0]);

  return (
    <>
      <PageHeader
        title="Document Center"
        description="All documents synced from Box · Read-only mirror"
        actions={
          <>
            <Button variant="outline"><Filter className="size-4" /> Filter</Button>
            <Button variant="outline"><ExternalLink className="size-4" /> Open in Box</Button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <StatCard label="Invoices" value="312" />
          <StatCard label="Lien Releases" value="284" tone="success" />
          <StatCard label="COIs" value="98" />
          <StatCard label="Draw Docs" value="44" tone="info" />
          <StatCard label="Owner Packages" value="18" tone="info" />
        </div>

        <Tabs defaultValue="all">
          <div className="flex items-center justify-between">
            <TabsList className="bg-card border h-auto p-1">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="lien">Lien Releases</TabsTrigger>
              <TabsTrigger value="coi">COIs</TabsTrigger>
              <TabsTrigger value="draw">Draw Docs</TabsTrigger>
              <TabsTrigger value="owner">Owner Packages</TabsTrigger>
            </TabsList>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search documents…" className="h-9 w-72 pl-8" />
            </div>
          </div>

          <TabsContent value="all" className="mt-4">
            <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
              <SectionCard>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Synced</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {docs.map((d) => (
                      <TableRow key={d.name} className={cn("cursor-pointer", active.name === d.name && "bg-primary/5")} onClick={() => setActive(d)}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="size-4 text-muted-foreground" />
                            {d.name}
                          </div>
                        </TableCell>
                        <TableCell><Tone tone={d.type === "Lien Release" ? "success" : d.type === "COI" ? "info" : d.type === "Owner Package" ? "primary" : "neutral"}>{d.type}</Tone></TableCell>
                        <TableCell className="text-sm text-muted-foreground">{d.vendor}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{d.project}</TableCell>
                        <TableCell className="text-sm tabular-nums">{d.size}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{d.at}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </SectionCard>

              <SectionCard title="Preview" description={active.name}>
                <div className="p-4">
                  <div className="aspect-[8.5/11] overflow-hidden rounded border bg-white shadow-sm">
                    <div className="flex h-full flex-col gap-2 p-6 text-xs text-slate-700">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="font-semibold tracking-tight text-slate-900">{active.vendor !== "—" ? active.vendor : "LV Construction"}</span>
                        <span className="text-slate-500">{active.type}</span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div><div className="text-[10px] uppercase text-slate-400">Project</div><div>{active.project}</div></div>
                        <div><div className="text-[10px] uppercase text-slate-400">Period</div><div>Nov 1 – Nov 30, 2025</div></div>
                      </div>
                      <div className="mt-4 h-px bg-slate-200" />
                      <div className="space-y-1.5">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="flex items-center justify-between border-b border-dashed border-slate-200 py-1">
                            <span className="h-1.5 w-32 rounded bg-slate-200" />
                            <span className="h-1.5 w-16 rounded bg-slate-200" />
                          </div>
                        ))}
                      </div>
                      <div className="mt-auto flex justify-between text-[10px] text-slate-400">
                        <span>Page 1 of 14</span>
                        <span>Synced from Box · {active.at}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" className="flex-1"><FolderOpen className="size-4" /> Open in Box</Button>
                    <Button variant="outline" className="flex-1">Download</Button>
                  </div>
                </div>
              </SectionCard>
            </div>
          </TabsContent>

          {["invoices", "lien", "coi", "draw", "owner"].map((t) => (
            <TabsContent key={t} value={t} className="mt-4">
              <SectionCard>
                <div className="p-10 text-center text-sm text-muted-foreground">Filtered view — uses same Box mirror</div>
              </SectionCard>
            </TabsContent>
          ))}
        </Tabs>
      </PageBody>
    </>
  );
}
