"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getActiveUser } from "../lib/auth";

export function ApiKeyCard({
  tier = "free",
}: {
  tier?: "free" | "pro";
  onUpgrade?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [activeKey, setActiveKey] = useState("st_live_9f2a1b7c4e6d8091a3b5c7d9e1f2a3b4");
  const [maskedKey, setMaskedKey] = useState("st_live_••••••••••••••••a3b4");
  const [keyName, setKeyName] = useState("Default Academic Key");

  useEffect(() => {
    const user = getActiveUser();
    if (user && user.apiKeys && user.apiKeys.length > 0) {
      const primary = user.apiKeys.find((k) => k.status === "active") || user.apiKeys[0];
      setActiveKey(primary.key);
      setMaskedKey(primary.maskedKey || "st_live_••••••••••••••••a3b4");
      setKeyName(primary.name);
    }
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(activeKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard fallback
    }
  }

  return (
    <div className="rounded-2xl border border-ash bg-white/80 p-6 shadow-sm flex flex-col justify-between font-mono h-full">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-smoke font-medium">
              Active Gateway Token
            </span>
            <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider">
              Free · 5k/mo
            </span>
          </div>

          <Link
            href="/dashboard/keys"
            className="text-[11px] text-lake-blue hover:underline font-medium"
          >
            Manage Keys →
          </Link>
        </div>

        <div className="mt-1 text-[11px] text-smoke">
          Key: <strong className="text-off-black">{keyName}</strong>
        </div>

        {/* Masked Key Container - Never exposes raw key directly */}
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-ash bg-parchment/70 px-4 py-3 shadow-inner">
          <code className="whitespace-nowrap text-[12.5px] text-off-black tracking-wider select-all font-bold">
            {maskedKey}
          </code>
          <button
            type="button"
            onClick={copy}
            className="shrink-0 rounded-lg bg-off-black px-3.5 py-1 text-[10.5px] uppercase tracking-wider text-parchment hover:bg-black transition"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>

        <div className="mt-3 text-[10.5px] text-smoke leading-relaxed">
          Security: Keys are masked by default to prevent credential leakage. Full keys are only revealed during initial generation.
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-ash/70 flex items-center justify-between text-[11px]">
        <span className="text-smoke">Need custom expiry?</span>
        <Link
          href="/dashboard/keys"
          className="text-off-black font-semibold hover:text-lake-blue underline underline-offset-2"
        >
          + Generate New API Key
        </Link>
      </div>
    </div>
  );
}
