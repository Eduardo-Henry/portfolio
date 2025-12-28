import React, { useRef, useEffect, useState, useCallback } from 'react'
import ProfilePhoto from '../../assets/ProfilePhotoEntire.png'
import '../../styles/image-parallax.css'

const BASE_WIDTH = 350
const ASPECT_RATIO = 0.85

type StyleState = {
  width: number
  height: number
  left: number
  top: number
  opacity: number
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress

export default function ImageParallax() {
  const heroAnchorRef = useRef<HTMLElement | null>(null)
  const aboutAnchorRef = useRef<HTMLElement | null>(null)
  const heroSectionRef = useRef<HTMLElement | null>(null)
  const aboutSectionRef = useRef<HTMLElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const activationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [parallaxReady, setParallaxReady] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [styleState, setStyleState] = useState<StyleState>({
    width: BASE_WIDTH,
    height: BASE_WIDTH * ASPECT_RATIO,
    left: 0,
    top: 0,
    opacity: 0,
  })

  // Detectar mobile - SEMPRE executado
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const resolveAnchors = useCallback(() => {
    heroAnchorRef.current = document.getElementById('hero-image-anchor')
    aboutAnchorRef.current = document.getElementById('about-image-anchor')
    heroSectionRef.current = document.getElementById('home')
    aboutSectionRef.current = document.getElementById('about')
  }, [])

  const updatePosition = useCallback(() => {
    const heroAnchor = heroAnchorRef.current
    const heroSection = heroSectionRef.current
    if (!heroAnchor || !heroSection) return

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const scrollY = window.scrollY
    const timelineLine = scrollY + viewportHeight * 0.15

    const heroSectionRect = heroSection.getBoundingClientRect()
    const heroSectionTop = heroSectionRect.top + scrollY

    const aboutSection = aboutSectionRef.current
    const aboutSectionRect = aboutSection?.getBoundingClientRect()
    const aboutSectionTop = aboutSectionRect ? aboutSectionRect.top + scrollY : heroSectionTop + viewportHeight
    const aboutSectionBottom = aboutSectionRect ? aboutSectionTop + aboutSectionRect.height : aboutSectionTop + viewportHeight

    const activeStart = heroSectionTop - viewportHeight * 0.1
    const activeEnd = aboutSectionTop + (aboutSectionRect?.height || 0) * 0.5
    const isActive = timelineLine >= activeStart && timelineLine <= activeEnd

    const heroRect = heroAnchor.getBoundingClientRect()
    const aboutAnchor = aboutAnchorRef.current
    const aboutRect = aboutAnchor?.getBoundingClientRect()

    const heroCenter = {
      x: heroRect.left + heroRect.width / 2,
      y: heroRect.top + heroRect.height / 2,
    }

    const aboutCenter = aboutRect
      ? {
          x: aboutRect.left + aboutRect.width / 2,
          y: aboutRect.top + aboutRect.height / 2,
        }
      : {
          x: viewportWidth * 0.65,
          y: aboutSectionRect ? aboutSectionRect.top + aboutSectionRect.height / 2 : viewportHeight / 2,
        }

    const heroWidth = heroRect.width || BASE_WIDTH
    const heroHeight = heroRect.height || heroWidth * ASPECT_RATIO
    const maxTargetWidth = viewportWidth * (viewportWidth > 1280 ? 0.38 : 0.5)
    const targetWidth = clamp(maxTargetWidth, heroWidth, viewportWidth * 0.62)
    const targetHeight = targetWidth * ASPECT_RATIO
    const aboutWidth = clamp(aboutRect?.width || heroWidth, 240, 520)
    const aboutHeight = aboutWidth * ASPECT_RATIO
    const viewportCenter = { x: viewportWidth / 2, y: viewportHeight / 2 }

    if (!parallaxReady) {
      setStyleState({
        width: heroWidth,
        height: heroHeight,
        left: viewportWidth - heroWidth - 20,
        top: heroCenter.y - heroHeight / 2,
        opacity: 1,
      })
      return
    }

    if (!isActive) {
      setStyleState(prev => ({ ...prev, opacity: 0 }))
      return
    }

    if (timelineLine <= heroSectionTop) {
      setStyleState({
        width: heroWidth,
        height: heroHeight,
        left: viewportWidth - heroWidth - 20,
        top: heroCenter.y - heroHeight / 2,
        opacity: 1,
      })
      return
    }

    if (timelineLine >= aboutSectionTop) {
      setStyleState({
        width: aboutWidth,
        height: aboutHeight,
        left: aboutCenter.x - aboutWidth / 2,
        top: aboutCenter.y - aboutHeight / 2,
        opacity: 1,
      })
      return
    }

    const sectionSpan = Math.max(aboutSectionTop - heroSectionTop, viewportHeight)
    const focusRange = Math.max(1, sectionSpan * 1.2)
    const sectionProgress = clamp((timelineLine - heroSectionTop) / focusRange, 0, 1)
    
    const smoothProgress = sectionProgress * sectionProgress * (3 - 2 * sectionProgress)
    
    const width = heroWidth + (aboutWidth - heroWidth) * smoothProgress
    const height = heroHeight + (aboutHeight - heroHeight) * smoothProgress
    const targetX = heroCenter.x + (aboutCenter.x - heroCenter.x) * smoothProgress
    const targetY = heroCenter.y + (aboutCenter.y - heroCenter.y) * smoothProgress
    
    setStyleState({
      width,
      height,
      left: targetX - width / 2,
      top: targetY - height / 2,
      opacity: 1,
    })
  }, [parallaxReady])

  useEffect(() => {
    resolveAnchors()

    const handleScroll = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(updatePosition)

      if (!parallaxReady && window.scrollY > 2 && activationTimeoutRef.current === null) {
        activationTimeoutRef.current = window.setTimeout(() => {
          setParallaxReady(true)
          activationTimeoutRef.current = null
        }, 100)
      }
    }

    const handleResize = () => {
      resolveAnchors()
      handleScroll()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    handleScroll()

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      if (activationTimeoutRef.current) {
        clearTimeout(activationTimeoutRef.current)
        activationTimeoutRef.current = null
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [parallaxReady, resolveAnchors, updatePosition])

  // SE FOR MOBILE, RENDERIZAR VAZIO - MAS OS HOOKS JÁ FORAM EXECUTADOS
  if (isMobile) {
    return null
  }

  return (
    <div className="parallax-layer" aria-hidden="true">
      <img
        src={ProfilePhoto}
        alt="Eduardo Carvalho"
        className="parallax-image"
        style={{
          width: `${styleState.width}px`,
          height: `${styleState.height}px`,
          left: `${styleState.left}px`,
          top: `${styleState.top}px`,
          opacity: styleState.opacity,
        }}
      />
    </div>
  )
}
