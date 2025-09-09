// src/components/MovieItem/index.js
import {useMemo, useState} from 'react'
import Popup from 'reactjs-popup'
import ReactPlayer from 'react-player'
import {IoMdClose} from 'react-icons/io'

import 'reactjs-popup/dist/index.css'
import './index.css'

// turn watch/shorts/youtu.be URLs into /embed and keep start time
function toYouTubeEmbed(url) {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    const isYT = /^(youtube\.com|youtu\.be)$/.test(host)
    if (!isYT) return null

    let id = ''
    // support youtu.be/<id>, youtube.com/watch?v=<id>, youtube.com/shorts/<id>
    if (host === 'youtu.be') {
      id = u.pathname.slice(1)
    } else if (u.pathname.startsWith('/watch')) {
      id = u.searchParams.get('v') || ''
    } else if (u.pathname.startsWith('/shorts/')) {
      id = u.pathname.split('/')[2] || ''
    }

    if (!id) return null

    // parse start time: supports t=90, t=1m30s, start=90, t=90s
    const t = u.searchParams.get('t') || u.searchParams.get('start') || ''
    const start = parseStartSeconds(t)

    const params = new URLSearchParams()
    if (start) params.set('start', String(start))
    // you can add extras if you want:
    // params.set('rel', '0'); params.set('modestbranding', '1')

    const qs = params.toString()
    return `https://www.youtube.com/embed/${id}${qs ? `?${qs}` : ''}`
  } catch {
    return null
  }
}

function parseStartSeconds(t) {
  if (!t) return 0
  // pure number
  if (/^\d+$/.test(t)) return parseInt(t, 10)
  // 1h2m3s / 2m10s / 45s
  let sec = 0
  const h = t.match(/(\d+)h/i); if (h) sec += parseInt(h[1], 10) * 3600
  const m = t.match(/(\d+)m/i); if (m) sec += parseInt(m[1], 10) * 60
  const s = t.match(/(\d+)s/i); if (s) sec += parseInt(s[1], 10)
  return sec
}

const MovieItem = ({movieDetails}) => {
  const {thumbnailUrl, videoUrl, title = 'Trailer'} = movieDetails
  const [open, setOpen] = useState(false)

  const embedUrl = useMemo(() => toYouTubeEmbed(videoUrl), [videoUrl])

  return (
    <div className="movie-card">
      <img
        className="thumbnail"
        src={thumbnailUrl}
        alt={title}
        onClick={() => setOpen(true)}
      />

      <Popup
        modal
        nested
        open={open}
        onClose={() => setOpen(false)}
        lockScroll
        closeOnDocumentClick
        overlayClassName="pv-overlay"
        contentStyle={{ background: 'transparent', border: 'none', padding: 0 }}
      >
        <div className="pv-modal" role="dialog" aria-label={`${title} player`}>
          <button
            className="pv-close"
            type="button"
            data-testid="closeButton"
            onClick={() => setOpen(false)}
            aria-label="close"
            title="Close"
          >
            <IoMdClose size={22} />
          </button>

          <div className="pv-player-wrap">
            {embedUrl ? (
              <iframe
                title={title}
                src={embedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
            ) : (
              <ReactPlayer
                url={videoUrl}
                controls
                playsinline
                width="100%"
                height="100%"
                onError={(e) => console.error('Player error:', e)}
              />
            )}
          </div>
        </div>
      </Popup>
    </div>
  )
}

export default MovieItem
