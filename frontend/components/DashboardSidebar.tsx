"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { getActiveUser, clearActiveUser, UserSession } from "../lib/auth";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/logs", label: "Attack Log" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    setUser(getActiveUser());
  }, []);

  function handleSignOut() {
    clearActiveUser();
    router.push("/login");
  }

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden h-screen w-[240px] shrink-0 flex-col justify-between border-r border-ash bg-parchment px-6 py-8 md:flex sticky top-0">
        <div>
          <Logo />
          <nav className="mt-10 flex flex-col gap-1.5">
            {links.map((l) => {
              const active =
                l.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-full px-4 py-2 font-mono text-[12px] uppercase tracking-wider transition ${
                    active
                      ? "bg-off-black text-parchment shadow-sm"
                      : "text-graphite hover:bg-parchment/60 hover:text-off-black"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          {/* User Profile Card */}
          <div className="rounded-2xl border border-ash bg-white/80 p-3.5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-off-black text-parchment flex items-center justify-center font-mono text-[12px] font-bold">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[12px] font-semibold text-off-black truncate">
                  {user?.name || "Academic User"}
                </div>
                <div className="font-mono text-[10px] text-smoke truncate">
                  {user?.email || "free-tier@cordon.local"}
                </div>
              </div>
            </div>
            <div className="mt-2.5 pt-2 border-t border-ash/60 flex items-center justify-between text-[10.5px] font-mono">
              <span className="text-lake-blue font-medium">Free Tier</span>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-smoke hover:text-crimson transition underline underline-offset-2"
              >
                Sign Out
              </button>
            </div>
          </div>

          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-wider text-smoke transition hover:text-off-black px-1"
          >
            ← Return to site
          </Link>
        </div>
      </aside>

      {/* Mobile Top Navigation Bar */}
      <div className="flex w-full items-center justify-between border-b border-ash bg-parchment px-4 py-3 md:hidden">
        <Logo />
        <div className="flex items-center gap-2">
          {links.map((l) => {
            const active =
              l.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${
                  active
                    ? "bg-off-black text-parchment"
                    : "text-graphite bg-parchment/80 border border-ash"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/"
            className="rounded-full border border-ash px-2.5 py-1 font-mono text-[10px] uppercase text-smoke"
          >
            Exit
          </Link>
        </div>
      </div>
    </>
  );
}
