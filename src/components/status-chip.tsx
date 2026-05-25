import { cn } from "@/lib/utils";
import { STATUS_TONE, type Status } from "@/lib/sample-data";

const toneClasses = {
  neutral: "bg-muted text-muted-foreground border-border",
  info: "bg-info/10 text-info border-info/30",
  warning: "bg-warning/15 text-warning-foreground border-warning/40",
  danger: "bg-destructive/10 text-destructive border-destructive/30",
  success: "bg-success/10 text-success border-success/30",
  primary: "bg-primary/10 text-primary border-primary/30",
} as const;

export function StatusChip({ status, className }: { status: Status; className?: string }) {
  const tone = STATUS_TONE[status] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", {
        "bg-muted-foreground": tone === "neutral",
        "bg-info": tone === "info",
        "bg-warning": tone === "warning",
        "bg-destructive": tone === "danger",
        "bg-success": tone === "success",
        "bg-primary": tone === "primary",
      })} />
      {status}
    </span>
  );
}

export function Tone({ tone, children, className }: { tone: keyof typeof toneClasses; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", toneClasses[tone], className)}>
      {children}
    </span>
  );
}
