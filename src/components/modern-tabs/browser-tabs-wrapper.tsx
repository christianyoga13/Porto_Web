"use client"

import { FileText, Globe, Home, Settings } from "lucide-react"
import { BrowserTabs } from "./browser-tabs"
import { BrowserToolbar } from "./browser-toolbar"

export default function BrowserTabsWrapper() {
  const tabs = [
    {
      id: "home",
      title: "Dashboard",
      icon: <Home className="h-4 w-4" />,
      isActive: true,
    },
    {
      id: "docs",
      title: "Documentation",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "settings",
      title: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      id: "website",
      title: "Example Website",
      icon: <Globe className="h-4 w-4" />,
    },
  ]

  return (
    <div className="w-full">
      <div className="bg-zinc-900">
        <BrowserTabs
          tabs={tabs}
          onTabChange={(tabId) => console.log(`Tab changed to: ${tabId}`)}
          onTabClose={(tabId) => console.log(`Tab closed: ${tabId}`)}
          onNewTab={() => console.log("New tab requested")}
        />
        <BrowserToolbar
          url="https://christian.yoga.com"
          onBack={() => console.log("Back clicked")}
          onForward={() => console.log("Forward clicked")}
          onRefresh={() => console.log("Refresh clicked")}
        />
      </div>
    </div>
  )
}
