import { getTranslations } from "next-intl/server";

export async function SkipLink() {
  const t = await getTranslations("Navigation");

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
    >
      {t("skipToContent")}
    </a>
  );
}
