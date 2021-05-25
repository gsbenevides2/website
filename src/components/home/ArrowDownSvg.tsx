import React from 'react'

import theme from '../../styles/theme'

export function ArrowDownSvg(): React.ReactElement {
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
        className="icon"
        stroke={theme.colors.white}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14" />
        <path d="M19 12l-7 7l-7-7" />
      </g>
    </svg>
  )
}
