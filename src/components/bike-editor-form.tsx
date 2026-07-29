"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteBike, updateJoeBikeFields } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    <div className="space-y-8">
      <aside className="rounded-lg border border-white/10 bg-muted/30 p-4 text-sm">
        <p className="font-medium">Dealership snapshot (read-only)</p>
        <p className="mt-2 text-muted-foreground">
          {bike.year} {bike.make} {bike.model}
          {bike.title ? ` — ${bike.title}` : ""}
        </p>
        <ul className="mt-3 space-y-1 text-muted-foreground">
          <li>Source: {bike.source ?? "—"}</li>
          <li>VIN: {bike.vin ?? "—"}</li>
          <li>Stock: {bike.stockNumber ?? "—"}</li>
          <li>Price: {formatPrice(bike.price ?? null)}</li>
          <li>Miles: {formatMiles(bike.mileage ?? null)}</li>
          <li>Color: {bike.color ?? "—"}</li>
          <li>Dealer photos: {bike.photos?.length ?? 0}</li>
          {bike.inventoryUrl ? (
            <li>
              <a className="underline" href={bike.inventoryUrl} target="_blank" rel="noreferrer">
                Dealership listing
              </a>
            </li>
          ) : null}
        </ul>
        {bike.description ? (
          <p className="mt-3 max-h-40 overflow-y-auto whitespace-pre-wrap text-muted-foreground">
            {bike.description}
          </p>
        ) : null}
      </aside>

      <form action={onSubmit} className="space-y-4">
        <p className="font-medium">Joe content (JoeOS — never overwritten by sync)</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="featuredRank">Featured rank (0 = off)</Label>
            <Input
              id="featuredRank"
              name="featuredRank"
              type="number"
              min={0}
              defaultValue={bike.featuredRank ?? 0}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              defaultValue={bike.status}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm"
            >
              <option value="AVAILABLE">Available</option>
              <option value="PENDING">Pending</option>
              <option value="SOLD">Sold</option>
            </select>
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <input
              id="hidden"
              name="hidden"
              type="checkbox"
              defaultChecked={bike.hidden ?? false}
              className="size-4"
            />
            <Label htmlFor="hidden">Hidden from public inventory</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="joeRating">Joe rating (1–10)</Label>
            <Input
              id="joeRating"
              name="joeRating"
              type="number"
              min={1}
              max={10}
              defaultValue={bike.joeRating ?? undefined}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="perfectFor">Perfect for</Label>
            <Input id="perfectFor" name="perfectFor" defaultValue={bike.perfectFor ?? ""} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="favoriteFeature">Favorite feature</Label>
            <Input
              id="favoriteFeature"
              name="favoriteFeature"
              defaultValue={bike.favoriteFeature ?? ""}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="idealRider">Ideal rider</Label>
            <Input id="idealRider" name="idealRider" defaultValue={bike.idealRider ?? ""} />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="thingsToMention">Things to mention</Label>
            <Textarea
              id="thingsToMention"
              name="thingsToMention"
              rows={3}
              defaultValue={bike.thingsToMention ?? ""}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="thingsToCheck">Things to check</Label>
            <Textarea
              id="thingsToCheck"
              name="thingsToCheck"
              rows={3}
              defaultValue={bike.thingsToCheck ?? ""}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="whyIDLikeIt">Why I&apos;d like it</Label>
            <Textarea
              id="whyIDLikeIt"
              name="whyIDLikeIt"
              rows={3}
              defaultValue={bike.whyIDLikeIt ?? ""}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="whoShouldSkipIt">Who should skip it</Label>
            <Textarea
              id="whoShouldSkipIt"
              name="whoShouldSkipIt"
              rows={3}
              defaultValue={bike.whoShouldSkipIt ?? ""}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="conversationStarter">Conversation starter</Label>
            <Input
              id="conversationStarter"
              name="conversationStarter"
              defaultValue={bike.conversationStarter ?? ""}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="buyingTips">Buying tips</Label>
            <Textarea
              id="buyingTips"
              name="buyingTips"
              rows={3}
              defaultValue={bike.buyingTips ?? ""}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="walkaroundVideoUrl">Walkaround video URL</Label>
            <Input
              id="walkaroundVideoUrl"
              name="walkaroundVideoUrl"
              defaultValue={bike.walkaroundVideoUrl ?? ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoHeadline">SEO headline</Label>
            <Input id="seoHeadline" name="seoHeadline" defaultValue={bike.seoHeadline ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoDescription">SEO description</Label>
            <Input
              id="seoDescription"
              name="seoDescription"
              defaultValue={bike.seoDescription ?? ""}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="personalHeroImageUrl">Personal hero image URL</Label>
            <Input
              id="personalHeroImageUrl"
              name="personalHeroImageUrl"
              defaultValue={bike.personalHeroImageUrl ?? ""}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="personalPhotos">Personal photo URLs (one per line)</Label>
            <Textarea
              id="personalPhotos"
              name="personalPhotos"
              rows={3}
              defaultValue={bike.personalPhotos?.join("\n") ?? ""}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="internalNotes">Internal notes (private)</Label>
            <Textarea
              id="internalNotes"
              name="internalNotes"
              rows={3}
              defaultValue={bike.internalNotes ?? ""}
            />
          </div>
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Joe content"}
        </Button>
        {message ? <p className="text-sm text-green-600">{message}</p> : null}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </form>
    </div>
  );
}

export function DeleteBikeButton({ id, source }: { id: string; source?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  if (source === "FEED") return null;

  return (
    <Button
      variant="destructive"
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
    </Button>
  );
}
