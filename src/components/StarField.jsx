import { useEffect, useRef } from 'react'

export default function StarField() {
  const starsRef = useRef(null)

  useEffect(() => {
    const stars = starsRef.current
    if (!stars) return

    const starCount = 200

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div')
      star.classList.add('star')

      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = Math.random() * 2 + 1
      const duration = Math.random() * 5 + 3
      const delay = Math.random() * 8

      star.style.left = `${x}%`
      star.style.top = `${y}%`
      star.style.width = `${size}px`
      star.style.height = `${size}px`
      star.style.setProperty('--duration', `${duration}s`)
      star.style.animationDelay = `${delay}s`

      stars.appendChild(star)
    }

    return () => {
      stars.innerHTML = ''
    }
  }, [])

  return <div className="stars" ref={starsRef}></div>
}
