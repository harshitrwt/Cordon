"use client";

import Link from "next/link";

export function AboutClient() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-6 sm:px-8 sm:py-10 font-mono">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] uppercase tracking-widest text-smoke">
            Platform Documentation
          </span>
          <span className="rounded-full bg-lake-blue/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-lake-blue border border-lake-blue/30">
            Cordon v1.1.0
          </span>
        </div>
        <h1 className="heading-editorial mt-1 text-[clamp(1.8rem,3vw,2.4rem)] text-off-black">
          About Cordon Guard
        </h1>
        <p className="mt-1 text-[13px] text-graphite max-w-[750px]">
          An open-source multi-layered security firewall that screens user prompts before they reach Large Language Models, eliminating prompt injection, jailbreaks, and system prompt leakage.
        </p>
      </div>

      {/* Grid of Core Pillars */}
      <div className="grid gap-6 sm:grid-cols-2 mb-10">
        <div className="rounded-2xl border border-ash bg-white/80 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-lake-blue font-bold text-[14px] uppercase tracking-wider mb-2">
            <span>🛡️</span> The Problem: OWASP LLM01
          </div>
          <p className="text-[12px] text-graphite leading-relaxed">
            LLMs cannot natively differentiate developer instructions from untrusted user inputs. Attackers exploit this via direct jailbreaks, base64 payload smuggling, and indirect injections embedded in scraped websites or uploaded documents.
          </p>
        </div>

        <div className="rounded-2xl border border-ash bg-white/80 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-[14px] uppercase tracking-wider mb-2">
            <span>⚡</span> The Cordon Solution
          </div>
          <p className="text-[12px] text-graphite leading-relaxed">
            Cordon deploys as a transparent proxy and lightweight SDK middleware. It intercepts every incoming prompt and evaluates it across three independent detection layers in parallel before any token reaches OpenAI, Anthropic, or Gemini.
          </p>
        </div>
      </div>

      {/* Architecture Deep Dive */}
      <div className="rounded-2xl border border-ash bg-white/80 p-6 sm:p-7 shadow-sm mb-10 space-y-6">
        <div className="border-b border-ash/70 pb-3">
          <h2 className="heading-editorial text-[20px] text-off-black">
            Multi-Layer Defense Pipeline
          </h2>
          <p className="text-[12px] text-smoke mt-0.5">
            How a prompt is normalized, evaluated, and scored in milliseconds.
          </p>
        </div>

        <div className="space-y-4 text-[12px]">
          <div className="flex items-start gap-3">
            <span className="shrink-0 rounded-full bg-off-black text-parchment h-6 w-6 flex items-center justify-center font-bold text-[11px]">
              0
            </span>
            <div>
              <strong className="text-off-black">Input Normalization &amp; Sanitization:</strong>
              <p className="text-graphite mt-0.5">
                Neutralizes evasion techniques including Unicode zero-width spaces, Cyrillic/Greek homoglyphs, URL encoding, Leetspeak, and nested base64 payloads before sending text to classifiers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="shrink-0 rounded-full bg-off-black text-parchment h-6 w-6 flex items-center justify-center font-bold text-[11px]">
              1
            </span>
            <div>
              <strong className="text-off-black">Layer 1 — Statistical Machine Learning (TF-IDF + Random Forest):</strong>
              <p className="text-graphite mt-0.5">
                Detects syntactic and statistical anomalies characteristic of prompt overrides, token smuggling, and instruction evasion trained on 14,000+ labeled security datasets.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="shrink-0 rounded-full bg-off-black text-parchment h-6 w-6 flex items-center justify-center font-bold text-[11px]">
              2
            </span>
            <div>
              <strong className="text-off-black">Layer 2 — Deterministic Heuristic Rules:</strong>
              <p className="text-graphite mt-0.5">
                Weighted pattern matching covering system prompt leakage probes, roleplay hijacking (&quot;DAN mode&quot;, &quot;developer override&quot;), multi-lingual command triggers, and system canary leakage traps.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="shrink-0 rounded-full bg-off-black text-parchment h-6 w-6 flex items-center justify-center font-bold text-[11px]">
              3
            </span>
            <div>
              <strong className="text-off-black">Layer 3 — Semantic Vector Search (MiniLM + Qdrant Cloud):</strong>
              <p className="text-graphite mt-0.5">
                Encodes prompts into high-dimensional embeddings and performs sub-15ms cosine similarity lookups against known adversarial injection vectors in Qdrant Vector DB.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="shrink-0 rounded-full bg-off-black text-parchment h-6 w-6 flex items-center justify-center font-bold text-[11px]">
              4
            </span>
            <div>
              <strong className="text-off-black">Layer 4 — Meta-Fusion Layer &amp; Decision Policy:</strong>
              <p className="text-graphite mt-0.5">
                A Stacking Random Forest aggregates individual layer outputs with strict corroboration constraints. Prompts with Risk &lt; 0.30 are marked <strong>SAFE</strong>, 0.30–0.49 are marked <strong>REVIEW</strong>, and &ge; 0.50 are immediately <strong>BLOCKED</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Free Academic Tier Benefits */}
      <div className="rounded-2xl border border-lake-blue/40 bg-lake-blue/5 p-6 sm:p-7 shadow-sm mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="rounded-full bg-lake-blue px-2 py-0.5 text-[10px] uppercase font-bold text-white">
            Free Academic Tier
          </span>
          <span className="text-off-black font-bold text-[15px]">Included for All Developers</span>
        </div>
        <p className="text-[12.5px] text-graphite mb-4">
          Every developer and researcher has access to our Free Community Tier with zero credit card required:
        </p>

        <ul className="grid gap-2.5 sm:grid-cols-2 text-[12px] text-graphite">
          <li className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <strong>5,000 monthly cloud evaluations</strong> on Google Cloud Run gateway
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <strong>Zero-config local in-memory mode</strong> (runs completely offline without API key)
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <strong>Automatic fail-open architecture</strong> (never blocks your users if network fails)
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <strong>Community Qdrant Vector cache</strong> for rapid semantic protection
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <strong>Sub-15ms local latency</strong> overhead
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-600 font-bold">✓</span>
            <strong>Full SDK access</strong> (Node.js, Express, Next.js, and Python)
          </li>
        </ul>
      </div>

      {/* How to Integrate */}
      <div className="rounded-2xl border border-ash bg-white/80 p-6 sm:p-7 shadow-sm mb-10 space-y-4">
        <h2 className="heading-editorial text-[20px] text-off-black">
          How to Integrate in 60 Seconds
        </h2>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-smoke block mb-1">
            1. Install the npm package
          </span>
          <pre className="rounded-xl bg-off-black text-parchment p-3 text-[12px] overflow-x-auto">
            <code>npm install cordonguard</code>
          </pre>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-smoke block mb-1">
            2. Wrap your chat route in Express
          </span>
          <pre className="rounded-xl bg-off-black text-parchment p-3 text-[12px] overflow-x-auto">
            <code>{`import express from "express";
import { cordonguard } from "cordonguard";

const app = express();
app.use(express.json());

// In-memory zero-config protection:
app.use("/api/chat", cordonguard());

app.post("/api/chat", (req, res) => {
  res.json({ reply: "Guaranteed safe prompt processed by LLM!" });
});`}</code>
          </pre>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <Link
            href="/dashboard/keys"
            className="rounded-full bg-off-black px-5 py-2 text-[12px] uppercase text-parchment hover:bg-black transition"
          >
            Get Your Free API Key →
          </Link>
          <a
            href="https://www.npmjs.com/package/cordonguard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11.5px] text-lake-blue hover:underline"
          >
            View SDK on npm ↗
          </a>
        </div>
      </div>
    </div>
  );
}
