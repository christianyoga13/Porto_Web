"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface RetroTabProps {
  title: string
  icon?: React.ReactNode
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export function RetroTab({ title, icon, isActive = false, onClick, className }: RetroTabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "mr-1 flex h-7 items-center space-x-1 border-2 px-3 text-xs font-medium",
        isActive
          ? "border-b-gray-200 border-l-gray-400 border-r-gray-400 border-t-gray-400 bg-gray-200"
          : "border-b-gray-400 border-l-gray-200 border-r-gray-200 border-t-gray-200 bg-gray-100",
        className,
      )}
    >
      {icon && <span className="flex h-4 w-4 items-center justify-center">{icon}</span>}
      <span>{title}</span>
    </button>
  )
}
