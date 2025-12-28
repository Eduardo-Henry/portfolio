import React from 'react'
import Text from '../atoms/Text'
import ProfilePhoto from '../../assets/ProfilePhotoEntire.png'
import '../../styles/hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero bg-guidelines">
      <div className="hero-grid">
        <div className="hero-left">
          <span className="eyebrow">Eduardo</span>
          <h1 className="display">Carvalho</h1>
          <div className="intro-block">
            <span className="intro-label muted">[intro]</span>
            <Text className="intro-text muted">
              Designing intuitive digital experiences where clarity meets purpose.
              I am UX/UI Designer focused on usability, systems, and human-centered design.
            </Text>
          </div>
          <div className="scroll-hint" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="hint-text">Scroll to explore</span>
            <span className="hint-arrow">v</span>
          </div>
        </div>
        <div className="hero-right" aria-hidden="true">
          <div className="hero-photo-frame">
            <div id="hero-image-anchor" className="hero-image-anchor" />
            <img src={ProfilePhoto} alt="" className="hero-static-photo" />
          </div>
        </div>
      </div>
    </section>
  )
}
