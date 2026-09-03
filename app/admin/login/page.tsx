"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Something went wrong.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-line p-8">
        <p className="font-mono text-[11px] text-ink-soft mb-1">admin access</p>
        <h1 className="font-display font-semibold text-2xl mb-6">Sign in</h1>

        <label className="block font-mono text-[11px] text-ink-soft mb-1.5" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-line bg-transparent px-3 py-2 text-sm focus:outline-none focus:border-blue"
          autoFocus
        />

        {error && <p className="mt-3 text-sm text-rust">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-ink text-paper py-2.5 text-sm font-mono hover:bg-blue transition-colors disabled:opacity-50"
        >
          {loading ? "Checking..." : "Enter"}
        </button>

        <Link href="/" className="block mt-4 text-center font-mono text-[11px] text-ink-soft hover:text-ink">
          ← back to site
        </Link>
      </form>
    </div>
  );
}
