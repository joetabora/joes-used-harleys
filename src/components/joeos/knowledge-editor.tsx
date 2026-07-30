"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  addKnowledgeRelation,
  assistKnowledgeSection,
  removeKnowledgeRelation,
  saveKnowledgeEntity,
  setKnowledgeStatus,
} from "@/actions/knowledge";
import { JosButton } from "@/components/joeos/ui/jos-button";
import type { KnowledgeEntityType, KnowledgeRelationKind, KnowledgeStatus } from "@/generated/prisma/client";

type NeighborRow = {
  id: string;
  kind: KnowledgeRelationKind;
  label: string | null;
  direction: "out" | "in";
  title: string;
  type: KnowledgeEntityType;
  slug: string;
  status: KnowledgeStatus;
};

type RevisionRow = {
  id: string;
  createdAt: string;
  note: string | null;
  snapshot: unknown;
};

export function KnowledgeEditor({
  entity,
  neighbors,
  revisions,
  publishGate,
  suggestedLinks,
  seoScore,
}: {
  entity: {
    id: string;
    type: KnowledgeEntityType;
    slug: string;
    title: string;
    summary: string;
    status: KnowledgeStatus;
    seoTitle: string | null;
    seoDescription: string | null;
    factsJson: string;
  };
  neighbors: NeighborRow[];
  revisions: RevisionRow[];
  publishGate: { ok: boolean; reasons: string[]; score: number };
  suggestedLinks: { href: string; title: string }[];
  seoScore: number;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [title, setTitle] = useState(entity.title);
  const [summary, setSummary] = useState(entity.summary);
  const [factsJson, setFactsJson] = useState(entity.factsJson);
  const [seoTitle, setSeoTitle] = useState(entity.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(entity.seoDescription ?? "");
  const [message, setMessage] = useState("");
  const [assistPath, setAssistPath] = useState("body");
  const [assistOut, setAssistOut] = useState("");
  const [toType, setToType] = useState<KnowledgeEntityType>("MODEL");
  const [toSlug, setToSlug] = useState("");
  const [kind, setKind] = useState<KnowledgeRelationKind>("RELATED_TO");

  function run(fn: () => Promise<{ ok: boolean; message: string }>) {
    start(async () => {
      const res = await fn();
      setMessage(res.message);
      router.refresh();
    });
  }

  return (
    <div className="jos-stack-screen">
      <div className="flex flex-wrap gap-2">
        <JosButton
          type="button"
          disabled={pending}
          onClick={() =>
            run(() =>
              saveKnowledgeEntity(entity.id, {
                title,
                summary,
                factsJson,
                seoTitle,
                seoDescription,
                note: "Editor save",
              }),
            )
          }
        >
          Save draft
        </JosButton>
        <JosButton
          type="button"
          disabled={pending}
          onClick={() => run(() => setKnowledgeStatus(entity.id, "IN_REVIEW", "Submit review"))}
        >
          Submit review
        </JosButton>
        <JosButton
          type="button"
          disabled={pending || !publishGate.ok}
          onClick={() => run(() => setKnowledgeStatus(entity.id, "PUBLISHED", "Publish"))}
        >
          Publish
        </JosButton>
        <JosButton
          type="button"
          disabled={pending}
          onClick={() => run(() => setKnowledgeStatus(entity.id, "DRAFT", "Unpublish"))}
        >
          Unpublish
        </JosButton>
      </div>

      {message ? <p className="jos-data">{message}</p> : null}

      <div className="jos-panel jos-pad-hero jos-stack-dense">
        <p className="jos-label">
          {entity.type} · {entity.slug} · {entity.status}
        </p>
        <p className="jos-data">
          SEO preview score {seoScore} · publish gate {publishGate.ok ? "OK" : "BLOCKED"} (
          {publishGate.score})
        </p>
        {!publishGate.ok ? (
          <ul className="list-disc pl-5 text-sm text-steel">
            {publishGate.reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <label className="jos-stack-dense">
        <span className="jos-label">Title</span>
        <input className="jos-field w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="jos-stack-dense">
        <span className="jos-label">Summary</span>
        <textarea
          className="jos-field min-h-[5rem] w-full"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </label>
      <label className="jos-stack-dense">
        <span className="jos-label">SEO title override</span>
        <input className="jos-field w-full" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
      </label>
      <label className="jos-stack-dense">
        <span className="jos-label">SEO description override</span>
        <textarea
          className="jos-field min-h-[3rem] w-full"
          value={seoDescription}
          onChange={(e) => setSeoDescription(e.target.value)}
        />
      </label>
      <label className="jos-stack-dense">
        <span className="jos-label">Facts (JSON)</span>
        <textarea
          className="jos-field min-h-[18rem] w-full font-mono text-xs"
          value={factsJson}
          onChange={(e) => setFactsJson(e.target.value)}
        />
      </label>

      <div className="jos-panel jos-pad-hero jos-stack-dense">
        <p className="jos-section">AI section assist</p>
        <p className="jos-data text-sm">
          Rewrites a facts path only (e.g. body, sections.0.body). Never invents facts — paste after review.
        </p>
        <div className="flex flex-wrap gap-2">
          <input
            className="jos-field"
            value={assistPath}
            onChange={(e) => setAssistPath(e.target.value)}
            placeholder="body"
          />
          <JosButton
            type="button"
            disabled={pending}
            onClick={() =>
              start(async () => {
                const res = await assistKnowledgeSection(entity.id, assistPath);
                setMessage(res.message);
                if (res.rewrite) setAssistOut(res.rewrite);
              })
            }
          >
            Rewrite section
          </JosButton>
        </div>
        {assistOut ? (
          <textarea className="jos-field min-h-[8rem] w-full font-mono text-xs" readOnly value={assistOut} />
        ) : null}
      </div>

      <div className="jos-panel jos-pad-hero jos-stack-dense">
        <p className="jos-section">Relations</p>
        <ul className="space-y-2 text-sm">
          {neighbors.map((n) => (
            <li key={n.id} className="flex flex-wrap items-center justify-between gap-2">
              <span>
                {n.direction === "out" ? "→" : "←"} {n.kind} {n.type}/{n.slug} ({n.status})
              </span>
              {n.direction === "out" ? (
                <JosButton
                  type="button"
                  disabled={pending}
                  onClick={() => run(() => removeKnowledgeRelation(n.id, entity.id))}
                >
                  Remove
                </JosButton>
              ) : null}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          <select
            className="jos-field"
            value={kind}
            onChange={(e) => setKind(e.target.value as KnowledgeRelationKind)}
          >
            {(
              [
                "RELATED_TO",
                "IN_FAMILY",
                "USES_ENGINE",
                "HAS_GENERATION",
                "HAS_TRIM",
                "COMPARES",
                "RELATED_GUIDE",
                "SUITS_STYLE",
                "NEAR_CITY",
              ] as KnowledgeRelationKind[]
            ).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          <select
            className="jos-field"
            value={toType}
            onChange={(e) => setToType(e.target.value as KnowledgeEntityType)}
          >
            {(
              [
                "MODEL",
                "FAMILY",
                "GENERATION",
                "TRIM",
                "ENGINE",
                "COMPARISON",
                "UPGRADE_TOPIC",
                "ROUTE",
                "CITY",
              ] as KnowledgeEntityType[]
            ).map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <input
            className="jos-field"
            placeholder="target slug"
            value={toSlug}
            onChange={(e) => setToSlug(e.target.value)}
          />
          <JosButton
            type="button"
            disabled={pending || !toSlug.trim()}
            onClick={() =>
              run(() =>
                addKnowledgeRelation({
                  fromId: entity.id,
                  toType,
                  toSlug: toSlug.trim(),
                  kind,
                }),
              )
            }
          >
            Add relation
          </JosButton>
        </div>
      </div>

      <div className="jos-panel jos-pad-hero jos-stack-dense">
        <p className="jos-section">Suggested links</p>
        <ul className="space-y-1 text-sm">
          {suggestedLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:underline" target="_blank" rel="noreferrer">
                {l.title}
              </a>{" "}
              <span className="jos-label">{l.href}</span>
            </li>
          ))}
          {suggestedLinks.length === 0 ? <li className="jos-data">No published neighbors yet.</li> : null}
        </ul>
      </div>

      <div className="jos-panel jos-pad-hero jos-stack-dense">
        <p className="jos-section">Revisions</p>
        <ul className="max-h-64 space-y-2 overflow-y-auto text-xs">
          {revisions.map((r) => (
            <li key={r.id} className="border-b border-[var(--jos-line)]/30 pb-2">
              <div className="jos-label">
                {r.createdAt} — {r.note || "save"}
              </div>
              <pre className="mt-1 max-h-24 overflow-auto whitespace-pre-wrap opacity-80">
                {JSON.stringify(r.snapshot, null, 2).slice(0, 800)}
              </pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
