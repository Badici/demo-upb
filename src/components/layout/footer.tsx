import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export async function Footer() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Navigation");

  const quickLinks = [
    { label: nav("faculties"), href: "#facultati" },
    { label: nav("events"), href: "#evenimente" },
    { label: nav("announcements"), href: "#anunturi" },
    { label: nav("admission"), href: siteConfig.links.admission },
  ];

  const resources = [
    { label: t("library"), href: siteConfig.links.library },
    { label: t("press"), href: "#" },
    { label: t("alumni"), href: "#" },
    { label: t("polijobs"), href: "#" },
  ];

  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="absolute inset-0 gradient-hero opacity-5" aria-hidden="true" />
      <Container as="footer" className="relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 inline-flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="UNST Politehnica București"
                width={40}
                height={40}
                className="h-10 w-10 object-contain dark:hidden"
              />
              <Image
                src="/images/logo_alb.svg"
                alt="UNST Politehnica București"
                width={40}
                height={40}
                className="hidden h-10 w-10 object-contain dark:block"
              />
              <span className="font-bold text-foreground">UNST Politehnica</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              {t("resources")}
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
              {t("contact")}
            </h3>
            <address className="space-y-3 text-sm not-italic text-muted">
              <p>{t("address")}</p>
              <p>
                <a href={`tel:${t("phone")}`} className="hover:text-foreground">
                  {t("phone")}
                </a>
              </p>
              <p>
                <a href={`mailto:${t("email")}`} className="hover:text-foreground">
                  {t("email")}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} UNSTB. {t("rights")}
          </p>
          <p className="text-xs text-muted">
            {siteConfig.shortName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
