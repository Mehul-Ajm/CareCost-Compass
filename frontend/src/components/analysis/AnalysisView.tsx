"use client";

import { useEffect, useMemo, useState } from "react";

type EstimateResponse = {
  state: string;
  estimate: { chemo?: number; radiation?: number; surgery?: number };
  summary: { intro: string; bullets?: string[]; next_steps?: string[] };
  used_ai: boolean;
  resources: Array<{ name: string; url: string; color?: string }>;
};

export function AnalysisView({ state }: { state: string }) {
  const [data, setData] = useState<EstimateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!state || state.length !== 2) return;
    const base = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5001";
    setLoading(true);
    setError(null);
    fetch(`${base}/api/cost-estimate?` + new URLSearchParams({ state }))
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [state]);

  const bars = useMemo(() => {
    const values = [data?.estimate?.chemo || 0, data?.estimate?.radiation || 0, data?.estimate?.surgery || 0];
    const max = Math.max(1, ...values);
    const toWidth = (v: number) => Math.max(4, Math.round((v / max) * 100));
    return [
      { label: "Chemo", value: data?.estimate?.chemo, width: toWidth(data?.estimate?.chemo || 0), color: "#8fb3ff" },
      { label: "Radiation", value: data?.estimate?.radiation, width: toWidth(data?.estimate?.radiation || 0), color: "#86efac" },
      { label: "Surgery", value: data?.estimate?.surgery, width: toWidth(data?.estimate?.surgery || 0), color: "#fbbf24" },
    ];
  }, [data]);

  const fmt = (n?: number) =>
    typeof n === "number"
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
      : "–";

  if (!state) return <div className="text-white/60">Choose a state to see details.</div>;
  if (loading) return <div className="text-white/80">Loading analysis…</div>;
  if (error) return <div className="text-red-400">{error}</div>;
  if (!data) return null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="card p-6">
        <h2 className="text-lg font-semibold mb-3">Breakdown by treatment</h2>
        <div className="space-y-3">
          {bars.map((b) => (
            <div key={b.label} className="space-y-1">
              <div className="flex justify-between text-sm text-white/80">
                <span>{b.label}</span>
                <span>{fmt(b.value)}</span>
              </div>
              <div className="h-2 rounded bg-white/10">
                <div className="h-2 rounded" style={{ width: `${b.width}%`, backgroundColor: b.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <h3 className="text-sm tracking-wide text-white/60 mb-2">Key takeaways</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-white/80">
            <li>Discuss in-network options and ask for itemized estimates.</li>
            <li>Check eligibility for Medicaid or state assistance programs.</li>
            <li>Request hospital financial assistance if uninsured or underinsured.</li>
          </ul>
        </div>
      </section>
      <section className="card p-6">
        <h2 className="text-lg font-semibold mb-3">Summary</h2>
        <div className="prose prose-invert max-w-none text-[15px]">
          <p className="text-white/85 whitespace-pre-wrap">{data.summary?.intro}</p>
        </div>
        {data.summary?.bullets?.length ? (
          <ul className="list-disc pl-5 mt-3 space-y-1 text-[15px] text-white/85">
            {data.summary.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        ) : null}
        {data.summary?.next_steps?.length ? (
          <div className="mt-4">
            <h4 className="text-xs uppercase tracking-wider text-white/60 mb-1">Next steps</h4>
            <ul className="list-disc pl-5 space-y-1 text-[15px] text-white/85">
              {data.summary.next_steps.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="mt-3"><span className="badge">{data.used_ai ? "Generated with AI" : "Demo summary"}</span></div>
        {data.resources?.length ? (
          <div className="mt-5">
            <h3 className="text-sm tracking-wide text-white/60 mb-2">Sources</h3>
            <ul className="space-y-2 text-sm">
              {data.resources.map((r, i) => (
                <li key={`${r.url}-${i}`}>
                  <a className="link hover:underline inline-flex items-center gap-2" href={r.url} target="_blank" rel="noreferrer">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color || "#8fb3ff" }} />
                    <span className="break-all">{r.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  );
}


