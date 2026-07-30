import {
  CityTopicPageView,
  cityTopicMetadata,
  cityTopicStaticParams,
} from "@/lib/seo/city-topic-route";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return cityTopicStaticParams();
}

export async function generateMetadata({ params }: Props) {
  const { city } = await params;
  return cityTopicMetadata(city, "events");
}

export default async function Page({ params }: Props) {
  const { city } = await params;
  return <CityTopicPageView city={city} topic="events" />;
}
