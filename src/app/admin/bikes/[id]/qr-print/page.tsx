"use client";

import { use, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SheetInner({ bikeId }: { bikeId: string }) {
  const sp = useSearchParams();
  const assoc = sp.get("assoc");
  const qs = new URLSearchParams({ print: "1" });
  if (assoc) qs.set("assoc", assoc);
  const src = `/api/admin/bikes/${bikeId}/qr?${qs.toString()}`;

  return (
    <div className="mx-auto max-w-md p-8 text-center print:p-4">
      <h1 className="mb-2 text-lg font-bold tracking-wide uppercase">Vehicle QR</h1>
      <p className="mb-6 text-sm text-neutral-600">Scan for vehicle information</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="ScanBike QR code" className="mx-auto h-64 w-64" />
      <p className="mt-6 text-xs text-neutral-500">
        No branding — permanent VIN URL when available
      </p>
      <button
        type="button"
        className="mt-6 rounded border px-4 py-2 print:hidden"
        onClick={() => window.print()}
      >
        Print
      </button>
    </div>
  );
}

function QrPrintSheetLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <Suspense fallback={<p className="p-8">Loading…</p>}>
      <SheetInner bikeId={id} />
    </Suspense>
  );
}

export default function QrPrintSheetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <QrPrintSheetLoader params={params} />;
}
