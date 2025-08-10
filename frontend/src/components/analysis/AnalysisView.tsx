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

  // Calculate average cost for display
  const avg = [data.estimate.chemo, data.estimate.radiation, data.estimate.surgery].filter((n): n is number => typeof n === "number");
  const avgCost = avg.length ? Math.round(avg.reduce((a, b) => a + b, 0) / avg.length) : null;

  // Fun fact for demo purposes
  const funFacts: Record<string, string> = {
    CA: "California has the most cancer treatment centers in the US.",
    TX: "Texas is home to the largest cancer center in the world (MD Anderson).",
    NY: "New York has extensive Medicaid cancer coverage programs.",
    FL: "Florida has a high rate of cancer survivors due to early detection programs.",
    AK: "Alaska patients often travel long distances for care.",
    CO: "Colorado has one of the highest rates of cancer screenings.",
  };
  const funFact = funFacts[state] || "Did you know? Cancer care resources vary widely by state.";

  // Pie chart data
  const pieData = [
    { label: "Chemo", value: data.estimate.chemo || 0, color: "#8fb3ff" },
    { label: "Radiation", value: data.estimate.radiation || 0, color: "#86efac" },
    { label: "Surgery", value: data.estimate.surgery || 0, color: "#fbbf24" },
  ];
  const total = pieData.reduce((sum, d) => sum + d.value, 0);
  let acc = 0;
  const pieSlices = pieData.map((d, i) => {
    const start = acc;
    const angle = total ? (d.value / total) * 360 : 0;
    acc += angle;
    const large = angle > 180 ? 1 : 0;
    const r = 48, cx = 60, cy = 60;
    const rad = (deg: number) => (Math.PI / 180) * deg;
    const x1 = cx + r * Math.cos(rad(start - 90));
    const y1 = cy + r * Math.sin(rad(start - 90));
    const x2 = cx + r * Math.cos(rad(acc - 90));
    const y2 = cy + r * Math.sin(rad(acc - 90));
    return (
      <path
        key={d.label}
        d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`}
        fill={d.color}
        stroke="#222b3a"
        strokeWidth="2"
      >
      </path>
    );
  });

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <section className="card p-6 flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-3">Cost Distribution</h2>
        <div className="w-full flex flex-col items-center">
          <svg width="120" height="120" viewBox="0 0 120 120" className="mb-2">
            {pieSlices}
          </svg>
          <div className="flex gap-4 mt-2">
            {pieData.map((d) => (
              <span key={d.label} className="flex items-center gap-1 text-sm text-white/80">
                <span className="inline-block w-3 h-3 rounded-full" style={{ background: d.color }} />
                {d.label}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 text-white/80 text-sm text-center italic">{funFact}</div>
      </section>
      <section className="card p-6 md:col-span-2">
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
      <section className="card p-8 md:col-span-3">
        <h2 className="text-2xl font-bold mb-4 text-white/90">Summary</h2>
        <div className="bg-[#10182a] rounded-lg p-5 mb-4 border border-white/10">
          <p className="text-white/90 text-base leading-relaxed whitespace-pre-line mb-3">{data.summary?.intro}</p>
          {data.summary?.bullets?.length ? (
            <ul className="list-disc pl-6 mt-2 space-y-2 text-[15px] text-white/85">
              {data.summary.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : null}
        </div>
        {data.summary?.next_steps?.length ? (
          <div className="mb-4">
            <h4 className="text-xs uppercase tracking-wider text-white/60 mb-1">Practical next steps</h4>
            <ul className="list-decimal pl-6 space-y-1 text-[15px] text-white/85">
              {data.summary.next_steps.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="mt-2 mb-2"><span className="badge">{data.used_ai ? "Generated with AI" : "Demo summary"}</span></div>
        {data.resources?.length ? (
          <div className="mt-4">
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


