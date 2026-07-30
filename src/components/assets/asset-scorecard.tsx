"use client";

import { useState } from "react";
import type { AssetScore, AssetScorecard } from "@/lib/assets/score-bike";

function scoreTone(value: number): "low" | "mid" | "high" {
  if (value >= 70) return "high";
  if (value >= 40) return "mid";
  return "low";
}

function ScoreBlock({
  score,
  variant,
}: {
  score: AssetScore;
  variant: "joe" | "jos";
}) {
  const [open, setOpen] = useState(false);
  const tone = scoreTone(score.value);
  const isJos = variant === "jos";

  return (
    <div className={isJos ? "jos-kpi-gauge" : "joe-panel space-y-2 p-4"}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left"
        aria-expanded={open}
      >
        <p className={isJos ? "jos-label" : "font-label text-steel"}>
          {score.label}
          {score.subtitle ? (
            <span className={isJos ? " text-[var(--jos-muted)]" : " text-steel/80"}>
              {" "}
              · {score.subtitle}
            </span>
          ) : null}
        </p>
        <p
          className={
            isJos
              ? "jos-kpi mt-1 text-3xl"
              : "font-display mt-1 text-3xl tracking-wide text-lamp"
          }
        >
          {score.value}
        </p>
        <div
          className={
            isJos
              ? "jos-gauge-track mt-2"
              : "mt-2 h-1.5 overflow-hidden bg-chrome/20"
          }
        >
          <div
            className={isJos ? "jos-gauge-fill" : "h-full bg-lamp"}
            data-severity={tone === "high" ? "hot" : tone === "mid" ? "watch" : "ok"}
            style={{ width: `${score.value}%` }}
          />
        </div>
        <p className={isJos ? "jos-data mt-2" : "mt-2 font-label text-[0.65rem] text-steel"}>
          {open ? "Hide reasons" : "Show reasons"}
        </p>
      </button>
      {open ? (
        <ul className={isJos ? "mt-2 space-y-2" : "mt-3 space-y-2 border-t border-chrome/20 pt-3"}>
          {score.reasons.map((r) => (
            <li key={r.code} className={isJos ? "jos-data" : "text-sm text-ink/75"}>
              <span className={isJos ? "text-[var(--jos-orange)]" : "font-label text-lamp"}>
                {r.label}
              </span>
              <span className="block opacity-80">{r.evidence}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function AssetScorecardView({
  scorecard,
  variant = "joe",
  honestyBlurb = false,
}: {
  scorecard: AssetScorecard;
  variant?: "joe" | "jos";
  honestyBlurb?: boolean;
}) {
  const isJos = variant === "jos";

  return (
    <section className={isJos ? "jos-stack-dense" : "space-y-4"}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className={isJos ? "jos-section" : "font-label text-lamp"}>Asset scores</p>
          <h2 className={isJos ? "jos-title text-2xl" : "font-display text-2xl tracking-[0.04em]"}>
            How this bike looks on our floor
          </h2>
        </div>
        <p className={isJos ? "jos-kpi text-2xl" : "font-display text-2xl text-lamp"}>
          {scorecard.composite}
          <span className={isJos ? " jos-data ml-2" : " ml-2 font-label text-sm text-steel"}>
            composite
          </span>
        </p>
      </div>
      {honestyBlurb ? (
        <p className={isJos ? "jos-body text-sm" : "text-sm text-steel"}>
          Scores use our live lot and on-site interest only — not outside market data.
        </p>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {scorecard.scores.map((score) => (
          <ScoreBlock key={score.key} score={score} variant={variant} />
        ))}
      </div>
    </section>
  );
}

export function ScorePill({
  label,
  value,
  variant = "jos",
}: {
  label: string;
  value: number;
  variant?: "joe" | "jos";
}) {
  if (variant === "joe") {
    return (
      <span className="joe-badge">
        {label} {value}
      </span>
    );
  }
  return (
    <span className="jos-data whitespace-nowrap">
      {label} {value}
    </span>
  );
}
