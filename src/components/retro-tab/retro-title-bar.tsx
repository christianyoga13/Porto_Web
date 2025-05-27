"use client"

import type React from "react"
import { useState } from "react"
import { Maximize2, Minimize2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { RetroTab } from "./retro-tab"

export type Tab = {
  id: string
  title: string
  icon?: React.ReactNode
  isActive?: boolean
}

interface RetroTitleBarProps {
  title?: string
  tabs?: Tab[]
  onTabChange?: (tabId: string) => void
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  className?: string
}

export function RetroTitleBar({
  title = "Windows Application",
  tabs = [],
  onTabChange,
  onClose,
  onMinimize,
  onMaximize,
  className,
}: RetroTitleBarProps) {
  const [activeTabs, setActiveTabs] = useState<Tab[]>(
    tabs.map((tab, index) => ({
      ...tab,
      isActive: tab.isActive || index === 0,
    })),
  )

  const handleTabClick = (tabId: string) => {
    const updatedTabs = activeTabs.map((tab) => ({
      ...tab,
      isActive: tab.id === tabId,
    }))
    setActiveTabs(updatedTabs)
    onTabChange?.(tabId)
  }

  return (
    <div className={cn("flex flex-col border-2 border-gray-400 bg-gray-200 shadow-md", className)}>
      {/* Title Bar */}
      <div className="flex h-8 items-center justify-between border-b-2 border-gray-400 bg-gradient-to-r from-blue-800 to-blue-600 px-2">
        <div className="flex-1 text-sm font-bold text-white">{title}</div>
        <div className="flex space-x-1">
          <button
            onClick={onMinimize}
            className="flex h-5 w-5 items-center justify-center border border-gray-400 bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
          >
            <Minimize2 className="h-3 w-3 text-black" />
          </button>
          <button
            onClick={onMaximize}
            className="flex h-5 w-5 items-center justify-center border border-gray-400 bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
          >
            <Maximize2 className="h-3 w-3 text-black" />
          </button>
          <button
            onClick={onClose}
            className="flex h-5 w-5 items-center justify-center border border-gray-400 bg-red-500 hover:bg-red-600 active:bg-red-700"
          >
            <X className="h-3 w-3 text-white" />
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      {activeTabs.length > 0 && (
        <div className="flex flex-wrap border-b-2 border-gray-400 bg-gray-200 px-1 pt-1">
          {activeTabs.map((tab) => (
            <RetroTab
              key={tab.id}
              title={tab.title}
              icon={tab.icon}
              isActive={tab.isActive}
              onClick={() => handleTabClick(tab.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
