import "./vehicle.css";
import { getScanBikeDealerTheme } from "@/lib/vehicle/dealer-theme";

export default function ScanBikeLayout({ children }: { children: React.ReactNode }) {
  const theme = getScanBikeDealerTheme();

  return (
    <div
      className="sb-root"
      style={{ ["--sb-accent" as string]: theme.accentColor }}
      data-product="scanbike"
    >
      <header className="sb-shell-header">
        <span className="sb-shell-brand">{theme.dealerName}</span>
      </header>
      <main className="sb-shell-main">{children}</main>
      <footer className="sb-shell-footer">
        <p className="sb-shell-footer-line">Vehicle information</p>
        {(theme.phone || theme.city) && (
          <p className="sb-shell-footer-meta">
            {[theme.city, theme.state].filter(Boolean).join(", ")}
            {theme.phone ? ` · ${theme.phone}` : ""}
          </p>
        )}
      </footer>
    </div>
  );
}
