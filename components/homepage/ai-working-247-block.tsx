"use client"

import { MessageSquare, Globe, Mail, Phone, Share2 } from "lucide-react"
import { useEffect, useRef } from "react"

const channels = [
  { 
    icon: MessageSquare, 
    name: "WhatsApp", 
    color: "from-green-500 to-green-600", 
    description: "Direct messaging" 
  },
  { 
    icon: Globe, 
    name: "Website Chatbot", 
    color: "from-blue-500 to-blue-600", 
    description: "Custom widget" 
  },
  { 
    icon: MessageSquare, 
    name: "Messenger", 
    color: "from-blue-600 to-blue-700", 
    description: "Facebook integration" 
  },
  { 
    icon: Share2, 
    name: "Instagram", 
    color: "from-purple-500 via-pink-500 to-orange-500", 
    description: "DM automation" 
  },
  { 
    icon: Mail, 
    name: "Email", 
    color: "from-slate-500 to-slate-600", 
    description: "Automated responses" 
  },
  { 
    icon: Phone, 
    name: "Phone", 
    color: "from-orange-500 to-red-500", 
    description: "Voice receptionist" 
  },
]

export function AIWorking247Block() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="py-20 px-4 relative bg-[#0a0a0f]"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--purple-dark)]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="fade-in-element opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--lime-green)] animate-pulse" />
            <span className="text-white/80">AI Working 24/7</span>
            <span className="text-white/40">—</span>
            <span className="text-[var(--neon-blue)]">Never Miss a Lead</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="fade-in-element opacity-0 text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-4">
          Your AI Team{" "}
          <span className="bg-gradient-to-r from-[var(--neon-blue)] to-[var(--purple-dark)] bg-clip-text text-transparent">
            Never Sleeps
          </span>
        </h2>

        {/* Description */}
        <p className="fade-in-element opacity-0 text-lg text-white/60 text-center max-w-2xl mx-auto mb-12">
          Watch our AI handle real customer interactions around the clock, automatically qualifying leads and booking appointments while you focus on growing your business.
        </p>

        {/* Channel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((channel) => (
            <div
              key={channel.name}
              className="fade-in-element opacity-0 group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${channel.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10 flex items-start gap-4">
                {/* Icon circle with gradient */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${channel.color} flex items-center justify-center shrink-0 shadow-lg`}>
                  <channel.icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Text content */}
                <div>
                  <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-[var(--neon-blue)] transition-colors">
                    {channel.name}
                  </h3>
                  <p className="text-sm text-white/50">
                    {channel.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        :global(.animate-fade-in-up) {
          animation: fade-in-up 0.7s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
