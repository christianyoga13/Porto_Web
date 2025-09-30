"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Building, Users, Award } from "lucide-react"

interface Experience {
  id: number
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements?: string[]
  type: "work" | "organization"
}

const experiences: Experience[] = [
  // Work Experience
  {
    id: 1,
    title: "Fullstack Developer",
    company: "Eiqht",
    location: "Remote",
    period: "Januari 2025 - Present",
    description: "Developing modern web, mobile and desktop applications using React, React Native, Next.js, Electron.js, and TypeScript. Collaborating with cross-functional teams to deliver high-quality user experiences.",
    achievements: [
      "Built web, mobile and desktop for 15+ clients",
      "Improved application performance by 40%",
      "Led frontend development for 3 major projects"
    ],
    type: "work"
  },
  {
    id: 2,
    title: "System Analyst (Internship)",
    company: "Maximus Indo Asia",
    location: "Tangerang, Indonesia", 
    period: "Mei 2025 - Agustus 2025",
    description: "Performed end-to-end testing for Odoo ERP websites and custom mobile applications to ensure high-quality performance, functionality, and user experience.",
    achievements: [
      "Tested 3+ ERP modules for functionality",
      "Implemented quality assurance protocols",
      "Collaborated with development team on bug fixes"
    ],
    type: "work"
  },
  {
    id: 3,
    title: "Website Developer (Internship)",
    company: "Nabel Sakha Gemilang",
    location: "Tangerang, Indonesia",
    period: "September 2024 - Desember 2024",
    description: "Handled the development, maintenance, and optimization of the company’s WordPress website to ensure functionality, performance, and an improved user experience.",
    achievements: [
      "Built 5+ responsive websites",
      "Improved website loading speed by 30%",
      "Implemented modern UI/UX designs"
    ],
    type: "work"
  },
  // Organizational Experience
  {
    id: 4,
    title: "Website Developer",
    company: "Mentoring UMN 2024",
    location: "Tangerang, Indonesia",
    period: "2021 - 2022",
    description: "Led student organization initiatives, managed team of 30+ members, and organized technical workshops and competitions.",
    achievements: [
      "Organized 5 major tech events with 500+ participants",
      "Increased membership by 60%",
      "Launched mentoring program for junior students"
    ],
    type: "organization"
  },
  {
    id: 5,
    title: "Person In Charge",
    company: "OMB UMN 2024",
    location: "Tangerang, Indonesia",
    period: "2020 - 2021",
    description: "Coordinated programming competitions, workshops, and networking events. Managed logistics and partnerships with tech companies.",
    achievements: [
      "Organized hackathon with 200+ participants",
      "Secured partnerships with 5 tech companies",
      "Managed event budget of $10,000+"
    ],
    type: "organization"
  },
  {
    id: 6,
    title: "Logistics",
    company: "Ultigraph 2023",
    location: "Tangerang, Indonesia",
    period: "2020 - 2021",
    description: "Coordinated programming competitions, workshops, and networking events. Managed logistics and partnerships with tech companies.",
    achievements: [
      "Organized hackathon with 200+ participants",
      "Secured partnerships with 5 tech companies",
      "Managed event budget of $10,000+"
    ],
    type: "organization"
  },
  {
    id: 7,
    title: "Decorations",
    company: "Alive 9.0",
    location: "Tangerang, Indonesia",
    period: "2020 - 2021",
    description: "Coordinated programming competitions, workshops, and networking events. Managed logistics and partnerships with tech companies.",
    achievements: [
      "Organized hackathon with 200+ participants",
      "Secured partnerships with 5 tech companies",
      "Managed event budget of $10,000+"
    ],
    type: "organization"
  },
  {
    id: 8,
    title: "Security",
    company: "Maxima UMN 2023",
    location: "Tangerang, Indonesia",
    period: "2020 - 2021",
    description: "Coordinated programming competitions, workshops, and networking events. Managed logistics and partnerships with tech companies.",
    achievements: [
      "Organized hackathon with 200+ participants",
      "Secured partnerships with 5 tech companies",
      "Managed event budget of $10,000+"
    ],
    type: "organization"
  }
]

export default function Experience() {
  const workExperiences = experiences.filter(exp => exp.type === "work")
  const orgExperiences = experiences.filter(exp => exp.type === "organization")

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

  const ExperienceCard = ({ experience, isLast }: { experience: Experience, isLast: boolean }) => (
    <motion.div
      variants={itemVariants}
      className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 md:p-6 hover:border-cyan-500/50 transition-all duration-300 group"
    >
      {/* Timeline connector - Circle - Responsive positioning */}
      <div className="absolute -left-7 sm:-left-8 md:-left-9 top-4 md:top-6 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full border-2 sm:border-3 md:border-4 border-slate-900 z-10"></div>
      
      {/* Timeline connector - Connecting line to next dot */}
      {!isLast && (
        <div className="absolute -left-5 sm:-left-5.5 md:-left-6 top-8 sm:top-10 md:top-12 w-0.5 bg-slate-500/80" style={{height: 'calc(100% + 1.5rem)'}}></div>
      )}
      
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {experience.title}
          </h3>
          <div className="flex items-center gap-2 text-cyan-400 mt-1">
            <Building className="w-4 h-4" />
            <span className="font-medium">{experience.company}</span>
          </div>
        </div>
        <div className="flex flex-col sm:text-right gap-1">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{experience.period}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{experience.location}</span>
          </div>
        </div>
      </div>

      <p className="text-slate-300 mb-4 leading-relaxed">
        {experience.description}
      </p>

      {experience.achievements && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
            <Award className="w-4 h-4" />
            Key Achievements
          </h4>
          <ul className="space-y-1">
            {experience.achievements.map((achievement, index) => (
              <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5 flex-shrink-0">•</span>
                <span className="leading-relaxed">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )

  return (
    <section className="w-full py-20 bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white" id="experience">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Experience
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            My professional journey and organizational involvement that shaped my skills and expertise
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Work Experience</h3>
            </div>
            
            <div className="relative pl-8 sm:pl-10 md:pl-12">
              <div className="space-y-6 md:space-y-8">
                {workExperiences.map((experience, index) => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={experience}
                    isLast={index === workExperiences.length - 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Organizational Experience */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Organizational Experience</h3>
            </div>
            
            <div className="relative pl-8 sm:pl-10 md:pl-12">
              <div className="space-y-6 md:space-y-8">
                {orgExperiences.map((experience, index) => (
                  <ExperienceCard 
                    key={experience.id} 
                    experience={experience}
                    isLast={index === orgExperiences.length - 1}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}