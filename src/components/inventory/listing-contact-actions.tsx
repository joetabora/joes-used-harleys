import { GaContactLink } from "@/components/analytics/ga-contact-link";
import { contactSmsHref, contactTelHref } from "@/lib/site";

/** Call, text, and a jump to the existing inquiry form. Not a saved lead. */
export function ListingContactActions() {
  const telHref = contactTelHref();
  const smsHref = contactSmsHref();

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      {telHref ? (
        <GaContactLink
          href={telHref}
          event="click_to_call"
          linkLocation="listing"
          className="joe-btn-secondary inline-flex h-12 items-center justify-center px-5"
        >
          Call
        </GaContactLink>
      ) : null}
      {smsHref ? (
        <GaContactLink
          href={smsHref}
          event="click_to_text"
          linkLocation="listing"
          className="joe-btn-primary inline-flex h-12 items-center justify-center px-5"
        >
          Text
        </GaContactLink>
      ) : null}
      <a
        href="#ask-about-this-bike"
        className="joe-btn-secondary inline-flex h-12 items-center justify-center px-5 text-center"
      >
        Ask about this bike
      </a>
    </div>
  );
}
