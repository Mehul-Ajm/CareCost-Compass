export default function About() {
  return (
    <div className="min-h-screen py-10 px-6">
      <div className="container">
        <h1 className="text-2xl font-semibold mb-4">About CareCost Compass</h1>
        <p className="text-white/80 mb-4">
          This project addresses Challenge Statement 2: Cancer Treatment Cost Clarity, with a companion touch on
          Challenge Statement 3: Clinical Trials Made Easy.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <section className="card p-6">
            <h2 className="text-lg font-semibold mb-2">What it does</h2>
            <ul className="list-disc pl-5 space-y-1 text-[15px] text-white/85">
              <li>Lets you select a U.S. state and view quick estimates for common treatments (demo values with web-sourced context).</li>
              <li>Summarizes key cost considerations and links to Medicare, Medicaid, and ACS resources.</li>
              <li>Provides an Analysis route for deeper drill-down (work in progress).</li>
            </ul>
          </section>
          <section className="card p-6">
            <h2 className="text-lg font-semibold mb-2">Clinical trials (prompt 3)</h2>
            <p className="text-[15px] text-white/85">
              We outline how costs and coverage intersect with clinical trials and link to NCI guidance. Next steps include
              state-tailored eligibility explanations and trial discovery assistance.
            </p>
            <div className="mt-3 text-[15px]">
              <a className="link hover:underline" target="_blank" rel="noreferrer" href="https://www.cancer.gov/about-cancer/treatment/clinical-trials">NCI: About Clinical Trials</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


