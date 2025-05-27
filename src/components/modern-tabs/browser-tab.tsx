"use client"

import type React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface BrowserTabProps {
  title: string
  icon?: React.ReactNode
  favicon?: string
  isActive?: boolean
  onClick?: () => void
  onClose?: (e: React.MouseEvent) => void
  className?: string
}

export function BrowserTab({ title, icon, favicon, isActive = false, onClick, onClose, className }: BrowserTabProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative mr-1 flex h-9 min-w-[140px] max-w-[240px] cursor-pointer items-center justify-between rounded-t-lg border-t border-l border-r border-transparent px-3 transition-all overflow-y-hidden",
        isActive ? "bg-zinc-800 text-zinc-100" : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300",
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-2 overflow-hidden">
        {favicon ? (
          <img src={favicon || "/placeholder.svg"} alt="" className="h-4 w-4" />
        ) : icon ? (
          <span className={cn("flex-shrink-0", isActive ? "text-zinc-100" : "text-zinc-500")}>{icon}</span>
        ) : null}

        <span className="truncate text-sm">{title}</span>
      </div>

      <button
        onClick={onClose}
        className={cn(
          "ml-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full transition-colors",
          isActive
            ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
            : "opacity-0 group-hover:opacity-100 hover:bg-zinc-700 hover:text-zinc-100",
        )}
      >
        <X className="h-3 w-3" />
      </button>

      {/* Bottom border for active tab that overlaps with the toolbar */}
      {isActive && <div className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-zinc-800" />}
    </div>
  )
}
