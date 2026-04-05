import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva(
  "text-slate-100",
  {
    variants: {
      variant: {
        h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
        h2: "text-3xl font-semibold tracking-tight first:mt-0",
        h3: "text-2xl font-semibold tracking-tight",
        h4: "text-xl font-semibold tracking-tight",
        large: "text-lg font-semibold",
        body: "leading-7",
        small: "text-sm font-medium leading-none",
        muted: "text-sm text-slate-400",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      }
    },
    defaultVariants: {
      variant: "body",
      align: "left",
    },
  }
)

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement>,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export function Typography({ className, variant, align, weight, as, ...props }: TypographyProps) {
  let Component: any = as;
  if (!Component) {
    if (variant && variant.startsWith("h")) {
      Component = variant;
    } else if (variant as string === "span" || variant === "muted") {
      Component = "span";
    } else {
      Component = "p";
    }
  }

  return (
    <Component
      className={cn(typographyVariants({ variant, align, weight, className }))}
      {...props}
    />
  )
}

export { typographyVariants }
