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
  category: "web" | "mobile" | "ui" | "other"
  featured: boolean
}

const projectsFilePath = path.join(process.cwd(), 'src/data/projects.json')

// Helper function to read projects from JSON file
function readProjects(): Project[] {
  try {
    if (!fs.existsSync(projectsFilePath)) {
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

// PUT - Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const projectId = parseInt(id)
    const data = await request.json()
    const projects = readProjects()
    
    // Find project index
    const projectIndex = projects.findIndex((p: Project) => p.id === projectId)
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Validate required fields
    const requiredFields = ['title', 'description', 'image', 'technologies', 'category']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Field ${field} is required` }, { status: 400 })
      }
    }

    // Update project
    const updatedProject: Project = {
      id: projectId,
      title: data.title,
      description: data.description,
      image: data.image,
      technologies: Array.isArray(data.technologies) ? data.technologies : data.technologies.split(',').map((t: string) => t.trim()),
      liveLink: data.liveLink || "",
      githubLink: data.githubLink || "",
      category: data.category,
      featured: data.featured || false
    }

    projects[projectIndex] = updatedProject
    writeProjects(projects)

    return NextResponse.json({ message: "Project updated successfully", project: updatedProject })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const projectId = parseInt(id)
    const projects = readProjects()
    
    // Find project index
    const projectIndex = projects.findIndex((p: Project) => p.id === projectId)
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Remove project
    const deletedProject = projects.splice(projectIndex, 1)[0]
    writeProjects(projects)

    return NextResponse.json({ message: "Project deleted successfully", project: deletedProject })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}