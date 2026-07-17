"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteBike, upsertBike } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type BikeValues = {
  id?: string;
  year?: number;
  make?: string;
  model?: string;
  mileage?: number | null;
  price?: number | null;
  description?: string | null;
  status?: "AVAILABLE" | "PENDING" | "SOLD";
  photos?: string[];
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
            year: String(formData.get("year") ?? ""),
            make: String(formData.get("make") ?? ""),
            model: String(formData.get("model") ?? ""),
            mileage: String(formData.get("mileage") ?? ""),
            price: String(formData.get("price") ?? ""),
            description: String(formData.get("description") ?? ""),
            status: String(formData.get("status") ?? "AVAILABLE"),
            photos: String(formData.get("photos") ?? ""),
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
          <Label htmlFor="make">Make</Label>
          <Input id="make" name="make" required defaultValue={bike?.make ?? "Harley-Davidson"} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Input id="model" name="model" required defaultValue={bike?.model} />
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
          <Label htmlFor="price">Price (USD)</Label>
          <Input id="price" name="price" type="number" defaultValue={bike?.price ?? undefined} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            defaultValue={bike?.description ?? undefined}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="photos">Photo URLs (one per line)</Label>
          <Textarea
            id="photos"
            name="photos"
            rows={4}
            placeholder="https://..."
            defaultValue={bike?.photos?.join("\n") ?? ""}
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
