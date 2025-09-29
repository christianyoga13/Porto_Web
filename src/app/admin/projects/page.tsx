"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Plus, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import ImageUpload from "@/components/ImageUpload"
import AdminHeader from "@/components/AdminHeader"

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

export default function AdminProjectsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    liveLink: "",
    githubLink: "",
    category: "web" as "web" | "mobile" | "ui" | "other",
    featured: false
  })

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/admin/login")
      return
    }
    fetchProjects()
  }, [session, status, router])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.split(",").map(tech => tech.trim())
        })
      })

      if (response.ok) {
        setFormData({
          title: "",
          description: "",
          image: "",
          technologies: "",
          liveLink: "",
          githubLink: "",
          category: "web",
          featured: false
        })
        setShowAddForm(false)
        fetchProjects()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error("Error adding project:", error)
      alert("Error adding project")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <AdminHeader 
        title="Project Management" 
        subtitle="Manage your portfolio projects" 
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-slate-400">Add, edit, or remove projects from your portfolio</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>

        {/* Add Project Form */}
        {showAddForm && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Add New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-600 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-600 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="ui">UI/UX</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-600 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
                  required
                />
              </div>

              <div>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Technologies (comma-separated)</label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Next.js, Tailwind CSS"
                  className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-600 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Live Link (Optional)</label>
                  <input
                    type="url"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-600 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">GitHub Link (Optional)</label>
                  <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-600 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-slate-300">Featured Project</label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                >
                  {isLoading ? "Adding..." : "Add Project"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-slate-700 text-white px-6 py-2 rounded-lg hover:bg-slate-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <span className="text-xs bg-slate-700 px-2 py-1 rounded-full">{project.category}</span>
                </div>
                <p className="text-slate-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="text-xs bg-slate-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs bg-slate-700 px-2 py-1 rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      Code
                    </a>
                  )}
                  {!project.liveLink && !project.githubLink && (
                    <span className="text-xs text-slate-500 px-3 py-1">
                      No links available
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
