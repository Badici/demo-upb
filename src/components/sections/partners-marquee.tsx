"use client";

import { useTranslations } from "next-intl";
import type { Partner } from "@/services/partners/types";

type Props = {
  partners: Partner[];
};

const SECONDS_PER_ITEM = 5;

function PartnerLogo({
  partner,
  hidden,
}: {
  partner: Partner;
  hidden?: boolean;
}) {
  const content = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={partner.logoUrl}
      alt={partner.logoAlt}
      width={partner.logoWidth ?? 200}
      height={partner.logoHeight ?? 64}
      loading="lazy"
      className="h-12 w-auto object-contain opacity-70 grayscale transition duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0"
    />
  );

  const className =
    "group/logo mr-12 flex shrink-0 items-center md:mr-16";

  if (partner.link) {
    return (
      <a
        href={partner.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-hidden={hidden}
        tabIndex={hidden ? -1 : undefined}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={className} aria-hidden={hidden}>
      {content}
    </div>
  );
}

export function PartnersMarquee({ partners }: Props) {
  const t = useTranslations("Partners");

  if (partners.length === 0) return null;

  const duration = Math.max(20, partners.length * SECONDS_PER_ITEM);

  return (
    <section
      aria-labelledby="partners-heading"
      className="border-b border-border bg-foreground/[0.02]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h2
            id="partners-heading"
            className="mt-1 text-3xl font-bold tracking-tight md:text-4xl"
          >
            {t("title")}
          </h2>
        </div>
      </div>

      <div className="marquee-viewport group relative overflow-hidden pb-16 md:pb-24">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-28"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-28"
          aria-hidden
        />

        <div
          className="marquee-track items-center"
          style={{ animationDuration: `${duration}s` }}
        >
          {partners.map((partner) => (
            <PartnerLogo key={partner.id} partner={partner} />
          ))}
          {partners.map((partner) => (
            <PartnerLogo key={`dup-${partner.id}`} partner={partner} hidden />
          ))}
        </div>
      </div>
    </section>
  );
}
