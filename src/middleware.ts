import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const pathname = req.nextUrl.pathname
    const userAgent = req.headers.get('user-agent') || 'Unknown'
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown'
    
    // Check token expiry
    const tokenWithExp = token as { exp?: number; email?: string; id?: string; name?: string }
    if (token && tokenWithExp.exp) {
      const now = Math.floor(Date.now() / 1000)
      const expTime = tokenWithExp.exp
      const timeLeft = expTime - now
      
      console.log("🔍 MIDDLEWARE DEBUG - Someone accessing admin area:")
      console.log("  📍 Path:", pathname)
      console.log("  🔐 Login Status:", token ? "✅ LOGGED IN" : "❌ NOT LOGGED IN")
      
      if (token) {
        console.log("  👤 User Info:")
        console.log("    - Email:", token?.email || "❌ No email")
        console.log("    - User ID:", token?.id || "❌ No ID")
        console.log("    - Name:", token?.name || "❌ No name")
        console.log("  ⏰ Session Info:")
        console.log("    - Time Left:", timeLeft > 0 ? `${Math.floor(timeLeft / 60)}m ${timeLeft % 60}s` : "🚨 EXPIRED")
        console.log("    - Expires At:", new Date(expTime * 1000).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }))
      } else {
        console.log("  👤 User Info:")
        console.log("    - Email: ❌ No email (not logged in)")
        console.log("    - User ID: ❌ No ID (not logged in)")
        console.log("    - Name: ❌ No name (not logged in)")
      }
      
      console.log("  🌐 Request Info:")
      console.log("    - IP Address:", ip)
      console.log("    - User Agent:", userAgent.substring(0, 100) + "...")
      console.log("    - Timestamp:", new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }))
      console.log("  " + "=".repeat(50))
    }
    
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname
        
        console.log("🛡️ AUTHORIZATION CHECK:")
        console.log("  📍 Checking access to:", pathname)
        console.log("  🔐 Authentication:", token ? "✅ User is authenticated" : "❌ User is NOT authenticated")
        
        if (token) {
          console.log("  👤 Authenticated User Details:")
          console.log("    - Email:", token.email)
          console.log("    - ID:", token.id)
          console.log("    - Name:", token.name || "No name set")
          
          // Check if token is expired
          const tokenExp = (token as { exp?: number }).exp
          if (tokenExp) {
            const now = Math.floor(Date.now() / 1000)
            if (tokenExp < now) {
              console.log("  ⚠️  Session EXPIRED - forcing logout")
              return false
            }
          }
        }
        
        // Allow login page without authentication
        if (pathname === "/admin/login") {
          console.log("  🚪 Decision: ✅ Login page - ACCESS ALLOWED (anyone can access)")
          return true
        }
        
        // Check if user is authenticated for other admin routes
        if (pathname.startsWith("/admin")) {
          const isAuthorized = !!token
          if (isAuthorized) {
            console.log("  🎯 Decision: ✅ Admin route - ACCESS GRANTED (user is authenticated)")
          } else {
            console.log("  🚫 Decision: ❌ Admin route - ACCESS DENIED (user not authenticated)")
            console.log("  ↩️  Redirecting to login page...")
          }
          return isAuthorized
        }
        
        console.log("  🌐 Decision: ✅ Public route - ACCESS ALLOWED")
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
