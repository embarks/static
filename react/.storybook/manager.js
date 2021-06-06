import { addons } from "@storybook/addons"
import { create } from "@storybook/theming/create"
import { lighten } from "polished"
import logo from "../public/skully.png"
import custom from "../src/theme/constants/colors/empower.json"
import "../assets/fonts.css"

export const theme = create({
  base: "light",

  colorPrimary: custom.main,
  colorSecondary: custom.brightBlue,

  // UI
  appBg: custom.main,
  appContentBg: custom.main,
  appBorderColor: custom.white,
  appBorderRadius: 2,

  // Typography
  fontBase: "AnonymousPro, Operator Mono, monospace, sans-serif",
  fontCode: "Courier, AnonymousPro, Operator Mono, monospace",

  // Text colors
  textColor: custom.text,
  textInverseColor: custom.selection,

  // Toolbar default and active colors
  barTextColor: custom.black,
  barSelectedColor: custom.red,
  barBg: custom.main,

  // Form colors
  inputBg: lighten(0.1, custom.main),
  inputBorder: custom.main,
  inputTextColor: custom.bold,
  inputBorderRadius: 3,
  brandTitle: "you look inside... ... ... ... ... it's full of worms.",
  brandUrl: "https://emwaves.org",
  brandImage: logo,
})

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: "bottom",
  isToolshown: false,
  enableShortcuts: false,
  theme: theme,
  showRoots: false,
})
