"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateLeadStatus } from "@/actions/admin";
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
      <button
        type="button"
        className="jos-btn jos-btn-ghost"
        disabled={pending}
        onClick={() => setStatus("NEW")}
      >
        New
      </button>
      <button
        type="button"
        className="jos-btn jos-btn-ghost"
        disabled={pending}
        onClick={() => setStatus("CONTACTED")}
      >
        Contacted
      </button>
      <button
        type="button"
        className="jos-btn jos-btn-ghost"
        disabled={pending}
        onClick={() => setStatus("CLOSED")}
      >
        Closed
      </button>
    </div>
  );
}
