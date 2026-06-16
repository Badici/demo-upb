export type CenterFaculty = {
  name: string;
  icon: string;
  href: string;
};

export type UniversityCenter = {
  slug: "bucuresti" | "pitesti";
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  faculties: CenterFaculty[];
};

export const universityCenters: Record<UniversityCenter["slug"], UniversityCenter> = {
  bucuresti: {
    slug: "bucuresti",
    name: "Centrul Universitar București",
    heroTitle: "Facultățile din Centrul Universitar București",
    heroSubtitle:
      "Explorează oferta academică completă din București și alege facultatea potrivită pentru traseul tău.",
    faculties: [
      { name: "Facultatea de Inginerie Electrică", icon: "⚡", href: "about:blank" },
      { name: "Facultatea de Inginerie Industrială și Robotică", icon: "🤖", href: "about:blank" },
      { name: "Facultatea de Inginerie Chimică și Biotehnologii", icon: "🧪", href: "about:blank" },
      { name: "Facultatea de Energetică", icon: "🔋", href: "about:blank" },
      { name: "Facultatea de Ingineria Sistemelor Biotehnice", icon: "🌱", href: "about:blank" },
      { name: "Facultatea de Inginerie în Limbi Străine", icon: "🌍", href: "about:blank" },
      { name: "Facultatea de Automatică și Calculatoare", icon: "💻", href: "about:blank" },
      { name: "Departamentul de Formare pentru Cariera Didactică și Științe SocioUmane", icon: "📘", href: "about:blank" },
      { name: "Facultatea de Transporturi", icon: "🚗", href: "about:blank" },
      { name: "Facultatea de Științe Aplicate", icon: "🔬", href: "about:blank" },
      { name: "Facultatea de Electronică, Telecomunicații și Tehnologia Informației", icon: "📡", href: "about:blank" },
      { name: "Facultatea de Inginerie Aerospațială", icon: "🚀", href: "about:blank" },
      { name: "Facultatea de Inginerie Medicală", icon: "🏥", href: "about:blank" },
      { name: "Facultatea de Inginerie Mecanică și Mecatronică", icon: "⚙️", href: "about:blank" },
      { name: "Facultatea de Știința și Ingineria Materialelor", icon: "🧱", href: "about:blank" },
      { name: "Facultatea de Antreprenoriat, Ingineria și Managementul Afacerilor", icon: "📈", href: "about:blank" },
    ],
  },
  pitesti: {
    slug: "pitesti",
    name: "Centrul Universitar Pitești",
    heroTitle: "Facultățile din Centrul Universitar Pitești",
    heroSubtitle:
      "Descoperă programele și facultățile din Pitești, într-o structură clară și orientată către carieră.",
    faculties: [
      { name: "Facultatea de Ştiințe, Educație Fizică și Informatică", icon: "🏃", href: "about:blank" },
      { name: "Facultatea de Mecanică şi Tehnologie", icon: "🔧", href: "about:blank" },
      { name: "Facultatea de Electronică, Comunicații și Calculatoare", icon: "🖥️", href: "about:blank" },
      { name: "Facultatea de Științe ale Educației, Științe Sociale şi Psihologie", icon: "🧠", href: "about:blank" },
      { name: "Facultatea de Științe Economice și Drept", icon: "⚖️", href: "about:blank" },
      { name: "Facultatea de Teologie, Litere, Istorie și Arte", icon: "🎨", href: "about:blank" },
      { name: "Colegiul Terțiar Nonuniversitar", icon: "🎓", href: "about:blank" },
    ],
  },
};

