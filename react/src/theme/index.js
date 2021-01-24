import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { darken, lighten } from "polished"
import { ThemeProvider as StyledComponentsProvider } from "styled-components"
import DEFAULT_THEME from "./constants/colors/spacedust.json"

export const THEME_NAMES = [
  "dotgov",
  "fideloper",
  "manpage",
  "monalisa",
  "seashells",
  "spacedust",
  "desert",
  "belefonte",
  "chalkboard",
  "earthsong",
  "ollie",
  "spacegray",
  "zenburn",
]

async function getThemeColors(key) {
  return import(`./constants/colors/${key}.json`)
}

const createThemeObj = (themeColors = DEFAULT_THEME) => {
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
      themeColors.brightYellow,
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

const CustomThemeContext = React.createContext({
  theme: {},
  setTheme: {},
})

export const ThemeProvider = ({ themeName, children }) => {
  const [themeId, setThemeId] = useState(themeName)
  const [theme, setTheme] = useState(createThemeObj(DEFAULT_THEME))

  useEffect(() => {
    const fetchTheme = async () => {
      const themeColors = await getThemeColors(themeId)
      const newTheme = createThemeObj(themeColors.default)
      console.log("new theme", newTheme.colors)
      return newTheme
    }
    fetchTheme().then((newTheme) => setTheme(newTheme))
  }, [setThemeId, themeId, setTheme])

  console.log("refresh", theme.colors.main)
  return (
    <CustomThemeContext.Provider value={{ theme, setTheme: setThemeId }}>
      <StyledComponentsProvider theme={theme}>
        {children}
      </StyledComponentsProvider>
    </CustomThemeContext.Provider>
  )
}

ThemeProvider.displayName = "CustomThemeProvider"

export const useTheme = (themeName) => {
  const { theme, setTheme } = React.useContext(CustomThemeContext)
  React.useEffect(() => {
    setTheme(themeName)
  }, [themeName, setTheme])
  return { theme, setTheme }
}

ThemeProvider.propTypes = {
  themeName: PropTypes.string,
  children: PropTypes.node,
}

export default createThemeObj(DEFAULT_THEME)
