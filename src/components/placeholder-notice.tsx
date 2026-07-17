export function PlaceholderNotice({
  title = "Placeholder",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="joe-clipboard text-sm leading-[1.65] text-ink/80">
      <p className="font-label text-leather">{title}</p>
      <div className="mt-2">{children}</div>
    </aside>
  );
}
