import type { VehiclePageViewModel } from "@/lib/vehicle/compose-vehicle-page";
import { formatVehiclePrice } from "@/lib/vehicle/compose-vehicle-page";
import { VehicleAnalytics } from "./vehicle-analytics";
import { VehicleEngagementTools } from "./vehicle-engagement-tools";
import { VehicleGallery } from "./vehicle-gallery";
import { VehicleLeadForm } from "./vehicle-lead-form";
import { VehicleShareButton } from "./vehicle-share-button";
import { VehicleVideo } from "./vehicle-video";

type Props = {
  view: VehiclePageViewModel;
  assoc?: string | null;
  /** Optional feed-owned video URL (not Joe personal walkaround). */
  videoUrl?: string | null;
};

export function VehiclePage({ view, assoc, videoUrl }: Props) {
  const price = formatVehiclePrice(view.price);

  return (
    <article>
      <VehicleAnalytics bikeId={view.bikeId} path={view.canonicalPath ?? "/v"} />
      {view.soldBanner ? <div className="sb-sold-banner">Sold — archive listing</div> : null}
      <VehicleGallery images={view.gallery} title={view.title} initial={view.heroImage} />

      <div className="sb-body">
        <h1 className="sb-title">{view.title}</h1>
        {price ? <p className="sb-price">{price}</p> : null}
        <p className="sb-meta">
          {[
            view.mileage != null ? `${view.mileage.toLocaleString("en-US")} mi` : null,
            view.color,
            view.stockNumber ? `Stock ${view.stockNumber}` : null,
            view.locationLine,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>

        {!view.soldBanner ? (
          <div className="sb-cta-row">
            <VehicleLeadForm
              bikeId={view.bikeId}
              vin={view.vin}
              stockNumber={view.stockNumber}
              title={view.title}
              kind="test_ride"
              assoc={assoc}
            />
            <VehicleLeadForm
              bikeId={view.bikeId}
              vin={view.vin}
              stockNumber={view.stockNumber}
              title={view.title}
              kind="ask_associate"
              assoc={assoc}
            />
            {view.canonicalUrl ? (
              <VehicleShareButton url={view.canonicalUrl} title={view.title} />
            ) : null}
          </div>
        ) : null}

        <section className="sb-section">
          <h2>Specs</h2>
          <dl className="sb-specs">
            {view.specs.map((s) => (
              <div className="sb-spec" key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {view.description ? (
          <section className="sb-section">
            <h2>Description</h2>
            <p className="sb-desc">{view.description}</p>
          </section>
        ) : null}

        {videoUrl ? (
          <section className="sb-section">
            <h2>Video</h2>
            <VehicleVideo bikeId={view.bikeId} src={videoUrl} />
          </section>
        ) : null}

        {!view.soldBanner ? (
          <VehicleEngagementTools bikeId={view.bikeId} title={view.title} />
        ) : null}
      </div>
    </article>
  );
}
