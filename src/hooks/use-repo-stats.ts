import { useEffect, useState } from "react"

type RepoStats = {
  stars: number
  forks: number
}

const cache = new Map<string, RepoStats>()

export function useRepoStats(repoUrl?: string) {
  const [stats, setStats] = useState<RepoStats | null>(null)

  useEffect(() => {
    if (!repoUrl) return

    const cached = cache.get(repoUrl)
    if (cached) {
      setStats(cached)
      return
    }

    const match = repoUrl.match(/github\.com\/([^/]+\/[^/]+)/)
    if (!match) return

    const api = `https://api.github.com/repos/${match[1]}`
    fetch(api)
      .then((r) => r.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          const s = { stars: data.stargazers_count, forks: data.forks_count }
          cache.set(repoUrl, s)
          setStats(s)
        }
      })
      .catch(() => {})
  }, [repoUrl])

  return stats
}
