import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const boxVariants = cva(
  "",
  {
    variants: {
      padding: {
        none: "p-0",
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      margin: {
        none: "m-0",
        sm: "m-2",
        md: "m-4",
        lg: "m-6",
        xl: "m-8",
      },
      width: {
        full: "w-full",
        auto: "w-auto",
        screen: "w-screen",
      },
      height: {
        full: "h-full",
        auto: "h-auto",
        screen: "h-screen",
      },
    },
    defaultVariants: {
      padding: "none",
      margin: "none",
    },
  }
)

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  as?: React.ElementType;
}

export function Box({ className, padding, margin, width, height, as: Component = "div", ...props }: BoxProps) {
  return (
    <Component
      className={cn(boxVariants({ padding, margin, width, height, className }))}
      {...props}
    />
  )
}

export { boxVariants }
