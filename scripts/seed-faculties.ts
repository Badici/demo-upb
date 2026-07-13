import config from "@payload-config";
import { getPayload } from "payload";

type FacultySeed = {
  name: string;
  abbreviation: string;
  universityCenter: "bucharest" | "pitesti";
  color: string;
};

const FACULTIES: FacultySeed[] = [
  // Centrul Universitar București
  { name: "Facultatea de Inginerie Electrică", abbreviation: "FIE", universityCenter: "bucharest", color: "#f59e0b" },
  { name: "Facultatea de Inginerie Industrială și Robotică", abbreviation: "FIIR", universityCenter: "bucharest", color: "#6366f1" },
  { name: "Facultatea de Inginerie Chimică și Biotehnologii", abbreviation: "FIIB", universityCenter: "bucharest", color: "#10b981" },
  { name: "Facultatea de Energetică", abbreviation: "FE", universityCenter: "bucharest", color: "#ef4444" },
  { name: "Facultatea de Ingineria Sistemelor Biotehnice", abbreviation: "FISB", universityCenter: "bucharest", color: "#14b8a6" },
  { name: "Facultatea de Inginerie în Limbi Străine", abbreviation: "FILS", universityCenter: "bucharest", color: "#8b5cf6" },
  { name: "Facultatea de Automatică și Calculatoare", abbreviation: "FAC", universityCenter: "bucharest", color: "#0ea5e9" },
  { name: "Departamentul de Formare pentru Cariera Didactică și Științe SocioUmane", abbreviation: "DFPCDS", universityCenter: "bucharest", color: "#ec4899" },
  { name: "Facultatea de Transporturi", abbreviation: "FT", universityCenter: "bucharest", color: "#f97316" },
  { name: "Facultatea de Științe Aplicate", abbreviation: "FSA", universityCenter: "bucharest", color: "#06b6d4" },
  { name: "Facultatea de Electronică, Telecomunicații și Tehnologia Informației", abbreviation: "FETTI", universityCenter: "bucharest", color: "#3b82f6" },
  { name: "Facultatea de Inginerie Aerospațială", abbreviation: "FIA", universityCenter: "bucharest", color: "#64748b" },
  { name: "Facultatea de Inginerie Medicală", abbreviation: "FIM", universityCenter: "bucharest", color: "#e11d48" },
  { name: "Facultatea de Inginerie Mecanică și Mecatronică", abbreviation: "FIMM", universityCenter: "bucharest", color: "#84cc16" },
  { name: "Facultatea de Știința și Ingineria Materialelor", abbreviation: "FIMTC", universityCenter: "bucharest", color: "#a855f7" },
  { name: "Facultatea de Antreprenoriat, Ingineria și Managementul Afacerilor", abbreviation: "FAIMA", universityCenter: "bucharest", color: "#0d9488" },
  // Centrul Universitar Pitești
  { name: "Facultatea de Științe, Educație Fizică și Informatică", abbreviation: "FSEFI", universityCenter: "pitesti", color: "#2563eb" },
  { name: "Facultatea de Mecanică și Tehnologie", abbreviation: "FMT", universityCenter: "pitesti", color: "#7c3aed" },
  { name: "Facultatea de Electronică, Comunicații și Calculatoare", abbreviation: "FECIC", universityCenter: "pitesti", color: "#0891b2" },
  { name: "Facultatea de Științe ale Educației, Științe Sociale și Psihologie", abbreviation: "FSESSP", universityCenter: "pitesti", color: "#db2777" },
  { name: "Facultatea de Științe Economice și Drept", abbreviation: "FSED", universityCenter: "pitesti", color: "#ca8a04" },
  { name: "Facultatea de Teologie, Litere, Istorie și Arte", abbreviation: "FTLIA", universityCenter: "pitesti", color: "#4f46e5" },
  { name: "Colegiul Terțiar Nonuniversitar", abbreviation: "CTN", universityCenter: "pitesti", color: "#059669" },
];

function buildLogoSvg(abbreviation: string, color: string): string {
  const fontSize = abbreviation.length > 5 ? 18 : abbreviation.length > 4 ? 22 : 26;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
  <rect width="80" height="80" rx="16" fill="${color}"/>
  <text x="40" y="46" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700" fill="white" letter-spacing="-0.5">${abbreviation}</text>
</svg>`;
}

async function seedFaculties() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "faculties",
    limit: 1,
    overrideAccess: true,
  });

  if (existing.totalDocs > 0) {
    console.log("Faculties already seeded.");
    return;
  }

  for (const [i, faculty] of FACULTIES.entries()) {
    const svg = buildLogoSvg(faculty.abbreviation, faculty.color);
    const buffer = Buffer.from(svg, "utf-8");

    const media = await payload.create({
      collection: "media",
      data: { alt: `Logo ${faculty.abbreviation}` },
      file: {
        data: buffer,
        mimetype: "image/svg+xml",
        name: `faculty-${faculty.abbreviation.toLowerCase()}.svg`,
        size: buffer.length,
      },
      overrideAccess: true,
    });

    await payload.create({
      collection: "faculties",
      data: {
        name: faculty.name,
        abbreviation: faculty.abbreviation,
        logo: media.id as number,
        website: `https://upb.ro/${faculty.abbreviation.toLowerCase()}`,
        universityCenter: faculty.universityCenter,
        order: i,
      },
      overrideAccess: true,
    });
  }

  console.log(`Seeded ${FACULTIES.length} faculties.`);
}

seedFaculties()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
