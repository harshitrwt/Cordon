"use client";

import { useState } from "react";
import { ExpiryOption } from "../lib/keys";

interface CreateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    environment: "production" | "staging" | "development";
    expiry: ExpiryOption;
  }) => void;
}

export function CreateKeyModal({ isOpen, onClose, onSubmit }: CreateKeyModalProps) {
  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState<"production" | "staging" | "development">("production");
  const [expiry, setExpiry] = useState<ExpiryOption>("90d");

  if (!isOpen) return null;

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      environment,
      expiry,
    });
    setName("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in font-sans">
      <div className="w-full max-w-[500px] rounded-3xl border border-ash bg-parchment p-6 sm:p-7 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-ash/80">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔑</span>
            <h3 className="heading-editorial text-[22px] text-off-black">Generate New API Key</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-smoke hover:text-off-black font-mono text-sm px-2"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="mt-5 space-y-4 font-mono">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-smoke mb-1.5 font-medium">
              Key Description / Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Production Express Gateway, Staging Next.js Bot"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-ash bg-white px-4 py-2.5 text-[13px] text-off-black outline-none focus:border-lake-blue transition"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-smoke mb-1.5 font-medium">
              Environment
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["production", "staging", "development"] as const).map((env) => (
                <button
                  type="button"
                  key={env}
                  onClick={() => setEnvironment(env)}
                  className={`rounded-xl border py-2 text-center text-[11.5px] uppercase tracking-wider transition ${
                    environment === env
                      ? "border-off-black bg-off-black text-parchment shadow-sm"
                      : "border-ash bg-white/80 text-graphite hover:border-smoke"
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-smoke mb-1.5 font-medium">
              Expiration Period
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "30d", label: "30 Days" },
                { id: "60d", label: "60 Days" },
                { id: "90d", label: "90 Days (Recommended)" },
                { id: "1y", label: "1 Year" },
                { id: "never", label: "Never Expire" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setExpiry(opt.id as ExpiryOption)}
                  className={`rounded-xl border p-2 text-center text-[11px] transition ${
                    expiry === opt.id
                      ? "border-lake-blue bg-lake-blue/10 text-lake-blue font-semibold"
                      : "border-ash bg-white/80 text-graphite hover:border-smoke"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[10.5px] text-smoke">
              Keys can be manually revoked at any time from this dashboard.
            </p>
          </div>

          <div className="pt-3 border-t border-ash/70 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-ash px-4 py-2 text-[12px] uppercase text-smoke hover:text-off-black transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="rounded-full bg-off-black px-6 py-2 text-[12px] uppercase text-parchment hover:bg-black transition shadow-sm disabled:opacity-50"
            >
              Create Key →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
