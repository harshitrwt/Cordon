// API Key generation, formatting, masking, and validation utilities

export type ExpiryOption = "30d" | "60d" | "90d" | "1y" | "never";

export interface KeyGenerationInput {
  name: string;
  environment?: "production" | "staging" | "development";
  expiry: ExpiryOption;
}

export function generateLiveApiKey(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let token = "st_live_";
  for (let i = 0; i < 32; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

export function maskApiKey(key: string): string {
  if (!key || key.length < 12) return "st_live_••••••••";
  const prefix = key.slice(0, 8); // "st_live_"
  const suffix = key.slice(-4);
  return `${prefix}${"•".repeat(16)}${suffix}`;
}

export function calculateExpiry(option: ExpiryOption): {
  expiresAt: string | null;
  expiryLabel: string;
} {
  const now = new Date();
  switch (option) {
    case "30d": {
      const d = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      return { expiresAt: d.toISOString(), expiryLabel: "30 Days" };
    }
    case "60d": {
      const d = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
      return { expiresAt: d.toISOString(), expiryLabel: "60 Days" };
    }
    case "90d": {
      const d = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
      return { expiresAt: d.toISOString(), expiryLabel: "90 Days" };
    }
    case "1y": {
      const d = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
      return { expiresAt: d.toISOString(), expiryLabel: "1 Year" };
    }
    case "never":
    default:
      return { expiresAt: null, expiryLabel: "Never" };
  }
}

export function formatExpiryStatus(expiresAt: string | null): {
  text: string;
  isExpired: boolean;
} {
  if (!expiresAt) return { text: "Never expires", isExpired: false };
  const expiryDate = new Date(expiresAt);
  const now = new Date();
  const diffMs = expiryDate.getTime() - now.getTime();
  if (diffMs <= 0) {
    return { text: "Expired", isExpired: true };
  }
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return { text: "Expires tomorrow", isExpired: false };
  return { text: `Expires in ${diffDays} days`, isExpired: false };
}
