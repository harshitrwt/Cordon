"use client";

import { useState, useEffect } from "react";
import { CreateKeyModal } from "./CreateKeyModal";
import { RevealKeyModal } from "./RevealKeyModal";
import { ApiKeysTable } from "./ApiKeysTable";
import { getActiveUser, addApiKeyToActiveUser, revokeApiKey, UserApiKey } from "../lib/auth";
import { generateLiveApiKey, maskApiKey, calculateExpiry, ExpiryOption } from "../lib/keys";

export function ApiKeysClient() {
  const [keys, setKeys] = useState<UserApiKey[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [revealedName, setRevealedName] = useState("");

  useEffect(() => {
    const user = getActiveUser();
    if (user && user.apiKeys) {
      setKeys(user.apiKeys);
    } else {
      // Default initial key for demonstration
      setKeys([
        {
          id: "key_initial",
          name: "Default Academic Gateway Key",
          key: "st_live_9f2a1b7c4e6d8091a3b5c7d9e1f2a3b4",
          maskedKey: "st_live_••••••••••••••••a3b4",
          createdAt: new Date().toISOString(),
          expiresAt: null,
          expiryLabel: "Never",
          status: "active",
        },
      ]);
    }
  }, []);

  function handleCreateKey(data: {
    name: string;
    environment: "production" | "staging" | "development";
    expiry: ExpiryOption;
  }) {
    const rawKey = generateLiveApiKey();
    const masked = maskApiKey(rawKey);
    const { expiresAt, expiryLabel } = calculateExpiry(data.expiry);

    const newKey: UserApiKey = {
      id: `key_${Date.now()}`,
      name: `${data.name} (${data.environment})`,
      key: rawKey,
      maskedKey: masked,
      createdAt: new Date().toISOString(),
      expiresAt,
      expiryLabel,
      status: "active",
    };

    const updatedUser = addApiKeyToActiveUser(newKey);
    if (updatedUser) {
      setKeys(updatedUser.apiKeys);
    } else {
      setKeys((prev) => [newKey, ...prev]);
    }

    setIsCreateOpen(false);
    setRevealedKey(rawKey);
    setRevealedName(newKey.name);
  }

  function handleRevokeKey(keyId: string) {
    const updatedUser = revokeApiKey(keyId);
    if (updatedUser) {
      setKeys(updatedUser.apiKeys);
    } else {
      setKeys((prev) =>
        prev.map((k) => (k.id === keyId ? { ...k, status: "revoked" } : k))
      );
    }
  }

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6 sm:px-8 sm:py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] uppercase tracking-widest text-smoke">
              Access Management
            </span>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase text-emerald-800">
              Academic · Free Tier
            </span>
          </div>
          <h1 className="heading-editorial mt-1 text-[clamp(1.8rem,3vw,2.4rem)] text-off-black">
            API Keys &amp; Tokens
          </h1>
          <p className="mt-1 font-mono text-[13px] text-graphite max-w-[650px]">
            Generate and manage secret tokens for the Cordon npm SDK (<code>cordonguard</code>) and Cloud Gateway. Keys authenticate runtime prompt screening.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="rounded-full bg-off-black px-5 py-2.5 font-mono text-[12px] uppercase tracking-wider text-parchment hover:bg-black transition shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <span>+ Create New API Key</span>
        </button>
      </div>

      {/* Info Callout */}
      <div className="mb-6 rounded-2xl border border-ash/80 bg-white/70 p-4 font-mono text-[12px] text-graphite flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="text-lake-blue text-lg">ℹ</span>
          <span>
            <strong>Zero-Config Local Heuristics:</strong> You can run <code>cordonguard()</code> locally without any key. Keys are only required when calling Cloud ML and Qdrant Vector search.
          </span>
        </div>
        <div className="shrink-0 text-[11px] text-smoke">
          Active Keys: <strong>{keys.filter((k) => k.status === "active").length}</strong>
        </div>
      </div>

      {/* Keys Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-smoke">
          <span>Active &amp; Historical Keys</span>
          <span>Masked by Default</span>
        </div>
        <ApiKeysTable keys={keys} onRevoke={handleRevokeKey} />
      </div>

      {/* Quick Integration Example */}
      <div className="mt-10 rounded-2xl border border-ash bg-white/70 p-6 shadow-sm font-mono">
        <h3 className="text-[13px] font-bold text-off-black uppercase tracking-wider mb-2">
          How to Use Your Key in Production
        </h3>
        <p className="text-[12px] text-graphite mb-4">
          Add your key to your project&apos;s <code>.env</code> file:
        </p>
        <pre className="rounded-xl border border-ash bg-off-black text-parchment p-4 text-[12px] overflow-x-auto">
          <code>CORDON_API_KEY=&quot;st_live_your_secret_key_here&quot;</code>
        </pre>
        <p className="mt-3 text-[11px] text-smoke">
          Then initialize <code>cordonguard({`{ apiKey: process.env.CORDON_API_KEY }`})</code> in Express or Next.js.
        </p>
      </div>

      {/* Modals */}
      <CreateKeyModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateKey}
      />

      <RevealKeyModal
        apiKey={revealedKey}
        keyName={revealedName}
        onClose={() => {
          setRevealedKey(null);
          setRevealedName("");
        }}
      />
    </div>
  );
}
