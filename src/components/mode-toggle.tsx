import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light")
        const btn = document.activeElement as HTMLElement | null
        btn?.blur()
      }}
      aria-label="Toggle theme"
      className="[&_svg]:transition-all [&_svg]:duration-500 hover:rotate-12"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 dark:-rotate-180 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-180 scale-0 dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
