import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  badge?: string
  title: string
  highlightWord?: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({
  badge,
  title,
  highlightWord,
  description,
  centered = false,
  className,
}: SectionHeadingProps) {
  let formattedTitle = title

  if (highlightWord && title.includes(highlightWord)) {
    const parts = title.split(highlightWord)
    formattedTitle = (
      <>
        {parts[0]}
        <span className="text-primary">{highlightWord}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <div className={cn("mb-12 max-w-3xl", centered && "text-center mx-auto", !centered && "text-left", className)}>
      {badge && (
        <div className="inline-block bg-blue-500/20 text-zinc-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-bold mb-4">{formattedTitle}</h2>
      {description && <p className="text-zinc-600 text-lg">{description}</p>}
    </div>
  )
}

