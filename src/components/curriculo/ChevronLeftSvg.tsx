import React from 'react'

import theme from '../../styles/theme'

export function ChevronLeftSvg(): React.ReactElement {
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6l6-6" />
      </g>
    </svg>
  )
}
