import { GaContactLink } from "@/components/analytics/ga-contact-link";
import type { GaLinkLocation } from "@/lib/analytics/ga";
import { contactSmsHref, contactTelHref } from "@/lib/site";

const focusClass =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current";

function CallTextLinks({
  location,
  callClass,
  textClass,
}: {
  location: GaLinkLocation;
  callClass: string;
  textClass: string;
}) {
  const telHref = contactTelHref();
  const smsHref = contactSmsHref();
  return (
    <>
      {telHref ? (
        <GaContactLink
          href={telHref}
          event="click_to_call"
          linkLocation={location}
          aria-label="Call Joe"
          className={`${callClass} ${focusClass}`}
        >
          Call
        </GaContactLink>
      ) : null}
      {smsHref ? (
        <GaContactLink
          href={smsHref}
          event="click_to_text"
          linkLocation={location}
          aria-label="Text Joe"
          className={`${textClass} ${focusClass}`}
        >
          Text
        </GaContactLink>
      ) : null}
    </>
  );
}

/** Call, text, and a jump to the existing inquiry form. Not a saved lead. */
export function ListingContactActions() {
  return (
    <>
      <div className="hidden gap-2 sm:flex sm:flex-row sm:flex-wrap">
        <CallTextLinks
          location="listing"
          callClass="joe-btn-secondary inline-flex h-12 items-center justify-center px-5"
          textClass="joe-btn-primary inline-flex h-12 items-center justify-center px-5"
        />
        <a
          href="#ask-about-this-bike"
          className={`joe-btn-secondary inline-flex h-12 items-center justify-center px-5 text-center ${focusClass}`}
        >
          Ask about this bike
        </a>
      </div>
      <nav
        aria-label="Contact Joe about this bike"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-chrome/20 bg-asphalt/95 px-3 pt-2 backdrop-blur-md sm:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-5xl gap-2">
          <CallTextLinks
            location="listing"
            callClass="joe-btn-secondary inline-flex h-12 min-w-0 flex-1 items-center justify-center px-2"
            textClass="joe-btn-primary inline-flex h-12 min-w-0 flex-1 items-center justify-center px-2"
          />
          <a
            href="#ask-about-this-bike"
            className={`joe-btn-secondary inline-flex h-auto min-h-12 min-w-0 flex-[1.35] items-center justify-center whitespace-normal px-2 py-2 text-center text-[0.72rem] leading-tight ${focusClass}`}
          >
            Ask about this bike
          </a>
        </div>
      </nav>
    </>
  );
}

/** Compact call/text row for the inventory index. Hidden when neither link is configured. */
export function InventoryQuickContact() {
  const telHref = contactTelHref();
  const smsHref = contactSmsHref();
  if (!telHref && !smsHref) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <p className="font-label text-steel">Talk to Joe</p>
      <CallTextLinks
        location="inventory"
        callClass="joe-btn-secondary inline-flex h-10 items-center justify-center px-4"
        textClass="joe-btn-primary inline-flex h-10 items-center justify-center px-4"
      />
    </div>
  );
}
