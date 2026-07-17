import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { bikeLabel, formatMiles, formatPrice } from "@/lib/format";

export type BikeCardData = {
  id: string;
  year: number;
  make: string;
  model: string;
  mileage: number | null;
  price: number | null;
  status: string;
  photoUrl?: string | null;
};

export function BikeCard({ bike }: { bike: BikeCardData }) {
  const label = bikeLabel(bike);
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] bg-muted">
        {bike.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={bike.photoUrl} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No photo yet
          </div>
        )}
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">{bike.status.toLowerCase()}</Badge>
          <span className="text-sm text-muted-foreground">{bike.year}</span>
        </div>
        <CardTitle className="text-lg">
          <Link href={`/inventory/${bike.id}`} className="hover:underline">
            {label}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {formatMiles(bike.mileage)}
      </CardContent>
      <CardFooter className="font-semibold">{formatPrice(bike.price)}</CardFooter>
    </Card>
  );
}
