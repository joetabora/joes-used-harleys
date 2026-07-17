"use client";

import { useMemo, useState, useTransition } from "react";
import { askBuyingAssistant } from "@/actions/assistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type ChatItem = { role: "user" | "assistant"; content: string };

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}`;
}

export function AssistantChat() {
  const sessionId = useMemo(() => createSessionId(), []);
  const [pending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const [items, setItems] = useState<ChatItem[]>([
    {
      role: "assistant",
      content:
        "Ask about model differences, buying tips, or what to look for on a used Harley. I only answer from our guides and live inventory — I will not invent bikes or prices.",
    },
  ]);

  function send() {
    const message = input.trim();
    if (!message) return;
    setInput("");
    setItems((prev) => [...prev, { role: "user", content: message }]);
    startTransition(async () => {
      const result = await askBuyingAssistant({ message, sessionId });
      setItems((prev) => [
        ...prev,
        { role: "assistant", content: result.reply },
      ]);
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Harley buying assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-[420px] space-y-3 overflow-y-auto rounded-lg border bg-muted/30 p-4">
          {items.map((item, index) => (
            <div
              key={`${item.role}-${index}`}
              className={
                item.role === "user"
                  ? "ml-8 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                  : "mr-8 rounded-lg bg-background px-3 py-2 text-sm shadow-sm"
              }
            >
              {item.content}
            </div>
          ))}
        </div>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. What's the difference between a Road Glide and Street Glide?"
          rows={3}
        />
        <Button onClick={send} disabled={pending || !input.trim()}>
          {pending ? "Thinking…" : "Ask"}
        </Button>
      </CardContent>
    </Card>
  );
}
