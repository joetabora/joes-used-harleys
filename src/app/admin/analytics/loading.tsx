import { EmptyState, JosSectionHeader } from "@/components/joeos/ui";

export default function AdminAnalyticsLoading() {
  return (
    <div className="jos-stack-section">
      <JosSectionHeader section="Analytics" title="Site activity" />
      <EmptyState label="Loading">Reading saved activity. This does not change inventory.</EmptyState>
    </div>
  );
}
