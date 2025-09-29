import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Simple in-memory user store (in production, use a database)
const users = [
  {
    id: "1",
    email: "admin@christianyoga.dev",
    password: "$2b$12$0ApED4OGT4ByaSYwh41B3u4dNLPKNEQyn.sZnI6EPfu9TTZTFNzMe", // "admin123"
    name: "Christian Yoga Shandy"
  }
]

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Authorization attempt:", credentials)
        
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials")
          return null
        }

        const user = users.find(user => user.email === credentials.email)
        
        if (!user) {
          console.log("User not found")
          return null
        }

        console.log("User found, checking password...")
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        console.log("Password valid:", isPasswordValid)
        
        if (!isPasswordValid) {
          console.log("Invalid password")
          return null
        }

        console.log("Login successful for:", user.email)
        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 60, // 30 minutes in seconds
  },
  pages: {
    signIn: "/admin/login"
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
      }
      // Set expiry time to 30 minutes from now
      token.exp = Math.floor(Date.now() / 1000) + (30 * 60) // 30 minutes
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id
      }
      return session
    }
  }
}
