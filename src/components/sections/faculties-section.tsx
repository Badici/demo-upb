import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { FadeInView } from "@/components/animations/fade-in-view";
import { UniversityCentersSplit } from "@/components/sections/university-centers-split";

export async function FacultiesSection() {
  const t = await getTranslations("Faculties");

  return (
    <section id="facultati" className="relative bg-background">
      <Container className="relative z-10 py-16 md:py-20">
        <FadeInView>
          <div className="mb-10 text-center md:mb-14">
            <h2 className="text-3xl font-black text-foreground md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
              {t("subtitle")}
            </p>
          </div>
        </FadeInView>
      </Container>

      <div className="relative bg-[#0a1a33]">
        <div className="absolute inset-0 millimetric-paper opacity-30" aria-hidden="true" />

        <Container className="relative z-10 py-16 md:py-20">
          <FadeInView delay={0.15}>
            <UniversityCentersSplit exploreLabel={t("explore")} />
          </FadeInView>
        </Container>
      </div>
    </section>
  );
}
