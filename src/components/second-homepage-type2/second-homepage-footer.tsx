import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BrandMark } from "@/components/second-homepage-type2/brand-mark";

const CONTACT = {
  phone: "+40 21 402 9100",
  phoneHref: "tel:+40214029100",
  email: "contact@upb.ro",
  emailHref: "mailto:contact@upb.ro",
};

export async function SecondHomepageFooter() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: t("linkAdmission"), href: "#shp-admissions" },
    { label: t("linkFaculties"), href: "#shp-study" },
    { label: t("linkNews"), href: "#shp-news" },
    { label: t("linkContact"), href: "#" },
  ];

  const resourceLinks = [
    { label: t("linkLibrary"), href: "#shp-resources" },
    { label: t("linkStudents"), href: "#shp-services" },
    { label: t("linkResearch"), href: "#" },
    { label: t("linkCareers"), href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[var(--shp-line-strong)]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.08]">
        <div className="relative h-[min(55vw,28rem)] w-[min(88vw,48rem)] overflow-hidden">
          <Image
            src="/hero-sequence/frame_0042.webp"
            alt=""
            fill
            sizes="800px"
            className="object-cover"
            aria-hidden
          />
        </div>
      </div>

      <div className="shp-section-inner relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--shp-line)] pb-5">
          <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
            UNST Politehnica București
          </p>
          <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
            44°26&apos;N · 26°06&apos;E · Scale 1:500
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex">
              <BrandMark size={44} wordmarkClassName="whitespace-normal" />
            </Link>
            <p className="shp2-text-body-sm mt-4">
              {t("tagline")}
            </p>
          </div>

          <nav className="lg:col-span-2" aria-label={t("quickLinks")}>
            <h2 className="shp-mono text-[0.75rem] font-semibold uppercase tracking-[0.08em]">
              {t("quickLinks")}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="shp2-text-body-sm transition hover:text-[var(--shp-accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label={t("resources")}>
            <h2 className="shp-mono text-[0.75rem] font-semibold uppercase tracking-[0.08em]">
              {t("resources")}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="shp2-text-body-sm transition hover:text-[var(--shp-accent)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="shp-mono text-[0.75rem] font-semibold uppercase tracking-[0.08em]">
              {t("contact")}
            </h2>
            <address className="shp2-text-body-sm mt-4 flex flex-col gap-2.5 not-italic">
              <p>{t("address")}</p>
              <a href={CONTACT.phoneHref} className="transition hover:text-[var(--shp-accent)]">
                {CONTACT.phone}
              </a>
              <a href={CONTACT.emailHref} className="transition hover:text-[var(--shp-accent)]">
                {CONTACT.email}
              </a>
            </address>
          </div>
        </div>

        <div className="shp-line-deco mt-10" aria-hidden />

        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)]">
            © {year} UNST Politehnica București · {t("rights")}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[t("privacy"), t("terms"), t("cookies"), t("gdpr")].map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="shp-mono text-[0.75rem] uppercase tracking-[0.08em] text-[var(--shp-muted)] transition hover:text-[var(--shp-ink)]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
