import React, { useState } from "react"
import PropTypes from "prop-types"
import { darken, lighten } from "polished"
import { ThemeProvider as StyledComponentsProvider } from "styled-components"
import belefonte_theme from "./constants/colors/belefonte.json";
import chalkboard_theme from "./constants/colors/chalkboard.json";
import desert_theme from "./constants/colors/desert.json";
import dotgov_theme from "./constants/colors/dotgov.json";
import earthsong_theme from "./constants/colors/earthsong.json";
import empower_theme from "./constants/colors/empower.json"
import fideloper_theme from "./constants/colors/fideloper.json";
import manpage_theme from "./constants/colors/manpage.json";
import monalisa_theme from "./constants/colors/monalisa.json";
import ollie_theme from "./constants/colors/ollie.json";
import seashells_theme from "./constants/colors/seashells.json";
import spacedust_theme from "./constants/colors/spacedust.json";
import spacegray_theme from "./constants/colors/spacegray.json";
import zenburn_theme from "./constants/colors/zenburn.json";

export const THEME_COLORS = {
  "dotgov": dotgov_theme,
  "fideloper": fideloper_theme,
  "manpage": manpage_theme,
  "monalisa": monalisa_theme,
  "seashells": seashells_theme,
  "spacedust": spacedust_theme,
  "desert": desert_theme,
  "belefonte": belefonte_theme,
  "chalkboard": chalkboard_theme,
  "earthsong": earthsong_theme,
  "ollie": ollie_theme,
  "spacegray": spacegray_theme,
  "zenburn": zenburn_theme,
  "empower": empower_theme,
}

export const THEME_NAMES = Object.keys(THEME_COLORS)

const createThemeObj = (themeColors = empower_theme) => {
  const VARIANT_COLS = ["text", "bg", "fg", "focus"]

  const VARIANT_MAP = {
    primary: [
      themeColors.text,
      lighten(0.08, themeColors.main),
      themeColors.brightBlack,
    ],
    secondary: [themeColors.darker, themeColors.lighter, themeColors.darker],
    success: [themeColors.black, themeColors.brightGreen, themeColors.black],
    info: [themeColors.brightGreen, themeColors.black, themeColors.green],
    danger: [themeColors.white, themeColors.red, themeColors.white],
    error: [
      themeColors.brightBlack,
      themeColors.brightRed,
      themeColors.brightBlack,
    ],
    warn: [themeColors.darker, themeColors.brightYellow, themeColors.darker],
    link: [themeColors.black, themeColors.cyan, themeColors.black],
    dark: [themeColors.light, themeColors.black, themeColors.brightBlack],
    light: [themeColors.dark, themeColors.light, themeColors.dark],
    bright: [
      themeColors.brightBlack,
      themeColors.yellow,
      themeColors.brightBlack,
    ],
    bold: [themeColors.main, themeColors.bold, themeColors.main],
    black: [
      themeColors.light,
      themeColors.brightBlack,
      lighten(0.1, themeColors.black),
    ],
    subtle: [themeColors.text, themeColors.main, themeColors.main],
    notice: [themeColors.brightBlack, themeColors.magenta, themeColors.black],
    fresh: [themeColors.red, themeColors.white, themeColors.blue],
    funky: [themeColors.white, themeColors.darker, themeColors.brightMagenta],
    clean: [themeColors.blue, themeColors.white, themeColors.brightBlue],
    dirty: [themeColors.brightWhite, themeColors.dark, themeColors.darker],
    evil: [themeColors.brightRed, themeColors.brightBlack, themeColors.red],
    good: [
      themeColors.darker,
      themeColors.brightYellow,
      themeColors.brightMagenta,
    ],

    disabled: [
      themeColors.grey,
      darken(0.2, themeColors.grey),
      themeColors.grey,
    ],
  }

  const VARIANT_COLOR_MAP =
    /* [variant - primary, secondary, etc]: { [key - text, contrast, etc] } */
    Object.fromEntries(
      new Map(
        Object.keys(VARIANT_MAP).map((variantKey) => {
          const variantColorValues = VARIANT_COLS.reduce(
            (colorValues, variantColorKey, index) => {
              const color = VARIANT_MAP[variantKey][index]
              return {
                ...colorValues,
                [variantColorKey]: color,
              }
            },
            {},
          )
          return [variantKey, variantColorValues]
        }),
      ),
    )

  const theme = {
    colors: themeColors, // theme.green, theme.red
    ...VARIANT_COLOR_MAP,
  }

  function variants(variantKey) {
    return VARIANT_MAP[variantKey]
  }

  variants.keys = Object.keys(VARIANT_MAP)
  theme.variants = variants

  const FONT_SIZES_PX = [11, 12, 14, 16, 20]

  const TYPOGRAPHY = {
    sizes: FONT_SIZES_PX.map((v) => `${v}px`),
  }
  theme.fonts = TYPOGRAPHY

  return theme
}

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children, theme: themeId = 'empower' }) => {
  const [theme, setTheme] = useState(createThemeObj(THEME_COLORS[themeId]))

  React.useEffect(() => {
    if (themeId) {
      setTheme(createThemeObj(THEME_COLORS[themeId]))
    }
  }, [themeId])


  return (
    <StyledComponentsProvider theme={theme}>
      {children}
    </StyledComponentsProvider>
  )
}

ThemeProvider.displayName = "CustomThemeProvider"

ThemeProvider.propTypes = {
  themeName: PropTypes.string,
  children: PropTypes.node,
}

export default createThemeObj(empower_theme)
