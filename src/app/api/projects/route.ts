import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import fs from 'fs'
import path from 'path'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  liveLink: string
  githubLink: string
  category: "Web" | "Mobile" | "UI" | "Other"
  featured: boolean
}

const projectsFilePath = path.join(process.cwd(), 'src/data/projects.json')

// Helper function to read projects from JSON file
function readProjects(): Project[] {
  try {
    if (!fs.existsSync(projectsFilePath)) {
      // Initialize with empty array if file doesn't exist
      fs.writeFileSync(projectsFilePath, JSON.stringify([], null, 2))
      return []
    }
    const data = fs.readFileSync(projectsFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}

// Helper function to write projects to JSON file
function writeProjects(projects: Project[]): void {
  try {
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2))
  } catch (error) {
    console.error('Error writing projects:', error)
    throw new Error('Failed to save projects')
  }
}

export async function GET() {
  const projects = readProjects()
  return NextResponse.json(projects)
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const projects = readProjects()
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'image', 'technologies', 'category']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Field ${field} is required` }, { status: 400 })
      }
    }

    // Validate image URL format
    if (!data.image.startsWith('/projects/')) {
      return NextResponse.json({ error: "Image must be uploaded and start with /projects/" }, { status: 400 })
    }

    // Create new project
    const newProject: Project = {
      id: projects.length > 0 ? Math.max(...projects.map((p: Project) => p.id)) + 1 : 1,
      title: data.title,
      description: data.description,
      image: data.image,
      technologies: Array.isArray(data.technologies) ? data.technologies : data.technologies.split(',').map((t: string) => t.trim()),
      liveLink: data.liveLink || "",
      githubLink: data.githubLink || "",
      category: data.category,
      featured: data.featured || false
    }

    // Add to projects array and save
    projects.push(newProject)
    writeProjects(projects)

    return NextResponse.json({ message: "Project added successfully", project: newProject })
  } catch (error) {
    console.error("Error adding project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
