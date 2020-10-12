import { darken, lighten } from "polished"

import THEME_COLORS from "./spacedust.json"
const THEME_COLOR_KEYS = Object.keys(THEME_COLORS)

const background = "background"
const contrast = "contrast"
const focus = "focus"
const text = "text"

const VARIANT_MAP = {
  keys: [text, background, contrast, focus],
  primary: [
    THEME_COLORS.text,
    lighten(0.08, THEME_COLORS.black),
    THEME_COLORS.brightBlack,
  ],
  secondary: [THEME_COLORS.dark, THEME_COLORS.text, THEME_COLORS.dark],
  info: [THEME_COLORS.black, THEME_COLORS.brightGreen, THEME_COLORS.black],
  success: [THEME_COLORS.bold, THEME_COLORS.green, THEME_COLORS.bold],
  green: [THEME_COLORS.text, THEME_COLORS.green, THEME_COLORS.text],
  danger: [THEME_COLORS.bold, THEME_COLORS.brightRed, THEME_COLORS.bold],
  error: [THEME_COLORS.black, THEME_COLORS.brightRed, THEME_COLORS.black],
  warn: [THEME_COLORS.dark, THEME_COLORS.brightYellow, THEME_COLORS.dark],
  highlight: [THEME_COLORS.bold, THEME_COLORS.brightCyan, THEME_COLORS.bold],
  link: [THEME_COLORS.light, THEME_COLORS.brightBlue, THEME_COLORS.light],
  dark: [THEME_COLORS.light, THEME_COLORS.dark, THEME_COLORS.brightBlack],
  light: [THEME_COLORS.dark, THEME_COLORS.light, THEME_COLORS.dark],
  bright: [THEME_COLORS.black, THEME_COLORS.yellow, THEME_COLORS.black],
  bold: [THEME_COLORS.main, THEME_COLORS.bold, THEME_COLORS.main],
  black: [
    THEME_COLORS.light,
    THEME_COLORS.brightBlack,
    lighten(0.08, THEME_COLORS.black),
  ],
  subtle: [THEME_COLORS.text, THEME_COLORS.main, THEME_COLORS.main],
  notice: [THEME_COLORS.black, THEME_COLORS.magenta, THEME_COLORS.black],
  funky: [THEME_COLORS.white, THEME_COLORS.brightMagenta, THEME_COLORS.white],
  disabled: [
    THEME_COLORS.grey,
    darken(0.2, THEME_COLORS.grey),
    THEME_COLORS.grey,
  ],
}

const COLOR_KEYS = Object.fromEntries(
  new Map(VARIANT_MAP.keys.map((key, index) => [key, index]))
)

const VARIANT_KEYS = Object.keys(VARIANT_MAP).filter((key) => key !== "keys")

const theme = THEME_COLORS

function variants(variantKey) {
  return VARIANT_MAP[variantKey]
}

variants.colorKeys = COLOR_KEYS
variants.keys = VARIANT_KEYS
variants.includes = (key) => variants.keys.includes(key)
theme.variants = variants

export { variants }
export { COLOR_KEYS as variantColorKeys }
export { THEME_COLOR_KEYS as themeColorKeys }
export { VARIANT_KEYS as variantKeys }
export default theme
