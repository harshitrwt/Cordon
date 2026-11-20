"use client";

import { useState } from "react";
import { UserApiKey } from "../lib/auth";
import { formatExpiryStatus } from "../lib/keys";

interface ApiKeysTableProps {
  keys: UserApiKey[];
  onRevoke: (keyId: string) => void;
}

export function ApiKeysTable({ keys, onRevoke }: ApiKeysTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleCopy(key: UserApiKey) {
    try {
      await navigator.clipboard.writeText(key.key || key.maskedKey);
      setCopiedId(key.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {}
  }

  function handleRevokeClick(key: UserApiKey) {
    if (confirm(`Are you sure you want to revoke key "${key.name}"? Applications using this key will immediately receive 401 Unauthorized.`)) {
      onRevoke(key.id);
    }
  }

  if (keys.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ash bg-white/60 p-8 text-center font-mono">
        <p className="text-[13px] text-smoke">No active API keys found.</p>
        <p className="text-[11px] text-smoke/80 mt-1">
          Click &quot;Create New Key&quot; above to generate your first production or staging token.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-ash bg-white/80 shadow-sm font-mono">
      <table className="w-full text-left border-collapse text-[12px]">
        <thead>
          <tr className="border-b border-ash bg-parchment/60 text-[10.5px] uppercase tracking-wider text-smoke">
            <th className="px-5 py-3.5 font-medium">Key Name</th>
            <th className="px-5 py-3.5 font-medium">Masked Token</th>
            <th className="px-5 py-3.5 font-medium">Created</th>
            <th className="px-5 py-3.5 font-medium">Status &amp; Expiry</th>
            <th className="px-5 py-3.5 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ash/60">
          {keys.map((k) => {
            const { text: expiryText, isExpired } = formatExpiryStatus(k.expiresAt);
            const isRevoked = k.status === "revoked";

            return (
              <tr
                key={k.id}
                className={`transition hover:bg-parchment/30 ${
                  isRevoked || isExpired ? "opacity-60 bg-ash/10" : ""
                }`}
              >
                <td className="px-5 py-4">
                  <div className="font-semibold text-off-black">{k.name}</div>
                  <div className="text-[10px] text-smoke">Free Academic Tier</div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <code className="text-off-black bg-parchment px-2 py-0.5 rounded border border-ash/70 text-[11.5px]">
                      {k.maskedKey}
                    </code>
                    {!isRevoked && (
                      <button
                        type="button"
                        onClick={() => handleCopy(k)}
                        className="text-[10px] uppercase text-lake-blue hover:underline"
                      >
                        {copiedId === k.id ? "Copied ✓" : "Copy"}
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 text-smoke text-[11px]">
                  {k.createdAt ? new Date(k.createdAt).toLocaleDateString() : "Active"}
                </td>
                <td className="px-5 py-4">
                  {isRevoked ? (
                    <span className="inline-block rounded-full bg-crimson/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-crimson">
                      Revoked
                    </span>
                  ) : isExpired ? (
                    <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase text-amber-800">
                      Expired
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      {expiryText}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  {!isRevoked ? (
                    <button
                      type="button"
                      onClick={() => handleRevokeClick(k)}
                      className="rounded-full border border-ash/80 px-3 py-1 text-[10.5px] uppercase text-smoke hover:border-crimson hover:text-crimson transition"
                    >
                      Revoke
                    </button>
                  ) : (
                    <span className="text-[10px] text-smoke uppercase">Inactive</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
