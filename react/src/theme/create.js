import { darken, lighten } from "polished"
import empowerTheme from "./bases/empower.json"
import TYPOGRAPHY from "./typography"

/**
 *
 * @typedef {Object} ThemeColorMap
 *  @property {string} main
 *  @property {string} selection
 *  @property {string} cursor
 *  @property {string} text
 *  @property {string} bold
 *  @property {string} dark
 *  @property {string} darker
 *  @property {string} light
 *  @property {string} lighter
 *  @property {string} red
 *  @property {string} brightRed
 *  @property {string} green
 *  @property {string} brightGreen
 *  @property {string} blue
 *  @property {string} brightBlue
 *  @property {string} cyan
 *  @property {string} brightCyan
 *  @property {string} magenta
 *  @property {string} brightMagenta
 *  @property {string} yellow
 *  @property {string} brightYellow
 *  @property {string} black
 *  @property {string} brightBlack
 *  @property {string} white
 *  @property {string} brightWhite
 *  @property {string} grey
 */

/**
 * The variant color map constrains the custom colors on inputs.
 * @typedef {Object} VariantColorMap
 *  @property {string} text
 *  @property {string} bg
 *  @property {string} fg
 *  @property {string} focus
 */

/**
 * Variants are color maps used for different focusable input types,
 * e.g. buttons, text areas, checkboxes, selects
 * Variants object.
 * @typedef {Object} Variants
 *  @property {VariantColorMap} primary the obvious choice
 *  @property {VariantColorMap} secondary sometimes you need backup
 *  @property {VariantColorMap} success congratulations!
 *  @property {VariantColorMap} info for status updates
 *  @property {VariantColorMap} danger the things we do for love
 *  @property {VariantColorMap} error something went wrong
 *  @property {VariantColorMap} warn probably not a good idea...
 *  @property {VariantColorMap} link hopefully be a good connection
 *  @property {VariantColorMap} dark stretches the eyes
 *  @property {VariantColorMap} light not heavy
 *  @property {VariantColorMap} bright like a life-giving star
 *  @property {VariantColorMap} bold easy to see
 *  @property {VariantColorMap} black goes well with everything
 *  @property {VariantColorMap} subtle has a certain... je ne sais quois
 *  @property {VariantColorMap} notice when you hate giving orders
 *  @property {VariantColorMap} fresh for the jaded
 *  @property {VariantColorMap} funky cures uptightness
 *  @property {VariantColorMap} clean pure of heart
 *  @property {VariantColorMap} dirty not quite presentable
 *  @property {VariantColorMap} evil no character
 *  @property {VariantColorMap} good patient and strong
 *  @property {VariantColorMap} disabled out of order
 *  @property {Array} variantKeys a list of available variant keys
 */

/**
 * Maps theme colors to a usage map for variants
 * @param {ThemeColorMap} themeColors
 * @returns {Variants} an object containing the color map for each variant
 */
const mapColorsToVariants = (themeColors) => {
  const VARIANT_COLOR_KEYS = ["text", "bg", "fg", "focus"]
  const VARIANT_COLORS = {
    primary: [themeColors.text, themeColors.main, themeColors.blue],
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

  const variants = Object.keys(VARIANT_COLORS).reduce(
    (variantMap, variantKey) => {
      const currentVariant = {}
      const colorMap = VARIANT_COLORS[variantKey]

      VARIANT_COLOR_KEYS.forEach((key, color) => {
        currentVariant[key] = colorMap[color]
      })

      return {
        ...variantMap,
        [variantKey]: currentVariant,
      }
    },
    {},
  )

  variants.variantKeys = Object.keys(VARIANT_COLORS)

  /* [variant (primary, secondary, etc.)]: { [key (text, contrast, etc.)] } */
  return variants
}

/**
 *
 * @param {ThemeColorMap} themeColors
 * @returns {object} complete theme object
 */
export const create = (themeColors = empowerTheme) => {
  const theme = {
    colors: themeColors, // theme.colors.green, theme.colors.red
    fonts: TYPOGRAPHY,
    ...mapColorsToVariants(themeColors),
  }

  return theme
}
