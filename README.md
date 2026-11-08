# PayApps Flow

Create a clickable desktop web app prototype for the attached PRD.

Project: LV Construction “Mission Control” Pay Applications Workflow Automation.

Goal:

Prototype an internal operations dashboard that centralizes the monthly Pay Applications workflow from vendor invoice/email intake through compliance review, PM approval, accounting/Yardi readiness, draw package generation, executive approval, owner submission, and final Box filing.

Important scope rules:

- This is an internal tool only for V1.

- Do not create a subcontractor/vendor portal.

- Vendors submit invoices, lien releases, COIs, and compliance docs by email.

- Internal users manage everything from one shared PayApps dashboard.

- Owner/lender access is not a full portal; owner submission and review status are tracked internally.

User types:

- Coordinator / Internal Operations User

- Project Manager

- Controller / Accounting User

- Executive Approver / Grady

- Owner / Lender as external recipient, tracked internally

Design style:

- Modern enterprise SaaS

- Construction operations + finance workflow feel

- Desktop-first

- Light theme

- Left sidebar navigation

- Clean tables, workflow cards, status chips, filters, modals, drawers, timelines, and document preview panels

- Use realistic sample data for projects, vendors, invoices, compliance items, Yardi statuses, and owner packages

Main navigation:

- Dashboard

- Project Workspace

- Vendor Status Board

- Email Intake

- Document Center

- Exception Queue

- PM Review

- Accounting / Yardi

- Draw Review

- Owner Package

- Settings / Data Readiness

Key screens to create:

1. Login

2. Shared PayApps Dashboard with project/month status overview

3. Project / Month Workspace with tabs for vendors, invoices, compliance, PM review, Yardi, draw docs, and audit trail

4. Vendor Status Board with workflow statuses

5. Email Intake page showing Outlook emails, attachments, AI matching, and filing status

6. Document Center showing Box-linked invoices, lien releases, COIs, draw docs, signed docs, and owner packages

7. Exception Queue showing blocked or low-confidence items with recommended actions

8. PM Review Queue for % complete approval, adjustment, or flagging

9. Accounting / Yardi Queue for approved invoices, cost codes, sync status, and errors

10. Draw Review screen for generated draw docs, audit results, and Grady approval

11. Owner Package screen showing final package assembly, email draft, submission status, and revision tracking

12. Settings / Data Readiness screen showing projects, vendors, contracts, SOVs, cost codes, Box mappings, Yardi mappings, and missing setup blockers

Prototype interactions:

- User can click from Dashboard into a project workspace

- User can open vendor drawers/cards

- User can review and resolve exceptions

- User can approve/flag PM review items

- User can view generated draw docs

- User can approve or reject final draw package

- User can preview AI-drafted vendor correction emails and owner submission emails

- User can track statuses across the full workflow

AI/automation should be represented visually, not fully built:

- Invoice OCR extraction

- Attachment classification

- Vendor/project/month matching

- Cost code suggestions with confidence scores

- Compliance document reading

- Anomaly detection

- Draw audit summaries

- Executive approval summary

- Owner email draft support

Use sample statuses:

Not Received, Reminder Sent, Email Received, Invoice Extracted, Contract Blocked, Compliance Blocked, PM Review Pending, PM Approved, Ready for Accounting, Ready for Yardi, Yardi Synced, Included in Draw, Ready for Grady Approval, Submitted to Owner, Approved, Revision Required.

Make the prototype feel complete, clickable, and client-demo-ready, but do not implement real backend integrations.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1f9b06d2-09ec-4858-9cf4-600cc2528c1f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
