"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateLeadStatus } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import type { LeadStatus } from "@/generated/prisma/client";

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
      <Button size="sm" variant="outline" disabled={pending} onClick={() => setStatus("NEW")}>
        New
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={pending}
        onClick={() => setStatus("CONTACTED")}
      >
        Contacted
      </Button>
      <Button size="sm" variant="outline" disabled={pending} onClick={() => setStatus("CLOSED")}>
        Closed
      </Button>
    </div>
  );
}
