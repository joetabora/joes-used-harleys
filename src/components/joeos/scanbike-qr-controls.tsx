"use client";

import { useState } from "react";

type Props = {
  bikeId: string;
  hasIdentity: boolean;
  scanVisibility?: string | null;
  canonicalHint?: string | null;
};

/**
 * JoeOS-only QR controls. Does not import ScanBike UI components —
 * only hits the admin QR API which uses lib/vehicle URL helpers.
 */
export function ScanBikeQrControls({
  bikeId,
  hasIdentity,
  scanVisibility,
  canonicalHint,
}: Props) {
  const [assoc, setAssoc] = useState("");

  if (!hasIdentity) {
    return (
      <p className="jos-data text-[var(--jos-warn)]">
        No VIN or stock — ScanBike QR unavailable.
      </p>
    );
  }

  const qs = new URLSearchParams();
  if (assoc.trim()) qs.set("assoc", assoc.trim());
  const q = qs.toString();
  const downloadHref = `/api/admin/bikes/${bikeId}/qr${q ? `?${q}` : ""}`;
  const printHref = `/admin/bikes/${bikeId}/qr-print${q ? `?${q}` : ""}`;

  return (
    <div className="jos-stack-dense">
      <p className="jos-section">ScanBike QR</p>
      {scanVisibility ? <p className="jos-data">Visibility: {scanVisibility}</p> : null}
      {canonicalHint ? <p className="jos-data break-all">{canonicalHint}</p> : null}
      <label className="jos-data block">
        Associate token (opaque, optional)
        <input
          className="mt-1 w-full rounded border border-[var(--jos-line)] bg-transparent px-2 py-1"
          value={assoc}
          onChange={(e) => setAssoc(e.target.value)}
          placeholder="e.g. desk-3"
          maxLength={64}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <a className="jos-btn jos-btn-primary" href={downloadHref}>
          Download QR
        </a>
        <a className="jos-btn jos-btn-ghost" href={printHref} target="_blank" rel="noreferrer">
          Print sheet
        </a>
      </div>
    </div>
  );
}
