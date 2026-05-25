export type Status =
  | "Not Received"
  | "Reminder Sent"
  | "Email Received"
  | "Invoice Extracted"
  | "Contract Blocked"
  | "Compliance Blocked"
  | "PM Review Pending"
  | "PM Approved"
  | "Ready for Accounting"
  | "Ready for Yardi"
  | "Yardi Synced"
  | "Included in Draw"
  | "Ready for Grady Approval"
  | "Submitted to Owner"
  | "Approved"
  | "Revision Required";

export const STATUS_TONE: Record<Status, "neutral" | "info" | "warning" | "danger" | "success" | "primary"> = {
  "Not Received": "neutral",
  "Reminder Sent": "warning",
  "Email Received": "info",
  "Invoice Extracted": "info",
  "Contract Blocked": "danger",
  "Compliance Blocked": "danger",
  "PM Review Pending": "warning",
  "PM Approved": "success",
  "Ready for Accounting": "info",
  "Ready for Yardi": "info",
  "Yardi Synced": "success",
  "Included in Draw": "primary",
  "Ready for Grady Approval": "warning",
  "Submitted to Owner": "primary",
  "Approved": "success",
  "Revision Required": "danger",
};

export interface Project {
  id: string;
  name: string;
  code: string;
  owner: string;
  month: string;
  drawNumber: number;
  vendorsTotal: number;
  vendorsComplete: number;
  exceptions: number;
  drawAmount: number;
  status: "On Track" | "At Risk" | "Blocked" | "Submitted" | "Approved";
  dueDate: string;
  pm: string;
}

export const projects: Project[] = [
  {
    id: "rivermark",
    name: "Rivermark Residences",
    code: "RM-2024",
    owner: "Brookfield Capital",
    month: "Nov 2025",
    drawNumber: 14,
    vendorsTotal: 28,
    vendorsComplete: 22,
    exceptions: 3,
    drawAmount: 4_823_410,
    status: "On Track",
    dueDate: "Dec 5, 2025",
    pm: "Marcus Chen",
  },
  {
    id: "harborline",
    name: "Harborline Logistics Hub",
    code: "HLH-2023",
    owner: "Prologis Partners",
    month: "Nov 2025",
    drawNumber: 9,
    vendorsTotal: 41,
    vendorsComplete: 25,
    exceptions: 7,
    drawAmount: 8_120_000,
    status: "At Risk",
    dueDate: "Dec 3, 2025",
    pm: "Priya Anand",
  },
  {
    id: "summit-tower",
    name: "Summit Tower",
    code: "ST-2024",
    owner: "Hines Investment Group",
    month: "Nov 2025",
    drawNumber: 6,
    vendorsTotal: 19,
    vendorsComplete: 19,
    exceptions: 0,
    drawAmount: 2_410_550,
    status: "Submitted",
    dueDate: "Nov 30, 2025",
    pm: "Jordan Reyes",
  },
  {
    id: "elm-medical",
    name: "Elm Street Medical Pavilion",
    code: "ESM-2025",
    owner: "Healthpeak Properties",
    month: "Nov 2025",
    drawNumber: 3,
    vendorsTotal: 12,
    vendorsComplete: 4,
    exceptions: 5,
    drawAmount: 1_205_000,
    status: "Blocked",
    dueDate: "Dec 8, 2025",
    pm: "Marcus Chen",
  },
  {
    id: "north-loop",
    name: "North Loop Mixed-Use",
    code: "NL-2024",
    owner: "Sterling Bay",
    month: "Oct 2025",
    drawNumber: 11,
    vendorsTotal: 33,
    vendorsComplete: 33,
    exceptions: 0,
    drawAmount: 6_944_220,
    status: "Approved",
    dueDate: "Nov 5, 2025",
    pm: "Priya Anand",
  },
];

export interface Vendor {
  id: string;
  name: string;
  trade: string;
  contact: string;
  contractValue: number;
  invoiceAmount: number;
  percentComplete: number;
  status: Status;
  lastActivity: string;
  hasLienRelease: boolean;
  hasCOI: boolean;
  confidence: number;
  notes?: string;
}

export const vendors: Vendor[] = [
  { id: "v1", name: "Apex Mechanical", trade: "HVAC", contact: "billing@apexmech.com", contractValue: 1_240_000, invoiceAmount: 184_200, percentComplete: 62, status: "Yardi Synced", lastActivity: "2h ago", hasLienRelease: true, hasCOI: true, confidence: 0.98 },
  { id: "v2", name: "Crestwood Electric", trade: "Electrical", contact: "ap@crestwood.com", contractValue: 980_500, invoiceAmount: 142_300, percentComplete: 54, status: "PM Approved", lastActivity: "4h ago", hasLienRelease: true, hasCOI: true, confidence: 0.96 },
  { id: "v3", name: "Northbridge Steel", trade: "Structural", contact: "invoices@nbsteel.com", contractValue: 2_100_000, invoiceAmount: 312_000, percentComplete: 71, status: "Compliance Blocked", lastActivity: "1d ago", hasLienRelease: false, hasCOI: true, confidence: 0.72, notes: "Conditional lien release missing for current period" },
  { id: "v4", name: "Sierra Glazing", trade: "Glass & Glazing", contact: "ar@sierraglaz.com", contractValue: 640_000, invoiceAmount: 89_400, percentComplete: 41, status: "Invoice Extracted", lastActivity: "30m ago", hasLienRelease: true, hasCOI: false, confidence: 0.88 },
  { id: "v5", name: "Granite Concrete Co.", trade: "Concrete", contact: "billing@graniteco.com", contractValue: 1_820_000, invoiceAmount: 0, percentComplete: 38, status: "Reminder Sent", lastActivity: "2d ago", hasLienRelease: false, hasCOI: true, confidence: 0 },
  { id: "v6", name: "Westside Drywall", trade: "Drywall", contact: "ap@westsidedw.com", contractValue: 420_000, invoiceAmount: 64_800, percentComplete: 48, status: "PM Review Pending", lastActivity: "6h ago", hasLienRelease: true, hasCOI: true, confidence: 0.91 },
  { id: "v7", name: "Pacific Plumbing", trade: "Plumbing", contact: "billing@pacplumb.com", contractValue: 760_000, invoiceAmount: 0, percentComplete: 0, status: "Not Received", lastActivity: "—", hasLienRelease: false, hasCOI: true, confidence: 0 },
  { id: "v8", name: "Lone Star Roofing", trade: "Roofing", contact: "ar@lonestarroof.com", contractValue: 510_000, invoiceAmount: 71_200, percentComplete: 32, status: "Contract Blocked", lastActivity: "3d ago", hasLienRelease: false, hasCOI: false, confidence: 0.65, notes: "No executed contract on file for current SOV line" },
  { id: "v9", name: "Vertex Elevators", trade: "Vertical Transport", contact: "ap@vertexelev.com", contractValue: 880_000, invoiceAmount: 120_000, percentComplete: 28, status: "Ready for Yardi", lastActivity: "5h ago", hasLienRelease: true, hasCOI: true, confidence: 0.94 },
  { id: "v10", name: "Beacon Fire Protection", trade: "Fire & Life Safety", contact: "billing@beaconfp.com", contractValue: 320_000, invoiceAmount: 41_200, percentComplete: 36, status: "Email Received", lastActivity: "45m ago", hasLienRelease: false, hasCOI: true, confidence: 0.82 },
];

export interface EmailItem {
  id: string;
  from: string;
  subject: string;
  receivedAt: string;
  attachments: { name: string; type: "Invoice" | "Lien Release" | "COI" | "Other"; confidence: number }[];
  matchedVendor?: string;
  matchedProject?: string;
  status: "Filed" | "Needs Review" | "Auto-Matched" | "Reply Drafted";
  confidence: number;
}

export const emails: EmailItem[] = [
  { id: "e1", from: "billing@apexmech.com", subject: "Pay App #11 — Apex Mechanical — Rivermark", receivedAt: "Today 9:42 AM", attachments: [{ name: "ApexMech_PayApp_11.pdf", type: "Invoice", confidence: 0.98 }, { name: "LienRelease_Conditional.pdf", type: "Lien Release", confidence: 0.95 }], matchedVendor: "Apex Mechanical", matchedProject: "Rivermark Residences", status: "Auto-Matched", confidence: 0.97 },
  { id: "e2", from: "ar@sierraglaz.com", subject: "Invoice 4422 - Sierra Glazing", receivedAt: "Today 8:11 AM", attachments: [{ name: "INV-4422.pdf", type: "Invoice", confidence: 0.92 }], matchedVendor: "Sierra Glazing", matchedProject: "Rivermark Residences", status: "Needs Review", confidence: 0.74 },
  { id: "e3", from: "invoices@nbsteel.com", subject: "November Pay Application", receivedAt: "Yesterday 4:55 PM", attachments: [{ name: "NB_Steel_Nov.pdf", type: "Invoice", confidence: 0.96 }, { name: "COI_2025.pdf", type: "COI", confidence: 0.99 }], matchedVendor: "Northbridge Steel", matchedProject: "Harborline Logistics Hub", status: "Filed", confidence: 0.95 },
  { id: "e4", from: "ap@crestwood.com", subject: "Crestwood Electric - October billing", receivedAt: "Yesterday 1:22 PM", attachments: [{ name: "Crestwood_Oct.pdf", type: "Invoice", confidence: 0.91 }], matchedVendor: "Crestwood Electric", matchedProject: "Summit Tower", status: "Reply Drafted", confidence: 0.68 },
  { id: "e5", from: "ar@lonestarroof.com", subject: "Pay request — period ending 11/30", receivedAt: "2d ago", attachments: [{ name: "LSR_payreq.pdf", type: "Invoice", confidence: 0.88 }], matchedVendor: "Lone Star Roofing", matchedProject: "Elm Street Medical Pavilion", status: "Needs Review", confidence: 0.61 },
];

export interface ExceptionItem {
  id: string;
  vendor: string;
  project: string;
  type: "Missing Lien Release" | "Expired COI" | "Cost Code Mismatch" | "SOV Overrun" | "No Contract" | "OCR Low Confidence";
  severity: "High" | "Medium" | "Low";
  recommendation: string;
  detectedAt: string;
}

export const exceptions: ExceptionItem[] = [
  { id: "x1", vendor: "Northbridge Steel", project: "Harborline Logistics Hub", type: "Missing Lien Release", severity: "High", recommendation: "Draft email requesting conditional lien release for current period", detectedAt: "1h ago" },
  { id: "x2", vendor: "Sierra Glazing", project: "Rivermark Residences", type: "Expired COI", severity: "High", recommendation: "Request updated COI; current expired Oct 30", detectedAt: "3h ago" },
  { id: "x3", vendor: "Lone Star Roofing", project: "Elm Street Medical Pavilion", type: "No Contract", severity: "High", recommendation: "Block from draw; route to PM to confirm contract execution", detectedAt: "2h ago" },
  { id: "x4", vendor: "Westside Drywall", project: "Rivermark Residences", type: "Cost Code Mismatch", severity: "Medium", recommendation: "Suggested code 09-2500 (Gypsum Board) — 87% confidence", detectedAt: "4h ago" },
  { id: "x5", vendor: "Granite Concrete Co.", project: "Harborline Logistics Hub", type: "SOV Overrun", severity: "Medium", recommendation: "Line 03-3000 at 102% billed-to-date vs SOV", detectedAt: "5h ago" },
  { id: "x6", vendor: "Beacon Fire Protection", project: "Rivermark Residences", type: "OCR Low Confidence", severity: "Low", recommendation: "Confirm invoice total $41,200 — OCR confidence 71%", detectedAt: "30m ago" },
];

export interface PMReviewItem {
  id: string;
  vendor: string;
  project: string;
  trade: string;
  thisPeriod: number;
  percentComplete: number;
  aiSuggestion: number;
  delta: number;
  notes: string;
}

export const pmReviewItems: PMReviewItem[] = [
  { id: "p1", vendor: "Apex Mechanical", project: "Rivermark Residences", trade: "HVAC", thisPeriod: 184_200, percentComplete: 62, aiSuggestion: 60, delta: 2, notes: "Field walk confirms ductwork at 60%; vendor billing slightly ahead" },
  { id: "p2", vendor: "Crestwood Electric", project: "Summit Tower", trade: "Electrical", thisPeriod: 142_300, percentComplete: 54, aiSuggestion: 54, delta: 0, notes: "Matches superintendent log" },
  { id: "p3", vendor: "Westside Drywall", project: "Rivermark Residences", trade: "Drywall", thisPeriod: 64_800, percentComplete: 48, aiSuggestion: 45, delta: 3, notes: "Punch list items on Level 4 not closed" },
  { id: "p4", vendor: "Vertex Elevators", project: "Harborline Logistics Hub", trade: "Vertical Transport", thisPeriod: 120_000, percentComplete: 28, aiSuggestion: 30, delta: -2, notes: "Equipment delivered, install ahead of schedule" },
];

export interface YardiItem {
  id: string;
  vendor: string;
  project: string;
  amount: number;
  costCode: string;
  status: "Queued" | "Synced" | "Error";
  error?: string;
}

export const yardiQueue: YardiItem[] = [
  { id: "y1", vendor: "Apex Mechanical", project: "Rivermark Residences", amount: 184_200, costCode: "15-0000 HVAC", status: "Synced" },
  { id: "y2", vendor: "Crestwood Electric", project: "Summit Tower", amount: 142_300, costCode: "16-0000 Electrical", status: "Synced" },
  { id: "y3", vendor: "Vertex Elevators", project: "Harborline Logistics Hub", amount: 120_000, costCode: "14-2000 Elevators", status: "Queued" },
  { id: "y4", vendor: "Westside Drywall", project: "Rivermark Residences", amount: 64_800, costCode: "09-2500 Gypsum", status: "Error", error: "Cost code not mapped for job RM-2024" },
];

export interface DrawDoc {
  id: string;
  name: string;
  type: "G702/G703" | "Cover Letter" | "Sworn Statement" | "Lien Waivers Pack" | "Backup Invoices";
  pages: number;
  generatedAt: string;
  status: "Generated" | "Reviewed" | "Approved";
}

export const drawDocs: DrawDoc[] = [
  { id: "d1", name: "Rivermark — Draw #14 G702/G703", type: "G702/G703", pages: 14, generatedAt: "Today 10:22 AM", status: "Reviewed" },
  { id: "d2", name: "Rivermark — Draw #14 Cover Letter", type: "Cover Letter", pages: 2, generatedAt: "Today 10:22 AM", status: "Reviewed" },
  { id: "d3", name: "Rivermark — Sworn Statement", type: "Sworn Statement", pages: 3, generatedAt: "Today 10:23 AM", status: "Generated" },
  { id: "d4", name: "Rivermark — Lien Waiver Package", type: "Lien Waivers Pack", pages: 28, generatedAt: "Today 10:23 AM", status: "Generated" },
  { id: "d5", name: "Rivermark — Backup Invoices", type: "Backup Invoices", pages: 142, generatedAt: "Today 10:24 AM", status: "Generated" },
];

export interface OwnerPackage {
  id: string;
  project: string;
  draw: number;
  amount: number;
  recipient: string;
  status: "Drafting" | "Pending Grady" | "Submitted" | "Approved" | "Revision Required";
  submittedAt?: string;
}

export const ownerPackages: OwnerPackage[] = [
  { id: "o1", project: "Rivermark Residences", draw: 14, amount: 4_823_410, recipient: "draws@brookfield.com", status: "Pending Grady" },
  { id: "o2", project: "Summit Tower", draw: 6, amount: 2_410_550, recipient: "payapps@hines.com", status: "Submitted", submittedAt: "Nov 28 4:12 PM" },
  { id: "o3", project: "North Loop Mixed-Use", draw: 11, amount: 6_944_220, recipient: "draws@sterlingbay.com", status: "Approved", submittedAt: "Nov 4 2:30 PM" },
  { id: "o4", project: "Harborline Logistics Hub", draw: 8, amount: 7_215_000, recipient: "ap@prologis.com", status: "Revision Required", submittedAt: "Oct 30 11:00 AM" },
];

export interface AuditEvent {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
}

export const auditTrail: AuditEvent[] = [
  { id: "a1", at: "Today 10:24 AM", actor: "System", action: "Draw package generated", detail: "Draw #14 — 189 pages compiled" },
  { id: "a2", at: "Today 9:51 AM", actor: "Marcus Chen", action: "PM Approved", detail: "Apex Mechanical — $184,200 at 62%" },
  { id: "a3", at: "Today 9:42 AM", actor: "System", action: "Invoice extracted", detail: "Apex Mechanical Pay App #11 — 98% confidence" },
  { id: "a4", at: "Yesterday 4:55 PM", actor: "System", action: "Email auto-matched", detail: "Northbridge Steel → Harborline" },
  { id: "a5", at: "Yesterday 2:18 PM", actor: "Sarah Liu", action: "Exception resolved", detail: "Crestwood COI uploaded" },
];

export const stats = {
  draws: { active: 4, atRisk: 2, submitted: 1, approved: 1 },
  vendorsBilling: 133,
  awaitingInvoice: 18,
  inException: 12,
  pendingPM: 9,
  pendingGrady: 2,
  totalDrawValue: 23_503_180,
};
