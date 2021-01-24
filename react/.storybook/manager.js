import { addons } from "@storybook/addons"
import { create } from "@storybook/theming/create"
import { darken, lighten } from "polished"
import logo from "../public/skully.png"
import custom from "../src/theme/constants/colors/spacedust.json"
import "../assets/fonts.css"

export const theme = create({
  base: "dark",

  colorPrimary: custom.main,
  colorSecondary: custom.brightBlue,

  // UI
  appBg: darken(0.05, custom.black),
  appContentBg: custom.main,
  appBorderColor: custom.dark,
  appBorderRadius: 2,

  // Typography
  fontBase: "AnonymousPro, Operator Mono, monospace, sans-serif",
  fontCode: "Courier, AnonymousPro, Operator Mono, monospace",

  // Text colors
  textColor: custom.text,
  textInverseColor: custom.dark,

  // Toolbar default and active colors
  barTextColor: custom.dark,
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
  enableShortcuts: true,
})
