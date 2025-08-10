export default function Resources() {
  return (
    <div className="min-h-screen py-10 px-6">
      <div className="container">
        <h1 className="text-2xl font-semibold mb-4">Resources</h1>
        <p className="text-white/70 mb-6">Trusted places to learn about costs, coverage, and support.</p>
        <ul className="space-y-3 text-[15px]">
          <li><a className="link hover:underline" href="https://www.medicare.gov/coverage" target="_blank" rel="noreferrer">Medicare Coverage</a></li>
          <li><a className="link hover:underline" href="https://www.medicaid.gov/state-overviews/" target="_blank" rel="noreferrer">Medicaid State Overviews</a></li>
          <li><a className="link hover:underline" href="https://www.cancer.gov/about-cancer/treatment/clinical-trials" target="_blank" rel="noreferrer">NCI: About Clinical Trials</a></li>
          <li><a className="link hover:underline" href="https://www.cancer.org/treatment/finding-and-paying-for-treatment.html" target="_blank" rel="noreferrer">American Cancer Society: Finding & Paying</a></li>
        </ul>
      </div>
    </div>
  );
}


