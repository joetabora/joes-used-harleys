/**
 * Env-driven dealer NAP/theme for ScanBike shell (Phase 4 extractability).
 * Defaults stay dealership-neutral; never hard-codes Joe branding.
 */
export type ScanBikeDealerTheme = {
  dealerName: string;
  phone: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  accentColor: string;
  siteUrl: string | null;
};

export function getScanBikeDealerTheme(): ScanBikeDealerTheme {
  return {
    dealerName: process.env.NEXT_PUBLIC_SCANBIKE_DEALER_NAME?.trim() || "Vehicle Info",
    phone: process.env.NEXT_PUBLIC_SCANBIKE_DEALER_PHONE?.trim() || null,
    email: process.env.NEXT_PUBLIC_SCANBIKE_DEALER_EMAIL?.trim() || null,
    city: process.env.NEXT_PUBLIC_SCANBIKE_DEALER_CITY?.trim() || null,
    state: process.env.NEXT_PUBLIC_SCANBIKE_DEALER_STATE?.trim() || null,
    accentColor: process.env.NEXT_PUBLIC_SCANBIKE_ACCENT?.trim() || "#1a5f4a",
    siteUrl: process.env.NEXT_PUBLIC_SCANBIKE_URL?.trim() || null,
  };
}
