import type { VehiclePageViewModel } from "@/lib/vehicle/compose-vehicle-page";
import { formatVehiclePrice } from "@/lib/vehicle/compose-vehicle-page";
import { VehicleAnalytics } from "./vehicle-analytics";
import { VehicleGallery } from "./vehicle-gallery";
import { VehicleShareButton } from "./vehicle-share-button";
import { VehicleVideo } from "./vehicle-video";

type Props = {
  view: VehiclePageViewModel;
  /** Opaque associate token from QR (`?assoc=`); tracked in analytics only. */
  assoc?: string | null;
  /** Optional feed-owned video URL (not Joe personal walkaround). */
  videoUrl?: string | null;
};

/** Informational window sticker — no scheduling, leads, or estimators for now. */
export function VehiclePage({ view, videoUrl }: Props) {
  const price = formatVehiclePrice(view.price);

  return (
    <article>
      <VehicleAnalytics bikeId={view.bikeId} path={view.canonicalPath ?? "/v"} />
      {view.soldBanner ? <div className="sb-sold-banner">Sold — archive listing</div> : null}

      <VehicleGallery images={view.gallery} title={view.title} initial={view.heroImage}>
        <div className="sb-body sb-body-top">
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

          {view.description ? (
            <section className="sb-section sb-description" aria-label="Vehicle description">
              <h2>Description</h2>
              <p className="sb-desc">{view.description}</p>
            </section>
          ) : (
            <section
              className="sb-section sb-description sb-description-empty"
              aria-label="Vehicle description"
            >
              <h2>Description</h2>
              <p className="sb-desc sb-desc-muted">
                No dealer description is listed for this vehicle yet.
              </p>
            </section>
          )}
        </div>
      </VehicleGallery>

      <div className="sb-body">
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

        {view.canonicalUrl && !view.soldBanner ? (
          <div className="sb-cta-row">
            <VehicleShareButton url={view.canonicalUrl} title={view.title} />
          </div>
        ) : null}

        {videoUrl ? (
          <section className="sb-section">
            <h2>Video</h2>
            <VehicleVideo bikeId={view.bikeId} src={videoUrl} />
          </section>
        ) : null}
      </div>
    </article>
  );
}
