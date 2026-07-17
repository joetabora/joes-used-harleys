export function ChapterBlock({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="joe-rule grid gap-4 py-10 md:grid-cols-[5rem_1fr] md:gap-10 md:py-12">
      <p className="font-label text-steel pt-1">{number}</p>
      <div>
        <h3 className="font-story text-2xl text-ink md:text-3xl">{title}</h3>
        <div className="mt-4 max-w-xl text-[1.0625rem] leading-[1.7] text-ink/80">
          {children}
        </div>
      </div>
    </article>
  );
}
