"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Incorrect password. Try again.");
        setPassword("");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#082121" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo mark */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "#37B4B4" }}
          >
            <Lock size={22} color="#082121" strokeWidth={2} />
          </div>
          <h1
            className="text-white font-semibold tracking-tight"
            style={{ fontSize: "1.25rem" }}
          >
            Image CMS
          </h1>
          <p className="mt-1 text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>
            AK Prime · Admin only
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={onSubmit}
          className="rounded-2xl p-8 space-y-5 border"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div>
            <label
              htmlFor="password"
              className="block text-[13px] font-medium mb-2"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                autoComplete="current-password"
                placeholder="Enter CMS password"
                className="w-full h-11 rounded-xl pr-11 pl-4 text-[14px] text-white placeholder:text-white/25 focus:outline-none transition-colors"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: error
                    ? "1.5px solid rgba(239,68,68,0.7)"
                    : "1.5px solid rgba(255,255,255,0.10)",
                }}
                onFocus={(e) =>
                  !error &&
                  (e.currentTarget.style.borderColor = "#37B4B4")
                }
                onBlur={(e) =>
                  !error &&
                  (e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.10)")
                }
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.4)" }}
                tabIndex={-1}
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-[12px]" style={{ color: "#f87171" }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full h-11 rounded-xl text-[14px] font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "#37B4B4", color: "#082121" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-[12px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          Not visible to site visitors
        </p>
      </div>
    </div>
  );
}
