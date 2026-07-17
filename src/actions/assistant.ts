"use server";

import { getAssistantKnowledgeBase } from "@/lib/guides";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { chatMessageSchema } from "@/lib/validators";

export type ChatResult = {
  ok: boolean;
  reply: string;
};

function isAiConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY;
  return Boolean(key && !key.includes("PLACEHOLDER"));
}

/** Lightweight Q&A over guides + live bikes. No conversation persistence. */
export async function askBuyingAssistant(raw: unknown): Promise<ChatResult> {
  const parsed = chatMessageSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, reply: "Please type a short question." };
  }

  const { message } = parsed.data;

  if (!isAiConfigured()) {
    return {
      ok: true,
      reply:
        "[PLACEHOLDER — AI not configured] The buying assistant needs an OPENAI_API_KEY. Until then, browse the Guides or contact Joe directly.",
    };
  }

  const knowledge = getAssistantKnowledgeBase();
  let inventorySummary = "No live inventory connected.";

  if (isDatabaseConfigured() && prisma) {
    const bikes = await prisma.bike.findMany({
      where: { status: "AVAILABLE" },
      select: {
        id: true,
        year: true,
        make: true,
        model: true,
        price: true,
        mileage: true,
      },
      take: 25,
      orderBy: { createdAt: "desc" },
    });
    inventorySummary =
      bikes.length === 0
        ? "Inventory is empty right now."
        : bikes
            .map(
              (b) =>
                `${b.year} ${b.make} ${b.model}${b.price != null ? ` — $${b.price}` : ""} (/inventory/${b.id})`,
            )
            .join("\n");
  }

  const system = `You are Joe's Harley buying assistant for joesusedharleys.com.
Rules:
- Only use the knowledge base and inventory list provided.
- Never invent bikes, prices, reviews, dealership names, or availability.
- If you don't know, say so and offer to connect the buyer with Joe.
- Keep answers concise and practical.

KNOWLEDGE BASE:
${knowledge}

LIVE INVENTORY:
${inventorySummary}`;

  const model = process.env.AI_MODEL || "gpt-4o-mini";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      messages: [
        { role: "system", content: system },
        { role: "user", content: message },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return {
      ok: false,
      reply: `Assistant request failed (${response.status}). ${text.slice(0, 200)}`,
    };
  }

  const json = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const reply =
    json.choices?.[0]?.message?.content?.trim() ||
    "I couldn't generate a reply. Contact Joe and he'll help.";

  return { ok: true, reply };
}
