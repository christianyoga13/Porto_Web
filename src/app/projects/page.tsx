"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

const projectCategories = [
  { value: "all", label: "All Projects" },
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile Apps" },
  { value: "ui", label: "UI/UX Design" },
  { value: "other", label: "Other" },
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  // Filter projects based on category and search query
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = filter === "all" || project.category === filter
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-lg">Loading projects...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      {/* Header */}
      <div className="w-full bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Projects
          </motion.h1>
          <motion.p
            className="text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A comprehensive collection of my work, showcasing my skills and experience in web development, mobile
            applications, and UI/UX design.
          </motion.p>
        </div>

        {/* Filters and Search */}
        <motion.div
          className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {projectCategories.map((category) => (
              <button
                key={category.value}
                onClick={() => setFilter(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === category.value
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-cyan-500/90 text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-slate-800/90 text-slate-300 text-xs font-medium rounded-full capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-white font-medium hover:text-cyan-400 transition-colors"
                        whileHover={{ x: 3 }}
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </motion.a>
                    )}
                    {project.githubLink && (
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-white font-medium hover:text-cyan-400 transition-colors"
                        whileHover={{ x: 3 }}
                      >
                        <Github className="w-4 h-4" /> View Code
                      </motion.a>
                    )}
                    {!project.liveLink && !project.githubLink && (
                      <span className="text-sm text-slate-500 font-medium">
                        Project showcase only
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
            <p className="text-slate-300">Try adjusting your search or filter to find what you&apos;re looking for.</p>
            <button
              onClick={() => {
                setFilter("all")
                setSearchQuery("")
              }}
              className="mt-6 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </main>
  )
}