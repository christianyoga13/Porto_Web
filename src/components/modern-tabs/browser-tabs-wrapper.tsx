"use client"

import { FolderOpen, Home, Newspaper } from "lucide-react"
import { BrowserTabs } from "./browser-tabs"
import { BrowserToolbar } from "./browser-toolbar"
import { useRouter, usePathname } from "next/navigation"

export default function BrowserTabsWrapper() {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    {
      id: "home",
      title: "Portfolio",
      icon: <Home className="h-4 w-4" />,
      isActive: pathname === "/",
    },
    {
      id: "projects",
      title: "Projects",
      icon: <FolderOpen className="h-4 w-4" />,
      isActive: pathname === "/projects",
    },
    {
      id: "news",
      title: "Tech News",
      icon: <Newspaper className="h-4 w-4" />,
      isActive: pathname === "/news",
    },
  ]

  const handleTabChange = (tabId: string) => {
    if (tabId === "projects") {
      router.push("/projects")
    } else if (tabId === "home") {
      router.push("/")
    } else if (tabId === "news") {
      router.push("/news")
    }
  }

  return (
    <div className="w-full">
      <div className="bg-zinc-900">
        <BrowserTabs
          tabs={tabs}
          onTabChange={handleTabChange}
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
