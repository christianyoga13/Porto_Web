"use client"

import { useSession, signOut } from "next-auth/react"
import { LogOut, User } from "lucide-react"
import { useEffect } from "react"

interface AdminHeaderProps {
  title: string
  subtitle?: string
}

export default function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) return

    // Auto logout after 30 minutes (silent)
    const timer = setTimeout(() => {
      signOut({ callbackUrl: "/admin/login" })
    }, 30 * 60 * 1000) // 30 minutes

    return () => clearTimeout(timer)
  }, [session])

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" })
  }

  if (!session) return null

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            {subtitle && (
              <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
            )}
          </div>
          
          <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm">
                <p className="text-white font-medium">{session.user?.name}</p>
                <p className="text-slate-400 text-xs">{session.user?.email}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors px-3 py-1 rounded-md hover:bg-red-500/10"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
