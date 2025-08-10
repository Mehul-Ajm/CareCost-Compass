"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import { US_STATES } from "@/lib/usStates";
import { AnalysisView } from "@/components/analysis/AnalysisView";

export default function AnalysisPage() {
  const params = useSearchParams();
  const initial = (params.get("state") || "").toUpperCase();
  const [state, setState] = useState<string>(initial);
  const states = useMemo(() => US_STATES, []);
  return (
    <div className="min-h-screen py-10 px-6">
      <div className="container">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-2xl font-semibold">Detailed Analysis {state ? `for ${state}` : ""}</h1>
          <div className="flex items-center gap-3">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="bg-transparent border border-white/15 focus:border-white/30 outline-none px-4 py-2 rounded md:w-72"
            >
              <option value="" disabled>Choose a state</option>
              {states.map(s => (
                <option key={s.code} value={s.code} className="bg-[#0b1220]">{s.name} ({s.code})</option>
              ))}
            </select>
            <Link href={`/?state=${state}`} className="px-4 py-2 rounded border border-white/15 text-white/80 hover:border-white/30">Back to estimates</Link>
          </div>
        </div>
        <AnalysisView state={state} />
      </div>
    </div>
  );
}


