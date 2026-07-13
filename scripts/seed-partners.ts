import config from "@payload-config";
import { getPayload } from "payload";

type BrandKind = "hex" | "circle" | "bolt" | "square" | "triangle";

type Brand = {
  name: string;
  color: string;
  kind: BrandKind;
};

// Fictitious tech-industry brands used as placeholders until real
// international affiliations are added through the admin panel.
const BRANDS: Brand[] = [
  { name: "Nexora", color: "#4f46e5", kind: "hex" },
  { name: "Voltech", color: "#f59e0b", kind: "bolt" },
  { name: "Quantiq", color: "#7c3aed", kind: "circle" },
  { name: "DataStream", color: "#0ea5e9", kind: "square" },
  { name: "Cirquit", color: "#10b981", kind: "triangle" },
  { name: "AetherLab", color: "#e11d48", kind: "circle" },
  { name: "NovaLink", color: "#06b6d4", kind: "hex" },
  { name: "ByteForge", color: "#ea580c", kind: "square" },
  { name: "SynthCore", color: "#0d9488", kind: "bolt" },
  { name: "Pulsar", color: "#c026d3", kind: "triangle" },
];

function mark(kind: BrandKind, color: string): string {
  switch (kind) {
    case "hex":
      return `<path d="M32 14 L46 22 L46 42 L32 50 L18 42 L18 22 Z" fill="${color}"/>`;
    case "circle":
      return `<circle cx="32" cy="32" r="17" fill="none" stroke="${color}" stroke-width="6"/><circle cx="32" cy="32" r="5" fill="${color}"/>`;
    case "bolt":
      return `<path d="M36 12 L20 36 L31 36 L28 52 L44 28 L33 28 Z" fill="${color}"/>`;
    case "square":
      return `<rect x="16" y="16" width="32" height="32" rx="8" fill="none" stroke="${color}" stroke-width="6"/><rect x="27" y="27" width="10" height="10" rx="2" fill="${color}"/>`;
    case "triangle":
      return `<path d="M32 14 L50 48 L14 48 Z" fill="none" stroke="${color}" stroke-width="6" stroke-linejoin="round"/>`;
  }
}

function buildLogoSvg(brand: Brand): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="64" viewBox="0 0 240 64">
  <g transform="translate(4,0)">${mark(brand.kind, brand.color)}</g>
  <text x="72" y="40" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#0a1f44" letter-spacing="-0.5">${brand.name}</text>
</svg>`;
}

async function seedPartners() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "partners",
    limit: 1,
    overrideAccess: true,
  });

  if (existing.totalDocs > 0) {
    console.log("Partners already seeded.");
    return;
  }

  for (const [i, brand] of BRANDS.entries()) {
    const svg = buildLogoSvg(brand);
    const buffer = Buffer.from(svg, "utf-8");

    const media = await payload.create({
      collection: "media",
      data: { alt: `Logo ${brand.name}` },
      file: {
        data: buffer,
        mimetype: "image/svg+xml",
        name: `partner-${brand.name.toLowerCase()}.svg`,
        size: buffer.length,
      },
      overrideAccess: true,
    });

    await payload.create({
      collection: "partners",
      data: {
        name: brand.name,
        logo: media.id as number,
        link: "https://upb.ro",
        order: i,
      },
      overrideAccess: true,
    });
  }

  console.log(`Seeded ${BRANDS.length} partners.`);
}

seedPartners()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
