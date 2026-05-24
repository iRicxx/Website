"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// Componente principal usando la imagen real de Hello Kitty
export function HelloKittyImage({ 
  className = "", 
  size = 200,
  animate = true,
  waving = false,
  dancing = false
}: { 
  className?: string
  size?: number
  animate?: boolean
  waving?: boolean
  dancing?: boolean
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={dancing ? { 
        rotate: [0, -8, 8, -8, 0],
        y: [0, -15, 0],
        scale: [1, 1.05, 1] 
      } : animate ? { 
        y: [0, -12, 0],
      } : {}}
      transition={dancing ? { 
        duration: 0.8, 
        repeat: Infinity,
        ease: "easeInOut"
      } : { 
        duration: 3, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {waving && (
        <motion.div
          className="absolute -top-4 -right-2 text-primary"
          animate={{ 
            rotate: [0, 20, -10, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
        >
          <span className="text-3xl">👋</span>
        </motion.div>
      )}
      <Image
        src="/images/hello-kitty.png"
        alt="Hello Kitty"
        width={size}
        height={size}
        className="drop-shadow-2xl"
        priority
      />
    </motion.div>
  )
}

// SVG Hello Kitty para usar en iconos pequenos
export function HelloKittyFace({ 
  className = "", 
  size = 120,
  expression = "normal" 
}: { 
  className?: string
  size?: number
  expression?: "normal" | "happy" | "love"
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
    >
      {/* Face */}
      <ellipse cx="50" cy="52" rx="42" ry="38" fill="white" stroke="#333" strokeWidth="2" />
      
      {/* Left ear */}
      <ellipse cx="18" cy="22" rx="14" ry="17" fill="white" stroke="#333" strokeWidth="2" />
      
      {/* Right ear */}
      <ellipse cx="82" cy="22" rx="14" ry="17" fill="white" stroke="#333" strokeWidth="2" />
      
      {/* Bow - hot pink like the image */}
      <ellipse cx="88" cy="15" rx="10" ry="8" fill="#ff1493" stroke="#cc0066" strokeWidth="1" />
      <ellipse cx="100" cy="8" rx="12" ry="9" fill="#ff1493" stroke="#cc0066" strokeWidth="1" />
      <ellipse cx="100" cy="24" rx="12" ry="9" fill="#ff1493" stroke="#cc0066" strokeWidth="1" />
      <circle cx="92" cy="15" r="5" fill="#ff69b4" />
      
      {/* Eyes based on expression */}
      {expression === "love" ? (
        <>
          <path d="M30 48 L35 42 L40 48 L35 54 Z" fill="#ff1493" />
          <path d="M60 48 L65 42 L70 48 L65 54 Z" fill="#ff1493" />
        </>
      ) : expression === "happy" ? (
        <>
          <path d="M30 52 Q35 45 40 52" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M60 52 Q65 45 70 52" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="35" cy="50" rx="5" ry="6" fill="#333" />
          <ellipse cx="65" cy="50" rx="5" ry="6" fill="#333" />
        </>
      )}
      
      {/* Nose - yellow */}
      <ellipse cx="50" cy="60" rx="5" ry="3.5" fill="#ffcc00" />
      
      {/* Blush */}
      <ellipse cx="20" cy="58" rx="8" ry="5" fill="#ff69b4" opacity="0.5" />
      <ellipse cx="80" cy="58" rx="8" ry="5" fill="#ff69b4" opacity="0.5" />
      
      {/* Whiskers */}
      <line x1="8" y1="52" x2="25" y2="56" stroke="#333" strokeWidth="1.5" />
      <line x1="8" y1="60" x2="25" y2="60" stroke="#333" strokeWidth="1.5" />
      <line x1="8" y1="68" x2="25" y2="64" stroke="#333" strokeWidth="1.5" />
      <line x1="75" y1="56" x2="92" y2="52" stroke="#333" strokeWidth="1.5" />
      <line x1="75" y1="60" x2="92" y2="60" stroke="#333" strokeWidth="1.5" />
      <line x1="75" y1="64" x2="92" y2="68" stroke="#333" strokeWidth="1.5" />
    </svg>
  )
}

export function Heart({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export function Bow({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 80 50"
      width={size}
      height={size * 0.625}
      className={className}
    >
      {/* Hot pink bow to match the Hello Kitty image */}
      <ellipse cx="20" cy="25" rx="18" ry="14" fill="#ff1493" stroke="#cc0066" strokeWidth="1.5" />
      <ellipse cx="60" cy="25" rx="18" ry="14" fill="#ff1493" stroke="#cc0066" strokeWidth="1.5" />
      <circle cx="40" cy="25" r="10" fill="#ff69b4" stroke="#cc0066" strokeWidth="1.5" />
      {/* Polka dots like in the image */}
      <circle cx="15" cy="22" r="3" fill="#000" opacity="0.3" />
      <circle cx="25" cy="28" r="3" fill="#000" opacity="0.3" />
      <circle cx="55" cy="22" r="3" fill="#000" opacity="0.3" />
      <circle cx="65" cy="28" r="3" fill="#000" opacity="0.3" />
    </svg>
  )
}

export function Star({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export function Sparkle({ className = "", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  )
}
