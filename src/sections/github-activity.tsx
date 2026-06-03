import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GitCommit, GitFork, Star, GitPullRequest, Bug, AlertCircle } from "lucide-react"

type GitHubEvent = {
  type: string
  repo: { name: string }
  created_at: string
  payload: Record<string, unknown>
}

const eventConfig: Record<string, { label: string; icon: typeof GitCommit; color: string }> = {
  PushEvent: { label: "Pushed to", icon: GitCommit, color: "text-green-500" },
  WatchEvent: { label: "Starred", icon: Star, color: "text-amber-500" },
  ForkEvent: { label: "Forked", icon: GitFork, color: "text-blue-500" },
  IssuesEvent: { label: "Opened issue in", icon: Bug, color: "text-red-500" },
  PullRequestEvent: { label: "Opened PR in", icon: GitPullRequest, color: "text-purple-500" },
  CreateEvent: { label: "Created branch/tag in", icon: GitCommit, color: "text-sky-500" },
}

function EventIcon({ type }: { type: string }) {
  const config = eventConfig[type]
  if (!config) return <AlertCircle className="h-4 w-4 text-muted-foreground" />
  const Icon = config.icon
  return <Icon className={`h-4 w-4 ${config.color}`} />
}

function relativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function GitHubActivity() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("https://api.github.com/users/Xqni/events?per_page=10")
      .then((res) => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then((data) => {
        setEvents(data.filter((e: GitHubEvent) => eventConfig[e.type] || e.type === "CreateEvent"))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  return (
    <section id="activity" className="py-16 md:py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-2">
            Activity
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Recent GitHub Activity
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm">
            Live feed of my latest public GitHub events.
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-muted-foreground">
            Couldn't load activity right now. GitHub API may be rate-limited.
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No recent public activity.
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="max-w-xl mx-auto space-y-1">
            {events.map((event, idx) => {
              const config = eventConfig[event.type]
              const repoShort = event.repo.name.replace("Xqni/", "")
              return (
                <motion.a
                  key={`${event.repo.name}-${event.created_at}-${idx}`}
                  href={`https://github.com/${event.repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <EventIcon type={event.type} />
                  <span className="text-sm flex-1 min-w-0">
                    {config ? (
                      <>{config.label} <span className="font-medium text-foreground">{repoShort}</span></>
                    ) : (
                      <><span className="font-medium text-foreground">{repoShort}</span></>
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {relativeTime(event.created_at)}
                  </span>
                </motion.a>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
