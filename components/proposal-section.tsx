"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelloKittyImage, HelloKittyFace, Heart, Sparkle, Star, Bow } from "./hello-kitty"
import confetti from "canvas-confetti"

function TypewriterText({ text, onComplete, speed = 50 }: { text: string; onComplete?: () => void; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    let currentIndex = 0
    setDisplayedText("")
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(typingInterval)
  }, [text, onComplete, speed])

  return (
    <span>
      {displayedText}
      {displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.4, repeat: Infinity }}
          className="inline-block w-1.5 h-6 bg-primary ml-0.5 align-middle"
        />
      )}
    </span>
  )
}

export function ProposalSection() {
  const [stage, setStage] = useState<"intro" | "question" | "celebration">("intro")
  const [messageIndex, setMessageIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const introMessages = [
    "Bueno... llego el momento...",
    "Tengo algo MUY importante que preguntarte...",
    "Estoy un poquito nerviosa... pero aqui voy!",
  ]

  useEffect(() => {
    if (stage === "intro" && messageIndex < introMessages.length) {
      const timer = setTimeout(() => {
        if (messageIndex < introMessages.length - 1) {
          setMessageIndex(messageIndex + 1)
        } else {
          setTimeout(() => setStage("question"), 2500)
        }
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [stage, messageIndex, introMessages.length])

  const handleYes = async () => {
    setStage("celebration")
    
    // Enviar el acta de matrimonio por correo
    try {
      await fetch('/api/send-acta', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Error enviando correo:', error)
    }
    
    const duration = 10 * 1000
    const animationEnd = Date.now() + duration
    const colors = ["#ff1493", "#ff69b4", "#ffb6c1", "#ffffff", "#ffe4ec", "#ff6b95"]

    const frame = () => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return

      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      })

      if (Math.random() > 0.4) {
        confetti({
          particleCount: 10,
          angle: 90,
          spread: 120,
          origin: { x: 0.5, y: 0.3 },
          colors,
          shapes: ["circle"],
          scalar: 1.5,
        })
      }

      requestAnimationFrame(frame)
    }
    frame()

    // Heart burst
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 360,
        origin: { x: 0.5, y: 0.5 },
        colors,
        shapes: ["circle"],
        scalar: 2,
      })
    }, 300)
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-primary/10" />
        
        {/* Floating hearts */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-primary/30"
            initial={{
              x: `${Math.random() * 100}%`,
              y: "110%",
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: "-10%",
              rotate: Math.random() * 360 + 360,
            }}
            transition={{
              duration: Math.random() * 12 + 8,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear",
            }}
          >
            <Heart size={Math.random() * 30 + 15} />
          </motion.div>
        ))}

        {/* Sparkles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-yellow-300/60"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: 0,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Sparkle size={Math.random() * 18 + 10} />
          </motion.div>
        ))}

        {/* Floating bows */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`bow-${i}`}
            className="absolute opacity-20"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [-10, 10, -10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Bow size={60} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [-3, 3, -3] 
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <HelloKittyImage size={250} waving />
            </motion.div>

            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 bg-card rounded-3xl p-6 shadow-2xl border-2 border-primary/60 max-w-md relative"
            >
              {/* Speech bubble tail */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-12 border-r-12 border-b-12 border-l-transparent border-r-transparent border-b-card" />
              <div className="flex items-center gap-2 mb-3 justify-center">
                <HelloKittyFace size={32} expression="happy" />
                <span className="text-sm text-muted-foreground">Hello Kitty dice:</span>
              </div>
              <p className="text-xl text-foreground">
                <TypewriterText text={introMessages[messageIndex]} />
              </p>
            </motion.div>

            {/* Loading dots */}
            <motion.div 
              className="flex gap-3 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full bg-primary"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {stage === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            {/* Hello Kitty with big speech bubble */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative"
            >
              <HelloKittyImage size={260} animate />
              
              {/* Floating hearts around Kitty */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-primary"
                  initial={{ 
                    x: -40 + i * 18, 
                    y: -30,
                    scale: 0 
                  }}
                  animate={{ 
                    y: [-30, -70, -30],
                    scale: [0.5, 1.2, 0.5],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    delay: i * 0.25 
                  }}
                >
                  <Heart size={18} />
                </motion.div>
              ))}
            </motion.div>

            {/* The big question */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 mb-10"
            >
              <motion.div 
                className="bg-gradient-to-br from-card via-card to-secondary/30 rounded-3xl p-8 md:p-10 shadow-2xl border-3 border-primary relative"
                animate={{ 
                  boxShadow: [
                    "0 0 30px rgba(255, 20, 147, 0.3)",
                    "0 0 50px rgba(255, 20, 147, 0.5)",
                    "0 0 30px rgba(255, 20, 147, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Decorative corners */}
                <div className="absolute top-2 left-2">
                  <Bow size={30} />
                </div>
                <div className="absolute top-2 right-2 scale-x-[-1]">
                  <Bow size={30} />
                </div>
                
                <div className="flex items-center gap-2 justify-center mb-4">
                  <HelloKittyFace size={36} expression="love" />
                  <span className="text-base text-foreground/70">Ricardo el amor de tu vida pregunta:</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary text-balance leading-tight">
                  <TypewriterText text="Quieres ser mi novia?" speed={80} />
                </h2>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="text-base md:text-lg text-foreground/60 mt-6 italic max-w-md"
              >
                Prometo hacerte feliz todos los dias de mi vida y quererte por siempre...
              </motion.p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4 }}
              className="flex flex-col sm:flex-row gap-6 items-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    "0 0 0px rgba(255, 20, 147, 0)",
                    "0 0 40px rgba(255, 20, 147, 0.7)",
                    "0 0 0px rgba(255, 20, 147, 0)"
                  ]
                }}
                transition={{ 
                  boxShadow: { duration: 1.5, repeat: Infinity }
                }}
                onClick={handleYes}
                className="group relative px-16 py-6 bg-gradient-to-r from-primary via-pink-500 to-primary text-white rounded-full text-2xl font-bold shadow-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-4">
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Heart size={30} />
                  </motion.span>
                  Si, acepto!
                  <motion.span
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
                  >
                    <Heart size={30} />
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 via-primary to-pink-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
              
              <NoButton />
            </motion.div>
          </motion.div>
        )}

        {stage === "celebration" && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 flex flex-col items-center text-center px-4"
          >
            {/* Dancing Hello Kitty */}
            <HelloKittyImage size={300} dancing />
            
            {/* Celebration text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <motion.h2 
                className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-pink-400 to-primary mb-6"
                animate={{ 
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                style={{ backgroundSize: "200%" }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                SIIII!
              </motion.h2>
              
              {/* Hello Kitty response bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="bg-card rounded-3xl p-6 shadow-2xl border-2 border-primary max-w-lg mx-auto mb-6"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <HelloKittyFace size={44} expression="love" />
                  <span className="text-sm text-muted-foreground">Hello Kitty dice:</span>
                </div>
                <p className="text-lg md:text-xl text-foreground">
                  <TypewriterText 
                    text="Que emocion tan grande! Este es el dia mas feliz! Se que van a ser muy muy felices juntos. Los quiero mucho!" 
                    speed={40}
                  />
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="text-xl md:text-2xl text-foreground mb-4"
              >
                Gracias por decir que si, mi amor...
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
                className="text-base text-foreground/70 max-w-md mx-auto"
              >
                Te prometo cuidarte, quererte y hacerte sonreir todos los dias. Te quiero muchisimo.
              </motion.p>
            </motion.div>

            {/* Celebration hearts */}
            <motion.div 
              className="flex gap-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5 }}
            >
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -35, 0],
                    scale: [1, 1.4, 1],
                    rotate: [0, i % 2 === 0 ? 20 : -20, 0]
                  }}
                  transition={{ 
                    duration: 0.7, 
                    delay: i * 0.1, 
                    repeat: Infinity,
                    repeatDelay: 0.3
                  }}
                  className="text-primary"
                >
                  <Heart size={40} />
                </motion.div>
              ))}
            </motion.div>

            {/* Stars burst */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute text-yellow-400"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  opacity: 0 
                }}
                animate={{ 
                  x: Math.cos(i * Math.PI / 6) * 200,
                  y: Math.sin(i * Math.PI / 6) * 200,
                  scale: [0, 1.8, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  delay: i * 0.15 + 0.5
                }}
              >
                <Star size={35} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function NoButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [attempts, setAttempts] = useState(0)

  const messages = [
    "No estoy segura...",
    "Espera, dejame pensar!",
    "Jajaja no puedes!",
    "Sigue intentando!",
    "No me atraparas!",
    "Hello Kitty dice SI!",
    "Rendite y di que si!",
  ]

  const runAway = () => {
    const x = (Math.random() - 0.5) * 400
    const y = (Math.random() - 0.5) * 300
    setPosition({ x, y })
    setAttempts(prev => prev + 1)
  }

  return (
    <motion.button
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onMouseEnter={runAway}
      onTouchStart={runAway}
      className="px-10 py-5 bg-secondary text-secondary-foreground rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-shadow"
    >
      {messages[Math.min(attempts, messages.length - 1)]}
    </motion.button>
  )
}
