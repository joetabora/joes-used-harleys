"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addBikePhoto, deleteBike, upsertBike } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type BikeValues = {
  id?: string;
  title?: string;
  model?: string;
  year?: number;
  mileage?: number | null;
  price?: number | null;
  vin?: string | null;
  description?: string | null;
  status?: "AVAILABLE" | "PENDING" | "SOLD";
  slug?: string;
};

export function BikeEditorForm({ bike }: { bike?: BikeValues }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(formData: FormData) {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      try {
        const result = await upsertBike(
          {
            title: String(formData.get("title") ?? ""),
            model: String(formData.get("model") ?? ""),
            year: String(formData.get("year") ?? ""),
            mileage: String(formData.get("mileage") ?? ""),
            price: String(formData.get("price") ?? ""),
            vin: String(formData.get("vin") ?? ""),
            description: String(formData.get("description") ?? ""),
            status: String(formData.get("status") ?? "AVAILABLE"),
            slug: String(formData.get("slug") ?? ""),
          },
          bike?.id,
        );
        if (!result.ok) {
          setError(result.message);
          return;
        }
        setMessage(result.message);
        router.push("/admin/bikes");
        router.refresh();
      } catch (err) {
        if (err && typeof err === "object" && "digest" in err) throw err;
        setError("Save failed. Are you signed in?");
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required defaultValue={bike?.title} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input id="model" name="model" required defaultValue={bike?.model} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            type="number"
            required
            defaultValue={bike?.year ?? new Date().getFullYear()}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mileage">Mileage</Label>
          <Input
            id="mileage"
            name="mileage"
            type="number"
            defaultValue={bike?.mileage ?? undefined}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price (USD whole dollars)</Label>
          <Input id="price" name="price" type="number" defaultValue={bike?.price ?? undefined} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vin">VIN (optional)</Label>
          <Input id="vin" name="vin" defaultValue={bike?.vin ?? undefined} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={bike?.status ?? "AVAILABLE"}
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm"
          >
            <option value="AVAILABLE">Available</option>
            <option value="PENDING">Pending</option>
            <option value="SOLD">Sold</option>
          </select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            required
            placeholder="2021-street-glide-milwaukee"
            defaultValue={bike?.slug}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={6}
            defaultValue={bike?.description ?? undefined}
          />
        </div>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : bike?.id ? "Update bike" : "Create bike"}
      </Button>
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}

export function BikePhotoForm({ bikeId }: { bikeId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(formData: FormData) {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const result = await addBikePhoto({
        bikeId,
        url: String(formData.get("url") ?? ""),
        alt: String(formData.get("alt") ?? ""),
      });
      if (result.ok) {
        setMessage(result.message);
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="url">Photo public URL (Supabase Storage)</Label>
        <Input id="url" name="url" required placeholder="https://..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="alt">Alt text</Label>
        <Input id="alt" name="alt" />
      </div>
      <Button type="submit" disabled={pending} variant="secondary">
        {pending ? "Adding…" : "Add photo URL"}
      </Button>
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}

export function DeleteBikeButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

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
