import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { darken, lighten } from "polished"
import { ThemeProvider as StyledComponentsProvider } from "styled-components"
import DEFAULT_THEME from "./constants/colors/spacedust.json"

export const THEME_NAMES = [
  "colbalt-neon",
  "dotgov",
  "fideloper",
  "manpage",
  "monalisa",
  "seashells",
  "solarized",
  "spacedust",
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
    secondary: [themeColors.dark, themeColors.text, themeColors.dark],
    info: [themeColors.black, themeColors.brightGreen, themeColors.black],
    success: [themeColors.black, themeColors.green, themeColors.black],
    danger: [themeColors.text, themeColors.red, themeColors.text],
    error: [themeColors.black, themeColors.brightRed, themeColors.black],
    warn: [themeColors.darker, themeColors.brightYellow, themeColors.dark],
    link: [themeColors.blue, themeColors.brightCyan, themeColors.text],
    dark: [themeColors.light, themeColors.dark, themeColors.brightBlack],
    light: [themeColors.dark, themeColors.light, themeColors.dark],
    bright: [themeColors.black, themeColors.yellow, themeColors.black],
    bold: [themeColors.main, themeColors.bold, themeColors.main],
    black: [
      themeColors.light,
      themeColors.brightBlack,
      lighten(0.08, themeColors.black),
    ],
    subtle: [themeColors.text, themeColors.main, themeColors.main],
    notice: [themeColors.black, themeColors.magenta, themeColors.black],
    funky: [themeColors.darker, themeColors.brightMagenta, themeColors.green],
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
      return createThemeObj(themeColors)
    }
    fetchTheme().then((newTheme) => setTheme(newTheme))
  }, [setThemeId, themeId, setTheme])

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
