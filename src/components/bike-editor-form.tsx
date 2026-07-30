"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteBike, updateJoeBikeFields } from "@/actions/admin";
import {
  JosButton,
  JosCheckbox,
  JosField,
  JosInput,
  JosPanel,
  JosSelect,
  JosTextarea,
} from "@/components/joeos/ui";
import { formatMiles, formatPrice } from "@/lib/format";

type BikeValues = {
  id: string;
  source?: "FEED" | "MANUAL";
  year: number;
  make: string;
  model: string;
  title?: string | null;
  mileage?: number | null;
  price?: number | null;
  description?: string | null;
  color?: string | null;
  vin?: string | null;
  stockNumber?: string | null;
  inventoryUrl?: string | null;
  photos?: string[];
  status: "AVAILABLE" | "PENDING" | "SOLD";
  hidden?: boolean;
  featuredRank?: number;
  joeRating?: number | null;
  perfectFor?: string | null;
  favoriteFeature?: string | null;
  idealRider?: string | null;
  thingsToMention?: string | null;
  thingsToCheck?: string | null;
  whyIDLikeIt?: string | null;
  whoShouldSkipIt?: string | null;
  conversationStarter?: string | null;
  walkaroundVideoUrl?: string | null;
  buyingTips?: string | null;
  seoHeadline?: string | null;
  seoDescription?: string | null;
  personalPhotos?: string[];
  personalHeroImageUrl?: string | null;
  internalNotes?: string | null;
};

export function BikeEditorForm({ bike }: { bike: BikeValues }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(formData: FormData) {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      try {
        const result = await updateJoeBikeFields(bike.id, {
          featuredRank: String(formData.get("featuredRank") ?? "0"),
          status: String(formData.get("status") ?? "AVAILABLE"),
          hidden: formData.get("hidden") ? "true" : "false",
          joeRating: String(formData.get("joeRating") ?? ""),
          perfectFor: String(formData.get("perfectFor") ?? ""),
          favoriteFeature: String(formData.get("favoriteFeature") ?? ""),
          idealRider: String(formData.get("idealRider") ?? ""),
          thingsToMention: String(formData.get("thingsToMention") ?? ""),
          thingsToCheck: String(formData.get("thingsToCheck") ?? ""),
          whyIDLikeIt: String(formData.get("whyIDLikeIt") ?? ""),
          whoShouldSkipIt: String(formData.get("whoShouldSkipIt") ?? ""),
          conversationStarter: String(formData.get("conversationStarter") ?? ""),
          walkaroundVideoUrl: String(formData.get("walkaroundVideoUrl") ?? ""),
          buyingTips: String(formData.get("buyingTips") ?? ""),
          seoHeadline: String(formData.get("seoHeadline") ?? ""),
          seoDescription: String(formData.get("seoDescription") ?? ""),
          personalPhotos: String(formData.get("personalPhotos") ?? ""),
          personalHeroImageUrl: String(formData.get("personalHeroImageUrl") ?? ""),
          internalNotes: String(formData.get("internalNotes") ?? ""),
        });
        if (!result.ok) {
          setError(result.message);
          return;
        }
        setMessage(result.message);
        router.refresh();
      } catch (err) {
        if (err && typeof err === "object" && "digest" in err) throw err;
        setError("Save failed. Are you signed in?");
      }
    });
  }

  return (
    <div className="jos-stack-section">
      <JosPanel className="jos-secondary">
        <p className="jos-label">Dealership snapshot</p>
        <p className="jos-body mt-2">
          {bike.year} {bike.make} {bike.model}
          {bike.title ? ` — ${bike.title}` : ""}
        </p>
        <ul className="mt-3 space-y-1">
          <li className="jos-data">Source: {bike.source ?? "—"}</li>
          <li className="jos-data">VIN: {bike.vin ?? "—"}</li>
          <li className="jos-data">Stock: {bike.stockNumber ?? "—"}</li>
          <li className="jos-data">Price: {formatPrice(bike.price ?? null)}</li>
          <li className="jos-data">Miles: {formatMiles(bike.mileage ?? null)}</li>
          <li className="jos-data">Color: {bike.color ?? "—"}</li>
          <li className="jos-data">Dealer photos: {bike.photos?.length ?? 0}</li>
          {bike.inventoryUrl ? (
            <li className="jos-data">
              <a className="underline" href={bike.inventoryUrl} target="_blank" rel="noreferrer">
                Dealership listing
              </a>
            </li>
          ) : null}
        </ul>
        {bike.description ? (
          <p className="jos-body mt-3 max-h-40 overflow-y-auto whitespace-pre-wrap text-sm">
            {bike.description}
          </p>
        ) : null}
      </JosPanel>

      <form action={onSubmit} className="jos-stack-dense">
        <p className="jos-section">Joe content</p>
        <p className="jos-data">Never overwritten by sync</p>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <JosField label="Featured rank (0 = off)" htmlFor="featuredRank">
            <JosInput
              id="featuredRank"
              name="featuredRank"
              type="number"
              min={0}
              defaultValue={bike.featuredRank ?? 0}
            />
          </JosField>
          <JosField label="Status" htmlFor="status">
            <JosSelect id="status" name="status" defaultValue={bike.status}>
              <option value="AVAILABLE">Available</option>
              <option value="PENDING">Pending</option>
              <option value="SOLD">Sold</option>
            </JosSelect>
          </JosField>
          <div className="sm:col-span-2">
            <JosCheckbox
              id="hidden"
              name="hidden"
              label="Hidden from public inventory"
              defaultChecked={bike.hidden ?? false}
            />
          </div>
          <JosField label="Joe rating (1–10)" htmlFor="joeRating">
            <JosInput
              id="joeRating"
              name="joeRating"
              type="number"
              min={1}
              max={10}
              defaultValue={bike.joeRating ?? undefined}
            />
          </JosField>
          <JosField label="Perfect for" htmlFor="perfectFor">
            <JosInput id="perfectFor" name="perfectFor" defaultValue={bike.perfectFor ?? ""} />
          </JosField>
          <JosField label="Favorite feature" htmlFor="favoriteFeature" className="sm:col-span-2">
            <JosInput
              id="favoriteFeature"
              name="favoriteFeature"
              defaultValue={bike.favoriteFeature ?? ""}
            />
          </JosField>
          <JosField label="Ideal rider" htmlFor="idealRider" className="sm:col-span-2">
            <JosInput id="idealRider" name="idealRider" defaultValue={bike.idealRider ?? ""} />
          </JosField>
          <JosField label="Things to mention" htmlFor="thingsToMention" className="sm:col-span-2">
            <JosTextarea
              id="thingsToMention"
              name="thingsToMention"
              rows={3}
              defaultValue={bike.thingsToMention ?? ""}
            />
          </JosField>
          <JosField label="Things to check" htmlFor="thingsToCheck" className="sm:col-span-2">
            <JosTextarea
              id="thingsToCheck"
              name="thingsToCheck"
              rows={3}
              defaultValue={bike.thingsToCheck ?? ""}
            />
          </JosField>
          <JosField label="Why I'd like it" htmlFor="whyIDLikeIt" className="sm:col-span-2">
            <JosTextarea
              id="whyIDLikeIt"
              name="whyIDLikeIt"
              rows={3}
              defaultValue={bike.whyIDLikeIt ?? ""}
            />
          </JosField>
          <JosField label="Who should skip it" htmlFor="whoShouldSkipIt" className="sm:col-span-2">
            <JosTextarea
              id="whoShouldSkipIt"
              name="whoShouldSkipIt"
              rows={3}
              defaultValue={bike.whoShouldSkipIt ?? ""}
            />
          </JosField>
          <JosField
            label="Conversation starter"
            htmlFor="conversationStarter"
            className="sm:col-span-2"
          >
            <JosInput
              id="conversationStarter"
              name="conversationStarter"
              defaultValue={bike.conversationStarter ?? ""}
            />
          </JosField>
          <JosField label="Buying tips" htmlFor="buyingTips" className="sm:col-span-2">
            <JosTextarea
              id="buyingTips"
              name="buyingTips"
              rows={3}
              defaultValue={bike.buyingTips ?? ""}
            />
          </JosField>
          <JosField
            label="Walkaround video URL"
            htmlFor="walkaroundVideoUrl"
            className="sm:col-span-2"
          >
            <JosInput
              id="walkaroundVideoUrl"
              name="walkaroundVideoUrl"
              defaultValue={bike.walkaroundVideoUrl ?? ""}
            />
          </JosField>
          <JosField label="SEO headline" htmlFor="seoHeadline">
            <JosInput id="seoHeadline" name="seoHeadline" defaultValue={bike.seoHeadline ?? ""} />
          </JosField>
          <JosField label="SEO description" htmlFor="seoDescription">
            <JosInput
              id="seoDescription"
              name="seoDescription"
              defaultValue={bike.seoDescription ?? ""}
            />
          </JosField>
          <JosField
            label="Personal hero image URL"
            htmlFor="personalHeroImageUrl"
            className="sm:col-span-2"
          >
            <JosInput
              id="personalHeroImageUrl"
              name="personalHeroImageUrl"
              defaultValue={bike.personalHeroImageUrl ?? ""}
            />
          </JosField>
          <JosField
            label="Personal photo URLs (one per line)"
            htmlFor="personalPhotos"
            className="sm:col-span-2"
          >
            <JosTextarea
              id="personalPhotos"
              name="personalPhotos"
              rows={3}
              defaultValue={bike.personalPhotos?.join("\n") ?? ""}
            />
          </JosField>
          <JosField label="Internal notes (private)" htmlFor="internalNotes" className="sm:col-span-2">
            <JosTextarea
              id="internalNotes"
              name="internalNotes"
              rows={3}
              defaultValue={bike.internalNotes ?? ""}
            />
          </JosField>
        </div>
        <JosButton type="submit" disabled={pending} className="mt-2">
          {pending ? "Saving…" : "Save Joe content"}
        </JosButton>
        {message ? <p className="jos-status-ok">{message}</p> : null}
        {error ? <p className="jos-status-err">{error}</p> : null}
      </form>
    </div>
  );
}

export function DeleteBikeButton({ id, source }: { id: string; source?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  if (source === "FEED") return null;

  return (
    <JosButton
      variant="danger"
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this bike?")) return;
        startTransition(async () => {
          await deleteBike(id);
          router.refresh();
        });
      }}
    >
      {pending ? "Deleting…" : "Delete"}
    </JosButton>
  );
}
