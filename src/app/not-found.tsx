import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-16">
      <div className="space-y-3">
        <p className="font-label text-lamp">Not found</p>
        <h1 className="font-display text-3xl tracking-[0.06em] md:text-4xl">
          That page isn&apos;t here
        </h1>
        <p className="text-steel">
          The bike may have sold, the link may be outdated, or the page may have moved. Joe can
          still help you find the right used Harley.
        </p>
      </div>

      <div className="joe-panel space-y-4 p-5">
        <p className="font-label text-lamp">Where to go next</p>
        <ul className="space-y-3 text-sm">
          <li>
            <Link
              href="/inventory"
              className="text-lamp underline-offset-4 hover:underline"
            >
              Browse current used Harley inventory
            </Link>
          </li>
          <li>
            <Link
              href="/used-harleys/milwaukee"
              className="text-lamp underline-offset-4 hover:underline"
            >
              Used Harley motorcycles near Milwaukee
            </Link>
          </li>
          <li>
            <Link href="/harleys" className="text-lamp underline-offset-4 hover:underline">
              Harley model buying guides
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-lamp underline-offset-4 hover:underline">
              Contact Joe
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
