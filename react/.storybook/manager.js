import { addons } from "@storybook/addons"
import { create } from "@storybook/theming/create"
import logo from "../public/logo.png"

const theme = create({
  base: "dark",
  brandTitle: "Reactions",
  brandUrl: "https://emwaves.org",
  brandImage: logo,
})

addons.setConfig({
  isFullscreen: false,
  showNav: false,
  showPanel: true,
  panelPosition: "bottom",
  isToolshown: true,
  theme: theme,
  showRoots: false,
  enableShortcuts: true,
  selectedPanel: "addon-controls",
})
