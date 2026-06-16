import { Container } from "@/components/ui/container";
import { GlassCard } from "@/components/ui/glass-card";
import type { CenterFaculty } from "@/data/mock/university-centers";

export function UniversityCenterFacultiesSection({
  centerName,
  heroTitle,
  heroSubtitle,
  faculties,
}: {
  centerName: string;
  heroTitle: string;
  heroSubtitle: string;
  faculties: CenterFaculty[];
}) {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0 gradient-hero" aria-hidden="true" />
        <div className="absolute inset-0 millimetric-paper opacity-60" aria-hidden="true" />
        <Container className="relative z-10">
          <span className="inline-flex rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80">
            {centerName}
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            {heroTitle}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-white/75 md:text-xl">
            {heroSubtitle}
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-black text-foreground md:text-4xl">
              Lista facultăților
            </h2>
            <p className="text-sm text-muted">
              {faculties.length} rezultate
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {faculties.map((faculty) => (
              <GlassCard key={faculty.name} hover padding="md" className="h-full">
                <div className="flex items-start gap-4">
                  <span className="text-3xl leading-none" aria-hidden="true">
                    {faculty.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold leading-snug text-foreground">
                      {faculty.name}
                    </h3>
                    <a
                      href={faculty.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-cyan"
                    >
                      Website facultate
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 3h7m0 0v7m0-7L10 14"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5h5M5 5v14h14v-5"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

