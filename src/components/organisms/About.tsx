import React, { useEffect, useState, useRef } from 'react'
import Text from '../atoms/Text'
import '../../styles/about.css'

const aboutTexts = [
  {
    title: 'Who Am I?',
    copy: 'I am someone fascinated by creating and observing details that, due to the rush of daily life, go unnoticed by most people. This sensitivity naturally led me to UX design, both because many people sometimes don\'t know how to use a product or service, and because of the opportunity to create solutions that truly optimize, are pleasing, and functional. I believe that the human mind is custom-made and perfect for understanding the world, so the fact that someone cannot use a product is not their problem, but rather a problem with the design projected for the product.',
  },
  {
    title: 'How I Started In Design',
    copy: 'I started in design by combining curiosity with problem-solving. My background in Systems Analysis and Development helped me understand how digital products work technically, but I quickly realized that technology alone doesn\'t create good experiences. For me, design became the bridge between systems and people. I began studying UX/UI since 2024\'s end to learn how to transform complex ideas into clear, usable interfaces, always focusing on how users think, feel, and interact with products.',
  },
  {
    title: 'My Design Mindset',
    copy: 'I believe that good design is not just about aesthetics, but about clarity, intention, and impact. I approach each project by first understanding the problem, the user, and the business context. Influenced by authors such as Don Norman and Steve Krug, I focus on usability, simplicity, and meaningful interactions. My goal is to accelerate people\'s process of leveraging their goals by using the digital products I create.',
  },
]

export default function About() {
  const [isMobile, setIsMobile] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 560)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="about" className="section about-section bg-guidelines">
      <div className="about-grid">
        <div className="about-image-wrap">
          <div id="about-image-anchor" className="about-image-anchor" aria-hidden="true" />
        </div>
        <div className="about-right">
          <div className="pill">Know Me</div>
          <h2 className="display section-title">About Me</h2>

          {isMobile ? (
            <div className="about-accordion">
              {aboutTexts.map((text) => (
                <div key={text.title} className="accordion-item">
                  <button
                    className="accordion-header"
                    onClick={() =>
                      setExpandedItem(expandedItem === text.title ? null : text.title)
                    }
                  >
                    <h3 className="subhead">{text.title}</h3>
                    <span className="accordion-toggle">
                      {expandedItem === text.title ? '−' : '+'}
                    </span>
                  </button>
                  {expandedItem === text.title && (
                    <div className="accordion-content">
                      <Text className="muted reveal-text">{text.copy}</Text>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <>
              {aboutTexts.map((text) => (
                <div key={text.title} className="text-block">
                  <h3 className="subhead">{text.title}</h3>
                  <Text className="muted reveal-text">{text.copy}</Text>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
