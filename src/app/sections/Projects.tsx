"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Layers, ArrowRight } from "lucide-react"
import Image from "next/image"
import { projects } from "@/data/projects"

export default function Projects() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  // Get featured and non-featured projects
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured).slice(0, 3) // Show only 3 other projects

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white" id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-slate-300 flex items-center justify-center gap-2">
              <Layers className="w-4 h-4" /> My Work
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>

          <motion.p
            className="text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Here are some of my recent projects that showcase my skills and expertise in web development and design.
          </motion.p>
        </div>

        {/* Featured Projects */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-cyan-500/90 text-white text-xs font-medium rounded-full">Featured</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-slate-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.a
                    href={project.liveLink}
                    className="flex items-center gap-2 text-white font-medium hover:text-cyan-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </motion.a>
                  <motion.a
                    href={project.githubLink}
                    className="flex items-center gap-2 text-white font-medium hover:text-cyan-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <Github className="w-4 h-4" /> View Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects */}
        <div className="mt-16">
          <motion.h3
            className="text-2xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Other Projects
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {otherProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
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
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <motion.a
                      href={project.liveLink}
                      className="flex items-center gap-1 text-sm text-white font-medium hover:text-cyan-400 transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      <ExternalLink className="w-3 h-3" /> Demo
                    </motion.a>
                    <motion.a
                      href={project.githubLink}
                      className="flex items-center gap-1 text-sm text-white font-medium hover:text-cyan-400 transition-colors"
                      whileHover={{ x: 3 }}
                    >
                      <Github className="w-3 h-3" /> Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View All Projects Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
            <motion.a
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 font-medium transition-all hover:bg-slate-700"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
