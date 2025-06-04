"use client"

import { motion } from "framer-motion"
import { 
  Code, 
  Palette, 
  Server, 
  Layers, 
  Cpu, 
} from "lucide-react"
import {
  FaReact,
  FaNode,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
  FaGithub
} from "react-icons/fa"
import {
  RiNextjsFill,
  RiTailwindCssFill,
  RiJavascriptFill
} from "react-icons/ri"
import {
  BiLogoTypescript
} from "react-icons/bi"

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="w-6 h-6" />,
      skills: ["React", "Next.js", "TypeScript/JavaScript", "Tailwind CSS", "Bootstrap", "Laravel", "HTML/CSS", "PHP"],
    },
    {
      title: "UI/UX Design",
      icon: <Palette className="w-6 h-6" />,
      skills: ["Figma", "Responsive Design", "UI Prototyping", "Design Systems"],
    },
    {
      title: "Backend Development",
      icon: <Server className="w-6 h-6" />,
      skills: ["Node.js", "Express", "Firebase", "Supabase", "RESTful APIs", "Authentication", "Database Design"],
    },
    {
      title: "Other Technologies",
      icon: <Layers className="w-6 h-6" />,
      skills: ["Git/GitHub", "CI/CD", "Testing", "Performance Optimization", "SEO"],
    },
  ]

  const technologies = [
    { 
      name: "React", 
      icon: <FaReact className="w-10 h-10 text-blue-500" />, 
      color: "bg-blue-500/10 border-blue-500/20" 
    },
    { 
      name: "Next.js", 
      icon: <RiNextjsFill className="w-10 h-10 text-black dark:text-white" />, 
      color: "bg-neutral-200/10 border-neutral-500/20" 
    },
    { 
      name: "TypeScript", 
      icon: <BiLogoTypescript className="w-10 h-10 text-blue-600" />, 
      color: "bg-blue-600/10 border-blue-600/20" 
    },
    { 
      name: "Tailwind CSS", 
      icon: <RiTailwindCssFill className="w-10 h-10 text-cyan-500" />, 
      color: "bg-cyan-500/10 border-cyan-500/20" 
    },
    { 
      name: "Node.js", 
      icon: <FaNode className="w-10 h-10 text-green-600" />, 
      color: "bg-green-600/10 border-green-600/20" 
    },
    { 
      name: "Figma", 
      icon: <FaFigma className="w-10 h-10 text-purple-500" />, 
      color: "bg-purple-500/10 border-purple-500/20" 
    },
    { 
      name: "JavaScript", 
      icon: <RiJavascriptFill className="w-10 h-10 text-yellow-400" />, 
      color: "bg-yellow-400/10 border-yellow-400/20" 
    },
    { 
      name: "HTML5", 
      icon: <FaHtml5 className="w-10 h-10 text-orange-500" />, 
      color: "bg-orange-500/10 border-orange-500/20" 
    },
    { 
      name: "CSS3", 
      icon: <FaCss3Alt className="w-10 h-10 text-blue-400" />, 
      color: "bg-blue-400/10 border-blue-400/20" 
    },
    { 
      name: "Git", 
      icon: <FaGithub className="w-10 h-10 text-red-500" />, 
      color: "bg-red-500/10 border-red-500/20" 
    },
  ]

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white">
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
              <Cpu className="w-4 h-4" /> My Expertise
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Skills & Technologies
          </motion.h2>

          <motion.p
            className="text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            I specialize in creating modern, responsive web applications with a focus on user experience and
            performance.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-700/50 transition-all"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg">{category.icon}</div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                    <span className="text-slate-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <div className="text-center mb-10">
          <motion.h3
            className="text-2xl font-bold mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            My Tech Stack
          </motion.h3>

          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col items-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-2 group-hover:border-cyan-500 transition-all ${tech.color}`}
                  whileHover={{
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                    transition: { duration: 0.2 },
                  }}
                >
                  {tech.icon}
                </motion.div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Experience Level */}
        <motion.div
          className="mt-20 max-w-3xl mx-auto bg-slate-800/30 border border-slate-700 rounded-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Want to work together?</h3>
              <p className="text-slate-300">I&apos;m currently available for freelance projects and collaborations.</p>
            </div>
            <motion.a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium transition-all hover:shadow-lg hover:shadow-purple-500/20 whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
