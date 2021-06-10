import React from 'react'

import theme from '../../styles/theme'

export function InstagramSvg(): React.ReactElement {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke={theme.colors.white}
        className="icon"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8A4 4 0 0 1 16 11.37z" />
        <path d="M17.5 6.5h.01" />
      </g>
    </svg>
  )
}
