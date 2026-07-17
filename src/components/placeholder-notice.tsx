import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function PlaceholderNotice({
  title = "Placeholder",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Alert className="border-dashed">
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
