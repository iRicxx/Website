"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelloKittyImage, HelloKittyFace, Heart, Bow, Sparkle, Star } from "./hello-kitty"

interface ChatBubbleProps {
  message: string
  delay?: number
  onComplete?: () => void
  position?: "left" | "right"
}

export function ChatBubble({ message, delay = 0, onComplete, position = "right" }: ChatBubbleProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [showBubble, setShowBubble] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowBubble(true)
    }, delay)

    return () => clearTimeout(showTimer)
  }, [delay])

  useEffect(() => {
    if (!showBubble) return

    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(message.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsComplete(true)
        onComplete?.()
      }
    }, 35)

    return () => clearInterval(typingInterval)
  }, [message, onComplete, showBubble])

  if (!showBubble) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`relative bg-card rounded-3xl p-5 shadow-xl border-2 border-primary/50 max-w-sm ${
        position === "left" ? "ml-4" : "mr-4"
      }`}
    >
      {/* Bubble tail */}
      <div 
        className={`absolute bottom-4 w-4 h-4 bg-card border-b-2 border-primary/50 rotate-45 ${
          position === "left" 
            ? "-left-2 border-l-2" 
            : "-right-2 border-r-2"
        }`} 
      />
      
      <p className="text-foreground text-base md:text-lg leading-relaxed">
        {displayedText}
        {!isComplete && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-2 h-5 bg-primary ml-1 align-middle"
          />
        )}
      </p>
    </motion.div>
  )
}

interface TimelineItemProps {
  icon: React.ReactNode
  title: string
  message: string
  delay: number
  isLast?: boolean
  kittyExpression?: "normal" | "happy" | "love"
}

export function TimelineItem({ icon, title, message, delay, isLast, kittyExpression = "normal" }: TimelineItemProps) {
  const [showMessage, setShowMessage] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setShowMessage(true)}
      className="relative flex gap-4 md:gap-6 pb-16"
    >
      {/* Timeline line with gradient */}
      {!isLast && (
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: "calc(100% - 40px)" }}
          transition={{ duration: 1, delay: delay * 0.1 + 0.5 }}
          viewport={{ once: true }}
          className="absolute left-[31px] md:left-[35px] top-[85px] w-1.5 bg-gradient-to-b from-primary via-accent to-primary/30 rounded-full" 
        />
      )}
      
      {/* Icon circle with glow effect */}
      <motion.div
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-10 flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-full bg-card shadow-lg border-3 border-primary"
      >
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-primary/30 blur-md"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="relative">{icon}</div>
      </motion.div>
      
      {/* Content card with Hello Kitty speaking */}
      <div className="flex-1 space-y-3">
        <motion.div
          whileHover={{ scale: 1.02, y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="rounded-3xl bg-gradient-to-br from-card to-secondary/40 p-5 md:p-6 shadow-xl border border-border/50 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HelloKittyFace size={40} expression={kittyExpression} />
            </motion.div>
            <h3 className="text-lg md:text-xl font-bold text-primary">{title}</h3>
          </div>
          
          <AnimatePresence>
            {showMessage && (
              <ChatBubble message={message} delay={300} position="left" />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Timeline() {
  const items = [
    {
      icon: (
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HelloKittyFace size={48} expression="happy" />
        </motion.div>
      ),
      title: "Hola, soy Hello Kitty!",
      message: "Vine desde muy lejos porque alguien muy especial me pidio que te contara algo... Pon mucha atencion porque es muy importante!",
      expression: "happy" as const,
    },
    {
      icon: (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-primary"
        >
          <Heart size={36} />
        </motion.div>
      ),
      title: "Un encuentro magico",
      message: "Desde el primer momento en que te vio, supo que eras diferente a todas las demas. Tu sonrisa ilumino su mundo completito!",
      expression: "love" as const,
    },
    {
      icon: (
        <motion.div
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Bow size={48} />
        </motion.div>
      ),
      title: "Momentos inolvidables",
      message: "Cada segundo contigo es como un regalo del cielo. Las risas, los abrazos, los mensajitos... todo es perfecto cuando estas cerca de el!",
      expression: "happy" as const,
    },
    {
      icon: (
        <motion.div
          animate={{ scale: [0, 1.3, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-yellow-400"
        >
          <Star size={32} />
        </motion.div>
      ),
      title: "Un amor que crece",
      message: "Con cada dia que pasa, ese sentimiento se hace mas y mas fuerte. Es imposible no pensar en ti, no soniar contigo, no querer estar siempre a tu lado...",
      expression: "love" as const,
    },
    {
      icon: (
        <motion.div
          animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HelloKittyFace size={48} expression="love" />
        </motion.div>
      ),
      title: "La gran pregunta",
      message: "Por eso estoy aqui, para hacerte la pregunta mas importante de todas... Sigue bajando para descubrirla!",
      expression: "love" as const,
    },
  ]

  return (
    <div className="mx-auto max-w-2xl px-4">
      {/* Header decoration */}
      <motion.div
        className="flex justify-center mb-10"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring" }}
      >
        <HelloKittyImage size={150} animate />
      </motion.div>
      
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          icon={item.icon}
          title={item.title}
          message={item.message}
          delay={index}
          isLast={index === items.length - 1}
          kittyExpression={item.expression}
        />
      ))}
      
      {/* Decorative elements between timeline items */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`deco-${i}`}
          className="absolute text-primary/20"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + i * 18}%`,
          }}
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Heart size={20} />
        </motion.div>
      ))}
    </div>
  )
}
