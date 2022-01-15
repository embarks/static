import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { ThemeProvider as StyledComponentsProvider } from "styled-components"
import { THEME_COLORS } from "./colors"
import { create } from "./create"
import empowerTheme from "./bases/empower.json"

export const THEME_NAMES = Object.keys(THEME_COLORS)

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children, theme: themeId = "empower" }) => {
  const memoizedTheme = useMemo(() => create(THEME_COLORS[themeId]), [themeId])
  return (
    <StyledComponentsProvider theme={memoizedTheme}>
      {children}
    </StyledComponentsProvider>
  )
}

ThemeProvider.displayName = "CustomThemeProvider"

ThemeProvider.propTypes = {
  themeName: PropTypes.string,
  children: PropTypes.node,
}

const defaultTheme = create(empowerTheme)

defaultTheme.create = (themeColors) => create(themeColors)

export default defaultTheme
