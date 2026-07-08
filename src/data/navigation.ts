export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  title?: string;
  links: NavLink[];
};

export type NavSection = {
  id: string;
  label: string;
  groups: NavGroup[];
};

const FACULTIES: NavGroup[] = [
  {
    title: "Centrul Universitar București",
    links: [
      { label: "Facultatea de Inginerie Electrică", href: "#" },
      { label: "Facultatea de Inginerie Industrială și Robotică", href: "#" },
      { label: "Facultatea de Inginerie Chimică și Biotehnologii", href: "#" },
      { label: "Facultatea de Energetică", href: "#" },
      { label: "Facultatea de Ingineria Sistemelor Biotehnice", href: "#" },
      { label: "Facultatea de Inginerie în Limbi Străine", href: "#" },
      { label: "Facultatea de Automatică și Calculatoare", href: "#" },
      {
        label:
          "Departamentul de Formare pentru Cariera Didactică și Științe Socio-Umane",
        href: "#",
      },
      { label: "Facultatea de Transporturi", href: "#" },
      { label: "Facultatea de Științe Aplicate", href: "#" },
      {
        label:
          "Facultatea de Electronică, Telecomunicații și Tehnologia Informației",
        href: "#",
      },
      { label: "Facultatea de Inginerie Aerospațială", href: "#" },
      { label: "Facultatea de Inginerie Medicală", href: "#" },
      { label: "Facultatea de Inginerie Mecanică și Mecatronică", href: "#" },
      { label: "Facultatea de Știința și Ingineria Materialelor", href: "#" },
      {
        label:
          "Facultatea de Antreprenoriat, Ingineria și Managementul Afacerilor",
        href: "#",
      },
    ],
  },
  {
    title: "Centrul Universitar Pitești",
    links: [
      { label: "Facultatea de Științe, Educație Fizică și Informatică", href: "#" },
      { label: "Facultatea de Mecanică și Tehnologie", href: "#" },
      { label: "Facultatea de Electronică, Comunicații și Calculatoare", href: "#" },
      {
        label:
          "Facultatea de Științe ale Educației, Științe Sociale și Psihologie",
        href: "#",
      },
      { label: "Facultatea de Științe Economice și Drept", href: "#" },
      { label: "Facultatea de Teologie, Litere, Istorie și Arte", href: "#" },
      { label: "Colegiul Terțiar Nonuniversitar", href: "#" },
    ],
  },
];

export const NAVIGATION: NavSection[] = [
  {
    id: "universitate",
    label: "Universitate",
    groups: [
      {
        title: "Despre",
        links: [
          { label: "Istoric", href: "#" },
          { label: "Misiune", href: "#" },
          { label: "Centrul EDI", href: "#" },
          { label: "Managementul Calității", href: "#" },
          { label: "Comisia de Etică", href: "#" },
          { label: "Euraxess", href: "#" },
          { label: "Alegeri 2020 – 2024", href: "#" },
          { label: "Alegeri 2024 – 2029", href: "#" },
          { label: "Tur Virtual", href: "#" },
        ],
      },
      {
        title: "Conducere",
        links: [
          { label: "Senat", href: "#" },
          { label: "Hotărâri Senat", href: "#" },
          { label: "Consiliul de Administrație", href: "#" },
          { label: "Documente Strategice", href: "#" },
        ],
      },
      {
        title: "Administrație",
        links: [
          { label: "Direcția General Administrativ Economică", href: "#" },
          { label: "Fonduri Europene / Naționale", href: "#" },
          { label: "Achiziții Publice", href: "#" },
          { label: "Organigramă", href: "#" },
          { label: "Posturi Vacante", href: "#" },
          { label: "Regulamente", href: "#" },
        ],
      },
    ],
  },
  {
    id: "studenti",
    label: "Studenți",
    groups: [
      {
        links: [
          { label: "ERASMUS+", href: "#" },
          { label: "Poli JOBS", href: "#" },
          { label: "Campus", href: "#" },
          { label: "Cantine", href: "#" },
          { label: "Cămine", href: "#" },
          { label: "Asistență medicală", href: "#" },
          { label: "Timp liber", href: "#" },
          { label: "Ofertă Burse", href: "#" },
          { label: "Organizații studențești", href: "#" },
          { label: "Regulamente Studenți", href: "#" },
          { label: "Formulare Utile", href: "#" },
          { label: "Întrebări frecvente", href: "#" },
          { label: "Centrul de Consiliere", href: "#" },
          { label: "Ambasadori UPB", href: "#" },
          { label: "Ghiduri Acces Platforme IT", href: "#" },
          { label: "EDUROAM", href: "#" },
          { label: "My UPB", href: "#" },
          { label: "ERASMUS Policy Statement", href: "#" },
        ],
      },
    ],
  },
  {
    id: "admitere",
    label: "Admitere",
    groups: [
      {
        links: [
          { label: "Licență", href: "#" },
          { label: "Masterat", href: "#" },
          { label: "Doctorat", href: "#" },
          { label: "Centrul Universitar Pitești", href: "#" },
          { label: "Studii Postuniversitare", href: "#" },
          { label: "Conversie profesională", href: "#" },
        ],
      },
    ],
  },
  {
    id: "facultati",
    label: "Facultăți",
    groups: FACULTIES,
  },
  {
    id: "cercetare",
    label: "Cercetare",
    groups: FACULTIES,
  },
  {
    id: "info-upb",
    label: "Info UPB",
    groups: [
      {
        links: [
          { label: "Informații de interes public", href: "#" },
          { label: "Comunicate de presă", href: "#" },
          { label: "Doctor Honoris Causa", href: "#" },
          { label: "Cereri GDPR", href: "#" },
          { label: "Info – Centrul Universitar Pitești", href: "#" },
          { label: "Abilitare", href: "#" },
          { label: "Teze de doctorat", href: "#" },
          { label: "Regulamente", href: "#" },
          { label: "Documente Strategice", href: "#" },
          { label: "Regulamente Studenți", href: "#" },
          { label: "Formulare Utile", href: "#" },
        ],
      },
    ],
  },
];
