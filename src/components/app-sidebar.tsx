import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderKanban,
  Users2,
  Mail,
  FileText,
  AlertTriangle,
  ClipboardCheck,
  Calculator,
  FileStack,
  Send,
  Settings,
  HardHat,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const workflow = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Project Workspace", url: "/projects/rivermark", icon: FolderKanban },
  { title: "Vendor Status Board", url: "/vendors", icon: Users2 },
  { title: "Email Intake", url: "/email-intake", icon: Mail },
  { title: "Document Center", url: "/documents", icon: FileText },
];

const review = [
  { title: "Exception Queue", url: "/exceptions", icon: AlertTriangle, badge: 12 },
  { title: "PM Review", url: "/pm-review", icon: ClipboardCheck, badge: 9 },
  { title: "Accounting / Yardi", url: "/accounting", icon: Calculator, badge: 4 },
  { title: "Draw Review", url: "/draw-review", icon: FileStack, badge: 2 },
  { title: "Owner Package", url: "/owner-package", icon: Send },
];

const admin = [
  { title: "Settings / Data Readiness", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string) => {
    if (url === "/") return currentPath === "/";
    if (url.startsWith("/projects/")) return currentPath.startsWith("/projects/");
    return currentPath === url;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <HardHat className="size-4" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold leading-tight text-sidebar-foreground">LV Construction</span>
            <span className="text-[11px] text-sidebar-foreground/60">Mission Control</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workflow</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workflow.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Review & Approval</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {review.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span className="flex-1">{item.title}</span>
                      {item.badge ? (
                        <span className="ml-auto rounded-full bg-sidebar-primary/20 px-1.5 py-0.5 text-[10px] font-semibold text-sidebar-primary-foreground">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {admin.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-xs font-semibold">
            SL
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium text-sidebar-foreground">Sarah Liu</span>
            <span className="text-[11px] text-sidebar-foreground/60">PayApps Coordinator</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
