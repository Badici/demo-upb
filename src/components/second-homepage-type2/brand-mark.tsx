import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  priority?: boolean;
};

/** Official university seal + approved name only. */
export function BrandMark({
  className,
  size = 40,
  showWordmark = true,
  wordmarkClassName,
  priority = false,
}: Props) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-3", className)}>
      <Image
        src="/logo.svg"
        alt="UNST Politehnica București"
        width={size}
        height={size}
        className="shrink-0 object-contain"
        priority={priority}
      />
      {showWordmark ? (
        <span
          className={cn(
            "shp-display min-w-0 truncate text-xs font-semibold uppercase tracking-[0.06em] text-[var(--shp-ink)] md:text-sm",
            wordmarkClassName,
          )}
        >
          UNST Politehnica București
        </span>
      ) : null}
    </span>
  );
}
