const SECTIONS = [
  { id: "shp-hero", label: "00 Introducere" },
  { id: "shp-campus", label: "01 Campus" },
  { id: "shp-study", label: "02 Facultăți" },
  { id: "shp-events", label: "03 Evenimente" },
  { id: "shp-news", label: "04 Știri" },
  { id: "shp-stats", label: "05 Date" },
  { id: "shp-prospective", label: "06 Viitori" },
  { id: "shp-services", label: "07 Servicii" },
  { id: "shp-partners", label: "08 Parteneri" },
  { id: "shp-resources", label: "09 Resurse" },
  { id: "shp-admissions", label: "10 Admitere" },
] as const;

export function SectionNav() {
  return (
    <nav className="shp-nav-rail shp-mono" aria-label="Navigare secțiuni second homepage">
      {SECTIONS.map((section) => (
        <a key={section.id} href={`#${section.id}`}>
          <span aria-hidden>·</span>
          {section.label}
        </a>
      ))}
    </nav>
  );
}
