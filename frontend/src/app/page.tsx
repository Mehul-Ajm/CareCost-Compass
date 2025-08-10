"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { US_STATES } from "@/lib/usStates";
const BackgroundBeamsWithCollision = dynamic(
  () => import("@/components/ui/background-beams-with-collision").then(m => m.BackgroundBeamsWithCollision),
  { ssr: false }
);

export default function Home() {
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const states = useMemo(() => US_STATES, []);

  const fmt = (n?: number) =>
    typeof n === "number"
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
      : "–";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5001";
      const res = await fetch(`${base}/api/cost-estimate?` + new URLSearchParams({ state }), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-10 px-6 font-sans">
      <div className="container">
        <div className="mb-8 relative">
          <BackgroundBeamsWithCollision className="min-h-[80vh] md:min-h-screen flex items-center justify-center">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
                 style={{background:"radial-gradient(60% 40% at 50% 30%, rgba(79,140,255,0.18) 0%, rgba(11,18,32,0) 60%)"}}/>
            <div className="text-center space-y-5 px-4">
              <h1 className="hero-title">Cancer Treatment Cost Clarity</h1>
              <p className="hero-subtitle max-w-2xl mx-auto">
                Quick, readable estimates by state with clear next steps and trusted sources.
              </p>
              <div>
                <a href="#selector" className="cta-pill">Start with your state</a>
              </div>
            </div>
          </BackgroundBeamsWithCollision>
        </div>
        <div id="selector" className="card p-6 sm:p-8 mb-8">
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex items-center gap-3">
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="bg-transparent border border-white/15 focus:border-white/30 outline-none px-4 py-3 rounded md:w-72"
              >
                <option value="" disabled>Choose a state</option>
                {states.map((s) => (
                  <option key={s.code} value={s.code} className="bg-[#0b1220]">
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn-primary px-5 py-3 rounded font-medium disabled:opacity-50"
              disabled={loading || state.length !== 2}
            >
              {loading ? "Loading..." : "Get estimate"}
            </button>
            <a href={`/analysis?state=${state}`} className="px-4 py-3 rounded border border-white/15 text-white/80 hover:border-white/30">Detailed analysis</a>
          </form>
          {error && <p className="text-red-400 mt-3">{error}</p>}
        </div>

        {result && (
          <div id="estimates" className="grid gap-6 md:grid-cols-2">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-3">Estimate for {result.state}</h2>
              <div className="space-y-3 text-[15px]">
                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-white/80">Chemo</span><span>{fmt(result.estimate.chemo)}</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-white/80">Radiation</span><span>{fmt(result.estimate.radiation)}</span></div>
                {result.estimate.surgery && (
                  <div className="flex justify-between"><span className="text-white/80">Surgery</span><span>{fmt(result.estimate.surgery)}</span></div>
                )}
              </div>
              {result?.resources?.length ? (
                <div className="mt-4">
                  <h4 className="text-xs uppercase tracking-wider text-white/60 mb-2">Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.resources.slice(0,4).map((r: any, idx: number) => (
                      <a key={idx} href={r.url} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 rounded border border-white/10 hover:border-white/25 inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color || '#8fb3ff' }} />
                        <span className="truncate max-w-[180px]">{r.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="mt-5">
                <h3 className="text-sm tracking-wide text-white/60 mb-2">Tips</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/80">
                  <li>Ask your provider for a written cost estimate.</li>
                  <li>Check in-network facilities to avoid extra charges.</li>
                  <li>Explore hospital and nonprofit financial assistance.</li>
                </ul>
              </div>
            </div>
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-3">Summary</h2>
              <p className="text-white/85 leading-relaxed text-[15px] whitespace-pre-wrap">{result.summary?.intro}</p>
              {result.summary?.bullets?.length ? (
                <ul className="list-disc pl-5 mt-3 space-y-1 text-[15px] text-white/85">
                  {result.summary.bullets.map((b: string, i: number) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {result.summary?.next_steps?.length ? (
                <div className="mt-4">
                  <h4 className="text-xs uppercase tracking-wider text-white/60 mb-1">Next steps</h4>
                  <ul className="list-disc pl-5 space-y-1 text-[15px] text-white/85">
                    {result.summary.next_steps.map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="mt-3">
                <span className="badge">{result.used_ai ? "Generated with AI" : "Demo summary (no API key)"}</span>
              </div>
            </div>
          </div>
        )}

        {result?.resources?.length ? (
          <div id="resources" className="card p-6 mt-6">
            <h3 className="text-lg font-semibold mb-3">Helpful resources</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {result.resources.map((r: any, idx: number) => (
                <a key={idx} href={r.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-2 rounded border border-white/10 hover:border-white/25">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: r.color || '#8fb3ff' }} />
                  <span className="text-[15px] link hover:underline break-all">{r.name}</span>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
