import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type TypographyVariant =
  | "display"
  | "pageTitle"
  | "sectionTitle"
  | "subsectionTitle"
  | "cardTitle"
  | "eyebrow"
  | "lead"
  | "body"
  | "bodySmall"
  | "caption"
  | "label"
  | "helper"
  | "meta"
  | "mono";

const variantClass: Record<TypographyVariant, string> = {
  display: "shp2-text-display",
  pageTitle: "shp2-text-page-title",
  sectionTitle: "shp2-text-section-title",
  subsectionTitle: "shp2-text-subsection-title",
  cardTitle: "shp2-text-card-title",
  eyebrow: "shp2-text-eyebrow",
  lead: "shp2-text-lead",
  body: "shp2-text-body",
  bodySmall: "shp2-text-body-sm",
  caption: "shp2-text-caption",
  label: "shp2-text-label",
  helper: "shp2-text-helper",
  meta: "shp2-text-meta",
  mono: "shp2-text-mono",
};

const measureClass = {
  none: "",
  narrow: "shp2-measure-narrow",
  default: "shp2-measure",
  wide: "shp2-measure-wide",
  heading: "shp2-measure-heading",
  hero: "shp2-measure-hero",
} as const;

type Props = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "figcaption" | "label" | "small";
  variant?: TypographyVariant;
  className?: string;
  children?: ReactNode;
  measure?: keyof typeof measureClass;
  id?: string;
};

export function Typography({
  as: Tag = "p",
  variant = "body",
  className,
  children,
  measure = "none",
  id,
}: Props) {
  return (
    <Tag
      id={id}
      className={cn(variantClass[variant], measureClass[measure], className)}
    >
      {children}
    </Tag>
  );
}
