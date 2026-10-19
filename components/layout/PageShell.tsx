import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="flex-1 overflow-x-clip bg-white">{children}</main>
      <SiteFooter />
    </>
  );
}
