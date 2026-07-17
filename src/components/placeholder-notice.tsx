export function PlaceholderNotice({
  title = "Placeholder",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="joe-clipboard text-sm leading-[1.65] text-ink/75">
      <p className="font-label text-lamp">{title}</p>
      <div className="mt-2">{children}</div>
    </aside>
  );
}
