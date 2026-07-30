"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await login(email, password);
      if (res.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setErrorMsg(res.error || "Login failed");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6 relative">
      {/* Background conic glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(240,201,134,0.06),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-display font-bold text-xl tracking-tight mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-soft shadow-[0_0_10px_#f0c986]" />
            KAI RHODES
          </div>
          <p className="font-mono text-xs text-ink-faint uppercase tracking-[0.15em]">
            SYSTEM CONTROL CMS
          </p>
        </div>

        {/* Glass Card */}
        <div className="glass p-8 rounded-2xl shadow-2xl">
          <h2 className="font-display text-xl font-bold text-ink mb-6">Authenticate Session</h2>
          
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email-input" className="block text-[11px] text-ink-faint uppercase tracking-[0.1em]">
                Administrator Email
              </label>
              <input
                id="email-input"
                type="email"
                required
                placeholder="admin@kairhodes.film"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm placeholder-ink-faint focus:border-gold-soft transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="pass" className="block text-[11px] text-ink-faint uppercase tracking-[0.1em]">
                Secret Access Key (Password)
              </label>
              <input
                id="pass"
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-white/9 rounded-xl outline-none text-ink text-sm placeholder-ink-faint focus:border-gold-soft transition-colors"
              />
            </div>

            {errorMsg && (
              <p className="text-danger font-mono text-xs text-center uppercase tracking-wider">
                ✗ {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gold-soft text-black font-semibold text-sm hover:bg-gold transition-colors disabled:opacity-50"
            >
              {loading ? "Decrypting Key..." : "Unlock Console"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
