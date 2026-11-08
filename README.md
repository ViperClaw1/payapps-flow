# PayApps Flow

A clickable desktop web app prototype for LV Construction's "Mission Control" Pay Applications workflow automation, based on the project PRD.

## Goal

PayApps Flow prototypes an internal operations dashboard that centralizes the monthly Pay Applications workflow:

1. Vendor invoice and email intake
2. Compliance review
3. PM approval
4. Accounting and Yardi readiness
5. Draw package generation
6. Executive approval
7. Owner submission
8. Final Box filing

The prototype is meant to feel complete, clickable, and client-demo-ready. It does not implement real backend integrations.

## V1 scope

- This is an internal tool only.
- There is no subcontractor or vendor portal.
- Vendors submit invoices, lien releases, COIs, and compliance documents by email.
- Internal users manage everything from one shared PayApps dashboard.
- Owner and lender access is not a full portal. Owner submission and review status are tracked internally.

## User types

- Coordinator / Internal Operations User
- Project Manager
- Controller / Accounting User
- Executive Approver / Grady
- Owner / Lender (external recipient, tracked internally)

## Screens

Screens 2–12 are the main navigation items, shown in a left sidebar.

| # | Screen | What it shows |
| --- | --- | --- |
| 1 | Login | Entry point to the app |
| 2 | Dashboard | Shared PayApps project and month status overview |
| 3 | Project Workspace | Project/month tabs for vendors, invoices, compliance, PM review, Yardi, draw docs, and audit trail |
| 4 | Vendor Status Board | Vendors by workflow status |
| 5 | Email Intake | Outlook emails, attachments, AI matching, and filing status |
| 6 | Document Center | Box-linked invoices, lien releases, COIs, draw docs, signed docs, and owner packages |
| 7 | Exception Queue | Blocked or low-confidence items with recommended actions |
| 8 | PM Review | Queue for % complete approval, adjustment, or flagging |
| 9 | Accounting / Yardi | Approved invoices, cost codes, sync status, and errors |
| 10 | Draw Review | Generated draw docs, audit results, and Grady approval |
| 11 | Owner Package | Final package assembly, email draft, submission status, and revision tracking |
| 12 | Settings / Data Readiness | Projects, vendors, contracts, SOVs, cost codes, Box mappings, Yardi mappings, and missing setup blockers |

## Prototype interactions

- Click from the Dashboard into a project workspace
- Open vendor drawers and cards
- Review and resolve exceptions
- Approve or flag PM review items
- View generated draw docs
- Approve or reject the final draw package
- Preview AI-drafted vendor correction emails and owner submission emails
- Track statuses across the full workflow

## AI and automation

These capabilities are represented visually and are not fully built:

- Invoice OCR extraction
- Attachment classification
- Vendor, project, and month matching
- Cost code suggestions with confidence scores
- Compliance document reading
- Anomaly detection
- Draw audit summaries
- Executive approval summary
- Owner email draft support

## Sample workflow statuses

Not Received, Reminder Sent, Email Received, Invoice Extracted, Contract Blocked, Compliance Blocked, PM Review Pending, PM Approved, Ready for Accounting, Ready for Yardi, Yardi Synced, Included in Draw, Ready for Grady Approval, Submitted to Owner, Approved, Revision Required.

## Design

- Modern enterprise SaaS with a construction operations and finance workflow feel
- Desktop-first, light theme, left sidebar navigation
- Clean tables, workflow cards, status chips, filters, modals, drawers, timelines, and document preview panels
- Realistic sample data for projects, vendors, invoices, compliance items, Yardi statuses, and owner packages

## Development

You need Node.js and npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
