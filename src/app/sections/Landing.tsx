"use client"

import { motion } from "framer-motion"
import { Instagram, Github, Linkedin, Mail, ChevronDown, Code, Briefcase } from "lucide-react"
import Image from "next/image"

export default function Landing() {
  return (
    <section className="w-full min-h-[87.5vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm"
            >
              <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Code className="w-4 h-4" /> Website Developer & Mobile App Developer
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              Hello, I&apos;m{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                Christian Yoga
              </motion.span>
            </motion.h1>

            <motion.h2
              className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              Shandy Kurniadi
            </motion.h2>

            <motion.p
              className="text-lg text-slate-300 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              I create beautiful, responsive web experiences with modern technologies. Let&apos;s build something amazing
              together.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <motion.a
                href="#contact"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium transition-all hover:shadow-lg hover:shadow-purple-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in touch
              </motion.a>
              <motion.a
                href="#projects"
                className="px-6 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 font-medium transition-all hover:bg-slate-700 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Briefcase className="w-5 h-5" /> View my work
              </motion.a>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 mt-10 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <motion.a
                href="https://www.instagram.com/christianysk13"
                className="group p-3 rounded-full bg-slate-800 hover:bg-gradient-to-r from-purple-600 to-pink-500 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5 text-slate-300 group-hover:text-white" />
              </motion.a>
              <motion.a
                href="https://github.com/christianyoga13"
                className="group p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5 text-slate-300 group-hover:text-white" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/christianyogask"
                className="group p-3 rounded-full bg-slate-800 hover:bg-gradient-to-r from-blue-600 to-cyan-500 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-5 h-5 text-slate-300 group-hover:text-white" />
              </motion.a>
              <motion.a
                href="mailto:yogashandy50@gmail.com"
                className="group p-3 rounded-full bg-slate-800 hover:bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-5 h-5 text-slate-300 group-hover:text-white" />
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div
              className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 blur-2xl opacity-20"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 overflow-hidden rounded-2xl border-4 border-slate-800 shadow-2xl"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/Foto gwch.jpg"
                alt="Profile Photo"
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 p-4 bg-slate-800 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            >
              <div className="text-sm font-medium text-slate-300">Available for</div>
              <div className="text-base font-bold text-white">Freelance Projects</div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center text-slate-400 hover:text-white transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
