"use client";

type Props = {
  children: React.ReactNode;
  footer: React.ReactNode;
};

/** Demo ships a single full-bleed homepage with its own chrome. */
export function SiteChrome({ children }: Props) {
  return <div className="flex min-h-dvh flex-col">{children}</div>;
}
