import type { Announcement } from "@/services/announcements/types";
import type { EventBanner } from "@/services/events/types";
import type { FacultiesByCenter, Faculty } from "@/services/faculties/types";
import type { NewsListItem } from "@/services/news/types";
import type { Partner } from "@/services/partners/types";

const ANNOUNCEMENT_BANNER = "/demo/announcements/announcement-banner.jpeg";
const NEWS_IMAGES = ["/demo/news/news-1.jpeg", "/demo/news/news-2.jpeg"] as const;
const EVENT_IMAGES = ["/demo/events/event-1.jpeg", "/demo/events/event-2.jpeg"] as const;

const FACULTY_SEEDS: Array<
  Omit<Faculty, "id" | "logoUrl" | "logoAlt"> & { colorAbbr: string }
> = [
  {
    name: "Facultatea de Inginerie Electrică",
    abbreviation: "FIE",
    universityCenter: "bucharest",
    website: "https://upb.ro/fie",
    colorAbbr: "fie",
  },
  {
    name: "Facultatea de Inginerie Industrială și Robotică",
    abbreviation: "FIIR",
    universityCenter: "bucharest",
    website: "https://upb.ro/fiir",
    colorAbbr: "fiir",
  },
  {
    name: "Facultatea de Inginerie Chimică și Biotehnologii",
    abbreviation: "FIIB",
    universityCenter: "bucharest",
    website: "https://upb.ro/fiib",
    colorAbbr: "fiib",
  },
  {
    name: "Facultatea de Energetică",
    abbreviation: "FE",
    universityCenter: "bucharest",
    website: "https://upb.ro/fe",
    colorAbbr: "fe",
  },
  {
    name: "Facultatea de Ingineria Sistemelor Biotehnice",
    abbreviation: "FISB",
    universityCenter: "bucharest",
    website: "https://upb.ro/fisb",
    colorAbbr: "fisb",
  },
  {
    name: "Facultatea de Inginerie în Limbi Străine",
    abbreviation: "FILS",
    universityCenter: "bucharest",
    website: "https://upb.ro/fils",
    colorAbbr: "fils",
  },
  {
    name: "Facultatea de Automatică și Calculatoare",
    abbreviation: "FAC",
    universityCenter: "bucharest",
    website: "https://upb.ro/fac",
    colorAbbr: "fac",
  },
  {
    name: "Departamentul de Formare pentru Cariera Didactică și Științe SocioUmane",
    abbreviation: "DFPCDS",
    universityCenter: "bucharest",
    website: "https://upb.ro/dfpcds",
    colorAbbr: "dfpcds",
  },
  {
    name: "Facultatea de Transporturi",
    abbreviation: "FT",
    universityCenter: "bucharest",
    website: "https://upb.ro/ft",
    colorAbbr: "ft",
  },
  {
    name: "Facultatea de Științe Aplicate",
    abbreviation: "FSA",
    universityCenter: "bucharest",
    website: "https://upb.ro/fsa",
    colorAbbr: "fsa",
  },
  {
    name: "Facultatea de Electronică, Telecomunicații și Tehnologia Informației",
    abbreviation: "FETTI",
    universityCenter: "bucharest",
    website: "https://upb.ro/fetti",
    colorAbbr: "fetti",
  },
  {
    name: "Facultatea de Inginerie Aerospațială",
    abbreviation: "FIA",
    universityCenter: "bucharest",
    website: "https://upb.ro/fia",
    colorAbbr: "fia",
  },
  {
    name: "Facultatea de Inginerie Medicală",
    abbreviation: "FIM",
    universityCenter: "bucharest",
    website: "https://upb.ro/fim",
    colorAbbr: "fim",
  },
  {
    name: "Facultatea de Inginerie Mecanică și Mecatronică",
    abbreviation: "FIMM",
    universityCenter: "bucharest",
    website: "https://upb.ro/fimm",
    colorAbbr: "fimm",
  },
  {
    name: "Facultatea de Știința și Ingineria Materialelor",
    abbreviation: "FIMTC",
    universityCenter: "bucharest",
    website: "https://upb.ro/fimtc",
    colorAbbr: "fimtc",
  },
  {
    name: "Facultatea de Antreprenoriat, Ingineria și Managementul Afacerilor",
    abbreviation: "FAIMA",
    universityCenter: "bucharest",
    website: "https://upb.ro/faima",
    colorAbbr: "faima",
  },
  {
    name: "Facultatea de Științe, Educație Fizică și Informatică",
    abbreviation: "FSEFI",
    universityCenter: "pitesti",
    website: "https://upb.ro/fsefi",
    colorAbbr: "fsefi",
  },
  {
    name: "Facultatea de Mecanică și Tehnologie",
    abbreviation: "FMT",
    universityCenter: "pitesti",
    website: "https://upb.ro/fmt",
    colorAbbr: "fmt",
  },
  {
    name: "Facultatea de Electronică, Comunicații și Calculatoare",
    abbreviation: "FECIC",
    universityCenter: "pitesti",
    website: "https://upb.ro/fecic",
    colorAbbr: "fecic",
  },
  {
    name: "Facultatea de Științe ale Educației, Științe Sociale și Psihologie",
    abbreviation: "FSESSP",
    universityCenter: "pitesti",
    website: "https://upb.ro/fsessp",
    colorAbbr: "fsessp",
  },
  {
    name: "Facultatea de Științe Economice și Drept",
    abbreviation: "FSED",
    universityCenter: "pitesti",
    website: "https://upb.ro/fsed",
    colorAbbr: "fsed",
  },
  {
    name: "Facultatea de Teologie, Litere, Istorie și Arte",
    abbreviation: "FTLIA",
    universityCenter: "pitesti",
    website: "https://upb.ro/ftlia",
    colorAbbr: "ftlia",
  },
  {
    name: "Colegiul Terțiar Nonuniversitar",
    abbreviation: "CTN",
    universityCenter: "pitesti",
    website: "https://upb.ro/ctn",
    colorAbbr: "ctn",
  },
];

const PARTNER_NAMES = [
  "Nexora",
  "Voltech",
  "Quantiq",
  "DataStream",
  "Cirquit",
  "AetherLab",
  "NovaLink",
  "ByteForge",
  "SynthCore",
  "Pulsar",
] as const;

function daysFrom(isoBase: string, deltaDays: number): string {
  const date = new Date(isoBase);
  date.setUTCDate(date.getUTCDate() + deltaDays);
  return date.toISOString();
}

const DEMO_NOW = "2026-07-24T12:00:00.000Z";

export const DEMO_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "Descoperă programele de admitere 2026",
    imageUrl: ANNOUNCEMENT_BANNER,
    imageAlt: "Banner anunț admitere UNST Politehnica București",
    link: { href: "/ro/admitere", isExternal: false },
  },
  {
    id: "2",
    title: "Centrul Universitar Pitești — informații pentru studenți",
    imageUrl: ANNOUNCEMENT_BANNER,
    imageAlt: "Banner anunț admitere UNST Politehnica București",
    link: { href: "https://upb.ro", isExternal: true },
  },
];

export const DEMO_NEWS: NewsListItem[] = [
  {
    id: "1",
    slug: "politehnica-bucuresti-in-topul-universitatilor-tehnice-europene",
    title: "Politehnica București, în topul universităților tehnice europene",
    excerpt:
      "Universitatea urcă în clasamentele internaționale datorită rezultatelor din cercetare și inovare.",
    imageUrl: NEWS_IMAGES[0],
    imageAlt: "Imagine știre — Politehnica București",
    category: "cercetare",
    publishedAt: daysFrom(DEMO_NOW, -1),
    href: "/ro/stiri/politehnica-bucuresti-in-topul-universitatilor-tehnice-europene",
  },
  {
    id: "2",
    slug: "admiterea-2026-calendar-si-noutati-pentru-candidati",
    title: "Admiterea 2026: calendar și noutăți pentru candidați",
    excerpt:
      "Au fost publicate calendarul admiterii și programele de studiu disponibile pentru anul universitar 2026-2027.",
    imageUrl: NEWS_IMAGES[1],
    imageAlt: "Imagine știre — Politehnica București",
    category: "admitere",
    publishedAt: daysFrom(DEMO_NOW, -3),
    href: "/ro/stiri/admiterea-2026-calendar-si-noutati-pentru-candidati",
  },
  {
    id: "3",
    slug: "ziua-carierei-peste-100-de-companii-pe-campus",
    title: "Ziua Carierei: peste 100 de companii pe campus",
    excerpt:
      "Cel mai mare târg de joburi tehnice din țară revine în campusul Politehnica cu oportunități pentru studenți și absolvenți.",
    imageUrl: NEWS_IMAGES[0],
    imageAlt: "Imagine știre — Politehnica București",
    category: "evenimente",
    publishedAt: daysFrom(DEMO_NOW, -6),
    href: "/ro/stiri/ziua-carierei-peste-100-de-companii-pe-campus",
  },
  {
    id: "4",
    slug: "parteneriat-strategic-cu-industria-auto",
    title: "Parteneriat strategic cu industria auto",
    excerpt:
      "Un nou laborator de cercetare dedicat mobilității electrice va fi deschis în colaborare cu parteneri din industrie.",
    imageUrl: NEWS_IMAGES[1],
    imageAlt: "Imagine știre — Politehnica București",
    category: "parteneriate",
    publishedAt: daysFrom(DEMO_NOW, -10),
    href: "/ro/stiri/parteneriat-strategic-cu-industria-auto",
  },
  {
    id: "5",
    slug: "studentii-politehnicii-premiatti-la-competitii-internationale",
    title: "Studenții Politehnicii, premiați la competiții internaționale",
    excerpt:
      "Echipe de studenți au obținut premii importante la concursuri de robotică și programare din străinătate.",
    imageUrl: NEWS_IMAGES[0],
    imageAlt: "Imagine știre — Politehnica București",
    category: "studenti",
    publishedAt: daysFrom(DEMO_NOW, -14),
    href: "/ro/stiri/studentii-politehnicii-premiatti-la-competitii-internationale",
  },
  {
    id: "6",
    slug: "investitii-in-infrastructura-de-invatamant",
    title: "Investiții în infrastructura de învățământ",
    excerpt:
      "Noi spații de studiu și laboratoare modernizate sunt disponibile începând cu acest an universitar.",
    imageUrl: NEWS_IMAGES[1],
    imageAlt: "Imagine știre — Politehnica București",
    category: "general",
    publishedAt: daysFrom(DEMO_NOW, -20),
    href: "/ro/stiri/investitii-in-infrastructura-de-invatamant",
  },
];

export const DEMO_EVENTS: EventBanner[] = [
  {
    id: "1",
    title: "Noaptea Cercetătorilor",
    imageUrl: EVENT_IMAGES[0],
    imageAlt: "Banner eveniment 1",
    link: "https://upb.ro",
    eventDate: daysFrom(DEMO_NOW, 5),
  },
  {
    id: "2",
    title: "Târgul de Carieră IT",
    imageUrl: EVENT_IMAGES[1],
    imageAlt: "Banner eveniment 2",
    link: "https://upb.ro",
    eventDate: daysFrom(DEMO_NOW, 12),
  },
  {
    id: "3",
    title: "Conferința de Robotică",
    imageUrl: EVENT_IMAGES[0],
    imageAlt: "Banner eveniment 1",
    link: "https://upb.ro",
    eventDate: daysFrom(DEMO_NOW, 20),
  },
  {
    id: "4",
    title: "Ziua Porților Deschise",
    imageUrl: EVENT_IMAGES[1],
    imageAlt: "Banner eveniment 2",
    link: "https://upb.ro",
    eventDate: daysFrom(DEMO_NOW, 28),
  },
  {
    id: "5",
    title: "Gala Absolvenților",
    imageUrl: EVENT_IMAGES[0],
    imageAlt: "Banner eveniment 1",
    link: "https://upb.ro",
    eventDate: daysFrom(DEMO_NOW, 40),
  },
  {
    id: "6",
    title: "Hackathon Politehnica",
    imageUrl: EVENT_IMAGES[1],
    imageAlt: "Banner eveniment 2",
    link: "https://upb.ro",
    eventDate: daysFrom(DEMO_NOW, 52),
  },
];

export const DEMO_PARTNERS: Partner[] = PARTNER_NAMES.map((name, index) => ({
  id: String(index + 1),
  name,
  logoUrl: `/demo/partners/partner-${name.toLowerCase()}.svg`,
  logoAlt: `Logo ${name}`,
  logoWidth: 240,
  logoHeight: 64,
  link: "https://upb.ro",
}));

export const DEMO_FACULTIES: FacultiesByCenter = (() => {
  const faculties: Faculty[] = FACULTY_SEEDS.map((faculty, index) => ({
    id: String(index + 1),
    name: faculty.name,
    abbreviation: faculty.abbreviation,
    logoUrl: `/demo/faculties/faculty-${faculty.colorAbbr}.svg`,
    logoAlt: `Logo ${faculty.abbreviation}`,
    website: faculty.website,
    universityCenter: faculty.universityCenter,
  }));

  return {
    bucharest: faculties.filter((f) => f.universityCenter === "bucharest"),
    pitesti: faculties.filter((f) => f.universityCenter === "pitesti"),
  };
})();

export function localizeNewsHref(
  item: NewsListItem,
  _locale: string,
): NewsListItem {
  return {
    ...item,
    href: `#shp-news`,
  };
}

export function localizeAnnouncementLink(
  item: Announcement,
  locale: string,
): Announcement {
  if (!item.link || item.link.isExternal) return item;

  const path = item.link.href.replace(/^\/(ro|en)/, `/${locale}`);
  return {
    ...item,
    link: { ...item.link, href: path },
  };
}
