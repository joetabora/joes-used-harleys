import { AssistantChat } from "@/components/assistant-chat";
import { PlaceholderNotice } from "@/components/placeholder-notice";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Harley buying assistant",
  description:
    "AI assistant grounded in Joe's guides and live inventory. Disabled until an LLM API key is configured.",
  path: "/assistant",
});

export default function AssistantPage() {
  const configured = Boolean(
    process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes("PLACEHOLDER"),
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Buying assistant</h1>
        <p className="text-muted-foreground">
          Phase 4 feature. Answers must come from our guides and live inventory only — never
          invented bikes, prices, or reviews.
        </p>
      </div>
      {!configured ? (
        <PlaceholderNotice title="LLM not configured (expected on $0 budget)">
          Set OPENAI_API_KEY to enable live answers. Until then the chat returns an explicit
          placeholder response and does not call any model.
        </PlaceholderNotice>
      ) : null}
      <AssistantChat />
    </div>
  );
}
