"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { HelloKittyImage, Heart, Bow, Star, Sparkle } from "@/components/hello-kitty"
import { Timeline } from "@/components/timeline"
import { ProposalSection } from "@/components/proposal-section"
import { Volume2, VolumeOff } from "lucide-react"

export default function HomePage() {
  const [hasSpoken, setHasSpoken] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speakMessage = (text: string) => {
    if (!audioEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "es-ES"
    utterance.rate = 0.9
    utterance.pitch = 1.4 // Higher pitch for cute voice
    utterance.volume = 1

    // Try to find a female Spanish voice
    const voices = window.speechSynthesis.getVoices()
    const spanishFemaleVoice = voices.find(
      (voice) => voice.lang.includes("es") && voice.name.toLowerCase().includes("female")
    ) || voices.find(
      (voice) => voice.lang.includes("es")
    )
    
    if (spanishFemaleVoice) {
      utterance.voice = spanishFemaleVoice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  // Load voices when available
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }
  }, [])

  // Speak the greeting after component mounts with a delay
  useEffect(() => {
    if (hasSpoken || !audioEnabled) return

    const timer = setTimeout(() => {
      speakMessage("Hola cosita linda! Preparate porque tengo algo muy especial que mostrarte! Baja para descubrirlo...")
      setHasSpoken(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [hasSpoken, audioEnabled])

  const toggleAudio = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
    setAudioEnabled(!audioEnabled)
  }

  const replayMessage = () => {
    if (audioEnabled) {
      speakMessage("Hola cosita linda! Preparate porque tengo algo muy especial que mostrarte! Baja para descubrirlo...")
    }
  }
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Audio control button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-50 p-3 rounded-full bg-card border-2 border-primary/50 shadow-lg hover:scale-110 transition-transform"
          title={audioEnabled ? "Silenciar a Hello Kitty" : "Activar voz de Hello Kitty"}
        >
          {audioEnabled ? (
            <Volume2 className={`w-6 h-6 text-primary ${isSpeaking ? "animate-pulse" : ""}`} />
          ) : (
            <VolumeOff className="w-6 h-6 text-muted-foreground" />
          )}
        </motion.button>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/10" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating bows */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`bow-${i}`}
              className="absolute opacity-30"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [-10, 10, -10],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <Bow size={50 + Math.random() * 30} />
            </motion.div>
          ))}
          
          {/* Floating hearts */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute text-primary/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <Heart size={20 + Math.random() * 25} />
            </motion.div>
          ))}

          {/* Sparkles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute text-yellow-300/50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            >
              <Sparkle size={15 + Math.random() * 10} />
            </motion.div>
          ))}

          {/* Stars */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-yellow-400/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                rotate: [0, 360],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <Star size={18 + Math.random() * 12} />
            </motion.div>
          ))}
        </div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          {/* Hello Kitty entrance animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
            className="relative"
          >
            <HelloKittyImage size={280} waving animate />

            {/* Floating elements around Hello Kitty */}
            <motion.div
              className="absolute -top-4 -left-8 text-primary"
              animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <Heart size={32} />
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-6 text-yellow-400"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star size={28} />
            </motion.div>
            <motion.div
              className="absolute bottom-10 -left-16 text-primary"
              animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
            >
              <Heart size={24} />
            </motion.div>
            <motion.div
              className="absolute bottom-20 -right-12 text-yellow-300"
              animate={{ scale: [0, 1.2, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Sparkle size={22} />
            </motion.div>
          </motion.div>

          {/* Title with staggered animation */}
          <motion.div className="mt-8 mb-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-primary mb-2 text-balance"
            >
              Hola, cosita linda!
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto w-48"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg md:text-xl text-foreground/70 max-w-md mb-8"
          >
            Hello Kitty vino desde muy lejos para contarte una historia muy bonita...
          </motion.p>

          {/* Animated speech bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            onClick={replayMessage}
            className={`relative bg-card rounded-3xl p-6 shadow-xl border-2 max-w-sm mb-8 cursor-pointer hover:scale-105 transition-transform ${
              isSpeaking ? "border-primary animate-pulse" : "border-primary/50"
            }`}
            title="Haz clic para escuchar de nuevo"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-10 border-r-10 border-b-10 border-l-transparent border-r-transparent border-b-primary/50" />
            
            {/* Speaking indicator */}
            {isSpeaking && (
              <motion.div 
                className="absolute -top-2 -right-2 bg-primary rounded-full p-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <Volume2 className="w-4 h-4 text-primary-foreground" />
              </motion.div>
            )}
            
            <p className="text-foreground text-lg">
              Preparate porque tengo algo muy especial que mostrarte! Baja para descubrirlo...
            </p>
            <div className="flex justify-center gap-1 mt-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Toca para escuchar de nuevo
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-primary"
            >
              <Heart size={40} />
            </motion.div>
            <motion.span 
              className="text-sm text-muted-foreground font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Desliza hacia abajo
            </motion.span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex flex-col items-center text-primary/50"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 relative">
        {/* Section background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              Nuestra Historia
            </h2>
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bow size={40} />
            </motion.div>
            <span className="text-muted-foreground text-lg">Una historia de amor</span>
            <motion.div
              animate={{ rotate: [5, -5, 5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Bow size={40} />
            </motion.div>
          </motion.div>
        </motion.div>

        <Timeline />
      </section>

      {/* Proposal Section */}
      <ProposalSection />

      {/* Footer */}
      <footer className="py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4 text-lg">
            <span>Hecho con mucho</span>
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-primary"
            >
              <Heart size={28} />
            </motion.div>
            <span>para ti</span>
          </div>
          
          <motion.div 
            className="flex justify-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HelloKittyImage size={120} />
          </motion.div>
          
          <motion.p
            className="text-sm text-muted-foreground/60 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Con amor, Hello Kitty y alguien que te quiere mucho
          </motion.p>
        </motion.div>
      </footer>
    </main>
  )
}
