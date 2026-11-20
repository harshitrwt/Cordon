"use client";

import { useState } from "react";

interface RevealKeyModalProps {
  apiKey: string | null;
  keyName: string;
  onClose: () => void;
}

export function RevealKeyModal({ apiKey, keyName, onClose }: RevealKeyModalProps) {
  const [copied, setCopied] = useState(false);

  if (!apiKey) return null;

  async function handleCopy() {
    if (!apiKey) return;
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in font-sans">
      <div className="w-full max-w-[520px] rounded-3xl border border-ash bg-white p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-2.5 text-emerald-600 mb-2">
          <span className="text-2xl">✓</span>
          <h3 className="heading-editorial text-[22px] text-off-black">API Key Generated</h3>
        </div>

        <p className="font-mono text-[12.5px] text-graphite">
          Key <strong>{keyName}</strong> has been created.
        </p>

        {/* Warning Callout */}
        <div className="mt-4 rounded-2xl border border-amber-300 bg-amber-50/70 p-4 font-mono text-[12px] text-amber-900 space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <span>⚠️</span> Important Security Notice
          </div>
          <p>
            Please copy and save this secret key now. For your security, <strong>you will not be able to see it in full again</strong> once you close this dialog.
          </p>
        </div>

        {/* Secret Key Display */}
        <div className="mt-4 space-y-1.5 font-mono">
          <label className="text-[11px] uppercase tracking-wider text-smoke font-medium">
            Your Secret API Key
          </label>
          <div className="flex items-center justify-between gap-2 rounded-xl border border-ash bg-parchment/60 p-3 shadow-inner">
            <code className="text-[13px] font-bold text-off-black break-all select-all">
              {apiKey}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 rounded-lg bg-off-black px-3.5 py-1.5 text-[11px] uppercase text-parchment hover:bg-black transition"
            >
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        </div>

        {/* Usage example */}
        <div className="mt-4 rounded-xl border border-ash/70 bg-ash/20 p-3 font-mono text-[11px] text-smoke">
          <code>export CORDON_API_KEY=&quot;{apiKey}&quot;</code>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-off-black py-3 font-mono text-[12px] uppercase tracking-wider text-parchment hover:bg-black transition shadow-sm"
          >
            I have saved my key securely →
          </button>
        </div>
      </div>
    </div>
  );
}
