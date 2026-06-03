import { Star, GitFork } from "lucide-react"
import { useRepoStats } from "@/hooks/use-repo-stats"

export function RepoStats({ repoUrl }: { repoUrl?: string }) {
  const stats = useRepoStats(repoUrl)

  if (!stats) return null

  return (
    <span className="flex items-center gap-2 ml-auto text-xs text-muted-foreground shrink-0">
      <span className="flex items-center gap-0.5">
        <Star className="h-3 w-3" />
        {stats.stars}
      </span>
      <span className="flex items-center gap-0.5">
        <GitFork className="h-3 w-3" />
        {stats.forks}
      </span>
    </span>
  )
}
