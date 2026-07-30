"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateLeadStatus } from "@/actions/admin";
import type { LeadStatus } from "@/generated/prisma/client";
import { JosButton } from "@/components/joeos/ui";

export function LeadStatusButtons({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function setStatus(status: LeadStatus) {
    startTransition(async () => {
      await updateLeadStatus(id, status);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <JosButton variant="ghost" disabled={pending} onClick={() => setStatus("NEW")}>
        New
      </JosButton>
      <JosButton variant="ghost" disabled={pending} onClick={() => setStatus("CONTACTED")}>
        Contacted
      </JosButton>
      <JosButton variant="ghost" disabled={pending} onClick={() => setStatus("CLOSED")}>
        Closed
      </JosButton>
    </div>
  );
}
