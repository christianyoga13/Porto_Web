"use client"

import { ArrowLeft, ArrowRight, MoreHorizontal, RefreshCw, Shield, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface BrowserToolbarProps {
  url?: string
  onBack?: () => void
  onForward?: () => void
  onRefresh?: () => void
  className?: string
}

export function BrowserToolbar({
  url = "https://example.com",
  onBack,
  onForward,
  onRefresh,
  className,
}: BrowserToolbarProps) {
  return (
    <div className={cn("flex h-10 items-center gap-2 border-b border-zinc-800 bg-zinc-800 px-3", className)}>
      {/* Navigation buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={onBack}
          className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          onClick={onForward}
          className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={onRefresh}
          className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* URL bar */}
      <div className="flex flex-1 items-center rounded-full bg-zinc-700/50 px-3 py-1.5">
        <Shield className="mr-2 h-3.5 w-3.5 text-emerald-400" />
        <span className="text-xs text-zinc-300">{url}</span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1">
        <button className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-100">
          <Star className="h-4 w-4" />
        </button>
        <button className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-100">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
