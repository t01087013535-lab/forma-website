'use client'
import ReactDOM from 'react-dom'

export function PreloadResources() {
  ReactDOM.preconnect('https://fonts.googleapis.com')
  ReactDOM.preconnect('https://fonts.gstatic.com', { crossOrigin: 'anonymous' })
  ReactDOM.prefetchDNS('https://cdn.jsdelivr.net')

  return null
}
