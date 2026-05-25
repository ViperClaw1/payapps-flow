import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, AlertTriangle, FolderTree, Link2, Database, Users2 } from "lucide-react";
import { PageHeader, PageBody, SectionCard, StatCard } from "@/components/page";
import { Tone } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { projects } from "@/lib/sample-data";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

const blockers = [
  { project: "Elm Street Medical Pavilion", item: "Box folder mapping missing for Draw subfolder", severity: "High" },
  { project: "Harborline Logistics Hub", item: "3 cost codes unmapped in Yardi", severity: "Medium" },
  { project: "Elm Street Medical Pavilion", item: "SOV not yet uploaded for trades 09 & 22", severity: "High" },
  { project: "Rivermark Residences", item: "2 vendor contacts missing AR email", severity: "Low" },
];

function Settings() {
  return (
    <>
      <PageHeader
        title="Settings · Data Readiness"
        description="Confirm projects, vendors, contracts, SOVs, cost codes, Box & Yardi mappings"
        actions={
          <>
            <Button variant="outline">Run readiness check</Button>
            <Button>Save changes</Button>
          </>
        }
      />
      <PageBody>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Projects configured" value="5 / 5" tone="success" icon={<FolderTree className="size-4" />} />
          <StatCard label="Vendors imported" value="148" icon={<Users2 className="size-4" />} />
          <StatCard label="Cost codes mapped" value="92%" tone="warning" icon={<Database className="size-4" />} />
          <StatCard label="Box folders linked" value="4 / 5" tone="warning" icon={<Link2 className="size-4" />} />
        </div>

        <SectionCard
          title="Setup blockers"
          description="Items preventing one or more projects from being draw-ready"
        >
          <ul className="divide-y">
            {blockers.map((b, i) => (
              <li key={i} className="flex items-start gap-3 p-4">
                <div className={`flex size-9 items-center justify-center rounded-full ${b.severity === "High" ? "bg-destructive/10 text-destructive" : b.severity === "Medium" ? "bg-warning/15 text-warning-foreground" : "bg-muted text-muted-foreground"}`}>
                  <AlertTriangle className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{b.item}</div>
                  <div className="text-xs text-muted-foreground">{b.project}</div>
                </div>
                <Tone tone={b.severity === "High" ? "danger" : b.severity === "Medium" ? "warning" : "neutral"}>{b.severity}</Tone>
                <Button size="sm" variant="outline">Fix</Button>
              </li>
            ))}
          </ul>
        </SectionCard>

        <Tabs defaultValue="projects">
          <TabsList className="bg-card border h-auto p-1 flex-wrap">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="contracts">Contracts & SOVs</TabsTrigger>
            <TabsTrigger value="costcodes">Cost Codes</TabsTrigger>
            <TabsTrigger value="box">Box Mappings</TabsTrigger>
            <TabsTrigger value="yardi">Yardi Mappings</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-4">
            <SectionCard>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>PM</TableHead>
                    <TableHead>Box</TableHead>
                    <TableHead>Yardi job</TableHead>
                    <TableHead>SOV</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="font-mono text-xs">{p.code}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.owner}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.pm}</TableCell>
                      <TableCell>{p.id === "elm-medical" ? <Tone tone="danger">Not linked</Tone> : <Tone tone="success"><CheckCircle2 className="size-3" /> Linked</Tone>}</TableCell>
                      <TableCell className="font-mono text-xs">{p.code}-J</TableCell>
                      <TableCell>{p.id === "elm-medical" ? <Tone tone="warning">Partial</Tone> : <Tone tone="success">Complete</Tone>}</TableCell>
                      <TableCell>{p.id === "elm-medical" ? <Tone tone="danger">Blocked</Tone> : <Tone tone="success">Ready</Tone>}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </SectionCard>
          </TabsContent>

          {["vendors", "contracts", "costcodes", "box", "yardi"].map((t) => (
            <TabsContent key={t} value={t} className="mt-4">
              <SectionCard>
                <div className="grid grid-cols-3 divide-x">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-1 p-5">
                      <div className="text-xs text-muted-foreground">Sample mapping #{i + 1}</div>
                      <div className="text-sm font-medium">Source → Destination</div>
                      <Tone tone={i % 3 === 0 ? "warning" : "success"}>{i % 3 === 0 ? "Needs review" : "Mapped"}</Tone>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </TabsContent>
          ))}
        </Tabs>
      </PageBody>
    </>
  );
}
