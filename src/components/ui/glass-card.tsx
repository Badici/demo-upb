import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glassCardVariants = cva(
  "glass glass-hover rounded-2xl",
  {
    variants: {
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      hover: {
        true: "hover:scale-[1.02] cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      padding: "md",
      hover: false,
    },
  },
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

export function GlassCard({
  className,
  padding,
  hover,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(glassCardVariants({ padding, hover, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

export { glassCardVariants };
