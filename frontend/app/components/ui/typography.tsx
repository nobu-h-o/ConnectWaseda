import { cn } from "@/lib/utils"

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4"
}

export function Heading({
  as: Component = "h1",
  className,
  children,
  ...props
}: HeadingProps) {
  const headingStyles = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  }

  return (
    <Component
      className={cn(headingStyles[Component], className)}
      {...props}
    >
      {children}
    </Component>
  )
}

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "lead" | "large" | "small" | "muted" | "default"
}

export function Text({
  variant = "default",
  className,
  children,
  ...props
}: TextProps) {
  const textStyles = {
    lead: "text-xl text-muted-foreground",
    large: "text-lg font-semibold",
    small: "text-sm font-medium leading-none",
    muted: "text-sm text-muted-foreground",
    default: "leading-7",
  }

  return (
    <p
      className={cn(textStyles[variant], className)}
      {...props}
    >
      {children}
    </p>
  )
}
