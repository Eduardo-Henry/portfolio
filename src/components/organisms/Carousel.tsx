import React from 'react'
import '../../styles/carousel.css'

const phrases = [
  'Let me transform your ideas into reality',
  'Turn vision into design excellence',
  'Discover the power of techniques that transform ideas into reality.',
  'Design systems built for accessibility and clarity.',
  'Performance meets beauty in every interface.',
]

export default function Carousel() {
  return (
    <section className="carousel-section">
      <div className="carousel-wrapper">
        <div className="carousel-track">
          {/* Original phrases */}
          {phrases.map((phrase, i) => (
            <div key={`original-${i}`} className="carousel-item">
              <span className="carousel-dot" />
              <p className="carousel-text">{phrase}</p>
            </div>
          ))}
          {/* Duplicated for seamless loop */}
          {phrases.map((phrase, i) => (
            <div key={`duplicate-${i}`} className="carousel-item">
              <span className="carousel-dot" />
              <p className="carousel-text">{phrase}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
