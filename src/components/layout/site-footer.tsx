import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const CONTACT = {
  phone: "+40 21 402 9100",
  phoneHref: "tel:+40214029100",
  email: "contact@upb.ro",
  emailHref: "mailto:contact@upb.ro",
};

const SOCIALS: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/upb.ro",
    icon: (
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9c0-.6.4-1 1-1z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/politehnicabucuresti",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.6" cy="7.4" r="1.1" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/school/politehnica-university-of-bucharest",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10v6M8 7.5v.01M11.5 16v-3.2c0-1 .8-1.8 1.8-1.8s1.7.8 1.7 1.8V16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@upbro",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11 9.5l3.5 2.5L11 14.5z" />
      </>
    ),
  },
];

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  const quickLinks = [
    { label: t("linkAdmission"), href: "#" },
    { label: t("linkFaculties"), href: "#" },
    { label: t("linkResearch"), href: "#" },
    { label: t("linkStudents"), href: "#" },
  ];

  const resourceLinks = [
    { label: t("linkLibrary"), href: "#" },
    { label: t("linkCareers"), href: "#" },
    { label: t("linkNews"), href: "#" },
    { label: t("linkContact"), href: "#" },
  ];

  const legalLinks = [
    { label: t("privacy"), href: "#" },
    { label: t("terms"), href: "#" },
    { label: t("cookies"), href: "#" },
    { label: t("gdpr"), href: "#" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-foreground/[0.02]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="UNST Politehnica București"
                width={48}
                height={48}
                className="h-12 w-12 dark:hidden"
              />
              <Image
                src="/images/logo_alb.svg"
                alt="UNST Politehnica București"
                width={48}
                height={48}
                className="hidden h-12 w-12 dark:block"
              />
              <span className="text-sm font-semibold leading-tight tracking-tight">
                UNST Politehnica
                <br />
                București
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {t("tagline")}
            </p>
            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                {t("followUs")}
              </p>
              <ul className="flex items-center gap-3">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-foreground/5 text-foreground transition hover:bg-accent hover:text-white"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        {social.icon}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <nav className="lg:col-span-2" aria-label={t("quickLinks")}>
            <h2 className="text-sm font-semibold tracking-tight">
              {t("quickLinks")}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label={t("resources")}>
            <h2 className="text-sm font-semibold tracking-tight">
              {t("resources")}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-sm font-semibold tracking-tight">{t("contact")}</h2>
            <address className="mt-4 flex flex-col gap-4 text-sm not-italic text-muted">
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 shrink-0 text-accent" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  <span className="sr-only">{t("addressLabel")}: </span>
                  {t("address")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="shrink-0 text-accent" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />
                </svg>
                <a href={CONTACT.phoneHref} className="transition hover:text-accent">
                  <span className="sr-only">{t("phoneLabel")}: </span>
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="shrink-0 text-accent" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <a href={CONTACT.emailHref} className="transition hover:text-accent">
                  <span className="sr-only">{t("emailLabel")}: </span>
                  {CONTACT.email}
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted">
            © {year} UNST Politehnica București. {t("rights")}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
