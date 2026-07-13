import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const VIDEO_ID = "xwh9mT3Y_Uk";

export async function AnniversaryHero() {
  const t = await getTranslations("Anniversary");

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: VIDEO_ID,
    controls: "0",
    showinfo: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    iv_load_policy: "3",
    disablekb: "1",
  });
  const src = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?${params.toString()}`;

  return (
    <section className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <iframe
          src={src}
          title={t("videoTitle")}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-black/65" aria-hidden />

      <div className="mx-auto max-w-4xl px-6 py-24 text-center text-white md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          {t("eyebrow")}
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl text-2xl font-black uppercase leading-[1.15] tracking-tight drop-shadow-md md:text-4xl">
          {t("headline")}
        </h2>
        <Link
          href="/istorie"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0a1f44] shadow-lg transition hover:opacity-90"
        >
          {t("cta")}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
