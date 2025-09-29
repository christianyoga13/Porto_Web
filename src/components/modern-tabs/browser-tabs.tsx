"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { BrowserTab } from "./browser-tab"

export type Tab = {
  id: string
  title: string
  icon?: React.ReactNode
  isActive?: boolean
  favicon?: string
}

interface BrowserTabsProps {
  tabs?: Tab[]
  onTabChange?: (tabId: string) => void
  onTabClose?: (tabId: string) => void
  onNewTab?: () => void
  className?: string
}

export function BrowserTabs({ tabs = [], onTabChange, onTabClose, onNewTab, className }: BrowserTabsProps) {
  const [activeTabs, setActiveTabs] = useState<Tab[]>(() => {
    // Use the exact isActive values from props, fallback to first tab if none are active
    const hasActiveTab = tabs.some(tab => tab.isActive === true)
    if (hasActiveTab) {
      return tabs.map(tab => ({ ...tab, isActive: Boolean(tab.isActive) }))
    } else {
      return tabs.map((tab, index) => ({ ...tab, isActive: index === 0 }))
    }
  })

  // Sync internal state with prop changes
  useEffect(() => {
    const hasActiveTab = tabs.some(tab => tab.isActive === true)
    if (hasActiveTab) {
      setActiveTabs(tabs.map(tab => ({ ...tab, isActive: Boolean(tab.isActive) })))
    } else {
      setActiveTabs(tabs.map((tab, index) => ({ ...tab, isActive: index === 0 })))
    }
  }, [tabs])

  const handleTabClick = (tabId: string) => {
    const updatedTabs = activeTabs.map((tab) => ({
      ...tab,
      isActive: tab.id === tabId,
    }))
    setActiveTabs(updatedTabs)
    onTabChange?.(tabId)
  }

  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation()
    const updatedTabs = activeTabs.filter((tab) => tab.id !== tabId)

    // If we closed the active tab, activate the first remaining tab
    if (activeTabs.find((tab) => tab.id === tabId)?.isActive && updatedTabs.length > 0) {
      updatedTabs[0].isActive = true
    }

    setActiveTabs(updatedTabs)
    onTabClose?.(tabId)
  }

  return (
    <div className={cn("flex h-12 w-full items-center bg-zinc-900 px-2", className)}>
      <div className="flex h-full flex-1 items-end overflow-x-auto scrollbar-hide">
        {activeTabs.map((tab) => (
          <BrowserTab
            key={tab.id}
            title={tab.title}
            icon={tab.icon}
            favicon={tab.favicon}
            isActive={tab.isActive}
            onClick={() => handleTabClick(tab.id)}
            onClose={(e) => handleTabClose(e, tab.id)}
          />
        ))}

        {/* New Tab Button */}
        <button
          onClick={onNewTab}
          className="group flex h-9 min-w-9 items-center justify-center rounded-t-lg bg-transparent p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
