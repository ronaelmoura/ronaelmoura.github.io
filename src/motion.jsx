import { useEffect, useRef, useState } from 'react'

const prefersCoarseOrReduced = () =>
  window.matchMedia('(pointer: coarse)').matches ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function ScrollProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const ratio = max > 0 ? h.scrollTop / max : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])
  return <div className="scroll-progress" aria-hidden="true"><i ref={barRef} /></div>
}

export function Aurora() {
  return <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
}

export function CursorGlow() {
  useEffect(() => {
    if (prefersCoarseOrReduced()) return undefined
    const dot = document.createElement('div')
    dot.className = 'cursor-dot'
    const ring = document.createElement('div')
    ring.className = 'cursor-ring'
    document.body.append(dot, ring)
    document.body.classList.add('has-custom-cursor')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }
    const onOver = (e) => {
      const hoverable = e.target.closest('a, button, input, select, textarea, .tilt')
      ring.classList.toggle('active', !!hoverable)
    }
    let frame
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      frame = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(frame)
      dot.remove()
      ring.remove()
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])
  return null
}

const WEATHER_LABELS = [
  [[0], ['Céu limpo', '☀']],
  [[1, 2, 3], ['Poucas nuvens', '⛅']],
  [[45, 48], ['Neblina', '🌫']],
  [[51, 53, 55, 56, 57], ['Garoa', '🌦']],
  [[61, 63, 65, 66, 67, 80, 81, 82], ['Chuva', '🌧']],
  [[71, 73, 75, 77, 85, 86], ['Neve', '❄']],
  [[95, 96, 99], ['Tempestade', '⛈']],
]

function describeWeather(code) {
  const match = WEATHER_LABELS.find(([codes]) => codes.includes(code))
  return match ? match[1] : ['Tempo estável', '☁']
}

export function WeatherWidget({ className = '' }) {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    const controller = new AbortController()
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-5.09&longitude=-42.80&current=temperature_2m,weather_code&timezone=America%2FFortaleza',
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((data) => data?.current && setWeather(data.current))
      .catch(() => {})
    return () => controller.abort()
  }, [])

  if (!weather) return null
  const [label, icon] = describeWeather(weather.weather_code)
  return <div className={`weather-pill ${className}`} aria-label={`Clima ao vivo em Teresina: ${Math.round(weather.temperature_2m)} graus, ${label}`}>
    <span className="weather-icon">{icon}</span>
    <span><strong>{Math.round(weather.temperature_2m)}°C</strong> em Teresina · {label}</span>
  </div>
}
