"use client"

import { motion } from "framer-motion"
import { Mail, Send, User, MessageSquare, Check, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useState, useRef, FormEvent } from "react"
import emailjs from '@emailjs/browser'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        success: boolean;
        message: string;
    } | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus({
                success: false,
                message: 'Please fill out all fields'
            });
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            setSubmitStatus({
                success: false,
                message: 'Please enter a valid email address'
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Replace these with your actual EmailJS credentials
            const serviceID = 'service_j6lj2be';
            const templateID = 'template_e4mfwl2';
            const publicKey = 'MqfM0bBNeSKsT7WD2';
            
            await emailjs.sendForm(
                serviceID,
                templateID,
                formRef.current!,
                publicKey
            );

            setSubmitStatus({
                success: true,
                message: 'Your message has been sent successfully!'
            });
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus({
                success: false,
                message: 'Failed to send message. Please try again later.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="w-full min-h-[87.5vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white relative overflow-hidden py-10">
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
            </div>

            <div className="container mx-auto px-4 z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-6"
                >
                    <div className="inline-block px-3 py-1 mb-4 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                        <span className="text-sm font-medium text-slate-300 flex items-center justify-center gap-1">
                            <Mail className="w-3 h-3" /> Get In Touch
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">Contact Me</h2>
                    <p className="text-slate-300 text-sm max-w-2xl mx-auto">
                        Have a project in mind or want to collaborate? Feel free to reach out!
                    </p>
                </motion.div>

                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-4 md:p-6 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <motion.div 
                            className="md:w-2/5 flex flex-col items-center"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative w-36 h-36 md:w-56 md:h-56 overflow-hidden rounded-full border-4 border-gradient-to-r from-cyan-500 to-purple-600">
                                <Image
                                    src="/Me Cartoon.png"
                                    alt="Contact Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                    Christian Yoga Shandy
                                </h3>
                                <p className="text-slate-300 text-sm mt-1">
                                    Website Developer & Mobile App Developer
                                </p>
                            </div>
                        </motion.div>

                        <motion.form 
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="md:w-3/5 space-y-4"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="relative">
                                <label htmlFor="name" className="flex items-center text-xs font-medium text-slate-300 mb-1">
                                    <User className="w-3 h-3 mr-1" />
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    name="name" 
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                />
                            </div>
                            
                            <div className="relative">
                                <label htmlFor="email" className="flex items-center text-xs font-medium text-slate-300 mb-1">
                                    <Mail className="w-3 h-3 mr-1" />
                                    Your Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email address"
                                    className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                />
                            </div>
                            
                            <div className="relative">
                                <label htmlFor="message" className="flex items-center text-xs font-medium text-slate-300 mb-1">
                                    <MessageSquare className="w-3 h-3 mr-1" />
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project or inquiry"
                                    className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                                    rows={3}
                                ></textarea>
                            </div>
                            
                            {submitStatus && (
                                <div className={`p-2 rounded-lg flex items-center space-x-2 ${
                                    submitStatus.success ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                                }`}>
                                    {submitStatus.success ? 
                                        <Check className="w-4 h-4" /> : 
                                        <AlertCircle className="w-4 h-4" />
                                    }
                                    <span className="text-sm">{submitStatus.message}</span>
                                </div>
                            )}
                            
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 ${
                                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                <Send className="w-3 h-3 ml-1" />
                            </motion.button>
                        </motion.form>
                    </div>
                </div>
            </div>
        </section>
    );
}